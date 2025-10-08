// 모든 lovetype 관련 타입과 데이터를 하나의 파일로 통합

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

// 연애 유형 테스트 질문들 (L/F, C/A, R/P, O/E 차원 기반)
export const questions: Question[] = [
    // L/F 차원 질문들 (리더십: Lead/Follow) - 8개
    {
        id: 1,
        text: "연인과 새로운 맛집을 찾아갈 때, 주로 누가 먼저 제안하나요?",
        dimension: 'L',
        weight: 3
    },
    {
        id: 2,
        text: "데이트 계획이 갑자기 틀어졌을 때, 당신의 반응은?",
        dimension: 'L',
        weight: 3
    },
    {
        id: 3,
        text: "연인과 주말 여행을 계획한다면, 당신은 주로 어떻게 준비하나요?",
        dimension: 'L',
        weight: 3
    },
    {
        id: 4,
        text: "연인과의 다툼 후, 먼저 화해를 시도하는 쪽은 주로 누구인가요?",
        dimension: 'L',
        weight: 3
    },
    {
        id: 5,
        text: "새로운 도전이나 취미를 함께 시작할 때, 당신의 역할은?",
        dimension: 'L',
        weight: 2
    },
    {
        id: 6,
        text: "평소 식사 메뉴를 결정할 때, 당신은 어느 쪽인가요?",
        dimension: 'L',
        weight: 2
    },
    {
        id: 7,
        text: "연인에게서 뜻밖의 서프라이즈 이벤트를 받았을 때, 당신의 다음 행동은?",
        dimension: 'L',
        weight: 2
    },
    {
        id: 8,
        text: "관심 없는 가게 쇼핑에 같이 가달라고 하면?",
        dimension: 'L',
        weight: 2
    },

    // C/A 차원 질문들 (애정 표현: Cuddly/Accept) - 7개
    {
        id: 9,
        text: "연인이 힘들어할 때, 당신은 주로 어떻게 반응하나요?",
        dimension: 'C',
        weight: 3
    },
    {
        id: 10,
        text: "연인에게서 \"귀엽다\"는 말을 들었을 때, 당신의 솔직한 기분은?",
        dimension: 'C',
        weight: 3
    },
    {
        id: 11,
        text: "연인의 사소한 투정이나 어리광을 접했을 때, 당신의 반응은?",
        dimension: 'A',
        weight: 3
    },
    {
        id: 12,
        text: "연인과의 스킨십에 대한 당신의 생각은?",
        dimension: 'C',
        weight: 2
    },
    {
        id: 13,
        text: "연인의 고민을 들어줄 때, 당신은 주로 어떤 태도인가요?",
        dimension: 'C',
        weight: 2
    },
    {
        id: 14,
        text: "기념일이나 특별한 날, 연인에게서 어떤 선물을 받고 싶나요?",
        dimension: 'C',
        weight: 2
    },
    {
        id: 15,
        text: "문득 생각나는 연인상은?",
        dimension: 'A',
        weight: 2
    },

    // R/P 차원 질문들 (연애관: Realistic/Passionate) - 7개
    {
        id: 16,
        text: "연인과 싸웠을 때 화해하는 가장 효과적인 방법은?",
        dimension: 'R',
        weight: 3
    },
    {
        id: 17,
        text: "연인과 기념일을 보낼 때, 더 중요하게 생각하는 것은?",
        dimension: 'R',
        weight: 3
    },
    {
        id: 18,
        text: "연인과의 프러포즈나 결혼식에 대한 환상이 있나요?",
        dimension: 'P',
        weight: 3
    },
    {
        id: 19,
        text: "연애 중 재정 관리 방식은 어느 쪽에 가깝다고 생각하나요?",
        dimension: 'R',
        weight: 2
    },
    {
        id: 20,
        text: "사랑이 식었다고 느껴질 때, 당신의 대처 방식은?",
        dimension: 'R',
        weight: 2
    },
    {
        id: 21,
        text: "결혼에 대한 당신의 생각은?",
        dimension: 'R',
        weight: 2
    },
    {
        id: 22,
        text: "결혼 후, 연인과의 가장 이상적인 주말은 어떤 모습인가요?",
        dimension: 'R',
        weight: 2
    },

    // O/E 차원 질문들 (태도: Optimistic/Earnest) - 8개
    {
        id: 23,
        text: "연인과 사귀고 난 후, 당신의 개인적인 시간 활용은?",
        dimension: 'O',
        weight: 3
    },
    {
        id: 24,
        text: "연인이 너무 지나치게 질투하거나 집착하는 모습을 보일 때 당신의 반응은?",
        dimension: 'O',
        weight: 3
    },
    {
        id: 25,
        text: "이별 후 새로운 연애를 시작하기까지의 기간은?",
        dimension: 'O',
        weight: 3
    },
    {
        id: 26,
        text: "연애에 대한 친구들의 조언을 들었을 때, 당신의 반응은?",
        dimension: 'O',
        weight: 2
    },
    {
        id: 27,
        text: "연인과 취미나 관심사를 반드시 공유해야 한다고 생각하나요?",
        dimension: 'O',
        weight: 2
    },
    {
        id: 28,
        text: "연애 중 다른 이성과의 자연스러운 교류에 대해 당신의 생각은?",
        dimension: 'O',
        weight: 2
    },
    {
        id: 29,
        text: "연애 중 자신의 솔직한 감정을 어디까지 표현하는 편인가요?",
        dimension: 'O',
        weight: 2
    },
    {
        id: 30,
        text: "연애는 당신에게 어떤 의미인가요?",
        dimension: 'O',
        weight: 2
    }
];

// 답변을 기반으로 연애 유형 점수 계산
export function calculateLoveTypeScore(answers: Answer[], questions: Question[]): LoveTypeScore {
    const score: LoveTypeScore = {
        L: 0, F: 0, C: 0, A: 0, R: 0, P: 0, O: 0, E: 0
    };

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question) {
            const weightedScore = answer.score * question.weight;
            score[question.dimension] += weightedScore;
        }
    });

    return score;
}

// 연애 유형 점수를 기반으로 유형 결정
export function determineLoveType(score: LoveTypeScore): LoveTypeCode {
    const leadership = score.L > score.F ? 'L' : 'F';
    const affection = score.C > score.A ? 'C' : 'A';
    const relationship = score.R > score.P ? 'R' : 'P';
    const attitude = score.O > score.E ? 'O' : 'E';

    return `${leadership}${affection}${relationship}${attitude}`;
}

// 점수 차이를 백분율로 변환
export function getScorePercentage(score: LoveTypeScore): Record<string, number> {
    const totalL_F = score.L + score.F;
    const totalC_A = score.C + score.A;
    const totalR_P = score.R + score.P;
    const totalO_E = score.O + score.E;

    return {
        L: totalL_F > 0 ? Math.round((score.L / totalL_F) * 100) : 50,
        F: totalL_F > 0 ? Math.round((score.F / totalL_F) * 100) : 50,
        C: totalC_A > 0 ? Math.round((score.C / totalC_A) * 100) : 50,
        A: totalC_A > 0 ? Math.round((score.A / totalC_A) * 100) : 50,
        R: totalR_P > 0 ? Math.round((score.R / totalR_P) * 100) : 50,
        P: totalR_P > 0 ? Math.round((score.P / totalR_P) * 100) : 50,
        O: totalO_E > 0 ? Math.round((score.O / totalO_E) * 100) : 50,
        E: totalO_E > 0 ? Math.round((score.E / totalO_E) * 100) : 50,
    };
}

// 궁합도 계산 (간단한 알고리즘)
export function calculateCompatibility(type1: LoveTypeCode, type2: LoveTypeCode): number {
    const type1Chars = type1.split('');
    const type2Chars = type2.split('');

    let compatibility = 0;

    // 같은 차원에서 반대 성향이면 높은 궁합
    if (type1Chars[0] !== type2Chars[0]) compatibility += 25; // L/F
    if (type1Chars[1] !== type2Chars[1]) compatibility += 25; // C/A
    if (type1Chars[2] !== type2Chars[2]) compatibility += 25; // R/P
    if (type1Chars[3] !== type2Chars[3]) compatibility += 25; // O/E

    return compatibility;
}

// 새로운 연애 유형 데이터를 import
import { newLoveTypes } from './newLoveTypes';
export const loveTypes = newLoveTypes;

// useTest 훅을 위한 초기 상태
const initialState: TestState = {
    currentQuestion: 0,
    answers: [],
    isCompleted: false,
    result: undefined
};

// useTest 훅 (React import 없이 함수만 export)
export function createTestHook() {
    return {
        initialState,
        questions,
        calculateLoveTypeScore,
        determineLoveType,
        getScorePercentage,
        calculateCompatibility,
        loveTypes: loveTypes
    };
}
