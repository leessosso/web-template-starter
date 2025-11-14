"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualCleanupExpiredTempAssignments = exports.cleanupExpiredTempAssignments = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Firebase Admin SDK 초기화
admin.initializeApp();
// Firestore 인스턴스
const db = admin.firestore();
/**
 * 매일 오전 2시에 실행되는 임시 배정 만료 데이터 정리 함수
 * 한국 시간(KST) 기준으로 매일 새벽 2시에 실행됨
 */
exports.cleanupExpiredTempAssignments = functions
    .region('asia-northeast3') // 서울 리전
    .pubsub
    .schedule('0 17 * * *') // UTC 기준 17:00 = KST 02:00 (매일 새벽 2시)
    .timeZone('Asia/Seoul')
    .onRun(async (context) => {
    const now = new Date();
    console.log(`임시 배정 만료 데이터 정리 시작: ${now.toISOString()}`);
    try {
        let totalProcessed = 0;
        let totalCleaned = 0;
        // 모든 교회에 대해 반복
        const churchesSnapshot = await db.collection('churches').get();
        for (const churchDoc of churchesSnapshot.docs) {
            const churchId = churchDoc.id;
            console.log(`교회 ${churchId} 처리 중...`);
            // 해당 교회의 모든 학생 조회
            const studentsQuery = db.collection('students').where('churchId', '==', churchId);
            const studentsSnapshot = await studentsQuery.get();
            const batch = db.batch();
            let batchSize = 0;
            for (const studentDoc of studentsSnapshot.docs) {
                const studentData = studentDoc.data();
                totalProcessed++;
                // 임시 배정 정보 확인
                const tempAssignedTeacherId = studentData.tempAssignedTeacherId;
                const tempAssignedUntil = studentData.tempAssignedUntil;
                // 임시 배정이 있고 기간이 만료되었는지 확인
                if (tempAssignedTeacherId && tempAssignedUntil) {
                    const tempUntilDate = tempAssignedUntil.toDate ? tempAssignedUntil.toDate() : new Date(tempAssignedUntil);
                    if (tempUntilDate < now) {
                        // 기간 만료됨 - 임시 배정 정보 삭제
                        const studentRef = db.collection('students').doc(studentDoc.id);
                        batch.update(studentRef, {
                            tempAssignedTeacherId: admin.firestore.FieldValue.delete(),
                            tempAssignedUntil: admin.firestore.FieldValue.delete(),
                        });
                        batchSize++;
                        console.log(`학생 ${studentData.name} (${studentDoc.id})의 만료된 임시 배정 정리`);
                        // 배치가 500개에 도달하면 커밋
                        if (batchSize >= 500) {
                            await batch.commit();
                            totalCleaned += batchSize;
                            batchSize = 0;
                            // 새로운 배치 시작
                        }
                    }
                }
            }
            // 남은 배치 커밋
            if (batchSize > 0) {
                await batch.commit();
                totalCleaned += batchSize;
            }
            console.log(`교회 ${churchId}: ${studentsSnapshot.size}명의 학생 중 ${batchSize}명의 만료 데이터 정리 완료`);
        }
        console.log(`임시 배정 만료 데이터 정리 완료: 총 ${totalProcessed}명 처리, ${totalCleaned}명 정리`);
        return {
            success: true,
            totalProcessed,
            totalCleaned,
            executedAt: now.toISOString()
        };
    }
    catch (error) {
        console.error('임시 배정 만료 데이터 정리 중 오류 발생:', error);
        throw new functions.https.HttpsError('internal', '임시 배정 데이터 정리 실패', error);
    }
});
/**
 * 수동으로 임시 배정 만료 데이터 정리를 실행하는 HTTP 함수
 * 테스트용으로 사용할 수 있음
 */
exports.manualCleanupExpiredTempAssignments = functions
    .region('asia-northeast3')
    .https.onCall(async (data, context) => {
    // 관리자 권한 확인 (필요시)
    // if (!context.auth?.token.admin) {
    //   throw new functions.https.HttpsError('permission-denied', '관리자 권한이 필요합니다.')
    // }
    const result = await (0, exports.cleanupExpiredTempAssignments)(null);
    return result;
});
//# sourceMappingURL=index.js.map