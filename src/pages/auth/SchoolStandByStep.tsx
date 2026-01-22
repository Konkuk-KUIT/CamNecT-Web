import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export const SchoolStandByStep = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col overflow-hidden absolute inset-0 bg-white px-[25px]">
            <h1 className="flex-none relative z-10 pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 ">
                학교 인증이 진행 중입니다
            </h1>
            
            <h2 className="mt-[15px] text-m-16 text-gray-650 tracking-[-0.56px] leading-[140%]">
                인증 진행까지 영업일 기준 3~5일 정도<br/>
                소요될 수 있습니다
            </h2>
            
                <div className="flex-1" />
                
                <div className="absolute bottom-[60px] flex-none relative z-10 w-full flex justify-center">
                    <Button 
                        label="확인" 
                        type="button"
                        onClick={() => navigate('/login')}
                    />
                </div>
        </div>
    )
}