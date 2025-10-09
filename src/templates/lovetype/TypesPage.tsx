import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newLoveTypes } from '../../lovetype/newLoveTypes';
import { TypeCard } from '../../components/lovetype';
import { Button } from '../../components/ui';

export function TypesPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                        {t('lovetype.allTypes')}
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        {t('lovetype.exploreAllTypes', '모든 연애 유형을 살펴보고 당신의 유형을 찾아보세요')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleStartTest}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2"
                        >
                            💕 {t('lovetype.startTest')}
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            variant="outline"
                            className="px-6 py-2"
                        >
                            {t('lovetype.goHome')}
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
                                <h4 className="font-semibold text-gray-800 mb-2">L (리더십) vs F (팔로워십)</h4>
                                <p className="text-sm text-gray-600">
                                    리더십은 관계를 주도하고 이끄는 것을, 팔로워십은 상대방을 따라가며 지지하는 것을 선호합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">C (응석부리고 싶은) vs A (응석받고 싶은)</h4>
                                <p className="text-sm text-gray-600">
                                    C는 상대방에게 귀엽게 어리광부리고 싶어하며, A는 상대방이 나를 귀엽게 받아주고 보호해주기를 원합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">R (현실적) vs P (열정적)</h4>
                                <p className="text-sm text-gray-600">
                                    현실적은 안정과 실용을, 열정적은 감정과 낭만을 중시합니다.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">O (낙관적) vs E (진지한)</h4>
                                <p className="text-sm text-gray-600">
                                    낙관적은 자유롭고 유연한 관계를, 진지한은 신중하고 깊이 있는 관계를 선호합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 mb-4">{t('lovetype.curiousAboutType', '당신의 연애 유형이 궁금하다면?')}</p>
                    <Button
                        onClick={handleStartTest}
                        size="lg"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        💕 {t('lovetype.freeTestStart', '무료 테스트 시작하기')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
