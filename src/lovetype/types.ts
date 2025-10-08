// MBTI 16가지 유형 정의
export type MBTIType =
    | 'ENFP' | 'ENFJ' | 'ENTP' | 'ENTJ'
    | 'ESFP' | 'ESFJ' | 'ESTP' | 'ESTJ'
    | 'INFP' | 'INFJ' | 'INTP' | 'INTJ'
    | 'ISFP' | 'ISFJ' | 'ISTP' | 'ISTJ';

// MBTI 차원별 점수
export interface MBTIScore {
    E: number; // 외향성 (Extraversion)
    I: number; // 내향성 (Introversion)
    S: number; // 감각 (Sensing)
    N: number; // 직관 (Intuition)
    T: number; // 사고 (Thinking)
    F: number; // 감정 (Feeling)
    J: number; // 판단 (Judging)
    P: number; // 인식 (Perceiving)
}

// 테스트 질문 타입
export interface Question {
    id: number;
    text: string;
    dimension: keyof MBTIScore; // 어떤 차원에 영향을 주는지
    weight: number; // 가중치 (1-5)
}

// 테스트 답변 타입
export interface Answer {
    questionId: number;
    score: number; // 1-5 점수
}

// 연애 유형 정보
export interface LoveType {
    code: MBTIType;
    title: string;
    nickname: string;
    description: string;
    loveStyle: string;
    strengths: string[];
    challenges: string[];
    compatibleTypes: MBTIType[];
    incompatibleTypes: MBTIType[];
    advice: string;
    color: string;
}

// 테스트 진행 상태
export interface TestState {
    currentQuestion: number;
    answers: Answer[];
    isCompleted: boolean;
    result?: MBTIType;
}
