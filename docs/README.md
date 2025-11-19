# 문서 가이드

이 폴더에는 프로젝트의 상세한 개발 가이드와 문서들이 있습니다.

## 📚 문서 목록

### 개발 가이드

#### 필수 읽기
- **[개발 가이드](./DEVELOPMENT_GUIDE.md)** - 브랜치 전략, 커밋 규칙, 코딩 규칙, 파일 구조 등 전체 개발 워크플로우
- **[테스트 가이드](./TESTING_GUIDE.md)** - Vitest, React Testing Library, TDD 원칙 및 실전 가이드

#### 참고 문서
- **[TDD 실전 예시](./TDD_EXAMPLE.md)** - TDD를 단계별로 적용하는 실전 예시
- **[Zustand 가이드](./ZUSTAND_GUIDE.md)** - Zustand 상태 관리 상세 가이드
- **[프로젝트 분석](./PROJECT_ANALYSIS.md)** - 프로젝트 구조 및 설정 분석 보고서

### 분석 도구 가이드

- **[초보자용 분석 도구 설정](./ANALYTICS_SETUP_BEGINNER.md)** - Google Analytics + Microsoft Clarity 초보자 가이드
- **[Google Analytics 설정](./GOOGLE_ANALYTICS_SETUP.md)** - Google Analytics 4 상세 설정 가이드
- **[분석 도구 통합](./analytics-integrations.md)** - 분석 도구 통합 가이드
- **[분석 도구 비교](./ANALYTICS_TOOLS_COMPARISON.md)** - 다양한 분석 도구 비교
- **[분석 도구 추천](./ANALYTICS_RECOMMENDATION.md)** - 프로젝트별 분석 도구 추천

## 🚀 빠른 시작

새로운 브랜치에서 개발을 시작할 때:

1. **[개발 가이드](./DEVELOPMENT_GUIDE.md)** 읽기
2. 브랜치 생성 및 개발 시작
3. 필요시 **[테스트 가이드](./TESTING_GUIDE.md)** 참고

## 💡 Cursor IDE 사용자

`.cursor/rules/` 폴더에 있는 `.mdc` 파일들이 자동으로 적용됩니다. 
상세한 내용은 이 폴더의 문서들을 참고하세요.

## 📖 문서 구조

```
docs/
  ├── DEVELOPMENT_GUIDE.md      # 개발 워크플로우 (필수)
  ├── TESTING_GUIDE.md           # 테스트 가이드 (필수)
  ├── TDD_EXAMPLE.md             # TDD 실전 예시
  ├── ZUSTAND_GUIDE.md           # Zustand 가이드
  ├── PROJECT_ANALYSIS.md        # 프로젝트 분석
  └── ANALYTICS_*.md             # 분석 도구 가이드들
```

