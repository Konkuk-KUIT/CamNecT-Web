import { useShallow } from 'zustand/react/shallow';
import Button from '../../components/Button';
import SingleInput from '../../components/common/SingleInput';
import { useSignupStore } from "../../store/useSignupStore";
import { useState } from 'react';

interface UserInfoStepProps {
    onNext: () => void;
}

// 가입자 정보 입력 단계 (이름 / 전화번호 / 아이디 / 비밀번호)
export const UserInfoStep = ({ onNext }: UserInfoStepProps) => {

    // 비밀번호 재확인 일치 상태
    // 휴대폰 형식 일치 상태

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
    
    const [localUserName, setLocalUserName] = useState(userName);
    const [localPassword, setLocalPassword] = useState(password);
    const [localName, setLocalName] = useState(name);
    const [localPhoneNum, setLocalPhoneNum] = useState(phoneNum);

    const isAllFilled = localUserName && localPassword && localName && localPhoneNum;

    return (
        <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
            {/* 1. 헤더 섹션 (고정) */}
            <h1 className="pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 flex-none relative z-10">
                <p>가입정보를 입력해주세요</p>
            </h1>
            
            {/* 2. 입력 섹션 (스크롤 가능) */}
            {/* space-y-[40px]로 큼직한 구분을 주고, 비밀번호처럼 묶어야 하는건 div로 한 번 더 감쌉니다. */}
            <div className="flex-1 overflow-y-auto space-y-[30px] pt-[40px] scrollbar-hide">
                <SingleInput label='이름' placeholder='이름을 입력해 주세요' /> 

                <SingleInput 
                    label='전화번호' 
                    helperText='하이픈(-) 없이 숫자만 입력해주세요' 
                    placeholder='전화번호를 입력해 주세요' 
                /> 

                <SingleInput label='아이디' placeholder='아이디를 입력해 주세요' /> 

                {/* 비밀번호 그룹: 라벨 하나에 인풋 두 개가 '긴밀하게' 붙어있는 구조 */}
                <div className="space-y-[12px]">
                    <SingleInput 
                        label='비밀번호' 
                        placeholder='비밀번호를 입력해 주세요' 
                        type="password"
                        helperText="비밀번호 조건"
                    /> 
                    <SingleInput 
                        placeholder='비밀번호 재확인' 
                        type="password"
                        helperText="비밀번호를 한번 더 입력해 주세요"
                    /> 
                </div>
            </div>

            {/* 3. 하단 버튼 구역 (고정) */}
            <div className="h-[40px] flex-none"></div>
            <div className="flex-none pb-[60px] relative z-10">
                <Button 
                    disabled={!isAllFilled}
                    className="w-[325px] h-[50px] mx-auto block" 
                    label="다음" 
                    onClick={onNext}
                />
            </div>
        </div>
    )
}