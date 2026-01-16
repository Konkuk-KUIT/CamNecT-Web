import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

export const CoffeeChatPage = () => {
  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="커피챗"
          leftIcon="empty"
          rightActions={[
            { icon: 'coffeeChat', onClick: () => console.log('chat') },
          ]}
        />
      }
    >
      <div>CoffeeChatPage</div>
    </FullLayout>
  );
};
