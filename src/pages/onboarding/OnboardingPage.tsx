import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import { FirstSplashPage } from './FirstSplashPage';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage = () => {
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    // 메모리 누수 방지
    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <FirstSplashPage />;
  }

  return (
    <div className="absolute bottom-[120px] left-0 right-0 px-6 flex flex-col items-center gap-[10px]">
      <Button
        className="!h-[50px]"
        onClick={() => navigate("/login")}
        label="로그인" />
      <ButtonWhite
        className="!h-[50px]"
        onClick={() => navigate("/signup")}
        label="회원가입" />
    </div>
  );
};
