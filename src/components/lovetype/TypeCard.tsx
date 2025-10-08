import type { LoveType } from '../../lovetype/index';

interface TypeCardProps {
    loveType: LoveType;
    onClick?: () => void;
    className?: string;
    showDetails?: boolean;
}

export function TypeCard({ loveType, onClick, className = '', showDetails = false }: TypeCardProps) {
    return (
        <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${className}`}
            onClick={onClick}
        >
            {/* 헤더 */}
            <div className={`bg-gradient-to-r ${loveType.color} p-6 text-white`}>
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{loveType.code}</h3>
                    <h4 className="text-lg font-semibold mb-1">{loveType.title}</h4>
                    <p className="text-sm opacity-90">{loveType.nickname}</p>
                </div>
            </div>

            {/* 내용 */}
            <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                    {loveType.description}
                </p>

                {showDetails && (
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold text-gray-800 mb-2">연애 스타일</h5>
                            <p className="text-sm text-gray-600">{loveType.loveStyle}</p>
                        </div>

                        <div>
                            <h5 className="font-semibold text-gray-800 mb-2">장점</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                {loveType.strengths.map((strength, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-2"></span>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-gray-800 mb-2">주의할 점</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                                {loveType.challenges.map((challenge, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                                        {challenge}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-gray-800 mb-2">궁합 좋은 유형</h5>
                            <div className="flex flex-wrap gap-2">
                                {loveType.compatibleTypes.map((type) => (
                                    <span
                                        key={type}
                                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h5 className="font-semibold text-gray-800 mb-2">연애 조언</h5>
                            <p className="text-sm text-gray-600 italic">"{loveType.advice}"</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
