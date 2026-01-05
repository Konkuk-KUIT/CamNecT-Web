import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// todo 라우터 구조 import문 들어올 예정
import App from './App.tsx'
import './styles/global.css'

const queryClient = new QueryClient(); // 서버 데이터 저장소 -> 저장 / 캐싱 / 관리

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>
)