# VOID.LOG — Jekyll Theme

사이버펑크 SF 스타일 Jekyll 블로그 테마.

## 빠른 시작

```bash
# 1. 의존성 설치
bundle install

# 2. 로컬 서버 실행
bundle exec jekyll serve

# 3. 브라우저에서 확인
open http://localhost:4000
```

## GitHub Pages 배포

```bash
git init
git add .
git commit -m "init: void.log blog"
git remote add origin https://github.com/yourusername/yourusername.github.io
git push -u origin main
```

GitHub 저장소 Settings → Pages → Source를 `main` 브랜치로 설정하면 자동 배포됩니다.

---

## 파일 구조

```
void-log/
├── _config.yml          # 블로그 설정 (이름, 소개, 연락처 등)
├── _layouts/
│   ├── default.html     # 공통 레이아웃 (헤더, 사이드바 포함)
│   └── post.html        # 개별 포스트 레이아웃
├── _includes/
│   ├── header.html      # 헤더 컴포넌트
│   ├── sidebar.html     # 사이드바 컴포넌트
│   └── post-card.html   # 포스트 카드 컴포넌트
├── _sass/
│   ├── _tokens.scss     # CSS 변수 (색상, 폰트)
│   ├── _base.scss       # 리셋, 공통 스타일
│   ├── _background.scss # 우주 배경 레이어
│   ├── _layout.scss     # 그리드 레이아웃
│   ├── _header.scss     # 헤더 스타일
│   ├── _sidebar.scss    # 사이드바 스타일
│   ├── _post-body.scss  # 마크다운 포스트 스타일
│   └── pages/
│       ├── _posts.scss    # 포스트 목록 페이지
│       ├── _projects.scss # 프로젝트 페이지
│       ├── _about.scss    # 어바웃 페이지
│       └── _archive.scss  # 아카이브 페이지
├── _data/
│   ├── projects.yml     # 프로젝트 목록 데이터
│   └── skills.yml       # 기술 스택 데이터
├── _posts/              # 블로그 포스트 (YYYY-MM-DD-title.md)
├── assets/
│   ├── css/main.scss    # CSS 진입점
│   └── js/
│       ├── theme.js     # 다크/라이트 토글
│       ├── clock.js     # 실시간 시계
│       └── nebula.js    # 성운 파티클 배경
├── pages/
│   ├── projects.html    # /projects/ 페이지
│   ├── about.html       # /about/ 페이지
│   └── archive.html     # /archive/ 페이지
└── index.html           # 메인 (포스트 목록)
```

---

## 커스터마이징

### 블로그 정보 변경
`_config.yml`에서 `author` 섹션을 수정하세요.

### 색상 변경
`_sass/_tokens.scss`에서 `--c-accent` 값을 바꾸면 포인트 컬러가 전체 적용됩니다.

### 포스트 작성
`_posts/` 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일을 만드세요.

```markdown
---
layout: post
title: "포스트 제목"
date: 2025-04-01
tags: [rust, systems]
read_time: 10
pinned: false   # true면 메인에 핀 카드로 표시
new: true       # NEW 배지 표시
---

여기에 내용을 작성하세요. 마크다운 사용 가능.
```

### 프로젝트 추가
`_data/projects.yml`에 항목을 추가하세요.

### 기술 스택 변경
`_data/skills.yml`을 수정하세요.
