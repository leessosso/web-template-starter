import React from 'react';
import { useNavigate } from 'react-router-dom';
import { newLoveTypes } from '../../lovetype/newLoveTypes';
import { TypeCard } from '../../components/lovetype';
import { Button } from '../../components/ui';

export function TypesPage() {
    const navigate = useNavigate();

    const handleTypeClick = (type: string) => {
        navigate(`/result/${type}`);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const handleStartTest = () => {
        navigate('/test');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        16가지 연애 유형
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        모든 연애 유형을 살펴보고 당신의 유형을 찾아보세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleStartTest}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2"
                        >
                            💕 테스트 시작하기
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            variant="outline"
                            className="px-6 py-2"
                        >
                            홈으로 돌아가기
                        </Button>
                    </div>
                </div>

                {/* Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {Object.values(newLoveTypes).map((loveType) => (
                        <TypeCard
                            key={loveType.code}
                            loveType={loveType}
                            onClick={() => handleTypeClick(loveType.code)}
                            className="hover:shadow-xl transition-all duration-300"
                        />
                    ))}
                </div>

                {/* Info Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-center mb-4">💡 유형별 특징</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">E (외향성) vs I (내향성)</h4>
                                <p className="text-sm text-gray-600">
                                    외향성은 활발한 소통과 새로운 경험을, 내향성은 깊이 있는 대화와 개인적 공간을 선호합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">S (감각) vs N (직관)</h4>
                                <p className="text-sm text-gray-600">
                                    감각형은 현실적이고 구체적인 것을, 직관형은 가능성과 미래를 중시합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">T (사고) vs F (감정)</h4>
                                <p className="text-sm text-gray-600">
                                    사고형은 논리적 분석을, 감정형은 조화와 배려를 우선시합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">J (판단) vs P (인식)</h4>
                                <p className="text-sm text-gray-600">
                                    판단형은 계획과 체계를, 인식형은 유연성과 즉흥성을 선호합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 mb-4">당신의 연애 유형이 궁금하다면?</p>
                    <Button
                        onClick={handleStartTest}
                        size="lg"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        💕 무료 테스트 시작하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
