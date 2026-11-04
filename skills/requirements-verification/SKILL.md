---
name: requirements-verification
description: Use when inspecting task data, checking generated results, diagnosing failures, or auditing required deliverables.
---

# 데이터와 요구 검증

원문·데이터 계약·실제 담당자 답변을 근거로 요구→구현 위치→검증 방법·관측→상태를 연결한다. 구현·테스트 존재, 테스트 실행, 실제 DB·API·화면 검증은 별개다. 필수 조건이 빠지거나 실패·미검증이면 전체 통과로 표시하지 않는다.

문제 분석 중에는 실제 파일의 열·형식·단위·행 수·결측·중복·ID 관계와 관찰 범위를 확인한다. 관측과 업무 의미를 구분하고 불명확하면 담당자에게 질문한다. 원본 보존, 기간·분모·0과 결측 구분을 지킨다. 이 데이터 조사 경로는 구현 전에도 필요할 때 읽는다.

핵심 흐름부터 정상, 실제로 중요한 무효·경계·실패·권한·상태 변경을 선택해 확인한다. 저장 시 응답뿐 아니라 저장 상태와 실패 시 보존 상태도 확인한다. 생성 결과는 원문이나 사람이 계산한 작은 기준 사례 등 가능한 독립 근거로 대조하고, 검증기와 생성기가 공유하는 가정 및 검증하지 못하는 것을 밝힌다.

오류는 입력·기대·실제 결과를 기록하고 경계에서 원인을 좁힌 뒤 수정한다. 수정 후 같은 실패 조건을 다시 실행한다. 확인하지 않은 가설은 원인으로 단정하지 않는다. 테스트 통과를 실제 연동·최적성·배포 성공으로 확대하지 않는다.

기능별 관련 검증을 우선하고 통합 시점과 제출 전 전체 흐름·필수 산출물을 확인한다. 실무 담당자 답변이나 데이터·코드가 바뀌면 영향받는 기존 검증을 재평가한다. 실제 실행 명령·관측·미확인만 짧게 기록하고 문서 작성이 검증 시간을 잠식하지 않게 한다.

## 필요할 때만 참고

- [데이터 형식·결측·계산](references/data-check/GUIDE.md).
- 문서·표의 출처 추적과 독립 검산: [원자료 분석](references/source-grounded-analysis/GUIDE.md), [분석 예시](references/source-grounded-analysis/references/ANALYSIS.md).
- 요구별 경계·상태·테스트: [인수 기준 작업표](references/ACCEPTANCE.md).
- 오류 재현 및 상태 검증: [검증과 수정](references/verify-and-fix/GUIDE.md), [검증표](references/verify-and-fix/references/TEST_MATRIX.md).
- 복잡한 다단계 근거 검토: [근거 기반 문제 해결](references/evidence-first-solving/GUIDE.md).
