import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAuthStore } from './store/useAuthStore';
import './styles/global.css'

const queryClient = new QueryClient(); // 서버 데이터 저장소 -> 저장 / 캐싱 / 관리

// 개발 편의를 위한 임시 로그인 주입 (실제 로그인 연동 후 제거)
const state = useAuthStore.getState();
if (!state.isAuthenticated && import.meta.env.MODE === 'development') {
  state.setLogin('dev-token', {
    id: 'dev-user-001',
    name: '개발용 유저',
  });
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </QueryClientProvider>
)
