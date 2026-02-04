import {FullLayout} from '../../layouts/FullLayout';
import { HomeHeader } from '../../layouts/headers/HomeHeader';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import CheckScheduleBox from './components/CheckScheduleBox';
import PointBox from './components/PointBox';
import CommunityBox from './components/CommunityBox';
import RecommendBox from './components/RecommendBox';
import CoffeeChatBox from './components/CoffeeChatBox';
import ContestBox from './components/ContestBox';
import { coffeeChatRequests, contests, recommendList, homeGreetingUser } from './homeData';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAuthStore } from '../../store/useAuthStore';

export const HomePage = () => {
    const navigate = useNavigate();
    const visibleRecommands = recommendList.slice(0, 2);
    const hasUnreadNotifications = useNotificationStore((state) =>
        state.items.some((notice) => !notice.isRead),
    );
    const userName = useAuthStore((state) => state.user?.name) ?? homeGreetingUser.name;

    return (
        // 홈 1번 영역: 인사말, 커피챗 요청, 일정 카드, 포인트/커뮤니티 카드 틀 구성
        <FullLayout headerSlot={<HomeHeader showBadge={hasUnreadNotifications} />} >
            <div className="w-full mx-auto bg-white">
                <section
                    className="flex w-full flex-col gap-[15px] px-[25px] pt-[17px] pb-[30px]"
                >
                    {/* 1-1: 사용자 인사 메시지 */}
                    <div className="flex flex-col cursor-pointer gap-[7px] px-[6px] py-[13px]">
                        <p className="text-sb-18 text-gray-900 tracking-[-0.04em]">
                            안녕하세요, <span className="text-primary">{userName}</span>님!
                        </p>
                        <p className="text-m-14 text-gray-750 tracking-[-0.04em]">
                            오늘도 성공적인 캠퍼스 라이프를 응원합니다!
                        </p>
                    </div>

                    <CoffeeChatBox requests={coffeeChatRequests} onViewAll={() => navigate('/chat/requests')} />
                    {/* 1-2: 일정 박스 + 포인트/커뮤니티 박스 */}
                    <div className="flex w-full flex-col gap-[15px]">
                        <CheckScheduleBox />
                        <div className="flex w-full justify-between gap-[20px]">
                            <PointBox />
                            <CommunityBox />
                        </div>
                    </div>
                </section>

                {/* 홈 2번 영역: 추천 동문 리스트 */}
                <section
                    className="flex w-full flex-col gap-[10px] bg-[var(--color-gray-100)] px-[25px] py-[30px]"
                >
                    <p className="text-sb-20 text-black tracking-[-0.04em]">추천동문</p>

                    <div className="flex w-full flex-col gap-[20px]">
                        <div className="flex w-full flex-col gap-[15px]">
                            <div className="flex w-full flex-col gap-[10px]">
                                {visibleRecommands.map((recommand) => (
                                    <RecommendBox
                                        key={`${recommand.name}-${recommand.studentId}`}
                                        userId={recommand.userId}
                                        name={recommand.name}
                                        profileImage={recommand.profileImage}
                                        major={recommand.major}
                                        studentId={recommand.studentId}
                                        intro={recommand.intro}
                                        categories={recommand.categories}
                                        onRequestChat={() =>
                                            navigate(
                                                `/alumni/profile/${encodeURIComponent(recommand.userId)}?coffeeChat=1`,
                                            )
                                        }
                                    />
                                ))}
                            </div>

                            <Card
                                width="100%"
                                height="50px"
                                className="flex items-center justify-center cursor-pointer"
                                onClick={() => navigate('/alumni')}
                            >
                                <span className="flex items-center justify-center gap-[5px] text-sb-14 text-gray-900 tracking-[-0.04em]">
                                    더보기
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3.5L8 8.5L13 3.5M3 7.5L8 12.5L13 7.5" stroke="#202023" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 홈 3번 영역: 주목받은 공모전 리스트 */}
                <section className="flex w-full flex-col gap-[10px] bg-white p-[25px]">
                    <ContestBox
                        contests={contests}
                        onTitleClick={() => navigate('/activity?tab=external')}
                        onItemClick={(contest) => navigate(`/activity/post/${contest.id}`)}
                    />
                </section>
            </div>
        </FullLayout>
    );
};
