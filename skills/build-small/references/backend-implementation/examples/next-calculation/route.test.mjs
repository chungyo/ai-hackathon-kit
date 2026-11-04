import assert from 'node:assert/strict';
import test from 'node:test';
import { POST } from './route.ts';

const request = (body) => new Request('http://localhost/api/calculation', {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
});

async function check(body, expectedStatus, expectedValue) {
  const response = await POST(request(body));
  assert.equal(response.status, expectedStatus);
  const result = await response.json();
  if (expectedValue !== undefined) assert.deepEqual(result, expectedValue);
  else assert.equal(typeof result.error, 'string');
}

test('valid integers return a computed total', () => check('{"quantity":2,"unitPrice":5000}', 200, { total: 10000 }));
test('zero is valid for the example policy', () => check('{"quantity":0,"unitPrice":5000}', 200, { total: 0 }));
test('malformed JSON returns a 400', () => check('{', 400));
test('array or null body returns a 400', async () => { await check('[]', 400); await check('null', 400); });
test('missing, negative, decimal, or string fields return a 400', async () => {
  for (const body of ['{"quantity":1}', '{"quantity":-1,"unitPrice":1}', '{"quantity":1.5,"unitPrice":1}', '{"quantity":"1","unitPrice":1}']) await check(body, 400);
});
test('a product outside the safe integer range returns a 400', () => check('{"quantity":9007199254740991,"unitPrice":2}', 400));
