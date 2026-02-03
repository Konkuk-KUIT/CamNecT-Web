import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";
import PopUp from "../../../components/Pop-up";

// 임시 저장된 비밀번호
const TEMP_CURRENT_PASSWORD = "test1234";

// 비밀번호 정규식 패턴
const PASSWORD_PATTERN = /^(?=.*\d)[A-Za-z0-9!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]{8,16}$/;

export const EditPasswordPage = () => {
    const navigate = useNavigate();
    
    // 현재 비밀번호
    const [currentPassword, setCurrentPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
    
    // 새 비밀번호
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState('');
    
    // 새 비밀번호 확인
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [confirm, setConfirm] = useState(false);

    // 현재 비밀번호 확인
    const handleCurrentPasswordBlur = () => {
        if (!currentPassword) return;
        
        if (currentPassword === TEMP_CURRENT_PASSWORD) {
            setCurrentPasswordError('');
            setIsCurrentPasswordVerified(true);
        } else {
            setCurrentPasswordError('비밀번호가 일치하지 않습니다.');
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
            setCurrentPasswordError('현재 비밀번호를 먼저 확인해주세요.');
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
                <div className="w-full h-full bg-white flex flex-col px-[25px] pt-[30px] pb-[20px]">
                    <div className="flex-1 flex flex-col gap-[25px]">

                        {/* 현재 비밀번호 확인 */}
                        <div className="flex flex-col gap-[8px]">
                            <span className="text-m-14-hn text-gray-900">
                                현재 비밀번호 확인
                            </span>
                            <div className="relative flex flex-col gap-[8px]">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                    onBlur={handleCurrentPasswordBlur}
                                    maxLength={16}
                                    className={`w-full p-[15px] rounded-[5px] border bg-gray-100 ${
                                        currentPasswordError ? 'border-red' : 
                                        isCurrentPasswordVerified ? 'border-primary' : 'border-gray-150'
                                    } text-sb-16-hn text-gray-750 focus:outline-none ${
                                        currentPasswordError ? 'focus:border-red' : 'focus:border-primary'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-[16px] top-1/2 -translate-y-1/2"
                                >
                                    {showCurrentPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="10" cy="10" r="3" stroke="#999999" strokeWidth="1.5"/>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.619 10 16.6C4 16.6 1 10 1 10C2.24389 7.68394 4.02903 5.73932 6.18 4.34M8.25 3.53C8.82186 3.37837 9.40986 3.30134 10 3.3C16 3.3 19 10 19 10C18.393 11.1356 17.6691 12.2048 16.84 13.19M11.88 11.88C11.6328 12.1481 11.3318 12.3627 10.9964 12.5104C10.6609 12.6581 10.2982 12.7357 9.931 12.7384C9.56387 12.741 9.19991 12.6686 8.86232 12.5255C8.52473 12.3824 8.22068 12.1716 7.96968 11.9061C7.71867 11.6406 7.52608 11.3257 7.40334 10.9815C7.28059 10.6373 7.23032 10.2707 7.25574 9.90444C7.28116 9.53821 7.38171 9.18083 7.55095 8.85452C7.72019 8.52822 7.95463 8.23982 8.24 8.01" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M1 1L19 19" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {currentPasswordError && (
                                <span className="text-r-12-hn text-red">
                                    {currentPasswordError}
                                </span>
                            )}
                            {isCurrentPasswordVerified && (
                                <span className="text-r-12-hn text-primary">
                                    비밀번호가 확인되었습니다.
                                </span>
                            )}
                        </div>

                        {/* 비밀번호 그룹: 라벨 하나에 인풋 두 개 */}
                        <div className={`flex flex-col gap-[12px] ${!isCurrentPasswordVerified ? 'opacity-50 pointer-events-none' : ''}`}>
                            {/* 변경 할 비밀번호 */}
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-m-14-hn text-gray-900">
                                    변경 할 비밀번호
                                </span>
                                <div className="relative flex flex-col gap-[8px]">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        onBlur={handleNewPasswordBlur}
                                        maxLength={16}
                                        disabled={!isCurrentPasswordVerified}
                                        className={`w-full p-[15px] rounded-[5px] border bg-gray-100 ${
                                            newPasswordError ? 'border-red' : 'border-gray-150'
                                        } text-sb-16-hn text-gray-750 focus:outline-none focus:border-primary disabled:bg-gray-100`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        disabled={!isCurrentPasswordVerified}
                                        className="absolute right-[16px] top-1/2 -translate-y-1/2"
                                    >
                                        {showNewPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="10" cy="10" r="3" stroke="#999999" strokeWidth="1.5"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.619 10 16.6C4 16.6 1 10 1 10C2.24389 7.68394 4.02903 5.73932 6.18 4.34M8.25 3.53C8.82186 3.37837 9.40986 3.30134 10 3.3C16 3.3 19 10 19 10C18.393 11.1356 17.6691 12.2048 16.84 13.19M11.88 11.88C11.6328 12.1481 11.3318 12.3627 10.9964 12.5104C10.6609 12.6581 10.2982 12.7357 9.931 12.7384C9.56387 12.741 9.19991 12.6686 8.86232 12.5255C8.52473 12.3824 8.22068 12.1716 7.96968 11.9061C7.71867 11.6406 7.52608 11.3257 7.40334 10.9815C7.28059 10.6373 7.23032 10.2707 7.25574 9.90444C7.28116 9.53821 7.38171 9.18083 7.55095 8.85452C7.72019 8.52822 7.95463 8.23982 8.24 8.01" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M1 1L19 19" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {newPasswordError && (
                                    <span className="text-r-12-hn text-red">
                                        {newPasswordError}
                                    </span>
                                )}
                                {!newPasswordError && newPassword && (
                                    <span className="text-r-12-hn text-gray-650">
                                        비밀번호는 8~16자, 숫자 1개 이상, 공백 없이 영문/숫자/특수문자만 사용 가능합니다
                                    </span>
                                )}
                            </div>

                            {/* 비밀번호 재확인 */}
                            <div className="flex flex-col gap-[8px]">
                                <span className="text-m-14-hn text-gray-900">
                                    변경 할 비밀번호 확인
                                </span>
                                <div className="relative flex flex-col gap-[8px]">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={handleConfirmPasswordBlur}
                                        maxLength={16}
                                        disabled={!isCurrentPasswordVerified}
                                        className={`w-full p-[15px] rounded-[5px] border bg-gray-100 ${
                                            confirmPasswordError ? 'border-red' : 'border-gray-150'
                                        } text-r-14-hn text-gray-750 focus:outline-none focus:border-primary disabled:bg-gray-100`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={!isCurrentPasswordVerified}
                                        className="absolute right-[16px] top-1/2 -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="10" cy="10" r="3" stroke="#999999" strokeWidth="1.5"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.619 10 16.6C4 16.6 1 10 1 10C2.24389 7.68394 4.02903 5.73932 6.18 4.34M8.25 3.53C8.82186 3.37837 9.40986 3.30134 10 3.3C16 3.3 19 10 19 10C18.393 11.1356 17.6691 12.2048 16.84 13.19M11.88 11.88C11.6328 12.1481 11.3318 12.3627 10.9964 12.5104C10.6609 12.6581 10.2982 12.7357 9.931 12.7384C9.56387 12.741 9.19991 12.6686 8.86232 12.5255C8.52473 12.3824 8.22068 12.1716 7.96968 11.9061C7.71867 11.6406 7.52608 11.3257 7.40334 10.9815C7.28059 10.6373 7.23032 10.2707 7.25574 9.90444C7.28116 9.53821 7.38171 9.18083 7.55095 8.85452C7.72019 8.52822 7.95463 8.23982 8.24 8.01" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M1 1L19 19" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {confirmPasswordError && (
                                    <span className="text-r-12-hn text-red">
                                        {confirmPasswordError}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="px-[25px] pb-[30px]">
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