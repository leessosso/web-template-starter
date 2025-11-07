# 다중 분석 도구 통합 가이드

현재 프로젝트에 Google Analytics 외에 다른 분석 도구들을 추가하는 방법을 설명합니다.

## 🏗️ 현재 프로젝트 구조

```
src/
├── analytics/
│   ├── analytics.ts       # Google Analytics 유틸리티
│   ├── useAnalytics.ts    # React hooks
│   └── index.ts          # Export 파일
├── components/
│   ├── ui/
│   │   └── Button.tsx     # analyticsTracking 지원
│   └── forms/
│       ├── ContactForm.tsx # 폼 추적
│       └── SearchForm.tsx  # 검색 추적
└── templates/
    └── analytics/
        └── AnalyticsPage.tsx # 대시보드
```

## 🔧 다중 분석 도구 통합 전략

### 1. **분석 매니저 패턴 적용**

```typescript
// src/analytics/AnalyticsManager.ts
export class AnalyticsManager {
  private providers: AnalyticsProvider[] = [];

  addProvider(provider: AnalyticsProvider) {
    this.providers.push(provider);
  }

  trackEvent(event: AnalyticsEvent) {
    this.providers.forEach(provider => {
      if (provider.isEnabled()) {
        provider.trackEvent(event);
      }
    });
  }

  trackPageView(pageData: PageData) {
    this.providers.forEach(provider => {
      if (provider.isEnabled()) {
        provider.trackPageView(pageData);
      }
    });
  }
}

// Provider 인터페이스
interface AnalyticsProvider {
  name: string;
  isEnabled(): boolean;
  trackEvent(event: AnalyticsEvent): void;
  trackPageView(pageData: PageData): void;
}
```

### 2. **각 분석 도구 Provider 구현**

#### Google Analytics Provider

```typescript
// src/analytics/providers/GoogleAnalyticsProvider.ts
import { AnalyticsProvider, AnalyticsEvent, PageData } from '../types';

export class GoogleAnalyticsProvider implements AnalyticsProvider {
  name = 'Google Analytics';

  isEnabled(): boolean {
    return !!import.meta.env.VITE_GA_MEASUREMENT_ID;
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customParameters,
      });
    }
  }

  trackPageView(pageData: PageData): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: pageData.path,
        page_title: pageData.title,
      });
    }
  }
}
```

#### Microsoft Clarity Provider

```typescript
// src/analytics/providers/ClarityProvider.ts
import { AnalyticsProvider, AnalyticsEvent, PageData } from '../types';

declare global {
  interface Window {
    clarity: any;
  }
}

export class ClarityProvider implements AnalyticsProvider {
  name = 'Microsoft Clarity';

  isEnabled(): boolean {
    return !!import.meta.env.VITE_CLARITY_PROJECT_ID;
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', event.action);
    }
  }

  trackPageView(pageData: PageData): void {
    // Clarity는 자동으로 페이지뷰 추적
  }
}
```

#### Mixpanel Provider

```typescript
// src/analytics/providers/MixpanelProvider.ts
import { AnalyticsProvider, AnalyticsEvent, PageData } from '../types';

declare global {
  interface Window {
    mixpanel: any;
  }
}

export class MixpanelProvider implements AnalyticsProvider {
  name = 'Mixpanel';

  isEnabled(): boolean {
    return !!import.meta.env.VITE_MIXPANEL_TOKEN;
  }

  trackEvent(event: AnalyticsEvent): void {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track(event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        ...event.customParameters,
      });
    }
  }

  trackPageView(pageData: PageData): void {
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track('page_view', {
        page_path: pageData.path,
        page_title: pageData.title,
      });
    }
  }
}
```

### 3. **통합 React Hook 업데이트**

```typescript
// src/analytics/useAnalytics.ts
import { useCallback } from 'react';
import { analyticsManager } from './AnalyticsManager';
import { EventParams } from './analytics';

export const useAnalytics = () => {
  const trackCustomEvent = useCallback((params: EventParams) => {
    analyticsManager.trackEvent({
      action: params.action,
      category: params.category,
      label: params.label,
      value: params.value,
      customParameters: params.customParameters,
    });
  }, []);

  // ... 기존 hooks 유지

  return {
    trackEvent: trackCustomEvent,
    // ... 다른 함수들
    isGAReady: () => analyticsManager.providers.some(p => p.name === 'Google Analytics' && p.isEnabled()),
  };
};
```

## 📦 각 도구별 설치 및 설정 가이드

### Microsoft Clarity 추가하기

#### 1. 환경변수 추가
```bash
# .env
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
```

#### 2. HTML 스크립트 추가
```html
<!-- index.html -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "PROJECT_ID");
</script>
```

#### 3. Provider 등록
```typescript
// src/analytics/setupAnalytics.ts
import { AnalyticsManager } from './AnalyticsManager';
import { GoogleAnalyticsProvider } from './providers/GoogleAnalyticsProvider';
import { ClarityProvider } from './providers/ClarityProvider';

export const analyticsManager = new AnalyticsManager();

analyticsManager.addProvider(new GoogleAnalyticsProvider());
analyticsManager.addProvider(new ClarityProvider());
```

### Hotjar 추가하기

#### 1. 환경변수 추가
```bash
# .env
VITE_HOTJAR_SITE_ID=your_hotjar_site_id
```

#### 2. 스크립트 추가
```html
<!-- index.html -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_SITE_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

### Mixpanel 추가하기

#### 1. 패키지 설치
```bash
npm install mixpanel-browser
```

#### 2. 환경변수 추가
```bash
# .env
VITE_MIXPANEL_TOKEN=your_mixpanel_token
```

#### 3. 초기화 코드 추가
```typescript
// src/analytics/providers/MixpanelProvider.ts
import mixpanel from 'mixpanel-browser';

export class MixpanelProvider implements AnalyticsProvider {
  constructor() {
    if (typeof window !== 'undefined' && import.meta.env.VITE_MIXPANEL_TOKEN) {
      mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
        debug: import.meta.env.DEV,
        track_pageview: true,
        persistence: 'localStorage',
      });
    }
  }

  // ... 나머지 구현
}
```

### Plausible 추가하기 (쿠키리스)

#### 1. 환경변수 추가
```bash
# .env
VITE_PLAUSIBLE_DOMAIN=yourdomain.com
```

#### 2. 스크립트 추가
```html
<!-- index.html -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## 🛠️ 통합 관리 시스템

### 분석 설정 파일
```typescript
// src/analytics/config.ts
export const analyticsConfig = {
  providers: {
    googleAnalytics: {
      enabled: !!import.meta.env.VITE_GA_MEASUREMENT_ID,
      measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    },
    clarity: {
      enabled: !!import.meta.env.VITE_CLARITY_PROJECT_ID,
      projectId: import.meta.env.VITE_CLARITY_PROJECT_ID,
    },
    hotjar: {
      enabled: !!import.meta.env.VITE_HOTJAR_SITE_ID,
      siteId: import.meta.env.VITE_HOTJAR_SITE_ID,
    },
    mixpanel: {
      enabled: !!import.meta.env.VITE_MIXPANEL_TOKEN,
      token: import.meta.env.VITE_MIXPANEL_TOKEN,
    },
    plausible: {
      enabled: !!import.meta.env.VITE_PLAUSIBLE_DOMAIN,
      domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
    },
  },
};
```

### 초기화 함수
```typescript
// src/analytics/initAnalytics.ts
import { analyticsManager } from './AnalyticsManager';
import { GoogleAnalyticsProvider } from './providers/GoogleAnalyticsProvider';
import { ClarityProvider } from './providers/ClarityProvider';
import { HotjarProvider } from './providers/HotjarProvider';
import { MixpanelProvider } from './providers/MixpanelProvider';
import { PlausibleProvider } from './providers/PlausibleProvider';

export function initAnalytics() {
  // Provider 등록
  analyticsManager.addProvider(new GoogleAnalyticsProvider());
  analyticsManager.addProvider(new ClarityProvider());
  analyticsManager.addProvider(new HotjarProvider());
  analyticsManager.addProvider(new MixpanelProvider());
  analyticsManager.addProvider(new PlausibleProvider());

  // 초기 페이지뷰 추적
  if (typeof window !== 'undefined') {
    analyticsManager.trackPageView({
      path: window.location.pathname,
      title: document.title,
    });
  }
}
```

### 메인 앱에서 초기화
```typescript
// src/main.tsx
import { initAnalytics } from './analytics/initAnalytics';

// ... 다른 import들

initAnalytics();

// ... 앱 렌더링
```

## 📊 대시보드 확장

### 다중 도구 데이터 통합
```typescript
// src/templates/analytics/AnalyticsPage.tsx
import { useAnalytics } from '../../analytics';

export default function AnalyticsPage() {
  const { isGAReady } = useAnalytics();
  const [analyticsData, setAnalyticsData] = useState({
    ga: null,
    clarity: null,
    mixpanel: null,
  });

  // 각 도구별 데이터 fetch 함수들
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <div>
      <h1>통합 분석 대시보드</h1>

      {/* Google Analytics 섹션 */}
      {isGAReady && (
        <section>
          <h2>Google Analytics</h2>
          {/* GA 데이터 표시 */}
        </section>
      )}

      {/* 다른 도구들 섹션 */}
      {/* ... */}
    </div>
  );
}
```

## 🔒 개인정보 보호 고려사항

### 동의 기반 추적
```typescript
// src/analytics/ConsentManager.ts
export class ConsentManager {
  private consents: Record<string, boolean> = {
    analytics: false,
    marketing: false,
    functional: false,
  };

  setConsent(type: string, consented: boolean) {
    this.consents[type] = consented;
    localStorage.setItem('analytics_consents', JSON.stringify(this.consents));

    // 동의 상태에 따라 추적 활성화/비활성화
    this.updateTracking();
  }

  private updateTracking() {
    // 동의 상태에 따라 각 Provider 활성화/비활성화
    analyticsManager.updateConsents(this.consents);
  }
}
```

### 쿠키리스 도구 우선 사용
- Plausible, Fathom 같은 쿠키리스 도구들은 GDPR 준수가 용이
- 동의 배너 없이도 사용 가능

## 🚀 빠른 시작 템플릿

### 2개 도구 통합 예시 (GA + Clarity)
```bash
# 1. 환경변수 추가
echo "VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX" >> .env
echo "VITE_CLARITY_PROJECT_ID=your_clarity_id" >> .env

# 2. HTML 스크립트 추가 (index.html)
# GA와 Clarity 스크립트 추가

# 3. Provider 파일들 생성
# 위의 Provider 구현 코드를 파일로 생성

# 4. 초기화 코드 추가
# main.tsx에서 initAnalytics() 호출
```

이렇게 하면 기존 Google Analytics 기능은 유지하면서 추가 도구들을 쉽게 통합할 수 있습니다! 🎯
