import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/components/MainHeader';

export const AlumniPage = () => {
  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="동문 탐색"
          leftIcon="empty"
        />
      }
    >
      <div>AlumniPage</div>
    </FullLayout>
  );
};
