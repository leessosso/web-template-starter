import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import type { User } from '../models/User';

export class UserService {
  async getTeachersByChurch(churchId: string): Promise<User[]> {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const q = query(
        collection(db, 'users'),
        where('churchId', '==', churchId),
        where('role', '==', 'teacher')
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          ...data,
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date(data.createdAt),
        } as User;
      });
    } catch (error) {
      console.error('선생님 목록 가져오기 실패:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
