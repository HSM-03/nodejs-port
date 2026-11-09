# 포트폴리오 아카이브 웹 서비스

MySQL 연동부터 AWS EC2 배포까지 직접 구축한 풀스택 포트폴리오 웹 서비스입니다.
(데이터베이스설계및구축 수업 개인 프로젝트)

## 주요 기능

- **프로젝트 관리 (CRUD)**: 프로젝트 등록·조회·수정·삭제 (제목, 요약, 기술 스택, GitHub·데모 링크, 진행 기간)
- **로그인 / 로그아웃**: express-session 기반 세션 인증
- **권한 관리**: 로그인한 사용자만 등록 가능, 본인이 작성한 프로젝트만 수정·삭제 가능
- **문의하기**: 방문자 문의를 DB에 저장
- **메인 페이지**: 프로필과 최근 프로젝트 3개 표시

## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Backend | Node.js, Express |
| Frontend | EJS, CSS |
| Database | MySQL (mysql2) |
| 인증 | express-session |
| 배포 | AWS EC2 (현재 인스턴스 종료) |

## 프로젝트 구조

```
src/
├── app.js            # 서버 진입점, 미들웨어·라우터 등록
├── config/db.js      # MySQL 연결 (환경변수 사용)
├── routes/
│   ├── index.js      # 메인 페이지
│   ├── projects.js   # 프로젝트 CRUD
│   ├── contacts.js   # 문의하기
│   └── auth.js       # 로그인·로그아웃
├── views/            # EJS 템플릿
└── public/           # CSS 등 정적 파일
```

## DB 테이블

- `users`: 사용자 (user_id, login_id, password, name, email)
- `projects`: 프로젝트 (project_id, title, summary, description, tech_stack, github_url, demo_url, start_date, end_date, created_at, user_id)
- `contacts`: 문의 (name, email, message, created_at)

## 실행 방법

1. 패키지 설치

   ```bash
   npm install
   ```

2. 프로젝트 루트에 `.env` 파일 생성

   ```
   DB_HOST=localhost
   DB_USER=사용자명
   DB_PASSWORD=비밀번호
   DB_NAME=데이터베이스명
   ```

3. 실행

   ```bash
   npm start
   ```

   → http://localhost:3000