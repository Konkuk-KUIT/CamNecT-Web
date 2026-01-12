import { type EducationItem, type CareerItem, type CertificateItem, EDUCATION_STATUS_KR, CAREER_STATUS_KR } from "../../types/mypage/mypageTypes";
import { MOCK_SESSION, MOCK_PROFILE_DETAIL_BY_UID } from "../../mock/mypages";
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from "../../mock/portfolio";
import Icon from "../../components/Icon";
import InfoSection from "./components/InfoSection";
import PortfolioSection from "./components/PortfolioSection";

export default function MyPageHome() {
    const meUid: string = MOCK_SESSION.meUid;
    const meDetail = MOCK_PROFILE_DETAIL_BY_UID[meUid];
    const profileUserId: string = "user_002";
    const isProfileOwner = meUid === profileUserId ? true : false;

    if (!meDetail) return <div className="p-6">내 프로필 데이터를 찾을 수 없어요.</div>;

    const { user, educations, careers, certificates } = meDetail;

    const portfolios = MOCK_PORTFOLIOS_BY_OWNER_ID[meUid] ?? [];

    const educationLines = makeEducationLines(educations);
    const careerLines = makeCareerLines(careers);
    const certificateLines = makeCertificateLines(certificates);


    return (
        <div className="h-dvh mx-auto w-full min-w-[360px] max-w-[450px] bg-white">
        {/* Header */}
        
            <header className="w-full relative h-[64px] border-b border-gray-150 flex items-center justify-center">
                {!isProfileOwner &&
                    <button
                    className="absolute left-[25px] top-1/2 -translate-y-1/2"
                    onClick={() => alert("이전 페이지로 이동")}
                    >
                        <Icon name='back2' />
                    </button>
                    }
                {isProfileOwner ? 
                    <span className="text-SB-20 text-gray-900">마이페이지</span>
                    :
                    <span className="text-SB-20 text-gray-900">프로필</span>
                }
                {isProfileOwner &&
                    <button
                    className="absolute right-[19px] top-1/2 -translate-y-1/2"
                    onClick={() => alert("설정으로 이동")}
                    >
                        <Icon name='setting' />
                    </button>
                }
            </header>

        {/* Profile Card */}
            <section className="px-[25px] pt-[40px] pb-[33px] flex flex-col gap-[20px]">
                <div className="flex flex-1 flex-col gap-[22px]">
                    <div className="w-full flex flex items-start gap-[33px]">
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
                                {!isProfileOwner &&
                                <button
                                onClick={() => alert("팔로우")}
                                >
                                    <div className="w-[62px] h-[25px] rounded-[6px] border border-primary flex justify-center items-center gap-[5px]">
                                        <Icon name="follow" className="block w-[12px] h-[12px] shrink-0"/>
                                        <div className="justify-start text-primary text-[10px] font-M-20 leading-4">팔로우</div>
                                    </div>
                                </button>
                                }
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

                        <p className="mt-[11px] h-[63px] leading-[1.5] whitespace-pre-line text-R-14 text-gray-750">
                            {user.introduction}
                        </p>
                    </div>
                </div>
                {isProfileOwner ? 
                <button
                className="h-[40px] w-full rounded-[6px] flex justify-center items-center bg-primary"
                onClick={() => alert("프로필 수정 페이지로 이동")}
                >
                    <span className="text-SB-14-hn text-white">프로필 수정하기</span>
                </button>
                :
                <button
                className="h-[40px] w-full rounded-[6px] flex justify-center items-center bg-primary"
                onClick={() => alert("커피챗 요청 보내는 페이지로 이동")}
                >
                    <span className="text-SB-14-hn text-white">커피챗 요청하기</span>
                </button>
                }
            </section>

            {/*divider*/}
            <div className="w-full h-[10px] bg-gray-150"></div>

            <div className="flex flex-col gap-[30px] py-[30px] px-[25px]">

                <PortfolioSection
                    portfolios={portfolios}
                    listTo="/mypage/portfolios"
                    detailTo={(id) => `/portfolios/${id}`}
                />

                <InfoSection
                    title="학력"
                    lines={educationLines}
                    emptyText="아직 학력 정보가 등록되지 않았어요!"
                />

                <InfoSection
                    title="경력"
                    lines={careerLines}
                    emptyText="등록된 경력이 없습니다."
                />

                <InfoSection
                    title="자격증 및 보유기술"
                    lines={certificateLines}
                    emptyText="등록된 항목이 없습니다."
                />
            </div>
        </div>
    );
}


/*학력, 경력, 자격증에서 문장 조합*/
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