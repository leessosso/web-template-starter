# GitHub Secrets 설정 가이드

GitHub Actions에서 환경 변수를 사용하려면 GitHub Secrets에 설정해야 합니다.

## 설정 방법

1. **GitHub 리포지토리로 이동**
   - https://github.com/leessosso/web-template-starter

2. **Settings 메뉴 클릭**

3. **Secrets and variables → Actions 클릭**

4. **New repository secret 버튼 클릭**

5. **다음 Secrets를 각각 추가:**

   | Secret 이름 | 설명 | 예시 값 |
   |------------|------|---------|
   | `VITE_FIREBASE_API_KEY` | Firebase API Key | `AIza...` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `your-project.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `your-project-id` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `your-project.appspot.com` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | `123456789` |
   | `VITE_FIREBASE_APP_ID` | Firebase App ID | `1:123456789:web:abc123` |

## .env 파일에서 값 복사하기

로컬 `.env` 파일에 있는 값들을 그대로 복사해서 GitHub Secrets에 추가하면 됩니다.

```bash
# 로컬 .env 파일 예시
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 주의사항

- Secret 이름은 정확히 일치해야 합니다 (대소문자 구분)
- Secret 값에는 따옴표나 공백이 포함되지 않도록 주의하세요
- Secret을 추가한 후에는 값을 다시 볼 수 없으므로, 로컬 `.env` 파일을 백업해두세요

## 확인 방법

Secrets를 설정한 후, GitHub Actions에서 배포를 실행하면 환경 변수가 자동으로 주입됩니다.
배포가 성공하면 Firebase가 정상적으로 작동하는지 확인하세요.
