/**
 * Local-only teaching example for an App Router POST handler.
 * Example policy: non-negative integer quantity and unitPrice in whole units.
 * No database, authentication, filesystem access or external API is included.
 * Adapt the path, validation, authorization and response contract to the task.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'JSON 형식을 확인해 주세요.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return Response.json({ error: '입력 데이터가 올바르지 않습니다.' }, { status: 400 });
  }

  const { quantity, unitPrice } = body as Record<string, unknown>;
  if (
    typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 0 ||
    typeof unitPrice !== 'number' || !Number.isSafeInteger(unitPrice) || unitPrice < 0
  ) {
    return Response.json({ error: '수량과 단가는 0 이상의 정수여야 합니다.' }, { status: 400 });
  }

  const total = quantity * unitPrice;
  if (!Number.isSafeInteger(total)) {
    return Response.json({ error: '계산 가능한 범위를 벗어났습니다.' }, { status: 400 });
  }

  return Response.json({ total }, { status: 200 });
}
