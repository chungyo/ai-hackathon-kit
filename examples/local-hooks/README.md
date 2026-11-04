# 로컬 연습용 훅 예제

이 디렉터리는 활성 Codex 설정 위치가 아니다. `hooks.json.example`은 예제이며 자동 실행되지 않는다. 사용자의 전역 설정이나 시험 플랫폼 설정을 바꾸지 않는다. 시험 중 훅 사용·설정 변경이 허용되는지, 제공 버전이 지원하는지는 확인되지 않았으므로 시험에서 설치하거나 활성화하지 않는다. 확인이 필요하면 운영팀/Cofa Helper에 문의한다.

`session_reminder.py`는 고정 문장만 표준 출력한다. 파일·입력·환경변수를 읽지 않고 네트워크 접근, 로그 저장, 차단 또는 추가 AI 호출을 하지 않는다. Codex는 지원 버전에서 `SessionStart`의 `additionalContext`를 모델 문맥에 추가할 수 있다. 이것은 검증 성공이나 시험 규정 준수를 강제하지 않는다.

## 로컬 단위 확인

저장소 루트에서:

```sh
printf '%s\n' '{"hook_event_name":"SessionStart","source":"startup"}' | python3 examples/local-hooks/session_reminder.py
python3 -m json.tool examples/local-hooks/hooks.json.example
```

명령은 예제의 출력과 JSON 문법만 확인한다. 실제 Codex 훅 발견·신뢰·호출까지 검증하는 것은 아니다. 예제 command의 상대 경로는 프로세스 작업 디렉터리가 이 저장소 루트일 때만 맞는다.

Codex 공식 문서상 지원 버전의 프로젝트 훅은 `<repo>/.codex/hooks.json` 또는 해당 계층의 `config.toml`에서 찾고 프로젝트 신뢰 및 비관리형 훅의 별도 신뢰 검토가 필요하다. 다른 프로젝트나 폴더에서 상대경로가 그대로 동작하지 않으며, 별도로 복사한 저장소의 `.codex`가 현재 과제의 설정으로 자동 적용되는 것도 아니다. `/hooks` 지원 여부는 버전·환경에 따라 확인한다. 검증을 위해 신뢰 검토를 우회하지 않는다.

예제를 활성화하는 것은 별도의 명시적 결정이며, 기존 hook/config와 합쳐지는 동작도 확인해야 한다. 이 자료는 시험 환경의 보호·제한을 회피하기 위한 설정이 아니다. 공식 문서: https://learn.chatgpt.com/docs/hooks
