# Web Template Starter

React + TypeScript + Vite 기반으로 제작된 웹사이트 템플릿 스타터입니다. 주문형 웹 제작 업무에서 빠르게 시안을 제공할 수 있도록 Tailwind CSS 반응형 그리드, 공통 레이아웃, 페이지 템플릿을 포함합니다.

## 주요 특징

- Tailwind CSS 12 컬럼 기반 반응형 레이아웃
- 홈, 서비스 소개, 제품 소개, 포트폴리오, 데이터 애널리틱스 등 기본 페이지 템플릿 내장
- 체계적으로 분류된 재사용 가능한 컴포넌트 라이브러리:
  - **UI 컴포넌트**: Button, Card, Input, Badge, Alert 등 범용 UI 요소
  - **Content 컴포넌트**: Hero, FeatureCard, Testimonial, PricingCard 등 콘텐츠 요소
  - **Form 컴포넌트**: ContactForm, SearchForm 등 폼 관련 요소
  - **Data Visualization**: TanStack Table 기반 테이블 및 Recharts 기반 차트
  - **Layout 컴포넌트**: Navigation, Footer 등 레이아웃 요소
- 다크 테마를 기본으로 하는 모던한 디자인 토큰
- React Router 기반 페이지 전환 구조

## 빠른 시작

```bash
npm install
npm run dev
```

## 파일 구조

```
src/
  components/
    layout/                # 네비게이션, 푸터 등 레이아웃 컴포넌트
    data-visualization/    # 테이블, 차트 등 데이터 시각화 컴포넌트
    ui/                    # 범용 UI 컴포넌트 (Button, Card, Input 등)
    content/               # 콘텐츠 표시 컴포넌트 (Hero, FeatureCard 등)
    forms/                 # 폼 관련 컴포넌트 (ContactForm, SearchForm 등)
  routes/                  # React Router 라우트 정의
  styles/                  # Tailwind 전역 스타일 및 유틸리티
  templates/
    home/                  # 홈 랜딩 템플릿 (Hero, 서비스, 후기 등)
    service/               # 서비스 소개 페이지 템플릿
    product/               # 제품 소개 페이지 템플릿
    portfolio/             # 포트폴리오 페이지 템플릿
    analytics/             # 데이터 애널리틱스 페이지 템플릿

tailwind.config.js         # Tailwind 커스텀 테마 및 플러그인 설정
```

## 커스터마이징 가이드

- `tailwind.config.js`에서 브랜드 컬러, 폰트, 최대 폭 등을 조정해 고객 브랜드에 맞출 수 있습니다.
- `src/styles/global.css`에서 레이아웃 유틸리티(`container-section`, `card-surface`, `btn-primary` 등)를 정의하고 있으므로 필요에 따라 수정하세요.
- 페이지별로 섹션 컴포넌트를 추가/제거하여 고객 요구사항에 맞는 조합을 빠르게 구성할 수 있습니다.

## 권장 워크플로우

1. 고객 업종과 목적에 따라 `templates/`에서 가장 근접한 페이지를 선택합니다.
2. `tailwind.config.js`와 `global.css`에서 색상, 타입 스케일, 버튼 스타일 등을 브랜드에 맞게 조정합니다.
3. 섹션 컴포넌트 내 문구, 이미지, CTA를 교체하고 필요 시 추가 섹션을 생성합니다.
4. QA 체크리스트(반응형, 접근성, 성능 최소 기준)를 확인하고 전달용 빌드를 수행합니다.

## 향후 확장 아이디어

- Form, FAQ, Pricing 등 자주 쓰는 섹션을 별도 컴포넌트 라이브러리로 확장
- 다국어 지원(i18n) 기본 구조 추가
- Storybook을 통한 컴포넌트 문서화 및 시각적 테스트
- 템플릿 선택 및 프리뷰 자동화를 위한 CLI/스크립트 도입
- 대시보드 템플릿 및 고급 데이터 시각화 컴포넌트 확장
- 실시간 데이터 연동 및 차트 애니메이션 개선
