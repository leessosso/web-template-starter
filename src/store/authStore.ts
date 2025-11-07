import { create } from 'zustand';
import type { User, Theme, ThemeColor } from '../models/User';
import { signIn, signUp, signOut, onAuthStateChange, getCurrentUser } from '../services/authService';
import { userService } from '../services/userService';
import { logger } from '../utils/logger';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    churchName: string,
    churchAddress?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  updateUserTheme: (theme?: Theme, themeColor?: ThemeColor) => Promise<void>;
  checkAuth: () => Promise<void>;
  initializeAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // 초기 로딩 상태로 시작
  isAuthenticated: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await signIn(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      set({
        error: message,
        isLoading: false,
      });
      throw error;
    }
  },

  signUp: async (
    email: string,
    password: string,
    displayName: string,
    churchName: string,
    churchAddress: string = ''
  ) => {
    set({ isLoading: true, error: null });
    try {
      const user = await signUp(
        email,
        password,
        displayName,
        churchName,
        churchAddress
      );
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      set({
        error: message,
        isLoading: false,
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await signOut();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
      set({
        error: message,
        isLoading: false,
      });
      throw error;
    }
  },

  updateUser: (updates: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  updateUserTheme: async (theme?: Theme, themeColor?: ThemeColor) => {
    const state = useAuthStore.getState();
    if (!state.user) {
      throw new Error('로그인이 필요합니다.');
    }

    try {
      await userService.updateUserTheme(state.user.uid, theme, themeColor);

      // 로컬 상태 업데이트
      set((currentState) => ({
        user: currentState.user ? {
          ...currentState.user,
          theme: theme ?? currentState.user.theme,
          themeColor: themeColor ?? currentState.user.themeColor,
        } : null,
      }));
    } catch (error) {
      logger.error('테마 설정 업데이트 실패', error);
      throw error;
    }
  },

  initializeAuth: () => {
    // 인증 상태 변경 리스너 설정
    const unsubscribe = onAuthStateChange((user) => {
      logger.debug('인증 상태 변경', user ? '로그인됨' : '로그아웃됨', user?.email);
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      });
    });

    // 클린업 함수 반환 (필요시 사용)
    return unsubscribe;
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // 현재 인증 상태를 즉시 확인
      const user = await getCurrentUser();
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    } catch (error) {
      logger.error('인증 체크 실패', error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
