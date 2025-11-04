import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Box, CircularProgress } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 인증 상태 초기화
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // 현재 경로를 저장하고 로그인 페이지로 리다이렉트
      const returnUrl = location.pathname !== '/' ? `?returnUrl=${encodeURIComponent(location.pathname)}` : '';
      navigate(`/login${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname]);

  // 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 인증되지 않은 경우 null 반환 (useEffect에서 리다이렉트 처리)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
