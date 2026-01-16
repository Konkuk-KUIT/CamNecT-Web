import { useEffect, useRef } from "react";
import { MOCK_SESSION } from "../../mock/mypages";
import Icon from "../../components/Icon";
import InfoSection from "./components/InfoSection";
import PortfolioSection from "./components/PortfolioSection";
import ProfileImageModal from "./components/ImageEditModal";
import { useProfileEdit } from "./hooks/useProfileEdit";
import { useProfileEditModals } from "./hooks/useProfileEditModal";
import TagEditModal from "./components/TagsEditModal";
import IntroEditModal from "./components/IntroEditModal";
import EducationEditModal from "./components/EducationEditModal";
import CareerEditModal from "./components/CareerEditModal";
import { useNavigate } from "react-router-dom";


export const MypageEditPage = () => {
    const navigate = useNavigate();
    const userId: string = MOCK_SESSION.meUid;
    const modalRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    const { data, setData, hasChanges, handleSave, meDetail } = useProfileEdit(userId);
    const { currentModal, openModal, closeModal } = useProfileEditModals();

    //외부 클릭 시 modal 닫기 
    useEffect(() => {
        if (!currentModal) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [currentModal, closeModal]);

    //modal 열리면 스크롤 lock
    useEffect(() => {
    const el = pageRef.current;
        if (!el) return;

        if (!currentModal) return;

        const prevOverflow = el.style.overflow;
        el.style.overflow = "hidden";

        return () => {
            el.style.overflow = prevOverflow;
        };
    }, [currentModal]);


    const handleImageUpload = (file: File, source: 'album' | 'camera') => {
        console.log(`${source}에서 이미지 가져옴`)
        const imageUrl = URL.createObjectURL(file);
        setData({ ...data, user: { ...data.user, profileImg: imageUrl } });
        closeModal();
    };

    if (!meDetail) return <div className="p-6">내 프로필 데이터를 찾을 수 없어요.</div>;

    const { user, visibility, educations, careers, certificates, portfolios, showFollowPublic } = data;

    return (
        <div className="h-dvh mx-auto w-full min-w-[320px] max-w-[450px] relative">
            <div ref={pageRef} className="w-full h-full bg-white overflow-y-auto overscroll-none">
                {/* 헤더 - TODO: layout 컴포넌트 형태로 변환 */}
                <header className="w-full z-20 py-[10px] px-[25px] sticky top-0 h-[48px] border-b border-gray-150 flex items-center justify-between bg-white">
                    <button
                        className="w-[24px] h-[24px]"
                        onClick={() => navigate(-1)}
                    >
                        <Icon name='cancel' className="block shrink-0"/>
                    </button>
                    <span className="text-SB-20 text-gray-900">프로필 수정</span>
                    <button
                        className={`text-b-16-hn transition-colors ${
                            hasChanges ? 'text-primary' : 'text-gray-650'
                        }`}
                        onClick={handleSave}
                        disabled={!hasChanges}
                    >
                        완료
                    </button>
                </header>

                {/* 프로필 사진 선택 */}
                <section className="w-full">
                    <div className="w-full flex items-center gap-[15px] px-[25px] py-[15px] border-b border-gray-150">
                        <button className="relative h-[56px] w-[56px]"
                        onClick={() => openModal('image')}>
                            <img
                            src={user.profileImg}
                            alt="프로필"
                            className="h-[56px] w-[56px] rounded-full"
                        />
                            <div className="absolute top-0 h-[56px] w-[56px] rounded-full bg-gray-900/60"></div>
                            <Icon name="cameraWhite" className="absolute top-[16px] left-[16px] block shrink-0" />
                        </button>
                        
                        <div className="flex flex-col flex-1 gap-[6px]">
                            <div className="text-B-18-hn text-gray-900">{user.name}</div>
                            <div className="text-R-12-hn text-gray-750">
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
                                {user.userTags.map((t) => (
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
                            <div className="w-full flex text-R-14 text-gray-750 leading-[1.5] pl-[4px] whitespace-pre-line">
                                {user.introduction}
                            </div>
                        </div>
                    </div>

                    <div className="w-full py-[15px] px-[25px] flex justify-between items-center">
                        <span className="text-SB-14 text-gray-900">팔로잉/팔로워 수 비공개</span>
                        <button
                            onClick={() => setData({ ...data, showFollowPublic: !showFollowPublic })}
                            className={`relative w-[50px] h-[24px] rounded-[21px] transition-colors duration-300 ease-in-out ${
                                showFollowPublic ? 'bg-gray-300' : 'bg-primary'
                            }`}
                        >
                            <div
                                className={`absolute top-[2px] left-[2px] w-[20px] h-[20px] rounded-full bg-white transition-transform duration-300 ease-in-out ${
                                    showFollowPublic ? "translate-x-0" : "translate-x-[26px]"
                                }`}
                            />
                        </button>
                    </div>
                </section>

                {/* Divider */}
                <div className="w-full h-[10px] bg-gray-150"></div>

                <div className="flex flex-col gap-[30px] py-[30px] px-[25px]">

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
                    />
                </div>
            </div> 

            {currentModal === 'image' && (
                <ProfileImageModal
                    ref={modalRef}
                    onSelect={handleImageUpload}
                    onDelete={() => {
                        setData({ ...data, user: { ...user, profileImg: '' } });
                        closeModal();
                    }}
                />
            )}
            {currentModal === 'tags' && (
                <TagEditModal
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
                    initialShowPrivate={visibility.educationVisibility}
                    onClose={closeModal}
                    onSave={(updatedEducations, showPrivate) => {
                        setData({ 
                            ...data, 
                            educations: updatedEducations,
                            visibility: {
                                ...data.visibility,
                                educationVisibility: showPrivate
                            }
                        });
                        closeModal();
                    }}
                />
            )}
            {currentModal === 'career' && (
                <CareerEditModal
                    careers={data.careers}
                    initialShowPrivate={visibility.careerVisibility}
                    onClose={closeModal}
                    onSave={(updatedCareers, showPrivate) => {
                        setData({ 
                            ...data, 
                            careers: updatedCareers,
                            visibility: {
                                ...data.visibility,
                                careerVisibility: showPrivate
                            }
                        });
                        closeModal();
                    }}
                />
            )}
        </div>
    );
}