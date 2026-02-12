import { Outlet } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { useUnreadCountQuery } from './hooks/useChatQuery';
import { useSocketInitializer } from './hooks/useSocketInitializer';
import './styles/global.css';

function App() {
  useSocketInitializer(); 
  useUnreadCountQuery(); // 전역 안 읽은 개수 동기화

  return (
    // 전역 레이아웃 적용 (반응형)
    <div className="w-full max-w-[430px] mx-auto min-h-[100dvh] bg-white relative shadow-lg">
      <ScrollToTop/>
      <Outlet/>
    </div>
  );
}
export default App;
