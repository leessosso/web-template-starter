import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // TypeScript 관련 유연한 설정
      '@typescript-eslint/no-explicit-any': 'warn', // any 사용 시 경고만
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }], // 사용하지 않는 변수는 경고, _로 시작하면 무시
      '@typescript-eslint/no-empty-function': 'off', // 빈 함수 허용
      '@typescript-eslint/ban-ts-comment': 'warn', // @ts-ignore 등 경고만
      
      // React 관련 유연한 설정
      'react-refresh/only-export-components': 'warn', // 컴포넌트만 export 권장 (경고)
      
      // 일반 JavaScript 규칙
      'no-console': 'off', // console.log 허용
      'no-debugger': 'warn', // debugger는 경고
      'no-unused-vars': 'off', // TypeScript 규칙 사용
    },
  },
])
