import { useState } from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import Card from '../../components/Card';
import CheckScheduleBox from './components/CheckScheduleBox';
import PointBox from './components/PointBox';
import ComunitiyBox from './components/CommunityBox';
import RecommandBox from './components/RecommendBox';
import CoffeeChatBox from './components/CoffeeChatBox';
import ContestBox from './components/ContestBox';
import { coffeeChatRequests, contests, recommendList } from './homeData';

const Home = () => {
    const [showAllRecommands, setShowAllRecommands] = useState(false);
    const visibleRecommands = showAllRecommands ? recommendList : recommendList.slice(0, 2);

    return (
        // 홈 1번 영역: 인사말, 커피챗 요청, 일정 카드, 포인트/커뮤니티 카드 틀 구성
        <HomeLayout>
            <div className="w-full mx-auto bg-white">
                <section
                    className="flex w-full flex-col"
                    style={{ gap: '15px', paddingTop: '17px', paddingBottom: '30px', paddingLeft: '25px', paddingRight: '25px' }}
                >
                    {/* 1-1: 사용자 인사 메시지 */}
                    <div className="flex flex-col cursor-pointer" style={{ gap: '7px', padding: '13px 6px' }}>
                        <p className="text-sb-18 text-gray-900 tracking-[-0.04em]">
                            안녕하세요, <span className="text-primary">박원빈</span>님!
                        </p>
                        <p className="text-m-14 text-gray-750 tracking-[-0.04em]">
                            오늘도 성공적인 캠퍼스 라이프를 응원합니다!
                        </p>
                    </div>

                    <CoffeeChatBox requests={coffeeChatRequests} />
                    {/* 1-2: 일정 박스 + 포인트/커뮤니티 박스 */}
                    <div className="flex w-full flex-col" style={{ gap: '15px' }}>
                        <CheckScheduleBox />
                        <div className="flex w-full justify-between gap-[20px]">
                            <PointBox />
                            <ComunitiyBox />
                        </div>
                    </div>
                </section>

                {/* 홈 2번 영역: 추천 동문 리스트 */}
                <section
                    className="flex w-full flex-col"
                    style={{
                        gap: '10px',
                        padding: '30px 25px',
                        background: 'var(--color-gray-100)',
                    }}
                >
                    <p className="text-sb-20 text-black tracking-[-0.04em]">추천동문</p>

                    <div className="flex w-full flex-col" style={{ gap: '20px' }}>
                        <div className="flex w-full flex-col" style={{ gap: '15px' }}>
                            <div className="flex w-full flex-col" style={{ gap: '10px' }}>
                                {visibleRecommands.map((recommand) => (
                                    <RecommandBox
                                        key={`${recommand.name}-${recommand.studentId}`}
                                        name={recommand.name}
                                        profileImage={recommand.profileImage}
                                        major={recommand.major}
                                        studentId={recommand.studentId}
                                        intro={recommand.intro}
                                        categories={recommand.categories}
                                    />
                                ))}
                            </div>

                            <Card
                                width="100%"
                                height="50px"
                                className="flex items-center justify-center cursor-pointer"
                                onClick={() => setShowAllRecommands((prev) => !prev)}
                            >
                                <span className="text-sb-14 text-gray-900 tracking-[-0.04em]">
                                    {showAllRecommands ?
                                        <div className='flex items-center justify-center gap-[5px]'>
                                            접기
                                            <svg className='rotate-180' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3.5L8 8.5L13 3.5M3 7.5L8 12.5L13 7.5" stroke="#202023" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        : <div className='flex items-center justify-center gap-[5px]'>
                                            더보기
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3.5L8 8.5L13 3.5M3 7.5L8 12.5L13 7.5" stroke="#202023" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                        </div>}
                                </span>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 홈 3번 영역: 주목받은 공모전 리스트 */}
                <section className="flex w-full flex-col bg-white" style={{ gap: '10px', padding: '25px' }}>
                    <ContestBox contests={contests} />
                </section>
            </div>
        </HomeLayout>
    );
};

export default Home;
