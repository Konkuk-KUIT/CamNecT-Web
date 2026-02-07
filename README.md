# CamNecT (캠넥트)

> 대학생을 위한 동문 네트워킹 & 커피챗 기반 커뮤니티 웹앱

CamNecT는

동문 탐색, 포트폴리오 공유, 대외활동/팀원 모집, 커피챗을 통해
대학생 간 네트워킹을 돕는 웹 애플리케이션입니다.

---

## 🔗 프로젝트 개요

- 프로젝트명: CamNecT
- 개발 기간: 약 45일
- 개발 인원: 프론트엔드 3명
- 프레임워크: React + Vite
- 스타일링: Tailwind CSS
- 서버 통신: REST API (TanStack Query)
- 채팅: STOMP기반 실시간 채팅

## 📃 기능 구성

### 🔐 인증 & 온보딩 플로우

- 로그인 / 회원가입
- 약관 동의
- 이메일 본인인증
- 인증번호 요청
- 타이머 / 재전송
- 관심 분야 선택
- 프로필 기본 설정
- 학교 인증 (파일 업로드)
- 인증 상태 분기
- 대기 / 승인 / 반려

### 💬 커피챗 / 채팅 기능

- 실시간 메시지 송수신
- unread 실시간 갱신
- 재연결 처리
- REST fallback

### 🏠 홈

- 새 커피챗 요청 알림
- 추천 공모전
- 추천 동문
- 가로 스크롤 카드 UI

### 📬 커뮤니티

- 게시글 목록 / 상세
- 댓글 작성
- 글쓰기 / 수정 / 삭제

### 👥 동문찾기

- 동문 리스트
- 필터 / 검색
- 동문 프로필 상세
- 커피챗 요청 버튼

### 📝 마이페이지

- 내 프로필 정보
- 태그 / 자기소개
- 포트폴리오 공개 설정
- 학력 / 경력 / 자격증 관리

### ✏️ 포트폴리오 편집

- 소개글
- 해시태그
- 경력 / 학력 / 기술 동적 추가
- 저장 / 수정

### 👔 대외활동 & 팀원모집

- 공모전 / 스터디 / 동아리 리스트
- 팀원 모집 글 작성
- 지원 / 수락 / 거절

## 👥 팀 구성 및 역할 분담

### 정상현 (인프라 · 인증 · 채팅)

- 공통 인프라 / 프로젝트 기반
- 인증 & 온보딩 (이메일 본인인증)
- 커피챗 실시간 채팅
- PWA 전환 / 백그라운드 푸시알림 연동

### 김나연 (마이페이지 · 포트폴리오 · 대외활동)

- 마이페이지 (내 정보 관리)
- 포트폴리오 편집
- 대외활동
- 팀원 모집

### 조은서 (홈 · 커뮤니티 · 동문찾기 · 공통 UI)

- 홈
- 커뮤니티
- 동문찾기 (리스트 + 동문 프로필)
- 기프티콘

## 🧱 기술 스택

**Core**

- React 19
- Vite
- TypeScript
- React Router DOM

**Styling**

- Tailwind CSS v4
- clsx
- tailwind-merge

**Data & State**

- TanStack Query
- Axios (instance 기반)
- react-hook-form
- zod
- Zustand

**Tooling**

- ESLint
- SWC
- TypeScript ESLint
- Vite

## 🗂️ 프로젝트 구조

```
src/
┣ api/ # axios 기반 API 모듈
┃ ┣ auth.ts
┃ ┣ chat.ts
┃ ┣ activity.ts
┃ ┣ portfolio.ts
┃ ┗ community.ts
┃
┣ mocks/ # API 개발 전 임시 데이터
┃ ┣ activities.ts
┃ ┗ ...
┃
┣ components/ # 공통 UI 컴포넌트
┃ ┣ Button.tsx
┃ ┣ Card.tsx
┃ ┣ Modal.tsx
┃ ┣ Toggle.tsx
┃ ┗ ...
┃
┣ pages/
┃ ┣ auth/ # 로그인 / 온보딩
┃ ┣ admin/ # 관리자
┃ ┃ ┣ components/ # 페이지 내부 컴포넌트 폴더
┃ ┃ ┣ AdminVerificationDetail.tsx
┃ ┃ ┣ AdminVerificationList.tsx
┃ ┃ ┣ AdminWritePage.tsx # 대외활동 관리 화면
┃ ┃ ┣ ExternalPostWritePage.tsx # 대외활동 추가/수정 화면
┃ ┃ ┣ JobPostWritePage.tsx # 취업정보 추가/수정 화면
┃ ┣ chat/ # 커피챗 / 채팅
┃ ┣ home/ # 홈
┃ ┃ ┣ components/ # 페이지 내부 컴포넌트 폴더
┃ ┃ ┣ HomePage.tsx # xxPage.ts로 통일
┃ ┣ community/ # 커뮤니티
┃ ┣ alumni/ # 동문찾기 / 동문프로필
┃ ┣ mypage/ # 마이페이지
┃ ┃ ┣ components/ # 페이지 내부 컴포넌트 폴더
┃ ┃ ┣ hooks/ # 페이지 내부 훅 폴더
┃ ┃ ┣ sidebar/ # 사이드바 관련 화면 폴더
┃ ┃ ┣ MypagePage.tsx # 마이페이지 메인 화면
┃ ┃ ┣ MypageEditPage.tsx # 마이페이지 수정 화면
┃ ┃ ┣ MypageFollowerPage.tsx # 팔로워 / 팔로잉 화면
┃ ┣ portfolio/ # 포트폴리오 편집
┃ ┃ ┣ components/ # 페이지 내부 컴포넌트 폴더
┃ ┃ ┣ PortfolioListPage.tsx # 포트폴리오 리스트 화면
┃ ┃ ┣ PortfolioDetailPage.tsx # 포트폴리오 상세 화면
┃ ┗ activity/ # 대외활동 / 팀원모집
┃ ┃ ┣ components/ # 페이지 내부 컴포넌트 폴더
┃ ┃ ┣ hooks/ # 페이지 내부 훅 폴더
┃ ┃ ┣ utils/ # 페이지 내부 유틸 폴더
┃ ┃ ┣ ActivityPage.tsx # 대외활동 메인 화면
┃ ┃ ┣ ActivityPostPage.tsx # 동아리/스터디 상세 화면
┃ ┃ ┣ ExternalActivityPostPage.tsx # 대외활동/취업정보 상세 화면
┃ ┃ ┣ RecruitDetailPage.tsx # 팀원 모집 상세 화면
┃ ┃ ┣ RecruitWritePage.tsx # 팀원 모집 추가 및 수정 화면
┃ ┃ ┣ WritePage.tsx # 동아리/스터디 추가 및 수정 화면
┃
┣ utils/ # custom utils
┣ hooks/ # custom hooks
┣ store/ # 전역 상태 (auth 등)
┣ types/ # TS interface 정의
┃ ┣ activity/
┃ ┃ ┗ activityTypes.ts
┃ ┗ ...
┣ layouts/ # 조립식 레이아웃 폴더
┃ ┣ FullLayout.tsx # Header + BottomNav
┃ ┣ HeaderLayout.tsx
┃ ┗ headers/
┃   ┗ Header.tsx # Header 조립 부품
┃ ┗ BottomNav/
┃   ┗ BottomNav.tsx # BottomNav 조립 부품
┃
┣ router/ # 라우팅 설정
┃ ┣ Router.tsx # 전체 라우트 정의
┃ ┗ AuthGuard.tsx # 로그인 방어막 (PrivateRoute)
┣ styles/ # 전역 스타일
┣ App.tsx
┗ main.tsx
```
