import { Outlet } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import './styles/global.css';
import { useSocketInitializer } from './hooks/useSocketInitializer';

function App() {
  useSocketInitializer(); 

  return (
    // 전역 레이아웃 적용 (반응형)
    <div className="w-full max-w-[430px] mx-auto min-h-[100dvh] bg-white relative shadow-lg">
      <ScrollToTop/>
      <Outlet/>
    </div>
  );
}
export default App;
