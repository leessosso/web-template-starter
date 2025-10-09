import { useTranslation } from 'react-i18next';
import type { LoveType, LoveTypeDetail } from '../../lovetype/index';
import { getLoveTypeData } from '../../lovetype/newLoveTypes';

interface TypeCardProps {
    loveType: LoveType;
    loveTypeDetail?: LoveTypeDetail | null;
    onClick?: () => void;
    className?: string;
    showDetails?: boolean;
}

export function TypeCard({ loveType, loveTypeDetail, onClick, className = '', showDetails = false }: TypeCardProps) {
    const { t } = useTranslation();
    const localizedType = getLoveTypeData(loveType.code, t) || loveType;

    return (
        <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {/* 헤더 */}
            <div className={`bg-gradient-to-r ${loveType.color} p-6 text-white`}>
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{loveType.code}</h3>
                    <h4 className="text-xl font-bold">{localizedType.title}</h4>
                </div>
            </div>

            {/* 내용 */}
            <div className="p-6">
                {/* 기본 설명 또는 소개글 */}
                {!showDetails && loveTypeDetail && (
                    <p className="text-gray-700 mb-4 leading-relaxed text-base">
                        {loveTypeDetail.introduction}
                    </p>
                )}

                {/* 기존 설명 (showDetails가 아닐 때만, loveTypeDetail이 없을 경우) */}
                {!showDetails && !loveTypeDetail && (
                    <p className="text-gray-700 mb-4 leading-relaxed text-base">
                        {localizedType.description}
                    </p>
                )}

                {showDetails && (
                    <div className="space-y-6">
                        {/* 상세 정보들 (loveTypeDetail이 있는 경우) */}
                        {loveTypeDetail && (
                            <div className="border-gray-200 space-y-6">
                                {/* 주요 제목과 소개 */}
                                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4">
                                    <h5 className="font-bold text-gray-800 mb-3 text-center text-lg">
                                        {loveTypeDetail.mainTitle}
                                    </h5>
                                    <p className="text-gray-600 text-center leading-relaxed text-base">
                                        {loveTypeDetail.introduction}
                                    </p>
                                </div>

                                {/* 기본 성향 */}
                                <div>
                                    <div className="flex items-center mb-3">
                                        <span className="text-xl mr-2">💖</span>
                                        <h5 className="font-semibold text-gray-800 text-lg">
                                            당신의 마음속 이야기: 기본적인 연애 성향
                                        </h5>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                                            {loveTypeDetail.basicTendency}
                                        </p>
                                    </div>
                                </div>

                                {/* 관계에서의 모습 */}
                                <div>
                                    <div className="flex items-center mb-3">
                                        <span className="text-xl mr-2">💌</span>
                                        <h5 className="font-semibold text-gray-800 text-lg">
                                            사랑이 피어날 때: 관계에서의 당신의 모습
                                        </h5>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                                            {loveTypeDetail.inRelationship}
                                        </p>
                                    </div>
                                </div>

                                {/* 완벽한 짝 */}
                                <div>
                                    <div className="flex items-center mb-3">
                                        <span className="text-xl mr-2">✨</span>
                                        <h5 className="font-semibold text-gray-800 text-lg">
                                            당신의 완벽한 짝: 이런 사람과 가장 빛나요
                                        </h5>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                                            {loveTypeDetail.perfectMatch}
                                        </p>
                                    </div>
                                </div>

                                {/* 마블의 한마디 */}
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                                    <div className="flex items-center mb-3">
                                        <span className="text-xl mr-2">💬</span>
                                        <h5 className="font-semibold text-gray-800 text-lg">
                                            마블의 따뜻한 한마디
                                        </h5>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line italic text-center text-base">
                                        {loveTypeDetail.marvelMessage}
                                    </p>
                                </div>

                                {/* 추가 정보 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h5 className="font-semibold text-gray-800 mb-3 text-center text-lg" style={{ color: '#6D28D9' }}>💡 더 알아보기</h5>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h6 className="font-semibold text-gray-800 mb-2 text-base">다른 유형과의 궁합</h6>
                                            <p className="text-gray-600 mb-2 text-base">
                                                {loveType.compatibleTypes.join(', ')} 유형과 특히 잘 맞습니다.
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                * 궁합은 참고용이며, 개인의 성격과 노력에 따라 달라질 수 있습니다.
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="font-semibold text-gray-800 mb-2 text-base">연애 성공 팁</h6>
                                            <p className="text-gray-600 text-base">
                                                {loveType.advice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
