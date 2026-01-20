import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

export const CoffeeChatPage = () => {
  const unreadCount = 3;
  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="커피챗"
          leftIcon="empty"
          rightActions={[
            { icon: 'coffeeChat', onClick: () => console.log('chat') }
          ]}
          showBadge={unreadCount > 0}
        />
      }
    >
      <div>CoffeeChatPage</div>
    </FullLayout>
  );
};
