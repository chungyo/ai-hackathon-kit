# AI 해커톤 시험용 작업 지침

실무형 과제에서 요구사항 확인, 작은 구현, 검증과 본인의 이해를 돕는 참고 자료다. 특정 결과나 합격을 보장하지 않는다. 최신 운영 공지, 시험 플랫폼 규정, 실제 과제 README가 이 자료보다 우선한다.

## 시험 전

아래 세부 일정·운영 방식은 과거 기록이다. 현재 시험에도 그대로 적용되는지는 확인되지 않았으며 최신 공지가 우선한다.

- 시험 환경에서 스킬 자동 탐색과 실행이 동작하는지는 아직 확인되지 않았다. 최신 시험 안내와 플랫폼 동작이 우선한다.
- 공개 전 비밀·개인정보·비공개 프로젝트 자료와 라이선스를 검토한다. 시험에서 사용할 저장소는 공개 상태를 결과 통지 전까지 유지해야 한다.
- 사전 체험은 1회 15분이다. 실제 응시 환경에서 감독 연결, Codex 실행, 터미널, 공개 저장소 접근, 파일 읽기, 제공된 미리보기를 우선 확인한다. 실제 제공 방식은 시험 화면의 안내를 따른다.
- 응시 환경 밖 로컬 파일을 업로드하지 않는다. 본시험 과제 시작 이후 허용된 공개 저장소를 clone해 가져온다. 설치 도구·스크립트 실행 없이 지침 파일을 직접 읽도록 요청할 수 있다.

## 사용

전체 과제를 단계별로 진행할 때는 `skills/exam-workflow/SKILL.md`를 먼저 읽는다. 필요한 단계의 스킬만 실제 경로로 찾아 적용하며, 과제 원문·사용자 판단·시험 규정이 우선이다. 문제를 읽는 동안 AI가 읽기 전용 분석을 수행하는 등 독립적인 일을 겹칠 수 있다. 여러 에이전트나 추가 세션은 시험에서 허용·지원할 때만 사용한다.

현재 진입 스킬은 6개다. 현재 필요한 것만 읽고 다음 단계로 전달한다.

1. [exam-workflow](skills/exam-workflow/SKILL.md): 시험 전체 순서와 시간 관리
2. [discover-and-decide](skills/discover-and-decide/SKILL.md): 원문·데이터 분석과 담당자 질문
3. [practical-system-design](skills/practical-system-design/SKILL.md): 최소 PRD와 시스템 설계
4. [build-small](skills/build-small/SKILL.md): 프론트엔드·백엔드·UI의 작은 기능 구현
5. [requirements-verification](skills/requirements-verification/SKILL.md): 데이터·실행·요구 검증과 오류 재현
6. [explain-my-work](skills/explain-my-work/SKILL.md): 구현 이해와 서술형 준비

기존의 FE·BE·Next.js·FastAPI·UI·데이터·검산·PRD 세부 자료와 예제는 관련 스킬의 references 안에 남아 있다. 과제에 필요한 내용만 해당 스킬의 링크에서 읽는다. 이전 스킬의 원문은 참고자료이며 자동으로 실행되는 별도 스킬이 아니다.

- [시험 실전 시퀀스](templates/EXAM_SEQUENCE.md): 단계별 프롬프트와 사람/AI 병렬 작업
- [Next.js 데이터 처리](skills/build-small/references/backend-implementation/references/NEXT_DATA_WORKFLOW.md): 데이터 검증·적용·저장과 재계산
- [서술형 이해 점검](skills/explain-my-work/references/ESSAY_PREP.md): 질문 유형별로 실제 코드와 근거 확인

각 참고 자료에는 시험 문제가 아닌 가상의 사례가 있다. PRD는 한 요구를 화면·서버·저장·인수 기준으로 연결하고, 문제 해결은 관측에 따라 가설을 좁힌다. 검증은 입력 거부와 저장 실패 경로를 구분하며, Next.js 가이드는 기존 계약, 동시 요청·타임아웃·실제 DB 재조회에 필요한 판단을 정리한다. 이 예시의 API와 정책을 실제 과제에 그대로 복사하지 않는다.

예: `이 저장소의 AGENTS.md와 skills/discover-and-decide/SKILL.md를 읽고, 실제 과제 README와 시험 규정을 우선하여 필수 조건을 정리해줘.`

본 과제 시작 후 플랫폼에서 허용되고 `/tmp`가 쓰기 가능한 경우의 예시:

```bash
# 예시 주소: 실제 공개 여부·clone 허용 여부는 시험 전에 확인
git clone https://github.com/chungyo/ai-hackathon-kit.git /tmp/ai-hackathon-kit
```

이후 제공된 Codex에 `/tmp/ai-hackathon-kit/AGENTS.md`와 필요한 `skills/<스킬명>/SKILL.md`를 명시적으로 읽게 한다. 과제 파일은 제공된 작업 폴더에서 다루고, 경로·권한이 다르면 시험 환경의 안내를 따른다. 후속 서술형에서는 이 방법을 포함한 모든 AI 사용이 금지된다.

저장소를 별도 폴더에 clone하면 그 안의 AGENTS.md가 실제 과제 작업 폴더에 자동 적용된다고 가정하지 않는다. 실제 경로를 확인한 뒤 공통 지침과 필요한 스킬 파일을 Codex에 명시적으로 읽게 한다. `.agents/skills`의 상대 심볼릭 링크는 저장소에서 실행한 로컬 Codex의 스킬 목록에 발견되었지만, 시험 환경의 지원·권한은 확인되지 않았다. 세부 사항은 [Codex 적용 가이드](CODEX_SETUP.md)를 참고한다.

## 훅

Codex의 훅은 이벤트에 따라 명령을 실행할 수 있지만, 시험 플랫폼에서 훅 사용과 설정 변경이 허용·지원되는지는 확인되지 않았다. 기본 사용 경로는 명시적 파일 읽기이며, [로컬 연습용 훅 예제](examples/local-hooks/README.md)는 비활성 상태다. 시험에서 감독·보호 설정을 변경하거나 신뢰 절차를 우회하지 않는다.

## 품질 확인

[가상 시나리오](evaluation/scenarios.md)는 스킬을 실제 사용해 볼 때의 사례와 기대 결과다. [로컬 검증 기록](evaluation/RESULTS.md)에는 형식 검사, 예제 테스트와 가상 상황 1회 점검 결과를 구분해 적었다. 형식 검증이나 단일 사례는 전체 스킬의 행동을 보장하지 않는다.

## 과거 공지 기록 — 현재 시험 적용 여부 미확인

다음 내용은 이전 공지에 대한 기록으로, 현재 시험의 일정·도구·반입·공개 정책을 확인한 것이 아니다.

2026-10-31 10:00~14:00, 09:40까지 사전 준비. 상세 규칙은 최신 운영 공지를 확인한다. 시험에서 제공한 Codex를 사용하며 Astra·다른 AI 모델·개인 키 연결, Codex 업데이트, Computer Use, 시험 내용의 외부 전송·배포·Git push, 개인 PC 파일 업로드와 제한 우회는 하지 않는다. 후속 서술형에는 AI와 복사·붙여넣기를 사용하지 않는다. 허용된 공개 저장소도 자료·결과물·작업 이력 검토 대상이다.

Chrome, 유선 외장 키보드·마우스, 안정적인 휴대폰 Wi-Fi, 충전, 단일 모니터, 독립 공간과 실물 신분증을 준비한다. 공지의 09:40 이메일과 그 밖에 운영팀이 예고한 추가 안내를 확인한다.

## 참고와 출처

- [GitHub awesome-copilot PRD skill](https://github.com/github/awesome-copilot/blob/main/skills/prd/SKILL.md) 및 [Atlassian PRD 템플릿](https://www.atlassian.com/software/confluence/templates/product-requirements): 문제, 성공 기준, 범위와 가정을 명확히 하는 관점을 비교했다. 시험 과제에 맞지 않는 긴 인터뷰·고정 양식·임의 수치 요구는 채택하지 않았으며 원문을 복사하지 않았다.
- [FastAPI 공식 문서](https://fastapi.tiangolo.com/): 입력·응답·의존성·DB·테스트·CORS·컨테이너 사용을 참고했으며 세부 링크는 FastAPI 가이드에 있다.
- [harness_framework UI_GUIDE](https://github.com/jha0313/harness_framework/blob/main/docs/UI_GUIDE.md): 색상·컴포넌트·레이아웃·타이포그래피 기준을 정리하는 구성 방식만 참고했다. 해당 저장소의 라이선스를 확인하지 못해 원문·예제 코드는 복사하지 않았다. 원문 확인 기준 commit: `da676bc689f10f6db38ff194cf25e983f59ac231`.
- [k-style-ui-ux](https://github.com/vmc-inner-circle/k-style-ui-ux): 사용자 흐름·화면 상태·행동의 실제 연결·일관성 점검을 참고해 `build-small`를 독립 작성했다. 원본은 모바일 HTML 초안용 Claude Code 플러그인이다. 원본의 이미지 검색, 자동 캡처, 외부 모델·대규모 에이전트 절차, 특정 화면 구성과 자산은 포함하지 않았다. MIT 라이선스 고지는 `licenses/k-style-ui-ux/LICENSE`에 보존했다. 원문 확인 기준 commit: `1189933eb142f26e2c8b4dadd0cd1ea096f03a3a`.
- [W3C WCAG 2.2: 텍스트 대비](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) 및 [비텍스트 대비](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): 예시 색상의 검토 기준. 색상 계산만으로 전체 접근성 준수를 주장하지 않는다.
- [Superpowers brainstorming](https://github.com/obra/superpowers/blob/2ce8aa15d05bd57213e6f746f953aafb7ded7a8b/skills/brainstorming/SKILL.md): 맥락 파악·질문·대안 비교·설계 정리 방식을 `discover-and-decide`에 시험 환경에 맞게 재구성했다. 원본 MIT 고지는 `licenses/superpowers/LICENSE`에 보존한다. 원본의 승인 게이트·별도 도구·서버 실행은 포함하지 않았다.
- [OpenAI 추론 모델 가이드](https://developers.openai.com/api/docs/guides/reasoning-best-practices#how-to-prompt-reasoning-models-effectively): 추론 모델에는 간결한 목표·제약·성공 기준을 제시하고 사고 과정 출력을 강제하지 않는 방식을 참고했다.
- [Anthropic 프롬프트 가이드](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#thinking-and-reasoning): 모델별 추론 지침과 검증의 차이를 참고했다. 시험에서 외부 AI 사용을 허용한다는 뜻은 아니다.
- [Cofa 제작진 인터뷰](https://eopla.net/magazines/48041): 실무자 맥락 파악과 결과물·작업 과정·설명에 관한 제작진의 설명을 참고했다. 하이닉스의 세부 채점 기준을 확인한 것은 아니다.
- [코파톤 참가 후기](https://5giran.com/writing/cofaton-2026/): 시간제한 아래 필요한 스킬을 선택하고 구현에 집중하는 교훈을 참고했다. 실제 시험 과제와 같다고 가정하지 않는다.

로컬 참고 스킬의 프로젝트 사례·개인 경로·비공개 데이터는 포함하지 않았다.
