import { applyDataset, calculateActive, getStatus, type Item } from './store.ts';

// Synthetic direct-handler example. It intentionally has no authentication,
// real CSV parsing, Next application, or production deployment configuration.
export const runtime = 'nodejs';

function validDataset(value: unknown): value is { datasetId: string; items: Item[] } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const input = value as Record<string, unknown>;
  if (typeof input.datasetId !== 'string' || !input.datasetId.trim() || !Array.isArray(input.items) || input.items.length === 0) return false;
  const ids = new Set<string>();
  let total = 0;
  for (const entry of input.items) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false;
    const item = entry as Record<string, unknown>;
    if (typeof item.id !== 'string' || !item.id.trim() || ids.has(item.id) ||
        typeof item.value !== 'number' || !Number.isSafeInteger(item.value) || item.value < 0) return false;
    ids.add(item.id);
    total += item.value;
    if (!Number.isSafeInteger(total)) return false;
  }
  return true;
}

export async function GET(): Promise<Response> {
  const path = process.env.EXAMPLE_DB_PATH;
  if (!path) return Response.json({ error: 'DB path is required' }, { status: 500 });
  try {
    return Response.json(getStatus(path));
  } catch {
    return Response.json({ error: 'Unable to read data' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const path = process.env.EXAMPLE_DB_PATH;
  if (!path) return Response.json({ error: 'DB path is required' }, { status: 500 });
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
  const body = input as Record<string, unknown>;
  if (body.action === 'apply') {
    if (!validDataset(body)) return Response.json({ error: 'Invalid dataset' }, { status: 400 });
    try {
      const version = applyDataset(path, body.datasetId, body.items);
      return Response.json({ version }, { status: 200 });
    } catch {
      return Response.json({ error: 'Unable to apply dataset' }, { status: 500 });
    }
  }
  if (body.action === 'calculate') {
    try {
      if (!calculateActive(path)) return Response.json({ error: 'No active dataset' }, { status: 409 });
      return Response.json(getStatus(path));
    } catch {
      return Response.json({ error: 'Unable to calculate' }, { status: 500 });
    }
  }
  return Response.json({ error: 'Invalid action' }, { status: 400 });
}
