import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

export const MyPage = () => {
  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="마이페이지"
          leftAction={{ icon: 'mypageOption', onClick: () => console.log('mypage') }}
          rightActions={[
            { icon: 'setting', onClick: () => console.log('setting') },
          ]}
        />
      }
    >
      <div>MyPage</div>
    </FullLayout>
  );
};
