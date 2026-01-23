import { useNavigate, useSearchParams } from 'react-router-dom';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { LoginHeader } from '../../layouts/headers/LoginHeader';
import { EmailVerificationStep } from './EmailVerificationStep';
import { InterestsStep } from './InterestsStep';
import { ProfileStep } from './ProfileStep';
import { SchoolCompletion } from './SchoolCompletion';
import { SchoolStandByStep } from './SchoolStandByStep';
import { SchoolVerificationStep } from './SchoolVerificationStep';
import { TermsStep } from './TermsStep';
import { UserInfoStep } from './UserInfoStep';

// 회원가입 단계별 페이지
export const SignUpPage = () => {

  // 파라미터로 단계별 구현
  // 전역 상태로 뒤로가도 상황 기억
  // navigate로 뒤로가기 구현
  
  const navigate = useNavigate();
  // 회원가입 단계별 쿼리파라미터
  const [searchParams] = useSearchParams();
  const step = Number(searchParams.get('step')) || 1;

  // 화면 이동 함수
  const goToStep = (nextStep: number) => {
    navigate(`/signup?step=${nextStep}`);
  };

  const goBack = () => {
    if (step === 1) {
      navigate('/login');
    } else {
      goToStep(step - 1);
    }
  }

  // todo 주소창에 한번에 쳐서 갔을때 못가도록 방어
  // todo 인증 거부 화면은 추후에 생각 
  return (
    <>
      {step < 8 ? (
        <HeaderLayout
          headerSlot={
            <LoginHeader onBack={goBack} />
          }
        >
            {step === 1 && <TermsStep onNext = {() => goToStep(2)} />}
            {step === 2 && <UserInfoStep onNext = {() => goToStep(3)} />}
            {step === 3 && <EmailVerificationStep onNext = {() => goToStep(4)} />}
            {step === 4 && <SchoolVerificationStep onNext = {() => goToStep(5)} />}
            {step === 5 && <ProfileStep onNext = {() => goToStep(6)} />}
            {step === 6 && <InterestsStep onNext = {() => goToStep(7)} />}
            {step === 7 && <SchoolStandByStep/>}
        </HeaderLayout>
      ) : (
        <SchoolCompletion />
      )}
    </>
  );
};
