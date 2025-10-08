import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { questions } from './questions';
import type { LoveTypeCode, LoveTypeScore, Answer, TestState } from './types';

// 연애 유형 점수 계산 함수
function calculateLoveTypeScore(answers: Answer[]): LoveTypeScore {
    const score: LoveTypeScore = { L: 0, F: 0, C: 0, A: 0, R: 0, P: 0, O: 0, E: 0 };

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question) {
            // 점수 시스템: 1-3은 A쪽, 4-6은 B쪽
            const isASide = answer.score <= 3;
            const weight = question.weight;

            if (isASide) {
                // A쪽 점수 (1=3점, 2=2점, 3=1점)
                const points = 4 - answer.score;
                score[question.dimension] += points * weight;
            } else {
                // B쪽 점수 (4=1점, 5=2점, 6=3점)
                const points = answer.score - 3;
                score[question.dimension] += points * weight;
            }
        }
    });

    return score;
}

// 연애 유형 결정 함수
function determineLoveType(score: LoveTypeScore): LoveTypeCode {
    const leadership = score.L >= score.F ? 'L' : 'F';
    const affection = score.C >= score.A ? 'C' : 'A';
    const relationship = score.R >= score.P ? 'R' : 'P';
    const attitude = score.O >= score.E ? 'O' : 'E';

    return `${leadership}${affection}${relationship}${attitude}`;
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
    const { t } = useTranslation();
    const [testState, setTestState] = useState<TestState>(initialState);

    // 답변 추가
    const addAnswer = useCallback((questionId: number, score: number) => {
        setTestState(prev => {
            const newAnswers = prev.answers.filter(a => a.questionId !== questionId);
            newAnswers.push({ questionId, score });

            return {
                ...prev,
                answers: newAnswers
            };
        });
    }, []);

    // 이전 질문으로 이동
    const goToPreviousQuestion = useCallback(() => {
        setTestState(prev => ({
            ...prev,
            currentQuestion: Math.max(0, prev.currentQuestion - 1)
        }));
    }, []);

    // 다음 질문으로 이동
    const goToNextQuestion = useCallback(() => {
        setTestState(prev => ({
            ...prev,
            currentQuestion: Math.min(questions.length - 1, prev.currentQuestion + 1)
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
            const loveTypeScore = calculateLoveTypeScore(prev.answers);
            const result = determineLoveType(loveTypeScore);

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

    // 현재 질문 가져오기 (다국어 지원)
    const getCurrentQuestion = useCallback(() => {
        const question = questions[testState.currentQuestion];
        if (!question) return null;

        return {
            ...question,
            text: t(`questions.${question.id}`, question.text),
            optionA: t(`questions.${question.id}.optionA`, question.optionA || ''),
            optionB: t(`questions.${question.id}.optionB`, question.optionB || '')
        };
    }, [testState.currentQuestion, t]);

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
        goToNextQuestion,
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