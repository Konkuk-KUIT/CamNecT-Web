import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";
import PopUp from "../../components/Pop-up";
import { usePwaInstall } from "../../hooks/usePwaInstall";


export const SchoolStandByStep = () => {
    const navigate = useNavigate();
    const { isInstallable, install } = usePwaInstall();

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleInstallClick = async () => {
        if (isInstallable) {
            await install();
        } else {
            setIsPopupOpen(true);
        }
    }

    return (
        <div className="flex flex-col overflow-hidden absolute inset-0 bg-white px-[25px]">
            <h1 className="flex-none relative z-10 pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 ">
                학교 인증이 진행 중입니다
            </h1>
            
            <h2 className="mt-[15px] text-m-16 text-gray-650 tracking-[-0.56px] leading-[140%]">
                인증 진행까지 영업일 기준 3~5일 정도<br/>
                소요될 수 있습니다<br />
            </h2>

            <h2 className="mt-[10px] text-m-16 text-gray-650 tracking-[-0.56px] leading-[140%]">
                완료 알림은 인증한 이메일로 발송됩니다
            </h2>
            
            <div className="flex-1" />
            
            <div className="absolute bottom-[60px] flex-none relative z-10 w-full flex flex-col items-center gap-[10px]">
                <ButtonWhite label="앱 설치"
                    onClick={handleInstallClick} />
                <Button 
                    label="확인" 
                    type="button"
                    onClick={() => navigate('/login')}
                />
            </div>
                    
            <PopUp
                isOpen={isPopupOpen}
                type="confirm"
                title="알림"
                content="이미 설치되어 있거나,\n설치를 지원하지 않는 브라우저입니다."
                buttonText="닫기"
                onClick={() => setIsPopupOpen(false)}
            />
        </div>
    )
}