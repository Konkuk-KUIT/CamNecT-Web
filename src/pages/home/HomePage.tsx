import { FullLayout } from '../../layouts/FullLayout';
import { HomeHeader } from '../../layouts/headers/HomeHeader';
import Popup from "../../components/Pop-up";

export const HomePage = () => {
  const unreadCount = 3;

  return (
    <FullLayout
      headerSlot={
        <HomeHeader showBadge={unreadCount > 0} />
      }
    >
      <Popup
        type="info"
        title='질문을 등록하시겠습니까?'
        isOpen={false}
        content="등록된 질문은 커뮤니티 내에서 \n다른 사용자들이 확인할 수 있습니다."
      />
      <Popup
        type="confirm"
        title='회원전용 콘텐츠 입니다'
        content="로그인 하고 모든 기능을 확인해보세요!"
        isOpen={false}
        buttonText='로그인 후 계속 읽기'
      />
      <Popup
        type="warning"
        title='작성된 내용이 있습니다.\n삭제하시겠습니까?'
        isOpen={true}
        content="삭제된 내용은 복구 불가능합니다."
        
      />
      <Popup
        type="loading"
        isOpen={false}
      />
    </FullLayout>
  );
};
