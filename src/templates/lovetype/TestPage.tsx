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

            // 중간 질문의 경우 자동으로 다음 질문으로 이동
            if (testState.currentQuestion < totalQuestions - 1) {
                setTimeout(() => {
                    goToNextQuestion();
                }, 300);
            }
            // 마지막 질문의 경우 canComplete()가 자동으로 업데이트되어 결과보기 버튼이 활성화됨
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

    // 페이지 로드 시 스크롤을 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!currentQuestion) {
        return (
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('lovetype.loadingQuestions', '질문을 불러오는 중...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-6 pb-6 sm:pb-8">
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
                        key={currentQuestion.id}
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

                    {testState.currentQuestion >= totalQuestions - 1 ? (
                        <Button
                            onClick={handleComplete}
                            disabled={!canComplete()}
                            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                        >
                            {t('lovetype.viewResult', '결과 보기')} →
                        </Button>
                    ) : (
                        <div className="w-24">
                            {/* 중간 질문들에서는 다음 버튼 대신 빈 공간 표시 */}
                        </div>
                    )}
                </div>

                {/* Help Text */}
                <div className="max-w-2xl mx-auto mt-4 sm:mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        💡 {t('lovetype.helpText', '가장 자신에게 맞는 답변을 선택해주세요. 정확한 결과를 위해 솔직하게 답변해주세요.')}
                    </p>
                </div>
            </div>
        </div>
    );
}
