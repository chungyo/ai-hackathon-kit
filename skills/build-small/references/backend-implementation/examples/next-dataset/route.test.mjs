import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { GET, POST } from './route.ts';

async function withDatabase(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'next-dataset-example-'));
  const oldPath = process.env.EXAMPLE_DB_PATH;
  process.env.EXAMPLE_DB_PATH = join(dir, 'example.sqlite');
  try { await fn(process.env.EXAMPLE_DB_PATH); }
  finally {
    if (oldPath === undefined) delete process.env.EXAMPLE_DB_PATH;
    else process.env.EXAMPLE_DB_PATH = oldPath;
    rmSync(dir, { recursive: true, force: true });
  }
}

async function post(body) {
  return POST(new Request('http://localhost/api/example', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  }));
}

async function get() { return (await GET()).json(); }
const dataset = (id, items) => ({ action: 'apply', datasetId: id, items });

test('valid application, calculation and separate reopen return stored values', () => withDatabase(async () => {
  assert.equal((await get()).status, 'no-dataset');
  assert.equal((await post(dataset('A', [{ id: 'x', value: 2 }, { id: 'y', value: 3 }]))).status, 200);
  assert.equal((await get()).status, 'needs-calculation');
  assert.equal((await post({ action: 'calculate' })).status, 200);
  assert.deepEqual(await get(), { datasetId: 'A', version: 1, total: 5, status: 'ready' });
}));

test('a separate Node process reads the persisted SQLite result', () => withDatabase(async (path) => {
  await post(dataset('A', [{ id: 'x', value: 7 }]));
  await post({ action: 'calculate' });
  const moduleUrl = new URL('./store.ts', import.meta.url).href;
  const script = `import { getStatus } from ${JSON.stringify(moduleUrl)}; process.stdout.write(JSON.stringify(getStatus(process.env.EXAMPLE_DB_PATH)));`;
  const child = spawnSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '-e', script], {
    encoding: 'utf8', env: { ...process.env, EXAMPLE_DB_PATH: path },
  });
  assert.equal(child.status, 0, child.stderr);
  assert.deepEqual(JSON.parse(child.stdout), { datasetId: 'A', version: 1, total: 7, status: 'ready' });
}));

test('invalid data and duplicate IDs do not change the active data or result', () => withDatabase(async () => {
  await post(dataset('A', [{ id: 'x', value: 2 }]));
  await post({ action: 'calculate' });
  const before = await get();
  for (const items of [[{ id: 'x', value: -1 }], [{ id: 'x', value: 1 }, { id: 'x', value: 2 }]]) {
    assert.equal((await post(dataset('B', items))).status, 400);
    assert.deepEqual(await get(), before);
  }
}));

test('new dataset is not shown with old result and recalculation uses new inputs', () => withDatabase(async () => {
  await post(dataset('A', [{ id: 'x', value: 2 }]));
  await post({ action: 'calculate' });
  await post(dataset('B', [{ id: 'x', value: 9 }]));
  assert.deepEqual(await get(), { datasetId: 'B', version: 2, total: null, status: 'needs-calculation' });
  await post({ action: 'calculate' });
  assert.deepEqual(await get(), { datasetId: 'B', version: 2, total: 9, status: 'ready' });
}));

test('real SQLite write failure rolls back the dataset, items and active pointer', () => withDatabase(async (path) => {
  await post(dataset('A', [{ id: 'old', value: 1 }]));
  await post({ action: 'calculate' });
  const before = await get();
  const db = new DatabaseSync(path);
  db.exec("CREATE TRIGGER reject_99 BEFORE INSERT ON items WHEN NEW.value = 99 BEGIN SELECT RAISE(ABORT, 'forced test failure'); END;");
  db.close();
  assert.equal((await post(dataset('B', [{ id: 'first', value: 3 }, { id: 'second', value: 99 }]))).status, 500);
  assert.deepEqual(await get(), before);
  const verify = new DatabaseSync(path);
  try {
    assert.equal(verify.prepare('SELECT COUNT(*) AS n FROM datasets').get().n, 1);
    assert.equal(verify.prepare('SELECT COUNT(*) AS n FROM items').get().n, 1);
  } finally { verify.close(); }
}));

test('malformed JSON and calculation without data fail safely', () => withDatabase(async () => {
  const malformed = new Request('http://localhost/api/example', { method: 'POST', body: '{' });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal((await post({ action: 'calculate' })).status, 409);
  assert.equal((await get()).status, 'no-dataset');
}));
