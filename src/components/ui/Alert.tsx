import React from 'react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Alert({
  type = 'info',
  title,
  children,
  className = '',
  onClose
}: AlertProps) {
  const typeStyles = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-400',
      title: 'text-blue-800',
      content: 'text-blue-700',
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-400',
      title: 'text-green-800',
      content: 'text-green-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      content: 'text-yellow-700',
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-400',
      title: 'text-red-800',
      content: 'text-red-700',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className={`border-l-4 p-4 ${styles.container} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'info' && <span className={`text-lg ${styles.icon}`}>ℹ</span>}
          {type === 'success' && <span className={`text-lg ${styles.icon}`}>✓</span>}
          {type === 'warning' && <span className={`text-lg ${styles.icon}`}>⚠</span>}
          {type === 'error' && <span className={`text-lg ${styles.icon}`}>✕</span>}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${styles.content} ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className={`inline-flex text-gray-400 hover:text-gray-600`}
            >
              <span className="sr-only">닫기</span>
              <span>×</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
