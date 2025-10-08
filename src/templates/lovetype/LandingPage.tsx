import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

export function LandingPage() {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/test');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                            LoveType
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 mb-4">
                            나만의 연애 유형을 알아보세요
                        </p>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            리더십, 애정표현, 연애관, 태도 4가지 차원으로 분석하는 연애 유형 테스트로 당신의 연애 스타일을 확인해보세요.
                            <br />
                            총 30개의 질문으로 정확한 분석을 제공합니다.
                        </p>
                    </div>

                    <Button
                        onClick={handleStartTest}
                        size="lg"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        💕 테스트 시작하기
                    </Button>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">리더십</h3>
                        <p className="text-gray-600 text-sm">
                            연애에서 주도권을 잡는지 따라가는지 분석
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">💕</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">애정표현</h3>
                        <p className="text-gray-600 text-sm">
                            애정을 적극적으로 표현하는지 수용하는지 분석
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">연애관</h3>
                        <p className="text-gray-600 text-sm">
                            현실적인 연애를 추구하는지 열정적인지 분석
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">😊</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">태도</h3>
                        <p className="text-gray-600 text-sm">
                            낙관적인지 진지한지 연애에 대한 태도 분석
                        </p>
                    </div>
                </div>

                {/* Test Info */}
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">테스트 안내</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-pink-600">📝 테스트 구성</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• 총 30개의 질문</li>
                                <li>• 각 질문당 5점 척도</li>
                                <li>• 약 5-10분 소요</li>
                                <li>• 16가지 연애 유형 중 결과</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-purple-600">💡 결과 내용</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• 연애 스타일 분석</li>
                                <li>• 장단점 및 특징</li>
                                <li>• 궁합 좋은 유형</li>
                                <li>• 연애 조언 및 팁</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">지금 바로 시작해보세요!</p>
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
