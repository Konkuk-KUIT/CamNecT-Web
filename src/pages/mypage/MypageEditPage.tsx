import { useState } from "react";
import { type EducationItem, type CareerItem, type CertificateItem, EDUCATION_STATUS_KR, CAREER_STATUS_KR } from "../../types/mypage/mypageTypes";
import { MOCK_SESSION, MOCK_PROFILE_DETAIL_BY_UID } from "../../mock/mypages";
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from "../../mock/portfolio";
import Icon from "../../components/Icon";
import InfoSection from "./components/InfoSection";
import PortfolioSection from "./components/PortfolioSection";


export default function ProfileEditPage() {
    const meUid: string = MOCK_SESSION.meUid;
    const meDetail = MOCK_PROFILE_DETAIL_BY_UID[meUid];

    const [user, setUser] = useState(meDetail.user);
    const [educations, setEducations] = useState<EducationItem[]>(meDetail.educations);
    const [careers, setCareers] = useState<CareerItem[]>(meDetail.careers);
    const [certificates, setCertificates] = useState<CertificateItem[]>(meDetail.certificates);
    const [portfolios, setPortfolios] = useState(MOCK_PORTFOLIOS_BY_OWNER_ID[meUid] ?? []);
    
    const [showFollowPublic, setShowFollowPublic] = useState(true);

    // Modal states
    const [showImageModal, setShowImageModal] = useState(false);
    const [showIntroModal, setShowIntroModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showCareerModal, setShowCareerModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [editingEducation, setEditingEducation] = useState<EducationItem | null>(null);
    const [editingCareer, setEditingCareer] = useState<CareerItem | null>(null);
    const [editingCertificate, setCertificateItem] = useState<CertificateItem | null>(null);

    if (!meDetail) return <div className="p-6">내 프로필 데이터를 찾을 수 없어요.</div>;

    const handleSave = () => {
        // Save logic here
        alert("프로필이 저장되었습니다!");
    };

    return (
        <div className="h-dvh mx-auto w-full min-w-[360px] max-w-[450px] bg-white overflow-y-auto">
            {/* Header */}
            <header className="w-full py-[10px] px-[25px] sticky top-0 h-[48px] border-b border-gray-150 flex items-center justify-between bg-white">
                <button
                    className="w-[24px] h-[24px]"
                    onClick={() => window.history.back()}
                >
                    <Icon name='cancel' className="block shrink-0"/>
                </button>
                <span className="text-SB-20 text-gray-900">프로필 수정</span>
                <button
                    className="text-B-16 text-gray-650"
                    onClick={handleSave}
                >
                    완료
                </button>
            </header>

            {/* Profile Section */}
            <section className="w-full">
                <div className="w-full flex items-center gap-[15px] px-[25px] py-[15px] border-b border-gray-150">
                    <button className="relative h-[56px] w-[56px]"
                    onClick={() => alert("사진 고르기")}>
                        <img
                        src={user.profileImg}
                        alt="프로필"
                        className="h-[56px] w-[56px] rounded-full"
                    />
                        <div className="absolute top-0 h-[56px] w-[56px] rounded-full bg-gray-900/60"></div>
                        <Icon name="camera" className="absolute top-[16px] left-[16px] block shrink-0" />
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
                            <button onClick={() => alert("태그 수정 페이지로 이동")}
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
                            <button onClick={() => alert("자기소개 수정 페이지로 이동")}
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
                        onClick={() => setShowFollowPublic(!showFollowPublic)}
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
                    listTo="/mypage/portfolios"
                    detailTo={(id) => `/portfolios/${id}`}
                />

                <InfoSection
                    type="education"
                    items={educations}
                    isEdit={true}
                />

                <InfoSection
                    type="career"
                    items={careers}
                    isEdit={true}
                />

                <InfoSection
                    type="certificate"
                    items={certificates}
                    isEdit={true}
                />
            </div>
            {/* Portfolio Section
            <section className="px-[25px] py-[30px]">
                <PortfolioEditSection
                    portfolios={portfolios}
                    onAdd={() => alert("포트폴리오 추가")}
                    onEdit={(id) => alert(`포트폴리오 ${id} 수정`)}
                />
            </section>


            <div className="w-full h-[10px] bg-gray-150"></div>


            <section className="px-[25px] py-[30px]">
                <button
                    onClick={() => {
                        setEditingEducation(null);
                        setShowEducationModal(true);
                    }}
                    className="w-full flex items-center justify-between mb-[20px]"
                >
                    <span className="text-SB-16-hn text-gray-900">학력</span>
                    <Icon name="chevron-right" className="w-[20px] h-[20px] text-gray-500" />
                </button>
                
                {educations.length === 0 ? (
                    <div className="text-R-14 text-gray-500">아직 학력 정보가 등록되지 않았어요!</div>
                ) : (
                    <div className="flex flex-col gap-[12px]">
                        {educations
                            .slice()
                            .sort((a, b) => b.year - a.year)
                            .map((edu, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setEditingEducation(edu);
                                        setShowEducationModal(true);
                                    }}
                                    className="text-left text-R-14 text-gray-750 hover:text-gray-900"
                                >
                                    {edu.year}년 {edu.school} {edu.status === 'enrolled' ? '재학' : edu.status === 'graduated' ? '졸업' : '졸업예정'}
                                </button>
                            ))}
                    </div>
                )}
            </section>


            <div className="w-full h-[10px] bg-gray-150"></div>


            <section className="px-[25px] py-[30px]">
                <button
                    onClick={() => {
                        setEditingCareer(null);
                        setShowCareerModal(true);
                    }}
                    className="w-full flex items-center justify-between mb-[20px]"
                >
                    <span className="text-SB-16-hn text-gray-900">경력</span>
                    <Icon name="chevron-right" className="w-[20px] h-[20px] text-gray-500" />
                </button>
                
                {careers.length === 0 ? (
                    <div className="text-R-14 text-gray-500">등록된 경력이 없습니다.</div>
                ) : (
                    <div className="flex flex-col gap-[12px]">
                        {careers
                            .slice()
                            .sort((a, b) => b.year - a.year)
                            .map((career, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setEditingCareer(career);
                                        setShowCareerModal(true);
                                    }}
                                    className="text-left text-R-14 text-gray-750 hover:text-gray-900"
                                >
                                    {career.year}년 {career.organization} {career.status === 'current' ? '재직' : '퇴사'}
                                </button>
                            ))}
                    </div>
                )}
            </section>

            {showImageModal && (
                <ProfileImageModal
                    onClose={() => setShowImageModal(false)}
                    onSelect={(source) => {
                        alert(`${source} 선택됨`);
                        setShowImageModal(false);
                    }}
                    onDelete={() => {
                        alert("프로필 사진 삭제");
                        setShowImageModal(false);
                    }}
                />
            )}

            {showIntroModal && (
                <IntroductionModal
                    initialValue={user.introduction}
                    onClose={() => setShowIntroModal(false)}
                    onSave={(newIntro) => {
                        setUser({ ...user, introduction: newIntro });
                        setShowIntroModal(false);
                    }}
                />
            )}

            {showTagModal && (
                <TagEditModal
                    tags={user.userTags}
                    onClose={() => setShowTagModal(false)}
                    onSave={(newTags) => {
                        setUser({ ...user, userTags: newTags });
                        setShowTagModal(false);
                    }}
                />
            )}

            {showEducationModal && (
                <EducationModal
                    education={editingEducation}
                    onClose={() => {
                        setShowEducationModal(false);
                        setEditingEducation(null);
                    }}
                    onSave={(newEducation) => {
                        if (editingEducation) {
                            setEducations(educations.map(e => 
                                e === editingEducation ? newEducation : e
                            ));
                        } else {
                            setEducations([...educations, newEducation]);
                        }
                        setShowEducationModal(false);
                        setEditingEducation(null);
                    }}
                    onDelete={() => {
                        if (editingEducation) {
                            setEducations(educations.filter(e => e !== editingEducation));
                        }
                        setShowEducationModal(false);
                        setEditingEducation(null);
                    }}
                />
            )}

            {showCareerModal && (
                <CareerModal
                    career={editingCareer}
                    onClose={() => {
                        setShowCareerModal(false);
                        setEditingCareer(null);
                    }}
                    onSave={(newCareer) => {
                        if (editingCareer) {
                            setCareers(careers.map(c => 
                                c === editingCareer ? newCareer : c
                            ));
                        } else {
                            setCareers([...careers, newCareer]);
                        }
                        setShowCareerModal(false);
                        setEditingCareer(null);
                    }}
                    onDelete={() => {
                        if (editingCareer) {
                            setCareers(careers.filter(c => c !== editingCareer));
                        }
                        setShowCareerModal(false);
                        setEditingCareer(null);
                    }}
                />
            )} */}
        </div> 
    );
}

function makeEducationLines(items: EducationItem[]) {
  return items
    .slice()
    .sort((a, b) => b.year - a.year) //최신순 정렬
    .map((e) => `${e.year}년 ${e.school} ${EDUCATION_STATUS_KR[e.status]}`);
}

function makeCareerLines(items: CareerItem[]) {
  return items
    .slice()
    .sort((a, b) => a.year - b.year)
    .map((c) => `${c.year}년 ${c.organization} ${CAREER_STATUS_KR[c.status]}`);
}

function makeCertificateLines(items: CertificateItem[]) {
  return items
    .slice()
    .sort((a, b) => b.acquiredYear - a.acquiredYear) // 최신 취득 먼저
    .map((x) => `${x.acquiredYear}년 ${x.name} 취득`);
}