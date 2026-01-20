import { MOCK_SESSION, MOCK_PROFILE_DETAIL_BY_UID } from "../../mock/mypages";
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from "../../mock/portfolio";
import InfoSection from "./components/InfoSection";
import PortfolioSection from "./components/PortfolioSection";
import { useNavigate } from "react-router-dom";
import { FullLayout } from "../../layouts/FullLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";

export const MypagePage = () => {
    const navigate = useNavigate();
    const meUid: string = MOCK_SESSION.meUid;
    const meDetail = MOCK_PROFILE_DETAIL_BY_UID[meUid];

    if (!meDetail) return <div className="p-6">내 프로필 데이터를 찾을 수 없어요.</div>;

    const { user, educations, careers, certificates } = meDetail;

    const portfolios = MOCK_PORTFOLIOS_BY_OWNER_ID[meUid] ?? [];

    return (
        <FullLayout 
            headerSlot = {
                <MainHeader
                    title="마이페이지"
                    leftAction={{icon: 'mypageOption', onClick: () => alert("사이드바 열림")}}
                    rightActions={[
                        {icon: 'setting', onClick: () => alert("설정 페이지")},
                    ]}
                />
            }   
        >
            <div className="w-full bg-white  border-t border-gray-150">
            {/* 프로필 */}
                <section className="px-[25px] pt-[40px] pb-[33px] flex flex-col gap-[20px]">
                    <div className="flex flex-1 flex-col gap-[22px]">
                        <div className="w-full flex items-start gap-[33px]">
                            <img
                                src={user.profileImg}
                                alt="프로필"
                                className="h-[84px] w-[84px] rounded-full"
                            />
                            <div className="w-full flex flex-col gap-[17px]">
                                <div className="flex gap-[10px]">
                                    <div className="w-full flex flex-col gap-[6px]">
                                        <div className="text-B-18-hn text-gray-900">{user.name}</div>
                                        <div className="text-R-12-hn text-gray-750">
                                            {user.major} {user.gradeNumber}학번
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-wrap gap-[5px]">
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
                        </div>

                        <div className="flex flex-1">
                            <div className="flex flex-col justify-center items-start gap-[7px] pl-[3px] pt-[3px] min-w-[51px]">
                                <div className="flex justify-start items-align gap-[3px]">
                                    <span className="text-R-14-hn text-gray-900">팔로잉</span>
                                    <span className="text-SB-14-hn text-gray-900">{user.following.length}</span>
                                </div>
                                <div className="flex justify-start items-align gap-[3px] w-[117px]">
                                    <span className="text-R-14-hn text-gray-900">팔로워</span>
                                    <span className="text-SB-14-hn text-gray-900">{user.follower.length}</span>
                                </div>
                            </div>

                            <p className="mt-[11px] min-h-[63px] leading-[1.5] whitespace-pre-line text-R-14 text-gray-750">
                                {user.introduction}
                            </p>
                        </div>
                    </div>
                    <button
                    className="h-[40px] w-full rounded-[6px] flex justify-center items-center bg-primary"
                    onClick={() => navigate("/me/edit")}
                    >
                        <span className="text-SB-14-hn text-white">프로필 수정하기</span>
                    </button>
                </section>

                {/*divider*/}
                <div className="w-full h-[10px] bg-gray-150"></div>

                <div className="flex flex-col gap-[30px] py-[30px] px-[25px]">

                    <PortfolioSection
                        portfolios={portfolios}
                    />

                    <InfoSection
                        type="education"
                        items={educations}
                        isEdit={false}
                    />

                    <InfoSection
                        type="career"
                        items={careers}
                        isEdit={false}
                    />

                    <InfoSection
                        type="certificate"
                        items={certificates}
                        isEdit={false}
                    />
                </div>
            </div>
        </FullLayout>
        
    );
}