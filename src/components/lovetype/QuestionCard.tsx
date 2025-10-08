import type React from 'react';
import type { Question } from '../../lovetype/index';

interface QuestionCardProps {
    question: Question;
    onAnswer: (score: number) => void;
    currentAnswer?: number;
    className?: string;
}

export function QuestionCard({ question, onAnswer, currentAnswer, className = '' }: QuestionCardProps) {
    const handleScoreClick = (score: number) => {
        onAnswer(score);
    };

    const getScoreLabel = (score: number) => {
        switch (score) {
            case 1: return '전혀 아니다';
            case 2: return '아니다';
            case 3: return '보통이다';
            case 4: return '그렇다';
            case 5: return '매우 그렇다';
            default: return '';
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    질문 {question.id}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {question.text}
                </p>
            </div>

            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((score) => (
                    <button
                        key={score}
                        onClick={() => handleScoreClick(score)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${currentAnswer === score
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{score}점</span>
                            <span className="text-sm text-gray-600">{getScoreLabel(score)}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    가장 자신에게 맞는 답변을 선택해주세요
                </p>
            </div>
        </div>
    );
}
