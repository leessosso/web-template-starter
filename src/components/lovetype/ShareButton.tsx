import { useState } from 'react';
import type { MBTIType } from '../../lovetype/index';

interface ShareButtonProps {
    type: MBTIType;
    className?: string;
}

export function ShareButton({ type, className = '' }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareText = `나의 연애 유형은 ${type}입니다! 당신의 연애 유형도 확인해보세요 💕`;
        const shareUrl = window.location.origin;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '나의 연애 유형 테스트 결과',
                    text: shareText,
                    url: shareUrl
                });
            } catch (error) {
                console.log('공유 취소됨');
            }
        } else {
            // 클립보드에 복사
            try {
                await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('클립보드 복사 실패:', error);
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 ${className}`}
        >
            {copied ? (
                <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    복사됨!
                </>
            ) : (
                <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    결과 공유하기
                </>
            )}
        </button>
    );
}
