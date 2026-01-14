import { Outlet } from 'react-router-dom';
import './styles/global.css';

// todo 4가지 공통 레이아웃 구조 (헤더 / 탭바 유무)
function App() {
  return (
    // 전역 레이아웃 적용 (반응형)
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-white relative">
      <Outlet/>
    </div>
  );
}

export default App;

