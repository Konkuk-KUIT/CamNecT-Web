## 💡 Related issue

- closes #1
  ex. closes #1 → 휴대폰 본인인증(인증번호 요청/검증 + 타이머/재전송) 플로우 구현

## ✨ Description

- 어떤 기능을 추가/변경했는지 간단히 설명해주세요.  
  ex. 온보딩 내 휴대폰 인증 화면 추가, 인증 상태에 따라 라우트 접근 제어(미인증 시 인증 플로우로 리다이렉트)

## 🔨 Implementation Lists

- [ ] UI  
       ex. `PhoneVerifyScreen.tsx` 인증번호 입력/타이머/재전송 UI 구현
- [ ] 상태 관리  
       ex. 인증 진행 상태(`idle/requested/verified/failed`)를 전역(auth store)로 관리
- [ ] API 연동  
       ex. `/auth/phone/request`, `/auth/phone/verify` 호출 + 에러코드별 메시지 처리

## ✔️ Checklists

- [ ] 모든 테스트 통과
- [ ] 최신 develop 브랜치 merge 완료
- [ ] 다른 팀원 코드 수정 여부
- [ ] 문서 업데이트  
       ex. README에 “인증 플로우/라우트 가드 규칙” 및 에러코드 처리 규칙 추가

## 📷 Screenshot

## 🔖 Uncompleted Tasks

- [ ] 후속 작업 예정  
       ex. 학교 인증(파일 업로드) 화면/제출 API 연동, 인증 대기/승인/반려 안내 화면 추가

## 📢 To Reviewers (필수)

Reviewer가 확인해야 하는 부분 작성

ex.

- 미인증/인증완료 사용자 각각에 대해
  ① 직접 URL 접근
  ② 새로고침
  ③ 뒤로가기
  상황에서 라우트가 올바르게 제어되는지 확인 부탁드립니다.
- 401/403 응답 발생 시 로그인/인증 플로우로 이동하는 흐름이 과하지 않은지도 봐주세요.
