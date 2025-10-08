// 연애 유형 테스트 결과 (4가지 차원 기반)
export type LoveTypeCode = string;

// 연애 유형 차원별 점수 (L/F, C/A, R/P, O/E)
export interface LoveTypeScore {
    L: number; // 리더십 - Lead
    F: number; // 리더십 - Follow
    C: number; // 애정 표현 - Cuddly
    A: number; // 애정 표현 - Accept
    R: number; // 연애관 - Realistic
    P: number; // 연애관 - Passionate
    O: number; // 태도 - Optimistic
    E: number; // 태도 - Earnest
}

// 테스트 질문 타입
export interface Question {
    id: number;
    text: string;
    dimension: keyof LoveTypeScore; // 어떤 차원에 영향을 주는지
    weight: number; // 가중치 (1-5)
    optionA?: string; // A 선택지
    optionB?: string; // B 선택지
}

// 테스트 답변 타입
export interface Answer {
    questionId: number;
    score: number; // 1-5 점수
}

// 연애 유형 정보
export interface LoveType {
    code: LoveTypeCode;
    title: string;
    nickname: string;
    description: string;
    loveStyle: string;
    strengths: string[];
    challenges: string[];
    compatibleTypes: LoveTypeCode[];
    incompatibleTypes: LoveTypeCode[];
    advice: string;
    color: string;
}

// 테스트 진행 상태
export interface TestState {
    currentQuestion: number;
    answers: Answer[];
    isCompleted: boolean;
    result?: LoveTypeCode;
}
