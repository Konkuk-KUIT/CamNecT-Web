import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/components/MainHeader';

export const ActivityPage = () => {
  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="대외활동"
          leftIcon="empty"
          rightActions={[
            { icon: 'search', onClick: () => console.log('search') }
          ]}
        />
      }
    >
      <div>ActivityPage</div>
    </FullLayout>
  );
};
