import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
import { requestEmailCode, verifyEmailCode } from '../../api/auth';
import Button from '../../components/Button';
import SingleInput from '../../components/common/SingleInput';
import PopUp from '../../components/Pop-up';
import { useAuthStore } from '../../store/useAuthStore';
import { useSignupStore } from '../../store/useSignupStore';
import SmallButton from './components/SmallButton';

interface EmailVerificationStepProps {
    onNext: () => void;
}

// 이메일 인증 단계
export const EmailVerificationStep = ({ onNext }: EmailVerificationStepProps) => {

    const [isEmailVerificated, setIsEmailVerificated] = useState(false);
    const [emailSent, setEmailSent] = useState(false);  // 이메일 전송 여부
    const [popUpConfig, setPopUpConfig] = useState<{ title: string; content: string } | null>(null);

    // 이메일 전역상태 및 가입 정보
    const { email, setEmail, getEmailVerificationData } = useSignupStore(
        useShallow((state) => ({
            email: state.email,
            setEmail: state.setEmail,
            getEmailVerificationData: state.getEmailVerificationData,
        }))
    );

    const setAuthUserId = useAuthStore((state) => state.setUserId);

    // 이메일 인증 폼 검증 (zod)
    const emailSchema = z.object({
        // 1. 이메일 값
        email: z
        .string()
        .min(1, "이메일을 입력해 주세요")
        .regex(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "이메일 형식이 올바르지 않습니다"
        ),
        // 2. 이메일 인증번호
        verificationCode: z.string().length(6, "인증번호 6자리를 입력해 주세요"),
    });

    type EmailFormData = z.infer<typeof emailSchema>;

    // RHF로 폼 제어
    const {register, handleSubmit, control, formState : {errors}} = useForm<EmailFormData>({
        resolver: zodResolver(emailSchema),
        mode: "onChange",
        defaultValues: {
            email: email,
            verificationCode: "",
        }
    });

    // SingleInput에 입력되는 값들 실시간 감지
    const emailValue = useWatch({ control, name: "email" });
    const codeValue = useWatch({ control, name: "verificationCode" });

    // 이메일 인증번호 요청
    const emailRequestMutation = useMutation({
        mutationFn: requestEmailCode,
        onSuccess: () => {
            setEmailSent(true);
        },
        onError: (error: AxiosError) => {
            const status = error.response?.status;
            // 서버에서 내려주는 에러 객체의 구조에 따라 접근 (data.message)
            const errorData = error.response?.data as { message?: string };
            const serverMessage = errorData?.message;
            
            if (status === 409) {
                // 서버에서 온 메시지가 있으면 그걸 보여주고, 없으면 기본 메시지 표시
                setPopUpConfig({ 
                    title: "중복된 가입정보", 
                    content: "이미 가입된 이메일입니다" 
                });
            } else {
                setPopUpConfig({ 
                    title: "인증번호 발송 실패", 
                    content: serverMessage || "다시 요청해 주세요" 
                });
            }

            setEmailSent(false);
        }
    });

    // 이메일 인증번호 검증 mutation
    const emailVerifyMutation = useMutation({
        mutationFn: verifyEmailCode,
        onSuccess: (data) => {
            if(data.userId) {
                setAuthUserId(String(data.userId));
            }
            setPopUpConfig({ title: "인증완료", content: "" });
            setIsEmailVerificated(true);
        },
        onError: (error: AxiosError) => {
            const status = error.response?.status;
            // 서버에서 내려주는 에러 객체의 구조에 따라 접근 (data.message)
            const errorData = error.response?.data as { message?: string };
            const serverMessage = errorData?.message;
            
            if (status === 409) {
                // 서버에서 온 메시지가 있으면 그걸 보여주고, 없으면 기본 메시지 표시
                setPopUpConfig({ 
                    title: "중복된 가입정보", 
                    content: serverMessage || "이미 가입된 전화번호입니다." 
                });
            } else {
                setPopUpConfig({ 
                    title: "인증번호 불일치", 
                    content: serverMessage || "인증번호가 일치하지 않습니다." 
                });
            }
        }
    });

    // 인증요청 클릭 시
    const handleEmailRequest = () => {
        setEmail(emailValue);
        emailRequestMutation.mutate({ email: emailValue });
    };

    // 인증하기 버튼 클릭 시 
    const handleEmailVerify = () => {
        // 이메일 전송 여부 확인
        if (!emailSent) {
            setPopUpConfig({ title: "인증 오류", content: "먼저 인증 요청을 클릭하여 이메일을 전송해 주세요." });
            return;
        }

        emailVerifyMutation.mutate({ ...getEmailVerificationData(), code: codeValue });
    }

    // '다음'버튼 클릭 시
    const onSubmit = (data : EmailFormData) => {
        setEmail(data.email);
        onNext();
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
                <h1 className="pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 flex-none relative z-10">
                    <p>이메일 인증을</p>
                    <p>진행해 주세요</p>
                </h1>

                <div className="flex-1 overflow-y-auto space-y-[20px] pt-[40px] scrollbar-hide">
                    <div className='flex items-start gap-[10px]'>
                        <SingleInput
                            className="flex-1"
                            label='이메일 인증'
                            placeholder='이메일을 입력해 주세요'
                            {...register("email")}
                            error={errors.email?.message}
                            successMessage={emailSent ? "메일이 전송되었습니다. 메일함을 확인해 주세요!" : ""}
                        /> 
                        
                        <SmallButton 
                            label="인증요청" 
                            type="button"
                            className="mt-[36px]"
                            disabled={!emailValue || !!errors.email}
                            onClick={handleEmailRequest}
                        />
                    </div>
                    
                    <div className='flex items-start gap-[10px]'>
                        <SingleInput 
                            className = "flex-1" 
                            placeholder="인증 번호 6자리를 입력해 주세요" 
                            {...register("verificationCode")}
                            error={errors.verificationCode?.message}
                        />
                        <SmallButton 
                            onClick={handleEmailVerify}
                            label="인증하기" 
                            type="button"
                            className="mt-[6px]"
                            disabled={!emailSent || codeValue.length !== 6}  // 이메일 전송 후 && 6자리 입력 시 활성화
                        />
                    </div>
                </div>

                <div className="h-[40px] flex-none" />
                
                <div className="flex-none pb-[60px] relative z-10 w-full flex justify-center">
                    <Button 
                        type="submit"
                        disabled={!isEmailVerificated}
                        label="다음" 
                    />
                </div>
            
            </div>

            {popUpConfig && (
                <PopUp
                    isOpen={true}
                    type="confirm"
                    title={popUpConfig.title}
                    content={popUpConfig.content}
                    onClick={() => {
                        setPopUpConfig(null);
                    }}
                />
            )}
        </form> 
    )
}
