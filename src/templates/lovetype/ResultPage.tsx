import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { LoveTypeCode } from '../../lovetype/types';
import { newLoveTypes } from '../../lovetype/newLoveTypes';
import { getLoveTypeDetail } from '../../lovetype/loveTypeDetails';
import { TypeCard, ShareButton } from '../../components/lovetype';
import { Button } from '../../components/ui';
import { calculateLoveTypeScore, getScorePercentage } from '../../lovetype/calculator';
import { useTest } from '../../lovetype/useTest';

export function ResultPage() {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { testState, restartTest } = useTest();
    const [scorePercentage, setScorePercentage] = useState<Record<string, number> | null>(null);

    const loveTypeCode = type as LoveTypeCode;
    const loveType = newLoveTypes[loveTypeCode];
    const loveTypeDetail = getLoveTypeDetail(loveTypeCode, t);

    useEffect(() => {
        if (testState.answers.length > 0) {
            import('../../lovetype/questions').then(({ questions }) => {
                const score = calculateLoveTypeScore(testState.answers, questions);
                const percentage = getScorePercentage(score);
                setScorePercentage(percentage);
            });
        }
    }, [testState.answers]);

    const handleRestart = () => {
        restartTest();
        navigate('/test');
    };

    const handleGoHome = () => {
        navigate('/');
    };

    if (!loveType) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('lovetype.typeNotFound', '유형을 찾을 수 없습니다')}</h1>
                    <Button onClick={handleGoHome} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                        {t('lovetype.goHome', '홈으로 돌아가기')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        {t('lovetype.yourLoveType', '당신의 연애 유형')}
                    </h1>
                    <p className="text-lg text-gray-600">{t('lovetype.checkResult', '테스트 결과를 확인해보세요')}</p>
                </div>

                {/* Result Card */}
                <div className="max-w-4xl mx-auto mb-8">
                    <TypeCard
                        loveType={loveType}
                        loveTypeDetail={loveTypeDetail}
                        showDetails={true}
                        className="mb-6"
                    />
                </div>

                {/* Score Breakdown */}
                {scorePercentage && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-center mb-6">성향 분석</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: '리더십', key: 'L', color: 'from-blue-400 to-blue-600' },
                                    { label: '팔로워', key: 'F', color: 'from-indigo-400 to-indigo-600' },
                                    { label: '애정표현', key: 'C', color: 'from-pink-400 to-pink-600' },
                                    { label: '수용', key: 'A', color: 'from-green-400 to-green-600' },
                                    { label: '현실적', key: 'R', color: 'from-orange-400 to-orange-600' },
                                    { label: '열정적', key: 'P', color: 'from-red-400 to-red-600' },
                                    { label: '낙관적', key: 'O', color: 'from-yellow-400 to-yellow-600' },
                                    { label: '진지함', key: 'E', color: 'from-purple-400 to-purple-600' }
                                ].map(({ label, key, color }) => (
                                    <div key={key} className="text-center">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">{label}</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                            <div
                                                className={`bg-gradient-to-r ${color} h-3 rounded-full transition-all duration-1000`}
                                                style={{ width: `${scorePercentage[key]}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600">{scorePercentage[key]}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <ShareButton type={loveTypeCode} />
                    <Button
                        onClick={handleRestart}
                        variant="outline"
                        className="px-6 py-2"
                    >
                        다시 테스트하기
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
        </div>
    );
}
