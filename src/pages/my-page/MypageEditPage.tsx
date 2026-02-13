import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../components/Icon";
import InfoSection from "./components/InfoSection";
import PortfolioSection from "./components/PortfolioSection";
import ImageEditModal from "./components/ImageEditModal";
import { useProfileEdit } from "./hooks/useProfileEdit";
import { useProfileEditModals } from "./hooks/useProfileEditModal";
import { useProfileSave } from "./hooks/useProfileSave";
import TagsEditModal from "./components/TagsEditModal";
import IntroEditModal from "./components/IntroEditModal";
import EducationEditModal from "./components/EducationEditModal";
import CareerEditModal from "./components/CareerEditModal";
import CertificateEditModal from "./components/CertificateEditModal";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { EditHeader } from "../../layouts/headers/EditHeader";
import defaultProfileImg from "../../assets/image/defaultProfileImg.png";
import PopUp from "../../components/Pop-up";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { requestTagList } from "../../api/auth";

const DEFAULT_PROFILE_IMAGE = defaultProfileImg;

export const MypageEditPage = () => {
    const navigate = useNavigate();
    const authUser = useAuthStore(state => state.user);
    const userId = authUser?.id ? parseInt(authUser.id) : null;
    const pageRef = useRef<HTMLDivElement>(null);

    type ImageAction = "KEEP"|"UPLOAD"|"DELETE";
    const imageActionRef = useRef<ImageAction>("KEEP");
    const imageFileRef = useRef<File | null>(null);

    const { data, setData, hasChanges, originalData, isLoading, isError } = useProfileEdit(userId);
    const { currentModal, openModal, closeModal } = useProfileEditModals();
    const { saveProfile, isSaving } = useProfileSave();

    const [confirm, setConfirm] = useState(false);
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [imageSizeErrorOpen, setImageSizeErrorOpen] = useState(false);

    // 태그 리스트 조회
    const { data: tagList } = useQuery({
        queryKey: ["tagList"],
        queryFn: () => requestTagList(),
    });

    // 태그 데이터 포맷팅
    const allTags = tagList?.data?.flatMap(cat => 
        cat.tags.map(tag => ({
            id: tag.id,
            name: tag.name,
        }))
    ) || [];

    const handleSave = async () => {
        if (!hasChanges || !data || !userId || !originalData) return;

        let imageChange:
            | { action: "KEEP" }
            | { action: "UPLOAD"; file: File }
            | { action: "DELETE" };

        if (imageActionRef.current === "UPLOAD") {
            const file = imageFileRef.current;
            if (!file) {
            setSaveError("이미지 업로드 파일이 없습니다. 다시 선택해주세요.");
            return;
            }
            imageChange = { action: "UPLOAD", file };
        } else if (imageActionRef.current === "DELETE") {
            imageChange = { action: "DELETE" };
        } else {
            imageChange = { action: "KEEP" };
        }

        const result = await saveProfile(data, originalData, imageChange, allTags);

        if (result.success) {
            imageActionRef.current = "KEEP";
            imageFileRef.current = null;
            setConfirm(true);
        } else {
            setSaveError(result.error || "저장에 실패했습니다.");
        }
    };

    const handleClose = () => { 
        if (hasChanges) {
            setLeaveOpen(true);
            return;
        }
        navigate(-1);
    };

    //modal 열리면 스크롤 lock
    useEffect(() => {
        if (currentModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [currentModal]);

    const MAX_BYTES = 5 * 1024 * 1024;
    const handleSelectImage = (file: File) => {
    if (file.size > MAX_BYTES) {
        setImageSizeErrorOpen(true);
        return; 
    }

  // 5MB이하의 이미지만 기존 로직 실행
  handleImageUpload(file);
};

    const handleImageUpload = (file: File) => {
        const previewUrl = URL.createObjectURL(file);

        setData((prev) => {
            const base = prev ?? data;
            if (!base) return prev;

            const prevImg = base.user.profileImg;
            if (prevImg && prevImg.startsWith("blob:")) URL.revokeObjectURL(prevImg);

            return {
            ...base,
            user: { ...base.user, profileImg: previewUrl },
            };
        });

        imageFileRef.current = file;
        imageActionRef.current = "UPLOAD";
        closeModal();
    };

    // 로딩 중
    if (isLoading || !data) {
        return (
            <PopUp
                type="loading"
                isOpen={true}
            />
        );
    }

    // 에러 또는 데이터 없음
    if (isError) {
        return (
            <PopUp
                type="error"
                title='일시적 오류로 인해\n프로필 정보를 찾을 수 없습니다.'
                titleSecondary='잠시 후 다시 시도해주세요'
                isOpen={true}
                rightButtonText='확인'
                onClick={() => navigate(-1)}
            />
        );
    }
    

    const { user, visibility, educations, careers, certificates, portfolios } = data;

    return (
        <div>
            <HeaderLayout
                headerSlot = {
                    <EditHeader
                        title="프로필 수정"
                        leftAction={{onClick: handleClose}}
                        rightElement={
                            <button
                                className={`text-b-16-hn transition-colors ${
                                    hasChanges ? 'text-primary' : 'text-gray-650'
                                }`}
                                onClick={handleSave}
                                disabled={!hasChanges || isSaving}
                            >
                                {isSaving ? '저장 중...' : '완료'}
                            </button>
                        }
                    />
                }
            >
                <div className="w-full bg-white relative border-t border-gray-150">
                    <div ref={pageRef} className="w-full h-full bg-white overflow-y-auto">

                        {/* 프로필 사진 선택 */}
                        <section className="w-full">
                            <div className="w-full flex items-center gap-[15px] px-[25px] py-[15px] border-b border-gray-150">
                                <button className="relative h-[56px] w-[56px]"
                                onClick={() => openModal('image')}>
                                    <img
                                    src={user.profileImg ?? DEFAULT_PROFILE_IMAGE}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null; //이미지 깨짐 방지
                                        e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                                    }}
                                    alt="프로필"
                                    className="h-[56px] w-[56px] rounded-full"
                                />
                                    <div className="absolute top-0 h-[56px] w-[56px] rounded-full bg-gray-900/60"></div>
                                    <Icon name="cameraWhite" className="absolute top-[16px] left-[16px] block shrink-0" />
                                </button>
                                
                                <div className="flex flex-col flex-1 gap-[6px]">
                                    <div className="text-B-18-hn text-gray-900">{user.name}</div>
                                    <div className="text-R-12-hn text-gray-750 break-keep">
                                        {user.major} {user.gradeNumber}학번
                                    </div>
                                </div>
                            </div>

                            {/* 태그 및 자기소개 */}
                            <div className="w-full flex flex-col border-b border-gray-150 px-[25px] pt-[18px] pb-[23px] gap-[23px]">
                                <div className="w-full flex flex-col gap-[7px]">
                                    <div className="flex items-center justify-between">
                                        <div className="text-SB-14 text-black">태그</div>
                                        <button onClick={() => openModal('tags')}
                                        className="text-R-12-hn text-gray-650 flex items-center gap-[2px]">
                                            수정하기
                                            <Icon name="more2" className="w-[10px] h-[10px] block shrink-0"/>
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-[5px] pl-[4px]">
                                        {user.userTags.map((t: string) => (
                                            <span
                                                key={t}
                                                className="flex justify-center items-center rounded-[3px] border border-primary bg-green-50 px-[5px] py-[3px] text-R-12-hn text-primary"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-[7px]">
                                    <div className="flex items-center justify-between">
                                        <div className="text-SB-14 text-black">자기 소개</div>
                                        <button onClick={() => openModal('intro')}
                                        className="text-R-12-hn text-gray-650 flex items-center gap-[2px]">
                                            수정하기
                                            <Icon name="more2" className="w-[10px] h-[10px] block shrink-0"/>
                                        </button>
                                    </div>
                                    <div className="w-full flex text-R-14 text-gray-750 leading-[1.5] pl-[4px] line-clamp-3 whitespace-pre-line break-keep [overflow-wrap:anywhere]">
                                        {user.introduction}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-[15px] px-[25px] flex justify-between items-center">
                                <span className="text-SB-14 text-gray-900">팔로잉/팔로워 수 비공개</span>
                                <button
                                    onClick={() => {
                                        console.log("toggle clicked");
                                        setData((prev) => {
                                            const base = prev ?? data;
                                            if (!base) return prev;
                                            return {
                                                ...base,
                                                visibility: {
                                                    ...base.visibility,
                                                    isFollowerVisible: !base.visibility.isFollowerVisible
                                                }
                                            };
                                        }
                                    )}}
                                    className={`relative w-[50px] h-[24px] rounded-[21px] transition-colors duration-300 ease-in-out ${
                                        data.visibility.isFollowerVisible ? 'bg-gray-300' : 'bg-primary'
                                    }`}
                                >
                                    <div
                                        className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] rounded-full bg-white transition-transform duration-300 ease-in-out ${
                                            data.visibility.isFollowerVisible ? "translate-x-0" : "translate-x-[26px]"
                                        }`}
                                    />
                                </button>
                            </div>
                        </section>

                        {/* Divider */}
                        <div className="w-full h-[10px] bg-gray-150"></div>

                        <div className="flex flex-col gap-[40px] py-[30px] px-[25px]">

                            <PortfolioSection
                                portfolios={portfolios}
                                isEdit={true}
                            />

                            <InfoSection
                                type="education"
                                items={educations}
                                isEdit={true}
                                onEditClick={() => openModal('education')}
                            />

                            <InfoSection
                                type="career"
                                items={careers}
                                isEdit={true}
                                onEditClick={() => openModal('career')}
                            />

                            <InfoSection
                                type="certificate"
                                items={certificates}
                                isEdit={true}
                                onEditClick={() => openModal('certificate')}
                            />
                        </div>
                    </div> 
                </div>
            </HeaderLayout>

            <ImageEditModal
                isOpen={currentModal === 'image'}
                onClose={closeModal}
                onSelect={handleSelectImage}
                onDelete={() => {
                    setData((prev) => {
                        const base = prev ?? data;
                        if (!base) return prev;

                        const prevImg = base.user.profileImg;
                        if (prevImg && prevImg.startsWith("blob:")) URL.revokeObjectURL(prevImg);

                        return {
                        ...base,
                        user: { ...base.user, profileImg: null }, //null->삭제
                        };
                    });

                    imageFileRef.current = null;
                    imageActionRef.current = "DELETE";
                    closeModal();
                }}
            />
            {currentModal === 'tags' && (
                <TagsEditModal
                    tags={user.userTags || []}
                    onClose={closeModal}
                    onSave={(newTags) => { 
                        setData({ ...data, user: { ...user, userTags: newTags } }); 
                        closeModal(); 
                    }}
                />
            )}
            {currentModal === 'intro' && (
                <IntroEditModal
                    initialStatement={user.introduction}
                    onClose={closeModal}
                    onSave={(newIntro) => { 
                        setData({ ...data, user: { ...user, introduction: newIntro } }); 
                        closeModal(); 
                    }}
                />
            )}
            {currentModal === 'education' && (
                <EducationEditModal
                    educations={data.educations}
                    initialShowPublic={visibility.educationVisibility}
                    onClose={closeModal}
                    onSave={(updatedEducations, showPublic) => {
                        setData({ 
                            ...data, 
                            educations: updatedEducations,
                            visibility: {
                                ...data.visibility,
                                educationVisibility: showPublic
                            }
                        });
                        closeModal();
                    }}
                />
            )}
            {currentModal === 'career' && (
                <CareerEditModal
                    careers={data.careers}
                    initialShowPublic={visibility.careerVisibility}
                    onClose={closeModal}
                    onSave={(updatedCareers, showPublic) => {
                        setData({ 
                            ...data, 
                            careers: updatedCareers,
                            visibility: {
                                ...data.visibility,
                                careerVisibility: showPublic
                            }
                        });
                        closeModal();
                    }}
                />
            )}
            {currentModal === 'certificate' && (
                <CertificateEditModal
                    certificates={data.certificates}
                    initialShowPublic={visibility.certificateVisibility}
                    onClose={closeModal}
                    onSave={(updatedCertificates, showPublic) => {
                        setData({ 
                            ...data, 
                            certificates: updatedCertificates,
                            visibility: {
                                ...data.visibility,
                                certificateVisibility: showPublic
                            }
                        });
                        closeModal();
                    }}
                />
            )}
            <PopUp
                isOpen={leaveOpen}
                type="warning"
                title={"변경사항이 있습니다.\n나가시겠습니까?"}
                content="저장하지 않을 시 변경사항이 삭제됩니다."
                leftButtonText="나가기"
                onLeftClick={() => {
                setLeaveOpen(false);
                navigate(-1);
                }}
                onRightClick={() => setLeaveOpen(false)}
            />
            <PopUp
                isOpen={confirm}
                type="confirm"
                title="프로필이 저장되었습니다!"
                buttonText="확인"
                onClick={() => {
                    setConfirm(false);
                    navigate(-1);
                }}
            />
            <PopUp
                isOpen={!!saveError}
                type="error"
                title="일시적 오류로 인해 접근에 실패했습니다."
                content={saveError || ""}
                buttonText="확인"
                onClick={() => setSaveError(null)}
            />
            <PopUp
                isOpen={imageSizeErrorOpen}
                type="error"
                title="파일 용량 초과"
                content="프로필 사진은 최대 5MB까지 업로드할 수 있습니다."
                buttonText="확인"
                onClick={() => setImageSizeErrorOpen(false)}
            />

        </div>
    );
};