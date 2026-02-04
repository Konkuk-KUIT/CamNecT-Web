import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import type { SchoolDocType } from "../../api-types/authApiTypes";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";
import Icon from "../../components/Icon";
import PopUp from "../../components/Pop-up";
import { useSignupStore } from "../../store/useSignupStore";

interface SchoolVerificationStepProps {
    onNext: () => void;
}

// 학교 인증 자료 제출 화면
export const SchoolVerificationStep = ({ onNext }: SchoolVerificationStepProps) => {
    const [showPreview, setShowPreview] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
    const [showMountPopUp, setShowMountPopUp] = useState(true);
    const [docType, setDocType] = useState<SchoolDocType | null>(null);

    const { email, verificationFile, setVerificationFile, isVerificationSubmitted, setIsVerificationSubmitted } = useSignupStore(
        useShallow((state) => {
            return {
                email: state.email,
                verificationFile: state.verificationFile,
                setVerificationFile: state.setVerificationFile,
                isVerificationSubmitted: state.isVerificationSubmitted,
                setIsVerificationSubmitted: state.setIsVerificationSubmitted
            }
        } )
    );

    // 실제 API 연동 전 임시 객체
    const mutation = { isPending: false }; 

    // selectedFile 변경 시 previewUrl 생성 
    const previewUrl = useMemo(() => {
        return verificationFile ? URL.createObjectURL(verificationFile) : null;
    }, [verificationFile]);

    // URL cleanup (메모리 누수 방지)
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // 파일 첨부
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVerificationFile(file);
        }
    };

    // 미리보기 클릭
    const handlePreviewClick = () => {  
        setShowPreview(true);  
    };

    // 첨부파일 삭제
    const handleRemoveFile = () => {
        setVerificationFile(null);
        setShowPreview(false);
    };

    const handleShowPopup = () => {
        setShowPopUp(true);
    };

    const handlePopUpClose = () => {
        setShowPopUp(false);
    };

    const handleConfirmPopUpClose = () => {
        setShowConfirmPopUp(false);
    };

    const handleVerificationSubmit = () => {
        if (!verificationFile || !email) return;

        // todo: 실제 API 연동 시 mutation.mutate 사용
        /*
        mutation.mutate({
            email,
            docType: docType || 'ENROLLMENT_CERTIFICATE',
            documents: [verificationFile]
        });
        */

        // 임시로 성공 처리 (UI 확인용)
        setShowPopUp(false);
        setShowConfirmPopUp(true);
        setIsVerificationSubmitted(true);
    };

    return (
        <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
            <h1 className="pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900 flex-none relative z-10">
                학교를 인증해주세요!
            </h1>

            <h2 className="pt-[10px] text-m-14 text-gray-750 tracking-[-0.56px] leading-[140%]">
                {docType === 'GRADUATION_CERTIFICATE' 
                    ? "졸업증명서를 첨부해주세요" 
                    : "학생증, 재학증명서 또는 등록금 납부서를 첨부해주세요"}
                <br/>
                인증에 사용되며 인증완료후에 폐기됩니다
            </h2>

            <p className="pt-[29px] text-m-16 text-gray-750 tracking-[-0.56px] leading-[140%]">파일첨부</p>
            
            <div className="pt-[10px]">
                {!verificationFile ? (
                    <>
                        <label 
                            htmlFor="file-upload"
                            className="flex items-center justify-center gap-[12px] w-full h-[54px] bg-gray-150 rounded-[10px] border-2 border-dashed border-gray-200 cursor-pointer"
                        >
                            <Icon name="folder" />
                            <span className="text-r-16 text-gray-650">
                                인증 파일 첨부 (png, jpg, pdf)
                            </span>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </>
                ) : (
                    <div className="p-[16px] bg-gray-50 rounded-[10px] flex items-center gap-[12px]">
                        <Icon name="folder" className="flex-none"/>
                        <div className="flex-1 min-w-0">
                            <p className="text-r-14 text-gray-900 break-all">{verificationFile.name}</p>
                            <p className="text-r-12 text-gray-500 mt-[4px]">
                                {(verificationFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                        <button
                            onClick={handlePreviewClick}
                            className="w-[72px] flex-none px-[12px] py-[6px] bg-primary text-white text-r-12 rounded-[5px]"
                        >
                            미리보기
                        </button>
                        <button
                            onClick={handleRemoveFile}
                            disabled={isVerificationSubmitted}
                            className="w-[48px] flex-none px-[12px] py-[6px] bg-gray-200 text-gray-700 text-r-12 rounded-[5px] "
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
            
            <div className="flex-1" />

            <div className="flex-none pb-[60px]">
                <div className="flex flex-col items-center gap-[10px]">
                    <ButtonWhite 
                        label={mutation.isPending ? "제출 중..." : "인증 요청"} 
                        onClick={handleShowPopup} 
                        disabled={(!verificationFile) || isVerificationSubmitted}
                    />
                    <Button 
                        disabled={!isVerificationSubmitted}
                        label="다음"
                        onClick={onNext}
                        className="mx-auto"
                    />
                </div>
            </div>

            {showPopUp && (
                <PopUp
                    isOpen={showPopUp}
                    type="info"
                    title="인증 파일을 제출하시겠습니까?"
                    content="파일 제출은 다시 할 수 없습니다"
                    leftButtonText="취소"
                    rightButtonText="제출"
                    onLeftClick={handlePopUpClose}
                    onRightClick={handleVerificationSubmit}
                />
            )}

            {showConfirmPopUp && (
                <PopUp
                    isOpen={showConfirmPopUp}
                    type="confirm"
                    title="제출 완료 되었습니다"
                    buttonText="확인"
                    onClick={handleConfirmPopUpClose}
                />
            )}

            {showMountPopUp && (
                <PopUp
                    isOpen={showMountPopUp}
                    type="info"
                    title="본인의 현재 상태를 선택해주세요"
                    content="상태에 따라 제출 서류가 달라질 수 있습니다"
                    leftButtonText="졸업생"
                    rightButtonText="재학/휴학생"
                    onLeftClick={() => {
                        setDocType('GRADUATION_CERTIFICATE');
                        setShowMountPopUp(false);
                    }}
                    onRightClick={() => {
                        setDocType('ENROLLMENT_CERTIFICATE');
                        setShowMountPopUp(false);
                    }}
                />
            )}
            
            {showPreview && previewUrl && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setShowPreview(false)}
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute -top-[40px] right-0 text-white text-[24px]  z-10"
                        >
                            ✕
                        </button>
                        
                        {verificationFile?.type.startsWith('image/') ? (
                            <img 
                                src={previewUrl} 
                                alt="미리보기" 
                                className="max-w-[90vw] max-h-[90dvh] rounded-[10px]"
                            />
                        ) : (
                            <iframe 
                                src={previewUrl} 
                                className="w-[90vw] h-[90dvh] max-w-[800px] max-h-[600px] rounded-[10px] bg-white"
                                title="PDF 미리보기"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};