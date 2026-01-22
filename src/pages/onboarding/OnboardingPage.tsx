import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import { FirstSplashPage } from './FirstSplashPage';

export const OnboardingPage = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    // 메모리 누수 방지
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <FirstSplashPage />;
  }

  return (
    <div className="absolute bottom-[120px] left-0 right-0 px-6 flex flex-col items-center gap-[10px]">
      <Button
        className="!h-[50px]"
        label="로그인" />
      <ButtonWhite
        className="!h-[50px]"
        label="회원가입" />
    </div>
  );
};
