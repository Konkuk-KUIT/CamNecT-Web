import { Outlet } from 'react-router-dom';
import './styles/global.css';

// todo 4가지 공통 레이아웃 구조 (헤더 / 탭바 유무)
function App() {
  return (
    <div>
      
      <Outlet/>
    </div>
  );
}

export default App;

