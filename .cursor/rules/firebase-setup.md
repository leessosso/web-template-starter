# Firebase 설정 가이드

AWANA LMS 웹 애플리케이션을 위한 Firebase 설정 단계별 가이드입니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. **프로젝트 추가** 클릭
3. 프로젝트 이름 입력 (예: `awana-lms`)
4. Google Analytics 설정 (선택 사항)
5. 프로젝트 생성 완료

## 2. 웹 앱 등록

1. Firebase 프로젝트 대시보드에서 **웹 아이콘 (</>)** 클릭
2. 앱 닉네임 입력 (예: `awana-lms-web`)
3. **Firebase Hosting 설정**은 선택하지 않아도 됩니다
4. **앱 등록** 클릭

## 3. 환경 변수 설정

웹 앱을 등록하면 Firebase 설정 정보가 표시됩니다. 이 정보를 `.env` 파일에 추가하세요:

```bash
# 프로젝트 루트에 .env 파일 생성
```

`.env` 파일 내용:

```
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=awana-lms.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=awana-lms
VITE_FIREBASE_STORAGE_BUCKET=awana-lms.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**주의**: 실제 값은 Firebase Console에서 확인한 값을 사용하세요.

## 4. Authentication 설정

### 4.1 인증 방법 활성화

1. Firebase Console에서 **Authentication** 메뉴 선택
2. **Sign-in method** 탭 클릭
3. **이메일/비밀번호** 클릭
4. **사용 설정** 토글 활성화
5. **저장** 클릭

### 4.2 이메일 템플릿 설정 (선택 사항)

- 이메일 주소 확인 템플릿
- 비밀번호 재설정 템플릿

한국어로 수정 가능합니다.

## 5. Firestore 데이터베이스 생성

### 5.1 데이터베이스 생성

1. Firebase Console에서 **Firestore Database** 메뉴 선택
2. **데이터베이스 만들기** 클릭
3. **프로덕션 모드에서 시작** 선택
4. 위치 선택 (예: `asia-northeast3` - 서울 리전)
5. **사용** 클릭

### 5.2 보안 규칙 설정

**Firestore Database > Rules** 탭에서 다음 규칙을 붙여넣고 **게시**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function isSameChurch(churchId) {
      let userData = getUserData();
      return userData.churchId == churchId;
    }

    function isAdmin() {
      let userData = getUserData();
      return userData.role == 'admin';
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && (isOwner(userId) || isSameChurch(resource.data.churchId));
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId);
      allow delete: if isAuthenticated() && isOwner(userId);
    }

    // Churches collection
    match /churches/{churchId} {
      allow read: if isAuthenticated() && isSameChurch(churchId);
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (isSameChurch(churchId) && isAdmin());
      allow delete: if false; // 교회 삭제는 허용하지 않음
    }

    // Students collection
    match /students/{studentId} {
      allow read: if isAuthenticated() && isSameChurch(resource.data.churchId);
      allow create: if isAuthenticated() && isSameChurch(request.resource.data.churchId);
      allow update: if isAuthenticated() && isSameChurch(resource.data.churchId);
      allow delete: if isAuthenticated() && isSameChurch(resource.data.churchId);
    }

    // Attendance collection
    match /attendance/{attendanceId} {
      allow read: if isAuthenticated() && isSameChurch(resource.data.churchId);
      allow create: if isAuthenticated() && isSameChurch(request.resource.data.churchId);
      allow update: if isAuthenticated() && isSameChurch(resource.data.churchId);
      allow delete: if isAuthenticated() && isSameChurch(resource.data.churchId);
    }

    // HandbookProgress collection
    match /handbookProgress/{progressId} {
      allow read: if isAuthenticated() && isSameChurch(resource.data.churchId);
      allow create: if isAuthenticated() && isSameChurch(request.resource.data.churchId);
      allow update: if isAuthenticated() && isSameChurch(resource.data.churchId);
      allow delete: if isAuthenticated() && isSameChurch(resource.data.churchId);
    }

    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 6. 컬렉션 구조

애플리케이션에서 자동으로 생성되지만, 참고용으로 구조를 설명합니다:

### users
```javascript
{
  uid: "string",              // Firebase Auth UID
  email: "string",
  displayName: "string",
  role: "admin" | "leader",
  churchName: "string",
  churchId: "string",         // churches 컬렉션 참조
  createdAt: Timestamp
}
```

### churches
```javascript
{
  name: "string",
  address: "string",
  createdAt: Timestamp,
  createdBy: "string"         // users UID
}
```

### students
```javascript
{
  name: "string",
  photoURL: "string?",
  club: "Cubbies" | "Sparks" | "T&T" | "Journey" | "Trek",
  grade: "string?",
  birthDate: Timestamp?,
  createdAt: Timestamp,
  createdBy: "string",
  churchId: "string",
  assignedTeacherId: "string?",
  tempAssignedTeacherId: "string?",
  tempAssignedUntil: Timestamp?
}
```

### attendance
```javascript
{
  studentId: "string",
  date: Timestamp,
  status: "present" | "absent",
  notes: "string?",
  checkedBy: "string",
  churchId: "string"
}
```

### handbookProgress
```javascript
{
  studentId: "string",
  handbookId: "string",
  club: "string",
  unitNumber: number,
  unitTitle: "string",
  completedDate: Timestamp,
  completedBy: "string",
  notes: "string?",
  churchId: "string"
}
```

### bibleVerses
```javascript
{
  studentId: "string",
  verseReference: "string",
  verseText: "string",
  club: "string",
  completedDate: Timestamp,
  completedBy: "string",
  churchId: "string"
}
```

## 7. Admin 계정 생성

### 방법 1: 회원가입 후 수동 변경 (권장)

1. 웹 애플리케이션에서 일반 계정으로 회원가입
2. Firebase Console > Authentication에서 사용자 확인
3. Firestore Database > Data 탭에서 `users` 컬렉션 열기
4. 해당 사용자 문서 찾기
5. `role` 필드를 `"leader"`에서 `"admin"`으로 변경
6. **업데이트** 클릭

### 방법 2: Firebase Console에서 직접 생성

1. Firebase Console > Authentication > 사용자 추가
2. 이메일/비밀번호로 사용자 생성
3. Firestore Database > Data > `users` 컬렉션에서 새 문서 추가:
   ```javascript
   {
     uid: "생성된_UID",
     email: "admin@example.com",
     displayName: "관리자",
     role: "admin",
     churchName: "교회 이름",
     churchId: "",              // 나중에 churches 생성 후 업데이트
     createdAt: 현재_타임스탬프
   }
   ```
4. `churches` 컬렉션에서 교회 생성 (또는 웹에서 회원가입 시 자동 생성)
5. `users` 문서의 `churchId` 업데이트

### 방법 3: 웹 애플리케이션 코드 수정 (개발용)

회원가입 시 임시로 admin으로 설정하려면 `authService.ts`에서:

```typescript
// signUp 메서드의 role 기본값 변경
role: UserRole = UserRole.ADMIN  // 임시로 변경
```

**주의**: 개발 완료 후 다시 `UserRole.LEADER`로 변경하세요.

## 8. 테스트

### 8.1 연결 테스트

1. `.env` 파일 설정 확인
2. 개발 서버 실행: `npm run dev`
3. 브라우저 콘솔에서 Firebase 초기화 에러 확인
4. 회원가입 테스트

### 8.2 보안 규칙 테스트

1. 두 개의 다른 계정으로 로그인
2. 서로 다른 교회 데이터에 접근할 수 없는지 확인
3. 같은 교회 내에서 데이터 공유가 잘 되는지 확인

## 9. 추가 설정 (선택 사항)

### 9.1 Firebase Storage (사진 업로드용)

학생 사진 업로드가 필요한 경우:

1. Firebase Console > Storage
2. **시작하기** 클릭
3. 보안 규칙 설정
4. 앱에서 Storage 사용

### 9.2 Firebase Hosting (배포용)

1. Firebase Console > Hosting
2. **시작하기** 클릭
3. 빌드 설정 안내 따르기

## 체크리스트

- [ ] Firebase 프로젝트 생성
- [ ] 웹 앱 등록
- [ ] 환경 변수 설정 (.env 파일)
- [ ] Authentication 활성화 (이메일/비밀번호)
- [ ] Firestore 데이터베이스 생성
- [ ] 보안 규칙 설정 및 게시
- [ ] Admin 계정 생성
- [ ] 연결 테스트
- [ ] 보안 규칙 테스트

## 문제 해결

### Firebase 초기화 에러

```
Error: Firebase 설정이 필요합니다...
```

→ `.env` 파일이 프로젝트 루트에 있는지 확인
→ 환경 변수 이름이 정확한지 확인 (`VITE_` 접두사 필수)
→ 개발 서버 재시작 (`npm run dev`)

### 인증 에러

```
Error: Firebase가 설정되지 않았습니다...
```

→ Authentication에서 이메일/비밀번호 방법 활성화 확인
→ Firestore 보안 규칙 확인

### 권한 에러

```
Error: Missing or insufficient permissions
```

→ Firestore 보안 규칙 확인
→ 사용자의 `churchId`가 올바르게 설정되었는지 확인
