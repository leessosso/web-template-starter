# Google Analytics 4 설정 가이드

이 프로젝트에는 Google Analytics 4 (GA4)를 통합하여 웹사이트 방문자 분석 및 사용자 행동 추적 기능을 제공합니다.

## 🚀 설정 방법

### 1. Google Analytics 4 속성 생성

1. [Google Analytics](https://analytics.google.com/)에 접속
2. 새 GA4 속성 생성
3. 측정 ID (예: `G-XXXXXXXXXX`)를 확인

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 측정 ID를 추가하세요:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. HTML 파일에서 GA ID 교체

`index.html` 파일에서 `GA_MEASUREMENT_ID`를 실제 측정 ID로 교체하세요:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. 애플리케이션 재시작

환경변수 변경 후 개발 서버를 재시작하세요:

```bash
npm run dev
```

## 📊 제공되는 분석 기능

### 자동 추적 기능
- **페이지뷰 추적**: 모든 페이지 방문 자동 기록
- **사용자 세션 추적**: 방문자 행동 패턴 분석

### 수동 추적 기능

#### 1. 버튼 클릭 추적
```tsx
import { Button } from './components/ui/Button';

<Button
  analyticsTracking={{
    eventName: 'cta_button_click',
    eventCategory: 'engagement',
    eventLabel: 'hero_section'
  }}
>
  시작하기
</Button>
```

#### 2. 폼 제출 추적
ContactForm 컴포넌트에서 자동으로 추적됩니다:
- 성공/실패 상태 구분
- 이벤트 카테고리: 'form'

#### 3. 검색 이벤트 추적
SearchForm 컴포넌트에서 자동으로 추적됩니다:
- 검색어 기록
- 이벤트 카테고리: 'search'

#### 4. 커스텀 이벤트 추적
```tsx
import { useAnalytics } from './analytics';

function MyComponent() {
  const { trackEvent, trackConversion } = useAnalytics();

  const handlePurchase = () => {
    trackConversion('purchase_completed', 50000);
  };

  const handleCustomEvent = () => {
    trackEvent({
      category: 'custom',
      action: 'video_play',
      label: 'product_demo'
    });
  };

  return (
    <div>
      <button onClick={handlePurchase}>구매하기</button>
      <button onClick={handleCustomEvent}>동영상 재생</button>
    </div>
  );
}
```

#### 5. 전자상거래 추적
```tsx
import { useAnalytics } from './analytics';

function CheckoutComponent() {
  const { trackPurchase, trackAddToCart } = useAnalytics();

  const handleAddToCart = (product) => {
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  };

  const handlePurchase = (order) => {
    trackPurchase(order.id, order.items, order.total);
  };
}
```

## 🎯 분석 대시보드

`/analytics` 경로에서 실시간 분석 대시보드를 확인할 수 있습니다:

- **방문자 추이**: 일별 페이지뷰 및 고유 방문자 수
- **트래픽 소스**: 방문 경로별 분석
- **세션 분석**: 평균 세션 시간 및 이탈률
- **이벤트 추적**: 사용자 행동 이벤트 데이터

## 🔧 고급 설정

### 사용자 속성 설정
```tsx
import { useAnalytics } from './analytics';

function UserProfileComponent() {
  const { setUserProperty } = useAnalytics();

  useEffect(() => {
    setUserProperty('user_type', 'premium');
    setUserProperty('subscription_tier', 'gold');
  }, []);
}
```

### 타이밍 추적
```tsx
import { useAnalytics } from './analytics';

function PerformanceTracker() {
  const { trackTiming } = useAnalytics();

  useEffect(() => {
    const startTime = Date.now();
    // 비동기 작업 수행
    fetch('/api/data').then(() => {
      const duration = Date.now() - startTime;
      trackTiming('api', 'data_fetch', duration);
    });
  }, []);
}
```

## 📈 Google Analytics 보고서

설정 완료 후 Google Analytics 대시보드에서 확인 가능한 데이터:

1. **실시간 보고서**: 현재 활성 사용자
2. **획득 보고서**: 트래픽 소스 및 채널
3. **참여 보고서**: 페이지뷰, 세션, 사용자
4. **전환 보고서**: 목표 달성 및 전환 이벤트
5. **이벤트 보고서**: 커스텀 이벤트 및 사용자 행동

## 🛠️ 문제 해결

### GA가 로드되지 않는 경우
- 측정 ID가 올바른지 확인
- 네트워크 연결 상태 확인
- 브라우저 콘솔에서 gtag 함수 확인

### 이벤트가 추적되지 않는 경우
- `isGAReady()` 함수로 GA 로드 상태 확인
- 이벤트 파라미터 형식 확인
- 브라우저 개발자 도구에서 네트워크 탭 확인

### 데이터가 표시되지 않는 경우
- GA 속성 설정에서 데이터 스트림 확인
- 이벤트 설정 및 파라미터 확인
- 데이터 필터링 설정 확인

## 🔒 개인정보 보호

- GDPR 및 CCPA 준수를 위해 사용자 동의 관리 고려
- 민감한 개인정보는 추적하지 않도록 주의
- 쿠키 정책 및 개인정보 처리방침에 GA 사용 명시

## 📚 추가 리소스

- [Google Analytics 4 공식 문서](https://support.google.com/analytics/answer/10089681)
- [GA4 이벤트 추적 가이드](https://support.google.com/analytics/answer/9322688)
- [gtag.js 레퍼런스](https://developers.google.com/gtagjs)
