import { useNavigate } from "react-router-dom";
import type { SchoolInfoResponse } from "../../api-types/authApiTypes";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";

// 학교 인증 정보 표시 컴포넌트
const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col items-start gap-[3px]">
        <p className="text-r-14 text-gray-650 tracking-[-0.56px]">{label}</p>
        <p className="text-m-16 text-gray-750 tracking-[-0.4px] whitespace-pre-wrap break-all">
            {value}
        </p>
    </div>
);

// 학교 인증 완료 화면 
// todo 인증 거부 화면 / 재인증은 추후에 구현
export const SchoolCompletion = () => {
    const navigate = useNavigate();

    // todo API 응답값을 대입 
    const mockData: SchoolInfoResponse = {
        name: "박원빈",
        studentId: "A3291304",
        univ: "한국대학교",
        major: "병아리성별감별학과"
    };
    
    return (
        <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
            <h1 className="pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 flex-none relative z-10">
                인증이 완료되었습니다!
            </h1>

            <h2 className="pt-[10px] text-m-14 text-gray-750 tracking-[-0.56px] leading-[140%]">
                인증하신 정보가 맞는지 확인해주세요<br/>
                입력하신 정보가 일치하지 않는 경우 재인증을 해주세요
            </h2>  
            
            <div className="mt-[60px] grid grid-cols-2 gap-y-[40px] gap-x-[10px] w-full">
                <InfoItem label="이름" value={mockData.name} />
                <InfoItem label="학번" value={mockData.studentId} />
                <InfoItem label="대학교" value={mockData.univ} />
                <InfoItem label="학과" value={mockData.major} />
            </div>

            <div className="flex-1" />
            
            <div className="flex-none pb-[60px]">
                <div className="flex flex-col items-center gap-[10px]">
                    <ButtonWhite label = "재인증" />
                    <Button 
                        label="시작하기"
                        onClick={() => navigate('/home')}
                    />
                </div>
            </div>
        </div>
    )
}   