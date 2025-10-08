import { useState, useCallback } from 'react';

// 타입 정의 (인라인으로 정의하여 import 문제 해결)
export type MBTIType = 
  | 'LCAO' | 'LCAP' | 'LCRO' | 'LCRP'
  | 'LFAO' | 'LFAP' | 'LFRO' | 'LFRP'
  | 'FCAO' | 'FCAP' | 'FCRO' | 'FCRP'
  | 'FFAO' | 'FFAP' | 'FFRO' | 'FFRP';

export interface MBTIScore {
  L: number; F: number; C: number; A: number;
  R: number; P: number; O: number; E: number;
}

export interface Question {
    id: number;
    text: string;
    dimension: keyof MBTIScore;
    weight: number;
}

export interface Answer {
    questionId: number;
    score: number;
}

export interface TestState {
    currentQuestion: number;
    answers: Answer[];
    isCompleted: boolean;
    result?: MBTIType;
}

// 질문 데이터 (L/F, C/A, R/P, O/E 차원)
const questions: Question[] = [
  // L/F (리더십: Lead / Follow) 차원 질문들
  { id: 1, text: "연인과 새로운 맛집을 찾아갈 때, 주로 누가 먼저 제안하나요?", dimension: 'L', weight: 3 },
  { id: 2, text: "데이트 계획이 갑자기 틀어졌을 때, 당신의 반응은?", dimension: 'L', weight: 3 },
  { id: 3, text: "연인과 주말 여행을 계획한다면, 당신은 주로 어떻게 준비하나요?", dimension: 'L', weight: 3 },
  { id: 4, text: "연인과의 다툼 후, 먼저 화해를 시도하는 쪽은 주로 누구인가요?", dimension: 'L', weight: 3 },
  { id: 5, text: "새로운 도전이나 취미를 함께 시작할 때, 당신의 역할은?", dimension: 'L', weight: 2 },
  { id: 6, text: "평소 식사 메뉴를 결정할 때, 당신은 어느 쪽인가요?", dimension: 'L', weight: 2 },
  { id: 7, text: "연인에게서 뜻밖의 서프라이즈 이벤트를 받았을 때, 당신의 다음 행동은?", dimension: 'L', weight: 2 },
  { id: 8, text: "관심 없는 가게 쇼핑에 같이 가달라고 하면?", dimension: 'L', weight: 2 },

  // C/A (애정 표현: Cuddly / Accept) 차원 질문들
  { id: 9, text: "연인이 힘들어할 때, 당신은 주로 어떻게 반응하나요?", dimension: 'C', weight: 3 },
  { id: 10, text: "연인에게서 '귀엽다'는 말을 들었을 때, 당신의 솔직한 기분은?", dimension: 'C', weight: 3 },
  { id: 11, text: "연인의 사소한 투정이나 어리광을 접했을 때, 당신의 반응은?", dimension: 'C', weight: 3 },
  { id: 12, text: "연인과의 스킨십에 대한 당신의 생각은?", dimension: 'C', weight: 2 },
  { id: 13, text: "연인의 고민을 들어줄 때, 당신은 주로 어떤 태도인가요?", dimension: 'C', weight: 2 },
  { id: 14, text: "기념일이나 특별한 날, 연인에게서 어떤 선물을 받고 싶나요?", dimension: 'C', weight: 2 },
  { id: 15, text: "문득 생각나는 연인상은?", dimension: 'C', weight: 2 },

  // R/P (연애관: Realistic / Passionate) 차원 질문들
  { id: 16, text: "연인과 싸웠을 때 화해하는 가장 효과적인 방법은?", dimension: 'R', weight: 3 },
  { id: 17, text: "연인과 기념일을 보낼 때, 더 중요하게 생각하는 것은?", dimension: 'R', weight: 3 },
  { id: 18, text: "연인과의 프러포즈나 결혼식에 대한 환상이 있나요?", dimension: 'R', weight: 3 },
  { id: 19, text: "연애 중 재정 관리 방식은 어느 쪽에 가깝다고 생각하나요?", dimension: 'R', weight: 2 },
  { id: 20, text: "사랑이 식었다고 느껴질 때, 당신의 대처 방식은?", dimension: 'R', weight: 2 },
  { id: 21, text: "결혼에 대한 당신의 생각은?", dimension: 'R', weight: 2 },
  { id: 22, text: "결혼 후, 연인과의 가장 이상적인 주말은 어떤 모습인가요?", dimension: 'R', weight: 2 },

  // O/E (태도: Optimistic / Earnest) 차원 질문들
  { id: 23, text: "연인과 사귀고 난 후, 당신의 개인적인 시간 활용은?", dimension: 'O', weight: 3 },
  { id: 24, text: "연인이 너무 지나치게 질투하거나 집착하는 모습을 보일 때 당신의 반응은?", dimension: 'O', weight: 3 },
  { id: 25, text: "이별 후 새로운 연애를 시작하기까지의 기간은?", dimension: 'O', weight: 3 },
  { id: 26, text: "연애에 대한 친구들의 조언을 들었을 때, 당신의 반응은?", dimension: 'O', weight: 2 },
  { id: 27, text: "연인과 취미나 관심사를 반드시 공유해야 한다고 생각하나요?", dimension: 'O', weight: 2 },
  { id: 28, text: "연애 중 다른 이성과의 자연스러운 교류에 대해 당신의 생각은?", dimension: 'O', weight: 2 },
  { id: 29, text: "연애 중 자신의 솔직한 감정을 어디까지 표현하는 편인가요?", dimension: 'O', weight: 2 },
  { id: 30, text: "연애는 당신에게 어떤 의미인가요?", dimension: 'O', weight: 2 }
];

// 계산 함수들
function calculateMBTIScore(answers: Answer[], questions: Question[]): MBTIScore {
  const score: MBTIScore = {
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

function determineMBTIType(score: MBTIScore): MBTIType {
  const L_F = score.L > score.F ? 'L' : 'F';
  const C_A = score.C > score.A ? 'C' : 'A';
  const R_P = score.R > score.P ? 'R' : 'P';
  const O_E = score.O > score.E ? 'O' : 'E';

  return `${L_F}${C_A}${R_P}${O_E}` as MBTIType;
}

// 초기 상태
const initialState: TestState = {
    currentQuestion: 0,
    answers: [],
    isCompleted: false,
    result: undefined
};

// useTest 훅
export function useTest() {
    const [testState, setTestState] = useState<TestState>(initialState);

    // 답변 추가
    const addAnswer = useCallback((questionId: number, score: number) => {
        setTestState(prev => {
            const newAnswers = prev.answers.filter(a => a.questionId !== questionId);
            newAnswers.push({ questionId, score });

            return {
                ...prev,
                answers: newAnswers,
                currentQuestion: prev.currentQuestion + 1
            };
        });
    }, []);

    // 이전 질문으로 돌아가기
    const goToPreviousQuestion = useCallback(() => {
        setTestState(prev => ({
            ...prev,
            currentQuestion: Math.max(0, prev.currentQuestion - 1)
        }));
    }, []);

    // 특정 질문으로 이동
    const goToQuestion = useCallback((questionIndex: number) => {
        setTestState(prev => ({
            ...prev,
            currentQuestion: Math.max(0, Math.min(questions.length - 1, questionIndex))
        }));
    }, []);

    // 테스트 완료
    const completeTest = useCallback(() => {
        setTestState(prev => {
            const score = calculateMBTIScore(prev.answers, questions);
            const result = determineMBTIType(score);

            return {
                ...prev,
                isCompleted: true,
                result
            };
        });
    }, []);

    // 테스트 재시작
    const restartTest = useCallback(() => {
        setTestState(initialState);
    }, []);

    // 현재 질문 가져오기
    const getCurrentQuestion = useCallback(() => {
        return questions[testState.currentQuestion];
    }, [testState.currentQuestion]);

    // 진행률 계산
    const getProgress = useCallback(() => {
        return Math.round((testState.currentQuestion / questions.length) * 100);
    }, [testState.currentQuestion]);

    // 답변 여부 확인
    const hasAnswered = useCallback((questionId: number) => {
        return testState.answers.some(a => a.questionId === questionId);
    }, [testState.answers]);

    // 특정 질문의 답변 가져오기
    const getAnswer = useCallback((questionId: number) => {
        return testState.answers.find(a => a.questionId === questionId);
    }, [testState.answers]);

    // 테스트 완료 가능 여부 확인
    const canComplete = useCallback(() => {
        return testState.answers.length >= questions.length;
    }, [testState.answers.length]);

    return {
        testState,
        addAnswer,
        goToPreviousQuestion,
        goToQuestion,
        completeTest,
        restartTest,
        getCurrentQuestion,
        getProgress,
        hasAnswered,
        getAnswer,
        canComplete,
        totalQuestions: questions.length
    };
}
