import React from 'react';
import { Button } from '../ui/Button';

interface HeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  primaryButton?: {
    text: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  className?: string;
}

export function Hero({
  badge,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  backgroundImage,
  className = '',
}: HeroProps) {
  const heroClasses = backgroundImage
    ? `relative bg-cover bg-center bg-no-repeat ${className}`
    : `bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`;

  const overlayClasses = backgroundImage
    ? 'absolute inset-0 bg-black bg-opacity-50'
    : '';

  return (
    <section className={heroClasses}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className={overlayClasses} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {badge && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white backdrop-blur-sm mb-8">
              {badge}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl sm:text-2xl text-white text-opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryButton && (
              <Button
                variant="primary"
                size="lg"
                onClick={primaryButton.onClick}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                {primaryButton.text}
              </Button>
            )}
            {secondaryButton && (
              <Button
                variant="outline"
                size="lg"
                onClick={secondaryButton.onClick}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
