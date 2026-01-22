import { zodResolver } from '@hookform/resolvers/zod';
import type { ButtonHTMLAttributes } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
import Button from '../../components/Button';
import SingleInput from '../../components/common/SingleInput';
import { useSignupStore } from '../../store/useSignupStore';

type SmallButtonProps = {
  label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SmallButton = ({ label, className = '', disabled, type, ...props }: SmallButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`
        w-[74px] h-[48px] rounded-[5px] flex items-center justify-center 
        text-white text-r-14 transition-colors
        ${disabled 
          ? 'bg-gray-150 text-gray-400 cursor-not-allowed' 
          : 'bg-primary cursor-pointer hover:bg-green-100'
        }
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
};

export default SmallButton;

interface EmailVerificationStepProps {
    onNext: () => void;
}

// todo 이메일 토큰 요구하는 API 구현
// 이메일 인증 단계
export const EmailVerificationStep = ({ onNext }: EmailVerificationStepProps) => {

    const [isEmailVerificated, setIsEmailVerificated] = useState(false);
    const [emailSent, setEmailSent] = useState(false);  // 이메일 전송 여부

    const {email, setEmail} = useSignupStore(
        useShallow((state) => ({
            email: state.email,
            setEmail: state.setEmail
        }))
    );

    const emailSchema = z.object({
        email: z
        .string()
        .min(1, "이메일을 입력해 주세요")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "이메일 형식이 올바르지 않습니다"
        ),
    });

    type EmailFormData = z.infer<typeof emailSchema>;

    const {register, handleSubmit, formState : {errors, isValid}} = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        mode: "onChange",
        defaultValues: {
            email: email
        }
    });

    const onSubmit = (data : EmailFormData) => {
        setEmail(data.email);
    };
    
    // todo 인증하기 누르면 이메일로 발송됐다는 팝업 (merge 이후...)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
                <h1 className="pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 flex-none relative z-10">
                    <p>이메일 인증을</p>
                    <p>진행해 주세요</p>
                </h1>

                <div className="flex-1 overflow-y-auto space-y-[20px] pt-[40px] scrollbar-hide">
                    <div className='flex items-start gap-[10px]'>
                        <SingleInput className = "flex-1" label='이메일 인증' placeholder='이메일을 입력해 주세요' {...register("email")} error={errors.email?.message} successMessage={emailSent ? "메일이 전송되었습니다. 메일함을 확인해 주세요!" : ""} /> 
                        <SmallButton 
                            label="인증요청" 
                            className="mt-[36px]"
                            disabled={!isValid}
                            onClick={() => {
                                // TODO: 이메일 전송 API 호출
                                console.log("이메일 전송 요청");
                                setEmailSent(true);  // 이메일 전송 완료
                            }}
                        />
                    </div>
                    
                    <div className='flex items-start gap-[10px]'>
                        <SingleInput className = "flex-1" placeholder="인증 번호 6자리를 입력해 주세요" />
                        <SmallButton 
                            onClick={() => {
                                // TODO: 이메일 인증 API 연동 + 성공 시 완료 팝업
                                // TODO: 불일치 시 다시 인증버튼 활성화
                                setIsEmailVerificated(true); // 인증번호 일치하면 설정
                            }}
                            label="인증하기" 
                            type="button"
                            className="mt-[6px]"
                            disabled={!emailSent}  // 이메일 전송 후에만 활성화
                        />
                    </div>
                </div>

                <div className="h-[40px] flex-none" />
                
                <div className="flex-none pb-[60px] relative z-10 w-full flex justify-center">
                        <Button 
                            disabled={!isEmailVerificated}
                            label="다음" 
                            onClick={onNext}
                        />
                </div>
            
            </div>
        </form> 
    )
}