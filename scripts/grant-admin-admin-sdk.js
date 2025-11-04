// Firebase Admin SDK를 사용하여 ssossoking@naver.com에게 관리자 권한 부여
// Node.js 환경에서 실행 (Firebase Admin SDK 필요)
//
// 설치: npm install firebase-admin
// 실행: node scripts/grant-admin-admin-sdk.js

const admin = require('firebase-admin');

// Firebase Admin SDK 초기화
// 서비스 계정 키 파일이 필요합니다
// Firebase Console > 프로젝트 설정 > 서비스 계정 > 새 개인 키 생성
const serviceAccount = require('./serviceAccountKey.json'); // 서비스 계정 키 파일 경로

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // 데이터베이스 URL이 필요한 경우
  // databaseURL: 'https://your-project-id.firebaseio.com'
});

const db = admin.firestore();

async function grantAdminPermission(email) {
  try {
    console.log(`${email} 사용자에게 관리자 권한을 부여합니다...`);

    // 이메일로 사용자 찾기
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email).get();

    if (querySnapshot.empty) {
      console.error('해당 이메일의 사용자를 찾을 수 없습니다.');

      // 모든 사용자 목록 조회
      console.log('등록된 사용자들을 확인해보세요:');
      const allUsersSnapshot = await usersRef.get();
      allUsersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ${data.email} (${data.displayName}) - 역할: ${data.role}`);
      });

      return false;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    console.log('찾은 사용자:', userData);

    // 관리자 권한 부여
    await userDoc.ref.update({
      role: 'admin'
    });

    console.log(`${email} 사용자에게 관리자 권한이 성공적으로 부여되었습니다!`);
    console.log('변경된 사용자 정보:', {
      uid: userDoc.id,
      email: userData.email,
      displayName: userData.displayName,
      role: 'admin'
    });

    return true;
  } catch (error) {
    console.error('관리자 권한 부여 실패:', error);
    return false;
  }
}

// 스크립트 실행
const targetEmail = process.argv[2] || 'ssossoking@naver.com';
grantAdminPermission(targetEmail).then((success) => {
  if (success) {
    console.log('✅ 작업이 성공적으로 완료되었습니다.');
  } else {
    console.log('❌ 작업이 실패했습니다.');
  }
  process.exit(success ? 0 : 1);
}).catch((error) => {
  console.error('스크립트 실행 중 오류 발생:', error);
  process.exit(1);
});
