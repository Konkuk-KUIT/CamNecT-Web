import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";
import { Tabs, type TabItem } from "../../../components/Tabs";
import { CommunityPost } from "../components/sidebar/CommunityPost";
import { InternalActivityPost } from "../components/sidebar/InternalActivityPost";
import { ExternalActivityPost } from "../components/sidebar/ExternalActivityPost";
import { RecruitPost } from "../components/sidebar/RecruitPost";
import SortSelector from "../../../components/SortSelector";
import type { InfoPost, QuestionPost } from "../../../types/community";
import { infoPosts, questionPosts } from "../../../mock/community";
import { MOCK_ACTIVITY_DETAIL_BY_ID, MOCK_TEAM_RECRUIT_DETAILS, MOCK_INTERNAL_ACTIVITY_POSTS } from "../../../mock/activities";

type TabType = 'community' | 'activity' | 'recruit';
type SortType = 'latest' | 'oldest';

const TAB_ITEMS: TabItem[] = [
    { id: 'community', label: '커뮤니티' },
    { id: 'activity', label: '대외활동' },
    { id: 'recruit', label: '팀원 모집' }
];

const SORT_LABELS: Record<SortType, string> = {
    latest: '최신순',
    oldest: '오래된순'
};

export const MyBookmarksPage = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<TabType>('community');
    const [sortOrder, setSortOrder] = useState<SortType>('latest');

    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 탭 바뀔 때마다 스크롤 맨 위로
        listRef.current?.scrollTo({ top: 0, behavior: "auto" }); // 필요하면 "smooth"
    }, [activeTab]);

    //ISO 형식 날짜 정렬 함수
    const sortPosts = <T extends { createdAt: string }>(posts: T[]): T[] => {
        return [...posts].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            
            if (sortOrder === 'latest') {
                return dateB - dateA; // 최신순 (내림차순)
            } else {
                return dateA - dateB; // 오래된순 (오름차순)
            }
        });
    };

    const MOCK_COMMUNITY_POSTS:(InfoPost|QuestionPost)[] = [...infoPosts, ...questionPosts];
    // 탭별 필터링된 게시물
    const filteredCommunityPosts = sortPosts(MOCK_COMMUNITY_POSTS);
    const filteredInternalActivityPosts = sortPosts(MOCK_INTERNAL_ACTIVITY_POSTS.filter(post => post.isBookmarked === true));
    const filteredExternalActivityPosts = sortPosts(MOCK_ACTIVITY_DETAIL_BY_ID.filter(post => post.isBookmarked === true));
    const filteredRecruitPosts = sortPosts(MOCK_TEAM_RECRUIT_DETAILS.filter(post => post.isBookmarked === true));

    // 현재 탭에 따른 게시물 개수
    const getPostCount = () => {
        if (activeTab === 'community') return filteredCommunityPosts.length;
        if (activeTab === 'activity') return filteredInternalActivityPosts.length + filteredExternalActivityPosts.length;
        return filteredRecruitPosts.length;
    };

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title="북마크"
                    leftAction={{onClick: () => navigate(-1)}}
                />
            }
        >
            <div className="w-full bg-white h-full flex flex-col min-h-0">
                {/* Tabs */}
                <Tabs
                    tabs={TAB_ITEMS}
                    activeId={activeTab}
                    onChange={(id) => setActiveTab(id as TabType)}
                />
                <div ref={listRef} className="flex-1 overflow-y-auto min-h-0">
                    {/* Sort Selector */}
                    <div className="flex justify-end px-[25px] pt-[20px]">
                        <SortSelector
                            sortKey={sortOrder}
                            sortLabels={SORT_LABELS}
                            onChange={(key) => setSortOrder(key)}
                            modalTitle="정렬"
                            buttonClassName="text-r-14-hn text-gray-650"
                        />
                    </div>

                    {/* Posts List */}
                    <div className="flex flex-col">
                        {getPostCount() === 0 ? (
                            <div className="flex items-center justify-center py-[80px]">
                                <span className="text-r-14-hn text-gray-650">작성한 글이 없습니다</span>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {/* Community Posts */}
                                {activeTab === 'community' && filteredCommunityPosts.map((post) => (
                                    <CommunityPost
                                        key={post.id}
                                        {...post}
                                    />
                                ))}

                                {/* Activity Posts (Internal + External) */}
                                {activeTab === 'activity' && (
                                    <>
                                        {filteredInternalActivityPosts.map((post) => (
                                            <InternalActivityPost
                                                key={post.id}
                                                    {...post}
                                            />
                                        ))}
                                        {filteredExternalActivityPosts.map((post) => (
                                            <ExternalActivityPost
                                                key={post.id}
                                                {...post}
                                            />
                                        ))}
                                    </>
                                )}

                                {/* Recruit Posts */}
                                {activeTab === 'recruit' && filteredRecruitPosts.map((post) => (
                                    <RecruitPost
                                        key={post.id}
                                        {...post}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HeaderLayout>
    );
};