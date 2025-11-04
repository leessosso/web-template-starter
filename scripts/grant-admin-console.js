// 브라우저 콘솔에서 실행하여 ssossoking@naver.com에게 관리자 권한 부여
// 개발자 도구 콘솔에서 아래 코드를 복사해서 실행하세요

(async () => {
  try {
    console.log('ssossoking@naver.com 사용자에게 관리자 권한을 부여합니다...');

    // Firebase가 초기화되어 있는지 확인
    if (!window.firebase || !window.firebase.db) {
      console.error('Firebase가 초기화되지 않았습니다. 페이지를 새로고침한 후 다시 시도하세요.');
      return;
    }

    const db = window.firebase.db;
    const { collection, query, where, getDocs, doc, updateDoc } = window.firebase.firestore;

    // 이메일로 사용자 찾기
    const q = query(collection(db, 'users'), where('email', '==', 'ssossoking@naver.com'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('ssossoking@naver.com 사용자를 찾을 수 없습니다.');
      console.log('사용 가능한 사용자들을 확인해보세요...');

      // 모든 사용자 목록 조회
      const allUsersQuery = collection(db, 'users');
      const allUsersSnapshot = await getDocs(allUsersQuery);
      console.log('등록된 사용자들:');
      allUsersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ${data.email} (${data.displayName}) - 역할: ${data.role}`);
      });

      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    console.log('찾은 사용자:', userData);

    // 관리자 권한 부여
    const userRef = doc(db, 'users', userDoc.id);
    await updateDoc(userRef, {
      role: 'admin'
    });

    console.log('✅ ssossoking@naver.com 사용자에게 관리자 권한이 성공적으로 부여되었습니다!');
    console.log('변경된 사용자 정보:', {
      uid: userDoc.id,
      email: userData.email,
      displayName: userData.displayName,
      role: 'admin'
    });

    console.log('🔄 페이지를 새로고침하여 변경사항을 확인하세요.');

  } catch (error) {
    console.error('❌ 관리자 권한 부한 부여 실패:', error);
    console.error('오류 상세:', error.message);
  }
})();
