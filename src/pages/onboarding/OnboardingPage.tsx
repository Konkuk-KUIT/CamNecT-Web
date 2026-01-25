import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import { FirstSplashPage } from './FirstSplashPage';

import { Graphic1, Graphic2, Graphic3 } from './Graphics';

const ONBOARDING_DATA = [
  {
    title: "동문과의 커피챗",
    description: "동기부터 선배까지\n관심사로 연결된 동문들과 바로 시작하는 커피챗",
    icon: <Graphic1 />,
  },
  {
    title: "대외활동 탐색",
    description: "복잡한 검색은 그만\n대외활동 찾기와 팀 매칭까지 한 번에",
    icon: <Graphic2 />,
  },
  {
    title: "검증된 커뮤니티",
    description: "인증된 동문 정보,\n확인부터 질문까지 간편하게",
    icon: <Graphic3 />,
  },
];

export const OnboardingPage = () => {
  const navigate = useNavigate();
  
  const [showSplash, setShowSplash] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // 3초마다 페이지 전환 (스플래시가 끝난 후 작동)
  useEffect(() => {
    if (showSplash) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ONBOARDING_DATA.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showSplash]);

  if (showSplash) {
    return <FirstSplashPage />;
  }

  return (
    <div className="absolute inset-0 bg-white px-[25px] flex flex-col items-center overflow-hidden">
      {/* 텍스트 영역 */}
      <div className="mt-[100px] w-full text-left transition-all duration-500">
        <h1 className="text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 whitespace-pre-line">
          {ONBOARDING_DATA[currentIndex].title}
        </h1>
        <p className="mt-[10px] text-m-14 text-gray-650 tracking-[-0.56px] leading-[140%] whitespace-pre-line">
          {ONBOARDING_DATA[currentIndex].description}
        </p>
      </div>

      {/* 이미지/SVG 영역 */}
      <div className="flex-1 flex items-center justify-center w-full transition-opacity duration-500">
        {ONBOARDING_DATA[currentIndex].icon}
      </div>

      {/* 페이지네이션 도트 */}
      <div className="flex gap-[8px] mb-[40px]">
        {ONBOARDING_DATA.map((_, index) => (
          <div
            key={index}
            className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-primary" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="w-full max-w-[430px] flex flex-col gap-[12px] mb-[60px] relative z-10 px-6">
        <Button
          className="!h-[50px] w-full"
          onClick={() => navigate("/login")}
          label="로그인" 
        />
        <ButtonWhite
          className="!h-[50px] w-full"
          onClick={() => navigate("/signup")}
          label="회원가입" 
        />
      </div>
    </div>
  );
};
