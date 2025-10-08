import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
    const percentage = Math.round((current / total) * 100);
    const { t } = useTranslation();

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t('lovetype.progress', '진행률')}</span>
                <span>{current}/{total} ({percentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
