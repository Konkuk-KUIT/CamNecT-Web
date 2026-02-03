import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";
import SingleInput from "../../../components/common/SingleInput";
import PopUp from "../../../components/Pop-up";

// 임시 저장된 비밀번호
const TEMP_CURRENT_PASSWORD = "test1234";

// 비밀번호 정규식 패턴
const PASSWORD_PATTERN = /^(?=.*\d)[A-Za-z0-9!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]{8,16}$/;

export const EditPasswordPage = () => {
    const navigate = useNavigate();
    
    // 현재 비밀번호
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
    
    // 새 비밀번호
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    
    // 새 비밀번호 확인
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [confirm, setConfirm] = useState(false);

    // 현재 비밀번호 확인
    const handleCurrentPasswordBlur = () => {
        if (!currentPassword) return;
        
        if (currentPassword === TEMP_CURRENT_PASSWORD) {
            setCurrentPasswordError('');
            setIsCurrentPasswordVerified(true);
        } else {
            setCurrentPasswordError('비밀번호가 일치하지 않습니다');
            setIsCurrentPasswordVerified(false);
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
        setCurrentPasswordError('');
        setIsCurrentPasswordVerified(false);
        setNewPassword('');
        setConfirmPassword('');
        setNewPasswordError('');
        setConfirmPasswordError('');
    };

    // 새 비밀번호 검증
    const handleNewPasswordBlur = () => {
        if (!newPassword) {
            setNewPasswordError('');
            return;
        }

        if (!PASSWORD_PATTERN.test(newPassword)) {
            setNewPasswordError('비밀번호는 8~16자, 숫자 1개 이상, 공백 없이 영문/숫자/특수문자만 사용 가능합니다');
        } else {
            setNewPasswordError('');
        }

        // 확인 비밀번호가 있으면 일치 검사
        if (confirmPassword) {
            if (newPassword !== confirmPassword) {
                setConfirmPasswordError('비밀번호가 일치하지 않습니다');
            } else {
                setConfirmPasswordError('');
            }
        }
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value);
        setNewPasswordError('');
        
        // 확인 비밀번호가 있으면 실시간 일치 검사
        if (confirmPassword && value !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다');
        } else if (confirmPassword && value === confirmPassword) {
            setConfirmPasswordError('');
        }
    };

    // 비밀번호 확인 검증
    const handleConfirmPasswordBlur = () => {
        if (!confirmPassword) {
            setConfirmPasswordError('');
            return;
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        
        if (newPassword && value !== newPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = () => {
        if (!isCurrentPasswordVerified) {
            setCurrentPasswordError('현재 비밀번호를 먼저 확인해주세요');
            return;
        }

        if (!PASSWORD_PATTERN.test(newPassword)) {
            setNewPasswordError('비밀번호는 8~16자, 숫자 1개 이상, 공백 없이 영문/숫자/특수문자만 사용 가능합니다');
            return;
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다');
            return;
        }

        // TODO: 비밀번호 변경 API 호출
        console.log('비밀번호 변경:', { currentPassword, newPassword });
        setConfirm(true);
    };

    const isValid = isCurrentPasswordVerified &&
                   PASSWORD_PATTERN.test(newPassword) &&
                   newPassword === confirmPassword &&
                   confirmPassword !== '' &&
                   !newPasswordError &&
                   !confirmPasswordError;

    return (
        <>
            <HeaderLayout
                headerSlot={
                    <MainHeader
                        title="비밀번호 수정"
                        leftAction={{ onClick: () => navigate(-1) }}
                    />
                }
            >
                <div className="w-full h-full bg-white flex flex-col justify-between px-[25px] pt-[25px] pb-[20px]">
                    <div className="flex flex-col gap-[30px]">

                        {/* 현재 비밀번호 확인 */}
                        <div className="flex flex-col">
                            <SingleInput
                                label="현재 비밀번호 확인"
                                type="password"
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                onBlur={handleCurrentPasswordBlur}
                                placeholder="현재 비밀번호를 입력하세요"
                                maxLength={16}
                                error={currentPasswordError}
                                successMessage={isCurrentPasswordVerified ? "비밀번호가 확인되었습니다" : undefined}
                            />
                        </div>

                        {/* 비밀번호 그룹: 라벨 하나에 인풋 두 개 */}
                        <div className={`flex flex-col gap-[10px] ${!isCurrentPasswordVerified ? 'opacity-50 pointer-events-none' : ''}`}>
                            <SingleInput
                                label="변경 할 비밀번호"
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                onBlur={handleNewPasswordBlur}
                                placeholder="비밀번호를 입력해 주세요"
                                maxLength={16}
                                disabled={!isCurrentPasswordVerified}
                                error={newPasswordError}
                                helperText={!newPasswordError && newPassword ? "비밀번호는 8~16자, 숫자 1개 이상, 공백 없이 영문/숫자/특수문자만 사용 가능합니다" : undefined}
                            />

                            <SingleInput
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onBlur={handleConfirmPasswordBlur}
                                placeholder="비밀번호 재확인"
                                maxLength={16}
                                disabled={!isCurrentPasswordVerified}
                                error={confirmPasswordError}
                            />
                        </div>
                    </div>

                    <div className="">
                        <button
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className="w-full h-[52px] rounded-[8px] bg-primary disabled:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                            <span className="text-SB-16-hn text-white">비밀번호 변경하기</span>
                        </button>
                    </div>
                </div>
            </HeaderLayout>
            <PopUp
                isOpen={confirm}
                type="confirm"
                title="비밀번호가 변경되었습니다!"
                buttonText="확인"
                onClick={() => {
                    setConfirm(false);
                    navigate(-1);
                }}
            />
        </>
    );
};