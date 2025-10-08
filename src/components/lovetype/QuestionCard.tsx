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

    const getIntensityInfo = (score: number) => {
        // 6단계: 강한A(1) → 중간A(2) → 약한A(3) → 약한B(4) → 중간B(5) → 강한B(6)
        const intensityMap = {
            1: { type: 'A', label: '강한 A', points: 3, color: 'pink' },
            2: { type: 'A', label: '중간 A', points: 2, color: 'pink' },
            3: { type: 'A', label: '약한 A', points: 1, color: 'pink' },
            4: { type: 'B', label: '약한 B', points: 1, color: 'cyan' },
            5: { type: 'B', label: '중간 B', points: 2, color: 'cyan' },
            6: { type: 'B', label: '강한 B', points: 3, color: 'cyan' }
        };
        return intensityMap[score as keyof typeof intensityMap];
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

            <div className="space-y-6">
                {/* A/B 선택지 표시 */}
                <div className="space-y-4">
                    <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">A</div>
                            <div>
                                <p className="font-semibold text-pink-800 mb-1">A 선택지</p>
                                <p className="text-pink-700 text-sm">질문에 해당하는 A 선택지 내용이 여기에 표시됩니다</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">B</div>
                            <div>
                                <p className="font-semibold text-cyan-800 mb-1">B 선택지</p>
                                <p className="text-cyan-700 text-sm">질문에 해당하는 B 선택지 내용이 여기에 표시됩니다</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6단계 강도 선택 */}
                <div className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-700 mb-3">어느 쪽에 더 가까운지 강도를 선택해주세요</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        {[1, 2, 3, 4, 5, 6].map((score) => {
                            const intensityInfo = getIntensityInfo(score);
                            const isSelected = currentAnswer === score;

                            return (
                                <button
                                    key={score}
                                    onClick={() => handleScoreClick(score)}
                                    className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${isSelected
                                        ? intensityInfo.color === 'pink'
                                            ? 'bg-pink-100 border-2 border-pink-500'
                                            : 'bg-cyan-100 border-2 border-cyan-500'
                                        : 'hover:bg-gray-50 border-2 border-transparent'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1">
                                        {isSelected ? (
                                            <div className={`w-4 h-4 rounded-full ${intensityInfo.color === 'pink' ? 'bg-pink-500' : 'bg-cyan-500'
                                                }`} />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium ${isSelected
                                        ? intensityInfo.color === 'pink' ? 'text-pink-700' : 'text-cyan-700'
                                        : 'text-gray-500'
                                        }`}>
                                        {intensityInfo.label}
                                    </span>
                                    <span className={`text-xs ${isSelected
                                        ? intensityInfo.color === 'pink' ? 'text-pink-600' : 'text-cyan-600'
                                        : 'text-gray-400'
                                        }`}>
                                        {intensityInfo.points}점
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* 연결선 */}
                    <div className="relative">
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 via-gray-200 to-cyan-300"></div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    💕 A와 B 선택지 중 어느 쪽에 더 가까운지 강도를 선택해주세요
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    왼쪽으로 갈수록 강한 A, 오른쪽으로 갈수록 강한 B입니다
                </p>
            </div>
        </div>
    );
}
