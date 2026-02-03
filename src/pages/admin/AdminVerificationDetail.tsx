import { useLocation } from "react-router-dom";
import Icon from "../../components/Icon";
import { MainHeader } from "../../layouts/headers/MainHeader";
// import ButtonWhite from "../../components/ButtonWhite";
import { useState } from "react";
import BottomSheetModal from "../../components/BottomSheetModal/BottomSheetModal";
import Button from "../../components/Button";
import SingleInput from "../../components/common/SingleInput";

// todo useQuery로 유저아이디, 폰번호, 제출 파일 조회
export const AdminVerificationDetail = () => {

    const location = useLocation();
    const item = location.state?.itemData; 
    
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    // 승인 모달 입력 데이터 상태 (객체로 통합 관리)
    const [approveForm, setApproveForm] = useState({
        userName: "",
        univ: "",
        studentId: "",
        major: ""
    });

    // 승인 폼 입력 핸들러
    // 각 상태에 맞게 수정
    const handleApproveFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setApproveForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApproveSubmit = () => {
        // todo API 연동: 승인 처리 (approveForm 데이터 포함)
        setIsApproveModalOpen(false);
    }

    const handleRejectSubmit = () => {
        // todo API 연동: 거절 처리 (rejectReason 포함)
        setIsRejectModalOpen(false);
    }
    
    return (
        <div className="flex flex-col h-full bg-white">
            <MainHeader title="재학증명서 상세페이지" />

            <section className="flex flex-col gap-[20px] px-5">
                <div className="flex pt-[20px] py-4 ">
                    <div className="flex items-center gap-[15px]">
                        {/* 아바타 아이콘 */}
                        <div className="w-[70px] h-[70px] rounded-full bg-gray-150 flex items-center justify-center overflow-hidden">
                        <Icon name="me" className="w-[42px] h-[42px] text-gray-400" />
                    </div>
                    
                    {/* 유저 정보 */}
                    <div className="flex flex-col gap-[2px]">
                        <span 
                            className="text-gray-900 text-b-20"
                            style={{ letterSpacing: '-0.8px' }}
                        >
                            {item.userId}
                        </span>
                        <span 
                            className="text-gray-750 text-m-16 font-medium"
                            style={{ letterSpacing: '-0.4px' }}
                        >
                            {item.phoneNum}
                        </span>
                    </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-[10px] w-full">
                    <div className="p-[15px] flex items-center justify-between w-full gap-[15px]">
                        <Icon name="folder" className="flex-none"/>
                        <div className="flex-1 min-w-0">
                            <p className="text-r-14 text-gray-900 break-all">파일이름</p>
                        </div>
                        <button
                            type="button"
                            // onClick={handlePreviewClick}
                            className="w-[60px] flex-none py-[6px] bg-gray-350 text-white text-r-12 rounded-[5px] cursor-pointer active:opacity-80"
                        >
                            보기
                        </button>
                    </div>
                </div>

                <div className="flex gap-[10px] justify-center items-center w-full">
                    <Button 
                        label="거부하기" 
                        onClick={() => setIsRejectModalOpen(true)}
                        className="flex-1 !py-[13px] !h-[45px] !rounded-[10px] !text-SB-16 !bg-[#FFEFEF] !text-[#FF3838]"
                    />
                    <Button 
                        label="승인하기" 
                        onClick={() => setIsApproveModalOpen(true)}
                        className="flex-1 !h-[45px] !rounded-[10px] !text-SB-16"
                    />
                </div>
                    
            </section>

            {/* 승인 모달 */}
            <BottomSheetModal 
                isOpen={isApproveModalOpen} 
                onClose={() => setIsApproveModalOpen(false)}
            >
                <div className="flex flex-col px-[25px] pb-8 gap-6">
                    <div className="flex flex-col gap-4 w-full">
                        <SingleInput 
                            label="이름" 
                            name="userName"
                            value={approveForm.userName} 
                            onChange={handleApproveFormChange} 
                            placeholder="이름 입력"
                            className="w-full" 
                        />
                        <SingleInput 
                            label="학교" 
                            name="univ"
                            value={approveForm.univ} 
                            onChange={handleApproveFormChange} 
                            placeholder="학교 입력"
                            className="w-full" 
                        />
                        <SingleInput 
                            label="학번" 
                            name="studentId"
                            value={approveForm.studentId} 
                            onChange={handleApproveFormChange} 
                            placeholder="학번 입력"
                            className="w-full" 
                        />
                        <SingleInput 
                            label="학과" 
                            name="major"
                            value={approveForm.major} 
                            onChange={handleApproveFormChange} 
                            placeholder="학과 입력"
                            className="w-full" 
                        />
                    </div>
                    <Button 
                        label="승인하기" 
                        onClick={handleApproveSubmit}
                        disabled={!approveForm.userName || !approveForm.univ || !approveForm.studentId || !approveForm.major}
                        className={`w-full !max-w-none !text-white !h-[50px] !rounded-[27px] 
                            ${(!approveForm.userName || !approveForm.univ || !approveForm.studentId || !approveForm.major) 
                                ? '!bg-gray-150' 
                                : 'bg-primary'
                            }`}
                    />
                </div>
            </BottomSheetModal>

            {/* 거절 모달 */}
            <BottomSheetModal 
                isOpen={isRejectModalOpen} 
                onClose={() => setIsRejectModalOpen(false)}
            >
                <div className="flex flex-col px-[25px] pb-8 gap-6">
                    <div className="flex flex-col gap-2">
                        <span className="text-m-16 text-gray-900">거부사유</span>
                        <textarea 
                            className="w-full h-[180px] p-4 rounded-[10px] border border-gray-150 focus:outline-none focus:border-primary resize-none text-r-16 text-gray-900 placeholder:text-gray-400"
                            placeholder="거부 상세사유 입력"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                    </div>
                    <Button 
                        label="거부하기" 
                        onClick={handleRejectSubmit}
                        disabled={!rejectReason.trim()}
                        className={`w-full !max-w-none !h-[50px] !rounded-[27px] ${!rejectReason.trim() ? '!bg-gray-150 !text-gray-400' : '!bg-[#FFEFEF] !text-[#FF3838]'}`}
                    />
                </div>
            </BottomSheetModal>
        </div>
    );
};