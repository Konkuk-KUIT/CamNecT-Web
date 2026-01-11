import { Outlet } from 'react-router-dom';
import './styles/global.css';
import { BottomNav } from './components/BottomNav/BottomNav';

// todo 4가지 공통 레이아웃 구조 (헤더 / 탭바 유무)
function App() {
  return (
    <div>
      <BottomNav/>
      <Outlet/>
    </div>
  );
}

export default App;

