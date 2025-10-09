import { useTranslation } from 'react-i18next';
import type { Question } from '../../lovetype/types';
import { getQuestionText } from '../../lovetype/questions';

interface QuestionCardProps {
    question: Question;
    onAnswer: (score: number) => void;
    currentAnswer?: number;
    className?: string;
}

export function QuestionCard({ question, onAnswer, currentAnswer, className = '' }: QuestionCardProps) {
    const { t } = useTranslation();

    const handleScoreClick = (score: number) => {
        onAnswer(score);
    };


    const getHeartInfo = (score: number) => {
        // A쪽 3점 → 2점 → 1점 → 1점 → 2점 → 3점 B쪽 시스템
        // 1: A 강함(3점), 2: A 보통(2점), 3: A 약함(1점), 4: B 약함(1점), 5: B 보통(2점), 6: B 강함(3점)
        const heartMap = {
            1: { size: 'w-8 h-8 sm:w-12 sm:h-12', color: 'pink', position: 'A' },
            2: { size: 'w-6 h-6 sm:w-8 sm:h-8', color: 'pink', position: 'A' },
            3: { size: 'w-4 h-4 sm:w-4 sm:h-4', color: 'pink', position: 'A' },
            4: { size: 'w-4 h-4 sm:w-4 sm:h-4', color: 'blue', position: 'B' },
            5: { size: 'w-6 h-6 sm:w-8 sm:h-8', color: 'blue', position: 'B' },
            6: { size: 'w-8 h-8 sm:w-12 sm:h-12', color: 'blue', position: 'B' }
        };
        return heartMap[score as keyof typeof heartMap];
    };

    const renderHeart = (size: string, color: string, isSelected: boolean) => {
        const colorClass = isSelected
            ? (color === 'pink' ? 'text-pink-600' : 'text-blue-600')
            : (color === 'pink' ? 'text-pink-500' : 'text-blue-500');

        return (
            <svg
                className={`${size} ${colorClass}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        );
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 ${className}`}>
            <div className="text-center mb-6">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
                    {getQuestionText(question.id, t)}
                </p>
            </div>

            <div className="space-y-6">
                {/* A/B 선택지 표시 */}
                <div className="space-y-3">
                    <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">A</div>
                            <p className="text-pink-700 text-xs sm:text-sm">{question.optionA}</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">B</div>
                            <p className="text-blue-700 text-xs sm:text-sm">{question.optionB}</p>
                        </div>
                    </div>
                </div>

                {/* 6단계 A/B 선택지 점수 선택 */}
                <div className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-700 mb-3">💕 {t('lovetype.agreementQuestion', 'A와 B 중 어느 쪽에 얼마나 동의하시나요?')}</p>
                    </div>

                    <div className="flex justify-center items-center gap-2 sm:gap-4">
                        {[1, 2, 3, 4, 5, 6].map((score) => {
                            const heartInfo = getHeartInfo(score);
                            const isSelected = currentAnswer === score;

                            return (
                                <button
                                    key={score}
                                    onClick={() => handleScoreClick(score)}
                                    className={`flex flex-col items-center p-2 sm:p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${isSelected
                                        ? heartInfo.position === 'A'
                                            ? 'bg-pink-100 border-2 border-pink-500 shadow-lg'
                                            : heartInfo.position === 'B'
                                                ? 'bg-blue-100 border-2 border-blue-500 shadow-lg'
                                                : 'bg-gray-100 border-2 border-gray-500 shadow-lg'
                                        : 'hover:bg-gray-50 border-2 border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-center">
                                        {renderHeart(heartInfo.size, heartInfo.color, isSelected)}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* A-B 연결선 */}
                    <div className="relative">
                        <div className="absolute -top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 via-gray-300 to-blue-300 rounded-full"></div>
                    </div>
                </div>
            </div>

        </div>
    );
}
