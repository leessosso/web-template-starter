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
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
      case 5: return 'E';
      default: return '';
    }
  };

  const getHeartIntensity = (score: number) => {
    // A 선택지 (1-3점): 왼쪽이 강한 A, 오른쪽이 약한 A
    // B 선택지 (4-5점): 왼쪽이 약한 B, 오른쪽이 강한 B
    if (score <= 3) {
      return {
        type: 'A',
        intensity: score, // 1=강한A, 2=중간A, 3=약한A
        hearts: [3, 2, 1] // 왼쪽부터 큰 하트
      };
    } else {
      return {
        type: 'B', 
        intensity: score - 3, // 1=약한B, 2=강한B
        hearts: [1, 2, 3] // 왼쪽부터 작은 하트
      };
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

            <div className="space-y-4">
                {/* A 선택지 (1-3점) */}
                <div className="space-y-2">
                    <div className="text-center">
                        <span className="text-lg font-semibold text-gray-700">A. 네</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3].map((score) => {
                            const heartData = getHeartIntensity(score);
                            return (
                                <button
                                    key={score}
                                    onClick={() => handleScoreClick(score)}
                                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                                        currentAnswer === score
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                                    }`}
                                >
                                    <div className="flex items-center space-x-1 mb-2">
                                        {heartData.hearts.map((size, index) => (
                                            <svg
                                                key={index}
                                                className={`text-pink-400 ${
                                                    size === 3 ? 'w-6 h-6' : 
                                                    size === 2 ? 'w-5 h-5' : 'w-4 h-4'
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                        {score === 1 ? '강한 A' : score === 2 ? '중간 A' : '약한 A'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* B 선택지 (4-5점) */}
                <div className="space-y-2">
                    <div className="text-center">
                        <span className="text-lg font-semibold text-gray-700">B. 아니요</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                        {[4, 5].map((score) => {
                            const heartData = getHeartIntensity(score);
                            return (
                                <button
                                    key={score}
                                    onClick={() => handleScoreClick(score)}
                                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                                        currentAnswer === score
                                            ? 'border-cyan-500 bg-cyan-50'
                                            : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-25'
                                    }`}
                                >
                                    <div className="flex items-center space-x-1 mb-2">
                                        {heartData.hearts.map((size, index) => (
                                            <svg
                                                key={index}
                                                className={`text-cyan-400 ${
                                                    size === 3 ? 'w-6 h-6' : 
                                                    size === 2 ? 'w-5 h-5' : 'w-4 h-4'
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                        {score === 4 ? '약한 B' : '강한 B'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    💕 하트 크기로 강도를 표현합니다
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    A(네)는 핑크색, B(아니요)는 청록색으로 표시됩니다
                </p>
            </div>
        </div>
    );
}
