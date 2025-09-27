# 초보자용 분석 도구 설정 가이드

개인사업자나 중소기업을 위한 간단한 분석 시스템을 구축해보세요!

## 🎯 초보자용 추천 조합

**Google Analytics 4 + Microsoft Clarity**
- ✅ 완전 무료
- ✅ 설치가 매우 쉬움
- ✅ 사용자 행동을 직접 볼 수 있음

## 📋 설정 단계

### 1단계: 계정 생성

#### Google Analytics 4 계정 만들기
1. [Google Analytics](https://analytics.google.com/) 접속
2. 새 GA4 속성 생성
3. 측정 ID 확인 (예: `G-XXXXXXXXXX`)

#### Microsoft Clarity 계정 만들기
1. [Microsoft Clarity](https://clarity.microsoft.com/) 접속
2. 프로젝트 생성
3. 프로젝트 ID 확인

### 2단계: 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Google Analytics 측정 ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Microsoft Clarity 프로젝트 ID
VITE_CLARITY_PROJECT_ID=your_clarity_project_id
```

### 3단계: HTML 파일 업데이트

`index.html` 파일에서 다음 부분을 실제 ID로 교체하세요:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Microsoft Clarity -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "your_clarity_project_id");
</script>
```

### 4단계: 개발 서버 재시작

```bash
npm run dev
```

## 🚀 사용 방법

### Google Analytics에서 보는 것들
- 방문자 수, 페이지뷰
- 트래픽 출처 (어디서 왔는지)
- 인기 페이지
- 사용자 행동 패턴

### Microsoft Clarity에서 보는 것들
- **세션 녹화**: 실제 사용자가 어떻게 웹사이트를 사용하는지 동영상으로 확인
- **히트맵**: 어디를 많이 클릭하는지 색깔로 표시
- **사용자 클릭 추적**: 버튼 클릭, 링크 클릭 등

## 💡 초보자를 위한 팁

### 1. 먼저 Clarity부터 확인하세요
- 동영상으로 사용자 행동을 직접 볼 수 있어 직관적입니다
- "왜 사용자가 이탈할까?" 같은 질문에 답이 됩니다

### 2. Google Analytics로 숫자 확인
- "얼마나 많은 사람이 방문했나?" 같은 질문에 답이 됩니다
- 시간에 따른 추이를 볼 수 있습니다

### 3. 함께 사용하기
- Clarity: "사용자가 어떻게 행동하는가?"
- GA: "얼마나 많이, 어디에서 오는가?"

## 📱 모바일에서도 확인

두 도구 모두 모바일에서도 확인 가능합니다:
- Google Analytics: 앱 다운로드
- Microsoft Clarity: 웹에서 확인

## ❓ 문제가 생겼을 때

### 설정이 안 된다면
1. ID가 정확한지 확인
2. .env 파일이 프로젝트 루트에 있는지 확인
3. npm run dev로 서버 재시작

### 데이터가 안 보인다면
1. 실제 방문자가 있어야 데이터가 쌓임
2. 24-48시간 기다려보세요
3. 개발 모드에서는 테스트 데이터만 보일 수 있음

## 🎉 다음 단계 (선택사항)

웹사이트가 성장하면 다음 도구들을 고려해보세요:

- **Hotjar** ($39/월): 설문조사 기능 추가
- **Mixpanel** ($99/월): 더 자세한 사용자 분석

하지만 지금의 Google Analytics + Clarity 조합으로도 충분합니다!

## 📞 도움말

설정 중 어려움이 있으면 다음 파일들을 참고하세요:
- `GOOGLE_ANALYTICS_SETUP.md` - Google Analytics 자세한 설정
- `ANALYTICS_TOOLS_COMPARISON.md` - 다른 도구 비교
- `analytics-integrations.md` - 고급 통합 방법

---

**🎯 초보자용 분석 시스템 구축 완료!**

이제 웹사이트 방문자가 어떻게 행동하는지 실시간으로 확인할 수 있습니다! 📊✨
