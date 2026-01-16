import { FullLayout } from '../../layouts/FullLayout';
import { LoginHeader } from '../../layouts/headers/LoginHeader';

export const LoginPage = () => {
  return (
    <FullLayout
      headerSlot={
        <LoginHeader/>
      }
    >
      <div>
        <h1>LoginPage</h1>
      </div>
    </FullLayout>
  );
};
