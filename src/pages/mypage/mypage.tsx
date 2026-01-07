import { useMemo } from "react";
import { type UserId, type EducationItem, type CareerItem, type CertificateItem, EDUCATION_STATUS_KR, CAREER_STATUS_KR } from "../../types/mypageTypes";
import { MOCK_SESSION, MOCK_PROFILE_DETAIL_BY_UID } from "../../mock/mypages";
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from "../../mock/portfolio";
import { type Portfolio } from "../../types/portfolioTypes";
import Icon from "../../components/Icon";

export default function MyPageHome() {
  const meUid: UserId = MOCK_SESSION.meUid;
  const meDetail = MOCK_PROFILE_DETAIL_BY_UID[meUid];
  const profileUserId: UserId = "user_002";
  const isProfileOwner = meUid === profileUserId ? true : false;

  if (!meDetail) return <div className="p-6">내 프로필 데이터를 찾을 수 없어요.</div>;

  const { user, educations, careers, certificates } = meDetail;

  const followerCount = user.follower.length;
  const followingCount = user.following.length;

  const portfolios = MOCK_PORTFOLIOS_BY_OWNER_ID[meUid] ?? [];
  const portfolioPreview = portfolios;

  const educationLines = useMemo(
    () => makeEducationLines(educations, 3),
    [educations]
  );
  const careerLines = useMemo(() => makeCareerLines(careers, 3), [careers]);

    const certificateLines = useMemo(
    () => makeCertificateLines(certificates, 3),
    [certificates]
  );


  return (
    <div className="mx-auto w-full max-w-96 bg-white">
      {/* Header */}
      
        <header className="relative h-[64px] border-b border-gray-150 flex items-center justify-center">
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
        <section className="mx-[25px] mt-[40px] mb-[33px]">
            <div className="flex flex-1 flex-col gap-[22px]">
                <div className="flex flex items-start gap-[24px]">
                    <img
                        src={user.profileImageURL}
                        alt="프로필"
                        className="h-[84px] w-[84px] rounded-full"
                    />
                    <div className="flex flex-col gap-[17px]">
                        <div className="flex gap-[24px]">
                            <div className="w-[121px] flex flex-col gap-[6px]">
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
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M8 2.75V4.25M8 4.25V5.74999M8 4.25H9.5M8 4.25H6.5M5.375 2.1875C5.375 2.63505 5.19721 3.06427 4.88074 3.38074C4.56427 3.69721 4.13505 3.875 3.6875 3.875C3.23995 3.875 2.81072 3.69721 2.49426 3.38074C2.17779 3.06427 2 2.63505 2 2.1875C2 1.73995 2.17779 1.31072 2.49426 0.994257C2.81072 0.67779 3.23995 0.5 3.6875 0.5C4.13505 0.5 4.56427 0.67779 4.88074 0.994257C5.19721 1.31072 5.375 1.73995 5.375 2.1875ZM0.5 8.61749V8.56249C0.5 7.71712 0.835825 6.90636 1.4336 6.30859C2.03137 5.71082 2.84212 5.375 3.6875 5.375C4.53288 5.375 5.34363 5.71082 5.9414 6.30859C6.53918 6.90636 6.875 7.71712 6.875 8.56249V8.61699C5.91274 9.19654 4.81031 9.50189 3.687 9.49999C2.5215 9.49999 1.431 9.17749 0.5 8.61699V8.61749Z" stroke="#00C56C" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>

                                    <div className="justify-start text-primary text-[10px] font-medium font-['Pretendard'] leading-4">팔로우</div>
                                </div>
                            </button>
                            }
                        </div>

                        <div className="w-[208px] flex flex-wrap gap-[5px]">
                            {user.tags.map((t) => (
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

                <div className="flex flex-1 gap-[48px]">
                    <div className="flex flex-col justify-center items-start gap-[7px] ml-[3px] mt-[3px]">
                        <div className="flex justify-start items-align gap-[3px]">
                            <span className="text-R-14-hn text-gray-900">팔로잉</span>
                            <span className="text-SB-14-hn text-gray-900">{followingCount}</span>
                        </div>
                        <div className="flex justify-start items-align gap-[3px]">
                            <span className="text-R-14-hn text-gray-900">팔로워</span>
                            <span className="text-SB-14-hn text-gray-900">{followerCount}</span>
                        </div>
                    </div>

                    <p className="mt-[11px] h-[63px] leading-[1.5] whitespace-pre-line text-R-14 text-gray-750">
                        {user.introduction}
                    </p>
                </div>
            </div>
            {isProfileOwner ? 
            <button
            className="mt-[20px] h-[40px] w-full rounded-[6px] flex justify-center items-center bg-primary"
            onClick={() => alert("프로필 수정 페이지로 이동")}
            >
                <span className="text-SB-14-hn text-white">프로필 수정하기</span>
            </button>
            :
            <button
            className="mt-[20px] h-[40px] w-full rounded-[6px] flex justify-center items-center bg-primary"
            onClick={() => alert("커피챗 요청 보내는 페이지로 이동")}
            >
                <span className="text-SB-14-hn text-white">커피챗 요청하기</span>
            </button>
            }
        </section>

        {/*divider*/}
        <div className="w-full h-[10px] bg-gray-150"></div>

        <div className="flex flex-col gap-[30px] my-[30px] ml-[25px] mr-[20px]">
            {/* Portfolio preview */}
            <section>
                <div className="flex items-center justify-between">
                    <span className="text-SB-18 text-gray-900">포트폴리오</span>
                    <button
                        className="text-R-12 text-gray-650"
                        onClick={() => alert("포트폴리오 전체보기로 이동")}
                    >
                        전체보기 &gt;
                    </button>
                </div>

                <div className="h-0 border border-gray-150 my-[10px]"/>

                <div className={[
                        "flex gap-[5px]",
                        portfolioPreview.length >= 3 ? "overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" 
                        : "",
                        ].join(" ")}
                    >
                    {portfolioPreview.length === 0 ? (
                        <div className="text-R-14 text-gray-650">
                            아직 포트폴리오가 등록되지 않았어요!
                        </div>
                    ) : (
                        portfolioPreview.map((p) => <PortfolioCard key={p.id} p={p} />)
                    )}
                </div>
            </section>

            {/* Education */}
            <section className="">
                <span className="text-SB-18 text-gray-900">학력</span>
                <div className="h-0 border border-gray-150 my-[10px]"/>
                <div className="text-M-12 text-gray-650 leading-[1.5]">
                    {educationLines.length === 0 ? (
                        <div className="text-R-14 text-gray-650">아직 학력 정보가 등록되지 않았어요!</div>
                    ) : (
                        educationLines.map((line, idx) => <div key={idx}>{line}</div>)
                    )}
                </div>
            </section>

            {/* Career */}
            <section className="">
                <span className="text-SB-18 text-gray-900">경력</span>
                <div className="h-0 border border-gray-150 my-[10px]"/>
                <div className="text-M-12 text-gray-650 leading-[1.5]">
                    {careerLines.length === 0 ? (
                        <div className="text-R-14 text-gray-650">등록된 경력이 없습니다.</div>
                    ) : (
                        careerLines.map((line, idx) => <div key={idx}>{line}</div>)
                    )}
                </div>
            </section>

            {/* Certificates */}
            <section className="">
                <span className="text-SB-18 text-gray-900">자격증 및 보유기술</span>
                <div className="h-0 border border-gray-150 my-[10px]"/>
                <div className="text-M-12 text-gray-650 leading-[1.5]">
                    {certificateLines.length === 0 ? (
                        <div className="text-R-14 text-gray-650">등록된 항목이 없습니다.</div>
                    ) : (
                        certificateLines.map((line, idx) => <div key={idx}>{line}</div>)
                    )}
                </div>
            </section>
        </div>


        {/* 탭 바 구현 예정 */}


    </div>
  );
}


function PortfolioCard({ p }: { p: Portfolio }) {
  const thumbnail = p.thumbnailUrl || p.images[0]?.url;

  return (
    <button className="shrink-0 flex flex-col justify-center items-start gap-[5px]"
      onClick={() => alert(`포트폴리오 열기: ${p.id}`)}
    >
      <div className="w-[160px] h-[90px] overflow-hidden rounded-[12px]">
        {thumbnail ? (
          <img src={thumbnail} alt={p.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="ml-[10px] text-M-14 text-gray-900">{p.title}</div>
    </button>
  );
}

/*학력, 경력, 자격증에서 문장 조합*/
function makeEducationLines(items: EducationItem[], max: number) {
  return items
    .slice()
    .sort((a, b) => a.year - b.year) //최신순 정렬
    .slice(0, max)
    .map((e) => `${e.year}년 ${e.school} ${EDUCATION_STATUS_KR[e.status]}`);
}

function makeCareerLines(items: CareerItem[], max: number) {
  return items
    .slice()
    .sort((a, b) => a.year - b.year)
    .slice(0, max)
    .map((c) => `${c.year}년 ${c.organization} ${CAREER_STATUS_KR[c.status]}`);
}

function makeCertificateLines(items: CertificateItem[], max: number) {
  return items
    .slice()
    .sort((a, b) => b.acquiredYear - a.acquiredYear) // 최신 취득 먼저
    .slice(0, max)
    .map((x) => `${x.acquiredYear}년 ${x.name} 취득`);
}