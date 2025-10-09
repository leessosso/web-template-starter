// 연애 유형 테스트 결과 (4가지 차원 기반)
export type LoveTypeCode = string;

// 연애 유형 차원별 점수 (L/F, C/A, R/P, O/E)
export interface LoveTypeScore {
    L: number; // Lead - 자신의 페이스에 맞춰주길 원함
    F: number; // Follow - 상대의 페이스에 맞춤
    C: number; // Cuddly - 응석부리고 싶은
    A: number; // Accept - 응석받고 싶은
    R: number; // Realistic - 현실적인 연애
    P: number; // Passionate - 열정적인 연애
    O: number; // Optimistic - 자유로운
    E: number; // Earnest - 진지한
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
    score: number; // 1-6 점수 (1-3: A쪽 성향, 4-6: B쪽 성향)
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

// 러브타입 상세 정보
export interface LoveTypeDetail {
    mainTitle: string;
    introduction: string;
    basicTendency: string;
    inRelationship: string;
    perfectMatch: string;
    marvelMessage: string;
}

// 테스트 진행 상태
export interface TestState {
    currentQuestion: number;
    answers: Answer[];
    isCompleted: boolean;
    result?: LoveTypeCode;
}
