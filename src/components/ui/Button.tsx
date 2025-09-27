import React from 'react';
import { useAnalytics } from '../../analytics';
import { useClarity } from '../../analytics/useClarity';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  analyticsTracking?: {
    eventName: string;
    eventCategory?: string;
    eventLabel?: string;
    eventValue?: number;
  };
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  analyticsTracking,
  onClick,
  ...props
}: ButtonProps) {
  const { trackEvent } = useAnalytics();
  const { trackEvent: trackClarityEvent, isEnabled: isClarityEnabled } = useClarity();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Google Analytics 이벤트 추적
    if (analyticsTracking) {
      trackEvent({
        category: analyticsTracking.eventCategory || 'button_click',
        action: analyticsTracking.eventName,
        label: analyticsTracking.eventLabel,
        ...(analyticsTracking.eventValue !== undefined && { value: analyticsTracking.eventValue }),
      });
    }

    // Microsoft Clarity 이벤트 추적 (버튼 클릭)
    if (analyticsTracking?.eventName && isClarityEnabled) {
      trackClarityEvent('button_click', {
        button_name: analyticsTracking.eventName,
        button_label: analyticsTracking.eventLabel,
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }

    // 원래 onClick 핸들러 호출
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:ring-offset-2',
    secondary: 'bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-border/50 focus-visible:ring-2 focus-visible:ring-offset-2',
    outline: 'border border-border bg-background text-foreground hover:bg-muted/50 focus-visible:ring-border/50 focus-visible:ring-2 focus-visible:ring-offset-2',
    ghost: 'text-foreground hover:bg-muted/50 focus-visible:ring-border/50 focus-visible:ring-2 focus-visible:ring-offset-2',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
