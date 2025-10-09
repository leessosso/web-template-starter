import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui';

export function LandingPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleStartTest = () => {
        navigate('/test');
    };

    return (
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="container mx-auto px-4 py-8 md:py-12 pb-12 md:pb-16">
                {/* Hero Section */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="mb-8">
                        <div className="mb-6">
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                                LoveType
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
                            💖 {t('lovetype.subtitle')} 💖
                        </p>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            {t('lovetype.description')}
                            <br />
                            <span className="text-pink-600 font-semibold">{t('lovetype.questionCount', '총 24개의 질문')}</span>{t('lovetype.accurateAnalysis', '으로 정확한 분석을 제공합니다.')}.
                        </p>
                    </div>

                    <div className="relative">
                        <Button
                            onClick={handleStartTest}
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                            💕 {t('lovetype.startTest')} 💕
                        </Button>
                    </div>
                </div>

                {/* Test Info */}
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-pink-600">📝 {t('lovetype.testStructure', '테스트 구성')}</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• {t('lovetype.totalQuestions', '총 24개의 질문')}</li>
                                <li>• {t('lovetype.scoreScale', '각 질문당 6점 척도')}</li>
                                <li>• {t('lovetype.duration', '약 5-10분 소요')}</li>
                                <li>• {t('lovetype.resultTypes', '16가지 연애 유형 중 결과')}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-purple-600">💡 {t('lovetype.resultContent', '결과 내용')}</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• {t('lovetype.loveStyleAnalysis', '연애 스타일 분석')}</li>
                                <li>• {t('lovetype.strengthsWeaknesses', '장단점 및 특징')}</li>
                                <li>• {t('lovetype.compatibleTypes', '궁합 좋은 유형')}</li>
                                <li>• {t('lovetype.loveAdvice', '연애 조언 및 팁')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
