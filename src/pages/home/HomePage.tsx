import { FullLayout } from '../../layouts/FullLayout';
import { HomeHeader } from '../../layouts/components/HomeHeader';

export const HomePage = () => {
  return (
    <FullLayout
      headerSlot={
        <HomeHeader/>
      }
    >
      <div>HomePage</div>
    </FullLayout>
  );
};
