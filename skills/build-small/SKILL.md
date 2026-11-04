---
name: build-small
description: Use when implementing an end-to-end frontend, backend, data flow, or UI under a practical task time limit.
---

# 작은 단위로 기능 구현

제공된 구조·환경·기존 변경과 실제 계약을 확인하고, 필수 사용자 행동의 입력→검증→처리→저장/응답→화면을 필요한 범위에서 연결한다. 원문·데이터·출력 형식과 권한을 지키며 불필요한 구조·패키지·외부 서비스·인프라는 추가하지 않는다.

화면에서는 실제 필요한 로딩·정상·빈 결과·오류 상태, 명확한 조작과 복구를 처리한다. 서버에서는 타입·필수값·업무 규칙과 역할을 검증하고 실패를 성공으로 감추지 않는다. 데이터셋 교체·중복·동시 요청이 해당하면 적용·저장의 범위와 결과 출처를 확인한다. 트랜잭션이 보장하는 범위를 명확히 한다.

기능별로 중요한 정상·실패·경계를 확인하고 실제 명령·입력·관측을 남긴다. 테스트 더블과 실제 API·DB·화면을 구분하며 미실행은 미검증으로 둔다. 오류 수정 후 같은 조건을 다시 확인한다. 전체 빌드·통합 검증은 의미 있는 통합과 제출 전 수행하고, 관련 없는 전체 검증을 매 작은 변경마다 반복하지 않는다.

기능을 마칠 때 다음 4가지를 짧게 보고하고 다음 작업을 계속한다. 복잡한 경우만 자세히 설명하며 응시자의 응답을 기다리며 자동으로 중단하지 않는다.

- 동작: 실제 입력→처리→결과와 관련 파일
- 이유: 선택한 방법과 중요한 한계
- 검증: 실행한 명령·대표 입력·기대와 실제 관측
- 미확인: 실패·미실행·영향 또는 확인한 범위

## 필요할 때만 참고

- FE 상태·API 연결: [프론트엔드](references/frontend-implementation/GUIDE.md), [구현 결정표](references/frontend-implementation/references/IMPLEMENTATION.md).
- 서버·DB·권한: [백엔드](references/backend-implementation/GUIDE.md), [구현 결정표](references/backend-implementation/references/IMPLEMENTATION.md).
- Next.js: [App Router](references/backend-implementation/references/NEXT_APP_ROUTER.md), 데이터셋 적용·저장 시 [데이터 흐름](references/backend-implementation/references/NEXT_DATA_WORKFLOW.md).
- FastAPI가 실제로 필요한 경우: [FastAPI](references/backend-implementation/references/FASTAPI.md).
- 시각 설계가 중요할 때: [UI 지침](references/practical-ui/GUIDE.md), [UI 가이드](references/practical-ui/references/UI_GUIDE.md).

필요한 자료의 해당 부분만 살피고 이미 읽은 문서를 매 기능마다 다시 읽지 않는다. 화면은 실제 시험에서 허용된 미리보기를 응시자가 직접 확인한다. 외부 전송·배포·Computer Use 및 제한 우회는 하지 않는다.
