import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useShallow } from 'zustand/react/shallow';
import Button from '../../components/Button';
import SingleInput from '../../components/common/SingleInput';
import { useSignupStore } from "../../store/useSignupStore";
import SmallButton from './components/SmallButton';

interface UserInfoStepProps {
    onNext: () => void;
}

// 가입자 정보 입력 단계 (아이디 / 비밀번호 / 이름 / 전화번호)
export const UserInfoStep = ({ onNext }: UserInfoStepProps) => {

    const [isUserNameChecked, setIsUserNameChecked] = useState(false);  // 아이디 중복확인 여부

     const { 
        userName, setUserName, 
        password, setPassword, 
        name, setName, 
        phoneNum, setPhoneNum 
    } = useSignupStore(
        useShallow((state) => ({
            userName: state.userName,
            setUserName: state.setUserName,
            password: state.password,
            setPassword: state.setPassword,
            name: state.name,
            setName: state.setName,
            phoneNum: state.phoneNum,
            setPhoneNum: state.setPhoneNum
        }))
    );
    
    // 비밀번호 정규화 
    // 문자열로 사용할 경우 (예: new RegExp 사용 시)
    const passwordPattern = "^(?=.*\\d)[A-Za-z0-9!@#$%^&*()_+={}[\\]|\\\\:;\"'<>,.?/~`-]{8,16}$";

    // zod : input 데이터 규칙 검사기 
    // .refine() : 추가적인 검증 로직 (비밀번호 확인 검사)
    const userInfoSchema = z.object({
        name: z
            .string()
            .min(1, "이름을 입력해 주세요")
            .regex(/^(?:[가-힣]+|[a-zA-Z]+)$/, "이름은 한글 또는 영문만 입력할 수 있습니다"),
        phoneNum: z
            .string() 
            .regex(/^01[0-9]\d{8}$/, "전화번호 형식이 올바르지 않습니다"),
        userName: z.string().min(1, "아이디를 입력해 주세요"),
        password: z
            .string()
            .regex(
                new RegExp(passwordPattern),
                "비밀번호는 8~16자, 숫자 1개 이상, 공백 없이 영문/숫자/특수문자만 사용 가능합니다"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다",
        path: ["confirmPassword"],
    });

    // .infer : zod 스키마에서 만든 사용자 입력 요소를 타입화
    type UserInfoFormData = z.infer<typeof userInfoSchema>;

    // React Hook Form : 여러개의 input 값 관리 (유효성 검사, 에러처리, submit처리)
    // isValid : 입력된 데이터들 유효확인
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(userInfoSchema), // 검증은 zod로
        mode: "onChange", // 입력될 때 마다 검사
        defaultValues: {  
        name: name,
        phoneNum: phoneNum,
        userName: userName,
        password: password,
        confirmPassword: ""
    }
    });

    // SingleInput에 입력되는 아이디 값 실시간 감지
    const userNameValue = watch("userName");

    // 아이디 중복확인 함수 (TODO: API 연동)
    const handleCheckUserName = () => {
        // TODO: 아이디 중복확인 API 호출
        console.log("아이디 중복확인 요청:", userNameValue);
        setIsUserNameChecked(true);
    };

    const onSubmit = (data : UserInfoFormData) => {

        setName(data.name);
        setPhoneNum(data.phoneNum);
        setUserName(data.userName);
        setPassword(data.password);
        onNext();
    };


    // handleSubmit : 모든 input값을 zod로 검증한 후 onSubmit 실행
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col overflow-hidden absolute inset-0 bg-white px-[25px]">
                {/* 1. 헤더 섹션 (고정) */}
                <h1 className="flex-none relative z-10 pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 ">
                    <p>가입정보를 입력해주세요</p>
                </h1>
                
                {/* 2. 입력 섹션 (스크롤 가능) */}
                {/* overflow-y-auto : 넘치면 스크롤, flex-1 : 남은 공간 차지 (유동적) */}
                <div className="flex-1 overflow-y-auto space-y-[30px] pt-[40px] scrollbar-hide">
                    <div className='flex items-start gap-[10px]'>
                        <SingleInput 
                            className="flex-1"
                            label='아이디' 
                            placeholder='아이디를 입력해 주세요' 
                            {...register("userName")} 
                            error={errors.userName?.message}
                            successMessage={isUserNameChecked ? "사용 가능한 아이디입니다" : ""}
                        />
                        <SmallButton 
                            label="중복확인" 
                            type="button"
                            className="mt-[36px]"
                            disabled={!userNameValue || !!errors.userName}
                            onClick={handleCheckUserName}
                        />
                    </div> 

                    {/* 비밀번호 그룹: 라벨 하나에 인풋 두 개가 '긴밀하게' 붙어있는 구조 */}
                    <div className="space-y-[12px]">
                        <SingleInput 
                            label='비밀번호' 
                            placeholder='비밀번호를 입력해 주세요' 
                            type="password"
                            helperText="비밀번호 조건"
                            {...register("password")}
                            error={errors.password?.message}
                        /> 
                        <SingleInput 
                            placeholder='비밀번호 재확인' 
                            type="password"
                            helperText="비밀번호를 한번 더 입력해 주세요"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword?.message}
                        /> 
                    </div>

                    <SingleInput label='이름' placeholder='이름을 입력해 주세요' {...register("name")} error={errors.name?.message} /> 

                    <SingleInput 
                        label='전화번호' 
                        helperText='하이픈(-) 없이 숫자만 입력해주세요' 
                        placeholder='전화번호를 입력해 주세요' 
                        {...register("phoneNum")}
                        error={errors.phoneNum?.message}
                    /> 
                </div>

                {/* 3. 하단 버튼 구역 (고정) */}
                <div className="h-[40px] flex-none" />
                
                <div className="flex-none pb-[60px] relative z-10 w-full flex justify-center">
                    <Button 
                        disabled={!isValid}
                        label="다음" 
                        type = "submit"
                    />
                </div>
            </div>
        </form>
    )
}