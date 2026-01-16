import { FullLayout } from '../../layouts/FullLayout';
import { HomeHeader } from '../../layouts/headers/HomeHeader';

export const HomePage = () => {
  const unreadCount = 3;

  return (
    <FullLayout
      headerSlot={
        <>
          <HomeHeader showBadge={unreadCount > 0} />
          {/* MainHeader 뱃지 사용 예시:
          <MainHeader
            title='홈'
            rightActions={[{ icon: 'alarm' }]}
            showBadge={unreadCount > 0}
          />
          */}
        </>
      }
    >
      <div>HomePage</div>
    </FullLayout>
  );
};
