import { useState, useCallback } from 'react';

// 타입 정의 (인라인으로 정의하여 import 문제 해결)
export type MBTIType =
    | 'ENFP' | 'ENFJ' | 'ENTP' | 'ENTJ'
    | 'ESFP' | 'ESFJ' | 'ESTP' | 'ESTJ'
    | 'INFP' | 'INFJ' | 'INTP' | 'INTJ'
    | 'ISFP' | 'ISFJ' | 'ISTP' | 'ISTJ';

export interface MBTIScore {
    E: number; I: number; S: number; N: number;
    T: number; F: number; J: number; P: number;
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

// 질문 데이터
const questions: Question[] = [
    { id: 1, text: "새로운 사람들과의 만남에서 에너지를 얻는다", dimension: 'E', weight: 3 },
    { id: 2, text: "혼자만의 시간이 필요하다", dimension: 'I', weight: 3 },
    { id: 3, text: "파티나 모임에서 활발하게 참여한다", dimension: 'E', weight: 2 },
    { id: 4, text: "깊이 있는 대화를 선호한다", dimension: 'I', weight: 2 },
    { id: 5, text: "현실적이고 구체적인 계획을 세운다", dimension: 'S', weight: 3 },
    { id: 6, text: "미래의 가능성에 대해 상상한다", dimension: 'N', weight: 3 },
    { id: 7, text: "세부사항에 주의를 기울인다", dimension: 'S', weight: 2 },
    { id: 8, text: "큰 그림을 보는 것을 선호한다", dimension: 'N', weight: 2 },
    { id: 9, text: "논리적 분석을 통해 결정한다", dimension: 'T', weight: 3 },
    { id: 10, text: "다른 사람의 감정을 고려한다", dimension: 'F', weight: 3 },
    { id: 11, text: "객관적 기준으로 판단한다", dimension: 'T', weight: 2 },
    { id: 12, text: "조화로운 관계를 중시한다", dimension: 'F', weight: 2 },
    { id: 13, text: "계획을 세우고 체계적으로 진행한다", dimension: 'J', weight: 3 },
    { id: 14, text: "유연하고 즉흥적인 것을 선호한다", dimension: 'P', weight: 3 },
    { id: 15, text: "마감일을 잘 지킨다", dimension: 'J', weight: 2 },
    { id: 16, text: "새로운 기회에 열려있다", dimension: 'P', weight: 2 },
    { id: 17, text: "연인과 함께 새로운 경험을 추구한다", dimension: 'E', weight: 2 },
    { id: 18, text: "연인과의 깊은 정신적 교감을 원한다", dimension: 'I', weight: 2 },
    { id: 19, text: "연인에게 실용적인 도움을 주고 싶다", dimension: 'S', weight: 2 },
    { id: 20, text: "연인과 함께 꿈을 키워나가고 싶다", dimension: 'N', weight: 2 },
    { id: 21, text: "연인과의 갈등을 논리적으로 해결하려 한다", dimension: 'T', weight: 2 },
    { id: 22, text: "연인의 감정을 우선적으로 배려한다", dimension: 'F', weight: 2 },
    { id: 23, text: "연인과의 데이트를 미리 계획한다", dimension: 'J', weight: 2 },
    { id: 24, text: "연인과의 데이트에서 즉흥적인 재미를 즐긴다", dimension: 'P', weight: 2 }
];

// 계산 함수들
function calculateMBTIScore(answers: Answer[], questions: Question[]): MBTIScore {
    const score: MBTIScore = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
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
    const E_I = score.E > score.I ? 'E' : 'I';
    const S_N = score.S > score.N ? 'S' : 'N';
    const T_F = score.T > score.F ? 'T' : 'F';
    const J_P = score.J > score.P ? 'J' : 'P';

    return `${E_I}${S_N}${T_F}${J_P}` as MBTIType;
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
