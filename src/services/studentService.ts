import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import type { Student, StudentFormData } from '../models/Student';

// Firestore 문서 타입 정의 (주석 처리 - 현재 사용하지 않음)
// interface StudentDocument {
//   name: string;
//   photoURL?: string;
//   club: string; // Club enum 값
//   grade: number;
//   gender: 'male' | 'female';
//   birthDate?: Timestamp;
//   createdAt: Timestamp;
//   createdBy: string;
//   churchId: string;
//   assignedTeacherId?: string;
//   tempAssignedTeacherId?: string;
//   tempAssignedUntil?: Timestamp;

//   // 추가 정보
//   parentName?: string;
//   parentPhone?: string;
//   address?: string;
// }

export class StudentService {
  async createStudent(
    studentData: StudentFormData,
    createdBy: string,
    churchId: string
  ): Promise<Student> {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase가 설정되지 않았습니다. Firebase 프로젝트를 설정해주세요.');
    }

    try {
      // Firestore에 저장할 데이터 생성 (undefined 값들은 제외)
      const docData: any = {
        name: studentData.name,
        club: studentData.club,
        grade: studentData.grade,
        gender: studentData.gender,
        createdAt: Timestamp.now(),
        createdBy,
        churchId,
      };

      // 선택적 필드들 추가 (undefined가 아닌 경우만)
      if (studentData.photoURL) {
        docData.photoURL = studentData.photoURL;
      }
      if (studentData.assignedTeacherId) {
        docData.assignedTeacherId = studentData.assignedTeacherId;
      }
      if (studentData.tempAssignedTeacherId) {
        docData.tempAssignedTeacherId = studentData.tempAssignedTeacherId;
      }
      if (studentData.birthDate) {
        docData.birthDate = Timestamp.fromDate(studentData.birthDate);
      }
      if (studentData.tempAssignedUntil) {
        docData.tempAssignedUntil = Timestamp.fromDate(studentData.tempAssignedUntil);
      }
      if (studentData.parentName) {
        docData.parentName = studentData.parentName;
      }
      if (studentData.parentPhone) {
        docData.parentPhone = studentData.parentPhone;
      }
      if (studentData.address) {
        docData.address = studentData.address;
      }

      const docRef = await addDoc(collection(db, 'students'), docData);

      const student: Student = {
        id: docRef.id,
        name: studentData.name,
        photoURL: studentData.photoURL,
        club: studentData.club,
        grade: studentData.grade,
        gender: studentData.gender,
        birthDate: studentData.birthDate,
        createdAt: new Date(),
        createdBy,
        churchId,
        assignedTeacherId: studentData.assignedTeacherId,
        tempAssignedTeacherId: studentData.tempAssignedTeacherId,
        tempAssignedUntil: studentData.tempAssignedUntil,
        parentName: studentData.parentName,
        parentPhone: studentData.parentPhone,
        address: studentData.address,
      };

      return student;
    } catch (error) {
      console.error('학생 등록 실패:', error);
      throw error;
    }
  }

  async updateStudent(
    studentId: string,
    studentData: Partial<StudentFormData>
  ): Promise<void> {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase가 설정되지 않았습니다. Firebase 프로젝트를 설정해주세요.');
    }

    try {
      // Firestore에 저장할 데이터 생성 (undefined 값들은 제외)
      const updateData: any = {};

      // 필드별로 undefined가 아닌 경우만 추가
      if (studentData.name !== undefined) {
        updateData.name = studentData.name;
      }
      if (studentData.club !== undefined) {
        updateData.club = studentData.club;
      }
      if (studentData.grade !== undefined) {
        updateData.grade = studentData.grade;
      }
      if (studentData.gender !== undefined) {
        updateData.gender = studentData.gender;
      }
      if (studentData.photoURL !== undefined) {
        updateData.photoURL = studentData.photoURL;
      }
      if (studentData.assignedTeacherId !== undefined) {
        updateData.assignedTeacherId = studentData.assignedTeacherId;
      }
      if (studentData.tempAssignedTeacherId !== undefined) {
        updateData.tempAssignedTeacherId = studentData.tempAssignedTeacherId;
      }
      if (studentData.birthDate !== undefined) {
        updateData.birthDate = studentData.birthDate ? Timestamp.fromDate(studentData.birthDate) : null;
      }
      if (studentData.tempAssignedUntil !== undefined) {
        updateData.tempAssignedUntil = studentData.tempAssignedUntil ? Timestamp.fromDate(studentData.tempAssignedUntil) : null;
      }
      if (studentData.parentName !== undefined) {
        updateData.parentName = studentData.parentName;
      }
      if (studentData.parentPhone !== undefined) {
        updateData.parentPhone = studentData.parentPhone;
      }
      if (studentData.address !== undefined) {
        updateData.address = studentData.address;
      }

      await updateDoc(doc(db, 'students', studentId), updateData);
    } catch (error) {
      console.error('학생 정보 수정 실패:', error);
      throw error;
    }
  }

  async deleteStudent(studentId: string): Promise<void> {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase가 설정되지 않았습니다. Firebase 프로젝트를 설정해주세요.');
    }

    try {
      await deleteDoc(doc(db, 'students', studentId));
    } catch (error) {
      console.error('학생 삭제 실패:', error);
      throw error;
    }
  }

  async getStudent(studentId: string): Promise<Student | null> {
    if (!isFirebaseConfigured() || !db) {
      return null;
    }

    try {
      const docSnap = await getDoc(doc(db, 'students', studentId));
      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        photoURL: data.photoURL || undefined,
        club: data.club,
        grade: data.grade,
        gender: data.gender,
        birthDate: data.birthDate
          ? data.birthDate instanceof Timestamp
            ? data.birthDate.toDate()
            : new Date(data.birthDate)
          : undefined,
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(data.createdAt),
        createdBy: data.createdBy,
        churchId: data.churchId,
        assignedTeacherId: data.assignedTeacherId || undefined,
        tempAssignedTeacherId: data.tempAssignedTeacherId || undefined,
        tempAssignedUntil: data.tempAssignedUntil
          ? data.tempAssignedUntil instanceof Timestamp
            ? data.tempAssignedUntil.toDate()
            : new Date(data.tempAssignedUntil)
          : undefined,
        parentName: data.parentName || undefined,
        parentPhone: data.parentPhone || undefined,
        address: data.address || undefined,
      } as Student;
    } catch (error) {
      console.error('학생 정보 가져오기 실패:', error);
      throw error;
    }
  }

  async getStudentsByChurch(churchId: string, teacherId?: string): Promise<Student[]> {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      // 담당 선생님이 지정된 경우
      if (teacherId) {
        // 원래 담당 선생님의 학생들 조회
        const assignedQuery = query(
          collection(db, 'students'),
          where('churchId', '==', churchId),
          where('assignedTeacherId', '==', teacherId)
        );

        // 임시 담당 선생님의 학생들 조회 (임시 담당 종료일이 아직 지나지 않은 경우만)
        const tempAssignedQuery = query(
          collection(db, 'students'),
          where('churchId', '==', churchId),
          where('tempAssignedTeacherId', '==', teacherId)
        );

        const [assignedSnapshot, tempAssignedSnapshot] = await Promise.all([
          getDocs(assignedQuery),
          getDocs(tempAssignedQuery),
        ]);

        // 두 결과를 합치고 중복 제거
        const studentMap = new Map<string, Student>();

        assignedSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          studentMap.set(doc.id, {
            id: doc.id,
            name: data.name,
            photoURL: data.photoURL || undefined,
            club: data.club,
            grade: data.grade,
            gender: data.gender,
            birthDate: data.birthDate
              ? data.birthDate instanceof Timestamp
                ? data.birthDate.toDate()
                : new Date(data.birthDate)
              : undefined,
            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt),
            createdBy: data.createdBy,
            churchId: data.churchId,
            assignedTeacherId: data.assignedTeacherId || undefined,
            tempAssignedTeacherId: data.tempAssignedTeacherId || undefined,
            tempAssignedUntil: data.tempAssignedUntil
              ? data.tempAssignedUntil instanceof Timestamp
                ? data.tempAssignedUntil.toDate()
                : new Date(data.tempAssignedUntil)
              : undefined,
            parentName: data.parentName || undefined,
            parentPhone: data.parentPhone || undefined,
            address: data.address || undefined,
          });
        });

        const now = new Date();
        tempAssignedSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const tempUntil = data.tempAssignedUntil
            ? data.tempAssignedUntil instanceof Timestamp
              ? data.tempAssignedUntil.toDate()
              : new Date(data.tempAssignedUntil)
            : undefined;

          // 임시 담당 종료일이 없거나 아직 지나지 않은 경우만 포함
          if (!tempUntil || tempUntil >= now) {
            studentMap.set(doc.id, {
              id: doc.id,
              name: data.name,
              photoURL: data.photoURL || undefined,
              club: data.club,
              grade: data.grade,
              gender: data.gender,
              birthDate: data.birthDate
                ? data.birthDate instanceof Timestamp
                  ? data.birthDate.toDate()
                  : new Date(data.birthDate)
                : undefined,
              createdAt: data.createdAt instanceof Timestamp
                ? data.createdAt.toDate()
                : new Date(data.createdAt),
              createdBy: data.createdBy,
              churchId: data.churchId,
              assignedTeacherId: data.assignedTeacherId || undefined,
              tempAssignedTeacherId: data.tempAssignedTeacherId || undefined,
              tempAssignedUntil: tempUntil,
              parentName: data.parentName || undefined,
              parentPhone: data.parentPhone || undefined,
              address: data.address || undefined,
            });
          }
        });

        return Array.from(studentMap.values()) as Student[];
      } else {
        // 담당 선생님이 없으면 모든 학생 조회 (관리자)
        const q = query(
          collection(db, 'students'),
          where('churchId', '==', churchId)
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            photoURL: data.photoURL || undefined,
            club: data.club,
            grade: data.grade,
            gender: data.gender,
            birthDate: data.birthDate
              ? data.birthDate instanceof Timestamp
                ? data.birthDate.toDate()
                : new Date(data.birthDate)
              : undefined,
            createdAt: data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt),
            createdBy: data.createdBy,
            churchId: data.churchId,
            assignedTeacherId: data.assignedTeacherId || undefined,
            tempAssignedTeacherId: data.tempAssignedTeacherId || undefined,
            tempAssignedUntil: data.tempAssignedUntil
              ? data.tempAssignedUntil instanceof Timestamp
                ? data.tempAssignedUntil.toDate()
                : new Date(data.tempAssignedUntil)
              : undefined,
            parentName: data.parentName || undefined,
            parentPhone: data.parentPhone || undefined,
            address: data.address || undefined,
          } as Student;
        });
      }
    } catch (error) {
      console.error('학생 목록 가져오기 실패:', error);
      throw error;
    }
  }

  async getStudentsByClub(churchId: string, club: string): Promise<Student[]> {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const q = query(
        collection(db, 'students'),
        where('churchId', '==', churchId),
        where('club', '==', club)
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          photoURL: data.photoURL || undefined,
          club: data.club,
          grade: data.grade,
          gender: data.gender,
          birthDate: data.birthDate
            ? data.birthDate instanceof Timestamp
              ? data.birthDate.toDate()
              : new Date(data.birthDate)
            : undefined,
          createdAt: data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt),
          createdBy: data.createdBy,
          churchId: data.churchId,
          assignedTeacherId: data.assignedTeacherId || undefined,
          tempAssignedTeacherId: data.tempAssignedTeacherId || undefined,
          tempAssignedUntil: data.tempAssignedUntil
            ? data.tempAssignedUntil instanceof Timestamp
              ? data.tempAssignedUntil.toDate()
              : new Date(data.tempAssignedUntil)
            : undefined,
          parentName: data.parentName || undefined,
          parentPhone: data.parentPhone || undefined,
          address: data.address || undefined,
        } as Student;
      });
    } catch (error) {
      console.error('클럽별 학생 목록 가져오기 실패:', error);
      throw error;
    }
  }
}

export const studentService = new StudentService();
