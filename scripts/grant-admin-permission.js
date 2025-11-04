// ssossoking@naver.com 사용자에게 관리자 권한을 부여하는 스크립트
// 브라우저 콘솔에서 실행하거나 Node.js 환경에서 실행 가능

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

// Firebase 설정 (환경 변수에서 가져옴)
const firebaseConfig = {
    apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "your_api_key_here",
    authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "your_project.firebaseapp.com",
    projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "your_project_id",
    storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "your_project.appspot.com",
    messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env?.VITE_FIREBASE_APP_ID || "your_app_id"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function grantAdminPermission(email) {
    try {
        console.log(`${email} 사용자에게 관리자 권한을 부여합니다...`);

        // 이메일로 사용자 찾기
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error('해당 이메일의 사용자를 찾을 수 없습니다.');
            return false;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        console.log('찾은 사용자:', userData);

        // 관리자 권한 부여
        const userRef = doc(db, 'users', userDoc.id);
        await updateDoc(userRef, {
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

// 브라우저 콘솔에서 사용할 수 있도록 전역 함수로 등록
if (typeof window !== 'undefined') {
    window.grantAdminPermission = grantAdminPermission;
}

// Node.js 환경에서 직접 실행
if (typeof process !== 'undefined' && process.argv) {
    const email = process.argv[2] || 'ssossoking@naver.com';
    grantAdminPermission(email).then(() => {
        console.log('스크립트 실행 완료');
        process.exit(0);
    }).catch((error) => {
        console.error('스크립트 실행 실패:', error);
        process.exit(1);
    });
}

export { grantAdminPermission };
