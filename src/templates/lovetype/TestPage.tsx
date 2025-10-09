import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTest } from '../../lovetype/useTest';
import { ProgressBar, QuestionCard } from '../../components/lovetype';
import { Button } from '../../components/ui';

export function TestPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {
        testState,
        addAnswer,
        goToPreviousQuestion,
        goToNextQuestion,
        completeTest,
        getCurrentQuestion,
        getAnswer,
        canComplete,
        totalQuestions
    } = useTest();

    const currentQuestion = getCurrentQuestion();
    const currentAnswer = getAnswer(currentQuestion?.id || 0);

    const handleAnswer = (score: number) => {
        if (currentQuestion) {
            addAnswer(currentQuestion.id, score);
        }
    };

    const handleNext = () => {
        if (testState.currentQuestion >= totalQuestions - 1) {
            completeTest();
        } else {
            // 다음 질문으로 이동
            goToNextQuestion();
        }
    };

    const handlePrevious = () => {
        goToPreviousQuestion();
    };

    const handleComplete = () => {
        if (canComplete()) {
            completeTest();
        }
    };

    // 결과가 있으면 결과 페이지로 리다이렉트
    useEffect(() => {
        if (testState.isCompleted && testState.result) {
            navigate(`/result/${testState.result}`);
        }
    }, [testState.isCompleted, testState.result, navigate]);

    if (!currentQuestion) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('lovetype.loadingQuestions', '질문을 불러오는 중...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        {t('lovetype.testTitle', 'LoveType 테스트')}
                    </h1>
                    <ProgressBar
                        current={testState.currentQuestion}
                        total={totalQuestions}
                        className="max-w-2xl mx-auto"
                    />
                </div>

                {/* Question Card */}
                <div className="max-w-2xl mx-auto mb-8">
                    <QuestionCard
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                        currentAnswer={currentAnswer?.score}
                    />
                </div>

                {/* Navigation */}
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    <Button
                        onClick={handlePrevious}
                        disabled={testState.currentQuestion === 0}
                        variant="outline"
                        className="px-6 py-2"
                    >
                        ← {t('lovetype.previous', '이전')}
                    </Button>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">
                            {testState.currentQuestion + 1} / {totalQuestions}
                        </p>
                        {currentAnswer && (
                            <p className="text-xs text-pink-600">
                                {t('lovetype.answerCompleted', '답변 완료')}: {currentAnswer.score === 1 ? t('lovetype.strongA', 'A 강함') :
                                    currentAnswer.score === 2 ? t('lovetype.moderateA', 'A 보통') :
                                        currentAnswer.score === 3 ? t('lovetype.weakA', 'A 약함') :
                                            currentAnswer.score === 4 ? t('lovetype.weakB', 'B 약함') :
                                                currentAnswer.score === 5 ? t('lovetype.moderateB', 'B 보통') : t('lovetype.strongB', 'B 강함')}
                            </p>
                        )}
                    </div>

                    {testState.currentQuestion >= totalQuestions - 1 ? (
                        <Button
                            onClick={handleComplete}
                            disabled={!canComplete()}
                            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        >
                            {t('lovetype.viewResult', '결과 보기')} →
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            disabled={!currentAnswer}
                            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        >
                            {t('lovetype.next', '다음')} →
                        </Button>
                    )}
                </div>

                {/* Help Text */}
                <div className="max-w-2xl mx-auto mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        💡 {t('lovetype.helpText', '가장 자신에게 맞는 답변을 선택해주세요. 정확한 결과를 위해 솔직하게 답변해주세요.')}
                    </p>
                </div>
            </div>
        </div>
    );
}
