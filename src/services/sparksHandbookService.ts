import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import {
  SparksHandbook,
  JewelType,
} from '../models/SparksHandbookProgress';
import type {
  JewelSectionProgress,
  JewelSectionProgressFormData,
  StudentHandbookSummary,
} from '../models/SparksHandbookProgress';
import { generateJewelSections, compareSections } from '../constants/sparksHandbooks';

// Firestore 문서 타입 정의
interface JewelSectionProgressDocument {
  studentId: string;
  handbook: string; // SparksHandbook enum 값
  jewelType: string; // JewelType enum 값
  sectionMajor: number;
  sectionMinor: number;
  completedDate: Timestamp;
  completedBy: string;
  churchId: string;
}

export class SparksHandbookService {
  /**
   * 보석 섹션 통과 기록 생성
   */
  async createJewelSectionProgress(
    progressData: JewelSectionProgressFormData,
    completedBy: string,
    churchId: string
  ): Promise<JewelSectionProgress> {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase가 설정되지 않았습니다. Firebase 프로젝트를 설정해주세요.');
    }

    try {
      const docRef = await addDoc(collection(db, 'sparksHandbookProgress'), {
        studentId: progressData.studentId,
        handbook: progressData.handbook,
        jewelType: progressData.jewelType,
        sectionMajor: progressData.section.major,
        sectionMinor: progressData.section.minor,
        completedDate: Timestamp.fromDate(progressData.completedDate),
        completedBy,
        churchId,
      });

      const progress: JewelSectionProgress = {
        id: docRef.id,
        studentId: progressData.studentId,
        handbook: progressData.handbook,
        jewelType: progressData.jewelType,
        section: progressData.section,
        completedDate: progressData.completedDate,
        completedBy,
        churchId,
      };

      return progress;
    } catch (error) {
      console.error('보석 섹션 통과 기록 생성 실패:', error);
      throw error;
    }
  }

  /**
   * 보석 섹션 통과 기록 삭제
   */
  async deleteJewelSectionProgress(progressId: string): Promise<void> {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase가 설정되지 않았습니다. Firebase 프로젝트를 설정해주세요.');
    }

    try {
      await deleteDoc(doc(db, 'sparksHandbookProgress', progressId));
    } catch (error) {
      console.error('보석 섹션 통과 기록 삭제 실패:', error);
      throw error;
    }
  }

  /**
   * 학생의 핸드북 진도 요약 조회
   */
  async getStudentHandbookSummary(
    studentId: string,
    churchId: string
  ): Promise<StudentHandbookSummary> {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase가 설정되지 않았습니다.');
    }

    try {
      // 학생의 모든 진도 기록 조회
      const q = query(
        collection(db, 'sparksHandbookProgress'),
        where('studentId', '==', studentId),
        where('churchId', '==', churchId)
      );

      const querySnapshot = await getDocs(q);
      const progresses: JewelSectionProgress[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as JewelSectionProgressDocument;
        progresses.push({
          id: doc.id,
          studentId: data.studentId,
          handbook: data.handbook as SparksHandbook,
          jewelType: data.jewelType as JewelType,
          section: { major: data.sectionMajor, minor: data.sectionMinor },
          completedDate: data.completedDate instanceof Timestamp
            ? data.completedDate.toDate()
            : new Date(data.completedDate),
          completedBy: data.completedBy,
          churchId: data.churchId,
        });
      });

      // 진도 요약 계산
      return this.calculateHandbookSummary(studentId, progresses);
    } catch (error) {
      console.error('학생 핸드북 진도 요약 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 학생의 상세 진도 목록 조회
   */
  async getStudentProgress(
    studentId: string,
    churchId: string
  ): Promise<JewelSectionProgress[]> {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const q = query(
        collection(db, 'sparksHandbookProgress'),
        where('studentId', '==', studentId),
        where('churchId', '==', churchId)
      );

      const querySnapshot = await getDocs(q);
      const progresses: JewelSectionProgress[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as JewelSectionProgressDocument;
        progresses.push({
          id: doc.id,
          studentId: data.studentId,
          handbook: data.handbook as SparksHandbook,
          jewelType: data.jewelType as JewelType,
          section: { major: data.sectionMajor, minor: data.sectionMinor },
          completedDate: data.completedDate instanceof Timestamp
            ? data.completedDate.toDate()
            : new Date(data.completedDate),
          completedBy: data.completedBy,
          churchId: data.churchId,
        });
      });

      // 섹션 번호로 정렬
      return progresses.sort((a, b) => {
        if (a.handbook !== b.handbook) return a.handbook.localeCompare(b.handbook);
        if (a.jewelType !== b.jewelType) return a.jewelType.localeCompare(b.jewelType);
        return compareSections(a.section, b.section);
      });
    } catch (error) {
      console.error('학생 상세 진도 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 진도 요약 계산 헬퍼 함수
   */
  private calculateHandbookSummary(
    studentId: string,
    progresses: JewelSectionProgress[]
  ): StudentHandbookSummary {
    // 각 핸드북별 완료된 섹션 수 계산
    const handbookStats = new Map<SparksHandbook, Map<JewelType, number>>();

    progresses.forEach((progress) => {
      if (!handbookStats.has(progress.handbook)) {
        handbookStats.set(progress.handbook, new Map());
      }
      const handbookMap = handbookStats.get(progress.handbook)!;
      const current = handbookMap.get(progress.jewelType) || 0;
      handbookMap.set(progress.jewelType, current + 1);
    });

    // 각 핸드북의 진행 상황 계산
    const hangGliderProgress = handbookStats.get(SparksHandbook.HANG_GLIDER) || new Map();
    const wingRunnerProgress = handbookStats.get(SparksHandbook.WING_RUNNER) || new Map();
    const skyStormerProgress = handbookStats.get(SparksHandbook.SKY_STORMER) || new Map();

    // 마지막 완료된 섹션 찾기 (날짜 기준)
    const sortedProgresses = [...progresses].sort(
      (a, b) => b.completedDate.getTime() - a.completedDate.getTime()
    );
    const lastProgress = sortedProgresses[0];

    // 현재 진행 중인 핸드북 결정 (가장 최근에 완료한 섹션이 있는 핸드북)
    const currentHandbook = lastProgress?.handbook || null;
    const currentJewelType = lastProgress?.jewelType || null;
    const lastCompletedSection = lastProgress?.section || null;
    const lastCompletedDate = lastProgress?.completedDate || null;

    return {
      studentId,
      currentHandbook,
      currentPhase: 'jewel', // 현재는 보석 단계만 지원
      currentJewelType,
      lastCompletedSection,
      lastCompletedDate,
      hangGliderProgress: {
        redCompleted: hangGliderProgress.get(JewelType.RED) || 0,
        greenCompleted: hangGliderProgress.get(JewelType.GREEN) || 0,
      },
      wingRunnerProgress: {
        redCompleted: wingRunnerProgress.get(JewelType.RED) || 0,
        greenCompleted: wingRunnerProgress.get(JewelType.GREEN) || 0,
      },
      skyStormerProgress: {
        redCompleted: skyStormerProgress.get(JewelType.RED) || 0,
        greenCompleted: skyStormerProgress.get(JewelType.GREEN) || 0,
      },
    };
  }

  /**
   * 특정 핸드북의 모든 섹션에 대한 완료 상태 조회
   */
  async getHandbookCompletionStatus(
    studentId: string,
    handbook: SparksHandbook,
    churchId: string
  ): Promise<Map<string, boolean>> {
    const completionMap = new Map<string, boolean>();

    try {
      const progresses = await this.getStudentProgress(studentId, churchId);
      const handbookProgresses = progresses.filter(p => p.handbook === handbook);

      // 모든 가능한 섹션에 대해 완료 상태 설정
      const allSections = generateJewelSections();
      [JewelType.RED, JewelType.GREEN].forEach(jewelType => {
        allSections.forEach(section => {
          const isCompleted = handbookProgresses.some(
            p => p.jewelType === jewelType &&
                 p.section.major === section.major &&
                 p.section.minor === section.minor
          );
          const key = `${jewelType}-${section.major}-${section.minor}`;
          completionMap.set(key, isCompleted);
        });
      });
    } catch (error) {
      console.error('핸드북 완료 상태 조회 실패:', error);
    }

    return completionMap;
  }

  /**
   * 다음에 완료해야 할 섹션 조회
   */
  async getNextSectionToComplete(
    studentId: string,
    churchId: string
  ): Promise<{ handbook: SparksHandbook; jewelType: JewelType; section: { major: number; minor: number } } | null> {
    try {
      // 학생의 현재 요약 정보 조회
      const summary = await this.getStudentHandbookSummary(studentId, churchId);

      if (!summary.currentHandbook || !summary.currentJewelType) {
        // 아직 시작하지 않은 경우 첫 번째 핸드북의 첫 번째 섹션 추천
        return {
          handbook: SparksHandbook.HANG_GLIDER,
          jewelType: JewelType.RED,
          section: { major: 1, minor: 1 }
        };
      }

      // 현재 진행중인 핸드북의 완료 상태 조회
      const completionStatus = await this.getHandbookCompletionStatus(studentId, summary.currentHandbook, churchId);

      // 다음 완료할 섹션 찾기 (현재 보석 타입부터)
      const allSections = generateJewelSections();

      // 현재 보석 타입에서 완료되지 않은 첫 번째 섹션 찾기
      for (const section of allSections) {
        const key = `${summary.currentJewelType}-${section.major}-${section.minor}`;
        if (!completionStatus.get(key)) {
          return {
            handbook: summary.currentHandbook,
            jewelType: summary.currentJewelType,
            section
          };
        }
      }

      // 현재 보석 타입이 모두 완료된 경우, 다른 보석 타입으로 넘어감
      const otherJewelType = summary.currentJewelType === JewelType.RED ? JewelType.GREEN : JewelType.RED;
      for (const section of allSections) {
        const key = `${otherJewelType}-${section.major}-${section.minor}`;
        if (!completionStatus.get(key)) {
          return {
            handbook: summary.currentHandbook,
            jewelType: otherJewelType,
            section
          };
        }
      }

      // 현재 핸드북이 모두 완료된 경우, 다음 핸드북으로 넘어감
      const handbookOrder = [SparksHandbook.HANG_GLIDER, SparksHandbook.WING_RUNNER, SparksHandbook.SKY_STORMER];
      const currentIndex = handbookOrder.indexOf(summary.currentHandbook);

      if (currentIndex < handbookOrder.length - 1) {
        const nextHandbook = handbookOrder[currentIndex + 1];
        return {
          handbook: nextHandbook,
          jewelType: JewelType.RED,
          section: { major: 1, minor: 1 }
        };
      }

      // 모든 핸드북이 완료된 경우
      return null;
    } catch (error) {
      console.error('다음 섹션 조회 실패:', error);
      return null;
    }
  }

  /**
   * 교회 내 모든 SPARKS 학생들의 진도 요약 조회
   */
  async getAllStudentSummaries(churchId: string): Promise<StudentHandbookSummary[]> {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      // 교회 내 모든 SPARKS 진도 기록을 그룹화하여 조회
      const q = query(
        collection(db, 'sparksHandbookProgress'),
        where('churchId', '==', churchId)
      );

      const querySnapshot = await getDocs(q);
      const studentProgressMap = new Map<string, JewelSectionProgress[]>();

      // 학생별로 진도 기록 그룹화
      querySnapshot.forEach((doc) => {
        const data = doc.data() as JewelSectionProgressDocument;
        if (!studentProgressMap.has(data.studentId)) {
          studentProgressMap.set(data.studentId, []);
        }
        const progresses = studentProgressMap.get(data.studentId)!;

        progresses.push({
          id: doc.id,
          studentId: data.studentId,
          handbook: data.handbook as SparksHandbook,
          jewelType: data.jewelType as JewelType,
          section: { major: data.sectionMajor, minor: data.sectionMinor },
          completedDate: data.completedDate instanceof Timestamp
            ? data.completedDate.toDate()
            : new Date(data.completedDate),
          completedBy: data.completedBy,
          churchId: data.churchId,
        });
      });

      // 각 학생별로 진도 요약 계산
      const summaries: StudentHandbookSummary[] = [];
      for (const [studentId, progresses] of studentProgressMap) {
        summaries.push(this.calculateHandbookSummary(studentId, progresses));
      }

      return summaries;
    } catch (error) {
      console.error('모든 학생 진도 요약 조회 실패:', error);
      throw error;
    }
  }
}

export const sparksHandbookService = new SparksHandbookService();
