import { FullLayout } from '../../layouts/FullLayout';
import { LoginHeader } from '../../layouts/components/LoginHeader';

export const SignUpPage = () => {
  return (
    <FullLayout
      headerSlot={
        <LoginHeader/>
      }
    >
      <div></div>
    </FullLayout>
  );
};
