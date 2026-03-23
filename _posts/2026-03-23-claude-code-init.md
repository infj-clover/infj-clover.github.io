---
layout: post
title: "Claude Code로 GitHub.io 블로그 제작"
date: 2025-03-23
tags: [jekyll, github-pages, blog, claude]
categories: [web]
read_time: 10
pinned: true
new: true
excerpt: "Claude Code로 커스텀 SF 디자인 제작, GitHub Pages 배포까지 — Claude와 함께한 블로그 구축 과정 전체 기록."
---

## 시작 — 왜 직접 만들었나

처음엔 그냥 Jekyll 테마 하나 골라서 쓰려고 했다. Chirpy, jekyll-theme-console 같은 SF 감성 테마들을 살펴봤는데, 뭔가 내 것이 아닌 느낌이었다. 그래서 Claude에게 직접 만들어 달라고 했다.

결과적으로 테마 선택 → 디자인 → 코드 → 배포까지 전 과정을 Claude와 함께 진행했고, 예상보다 훨씬 빠르게 완성됐다.

---

## 1단계 — 프레임워크 선택

Jekyll, Hugo, Gatsby 세 가지를 비교했다.

| 항목 | Jekyll | Hugo | Gatsby |
|------|--------|------|--------|
| 언어 | Ruby | Go | React/JS |
| 빌드속도 | 느림 | 초고속 | 보통 |
| GH Pages | 네이티브 | Actions필요 | Actions필요 |
| 난이도 | 쉬움 | 보통 | 어려움 |

GitHub Pages에 네이티브로 연동되고 난이도가 낮은 **Jekyll**을 선택했다. 처음이라면 Jekyll + Chirpy 조합이 레퍼런스가 많아 추천된다고 하는데, 나는 처음부터 커스텀으로 가기로 했다.

---

## 2단계 — 디자인 방향 설정

원하는 느낌을 Claude에게 전달했다.

- **사이버펑크 SF** 감성
- 분홍색 계열 완전 배제
- 단일 액센트 컬러 (시안)
- 유리 패널 없이 불투명 단색
- 우주에서 블로그를 보는 느낌

몇 차례 피드백을 주고받으며 디자인을 다듬었다. 처음엔 색상이 너무 많고 난잡했는데, 시안 단색으로 정리하고 나서야 원하는 느낌이 나왔다.

최종적으로 적용된 효과들은 다음과 같다.

- 페이지 로드 시 스캔라인 부팅 플래시
- 성운 파티클 배경 (Canvas API)
- 카드 호버 shimmer sweep
- 라이트 모드 도트 그리드 배경

---

## 3단계 — Jekyll 구조로 컴포넌트 분리

단일 HTML 파일로 완성된 데모를 Jekyll 프로젝트 구조로 분리했다.

```
void-log/
├── _layouts/
│   ├── default.html     # 공통 레이아웃
│   └── post.html        # 포스트 레이아웃
├── _includes/
│   ├── header.html      # 헤더 컴포넌트
│   ├── sidebar.html     # 사이드바 컴포넌트
│   └── post-card.html   # 포스트 카드 컴포넌트
├── _sass/
│   ├── _tokens.scss     # CSS 변수 (색상, 폰트)
│   ├── _background.scss # 우주 배경 레이어
│   └── pages/           # 페이지별 스타일
├── _data/
│   ├── projects.yml     # 프로젝트 데이터
│   └── skills.yml       # 기술 스택 데이터
├── _posts/              # 블로그 포스트
└── assets/js/
    ├── theme.js         # 다크/라이트 토글
    ├── clock.js         # 실시간 시계
    └── nebula.js        # 성운 파티클
```

CSS는 SASS로 분리해서 `_tokens.scss`에 CSS 변수를 몰아넣었다. 나중에 색상을 바꾸고 싶으면 `--c-accent` 값 하나만 수정하면 전체에 반영된다.

---

## 4단계 — 로컬 환경 세팅

macOS 기본 Ruby가 2.6이라 Jekyll 4가 설치되지 않았다. `rbenv`로 버전을 올려야 했다.

```bash
# rbenv 설치
brew install rbenv ruby-build

# 쉘 설정
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
eval "$(rbenv init -)"

# Ruby 3.2 설치 (2~3분 소요)
rbenv install 3.2.2
rbenv global 3.2.2

# 버전 확인
ruby -v  # ruby 3.2.2 가 나와야 함
```

버전 확인 후 의존성 설치.

```bash
gem install bundler
bundle install
```

로컬 서버 실행.

```bash
bundle exec jekyll serve
# http://localhost:4000 에서 확인
```

---

## 5단계 — GitHub Pages 배포

`github-pages` gem을 쓰면 Jekyll 1.x를 강제해서 버전 충돌이 난다. GitHub Actions로 직접 빌드하는 방식을 사용했다.

`.github/workflows/deploy.yml` 파일을 추가하면 push할 때마다 자동 빌드 & 배포가 된다.

```bash
git init
git remote add origin https://github.com/infj-clover/infj-clover.github.io.git
git add .
git commit -m "init: void.log jekyll blog"
git push -u origin main
```

GitHub 리포 → **Settings → Pages → Source → GitHub Actions** 로 변경하면 완료.

1~2분 후 `https://infj-clover.github.io` 에서 확인할 수 있다.

---

## 이후 포스트 작성 방법

`_posts/` 폴더에 `YYYY-MM-DD-제목.md` 형식으로 파일을 만들면 된다.

```markdown
---
layout: post
title: "포스트 제목"
date: 2025-04-01
tags: [rust, linux]
read_time: 10
---

본문 내용...
```

저장 후 push하면 자동 배포된다.

```bash
git add .
git commit -m "post: 포스트 제목"
git push
```

---

## 정리

Claude에게 원하는 느낌을 말로 설명하면서 디자인을 다듬어 나가는 과정이 꽤 재밌었다. 테마 고르고 설정하는 데 쓸 시간을 아끼고, 원하는 결과물을 더 빠르게 얻을 수 있었다.

과거에 백엔드 공부할 때 2-3일 정도 시도하다가 Jekyll 템플릿이 마음에 들지 않아 포기했던 경험이 있는데 이번에 클로드 코드로 테마를 직접 제작하고 배포 하는데 까지 30분 만에 끝났다. 제작한 김에 앞으로 블로그 플랫폼을 이쪽으로 옮겨볼 계획이다.
