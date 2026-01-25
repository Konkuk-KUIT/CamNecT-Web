import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

export const Schedule = () => {
  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="일정"
        />
      }
    >
      <div>Schedule</div>
    </FullLayout>
  );
};
