import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";

interface InterestsStepProps {
    onNext: () => void;
}

export const InterestsStep = ({ onNext }: InterestsStepProps) => {
    return (
        <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
            <h1 className="flex-none relative z-10 pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900">
                관심분야를 알려주세요!
            </h1>

            

            
            <div className="flex-none pb-[60px] w-full flex justify-center">
                <div className="flex items-center gap-[10px] w-full max-w-[325px]">
                    <ButtonWhite
                        label="건너뛰기"
                        className="flex-1 !h-[50px] !rounded-[10px]"
                    />

                    <Button
                        label="다음"
                        className="flex-1 !h-[50px] !rounded-[10px]"
                        onClick={onNext}
                    />
                </div>
            </div>
        </div>
    )
}