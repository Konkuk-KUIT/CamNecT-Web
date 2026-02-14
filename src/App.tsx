import { Outlet } from 'react-router-dom';
import PopUp from './components/Pop-up';
import { ScrollToTop } from './components/ScrollToTop';
import { useCommunityErrorPopupStore } from './store/useCommunityErrorPopupStore';
import './styles/global.css';

// todo 4가지 공통 레이아웃 구조 (헤더 / 탭바 유무)
function App() {
  const { popUpConfig, clearPopUpConfig } = useCommunityErrorPopupStore();

  return (
    // 전역 레이아웃 적용 (반응형)
    <div className="w-full max-w-[430px] mx-auto min-h-[100dvh] bg-white relative shadow-lg">
      <ScrollToTop/>
      <Outlet/>
      {popUpConfig && (
        <PopUp
          isOpen={true}
          type="confirm"
          title={popUpConfig.title}
          content={popUpConfig.content}
          onClick={clearPopUpConfig}
        />
      )}
    </div>
  );
}
export default App;
