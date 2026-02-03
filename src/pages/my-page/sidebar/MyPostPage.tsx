import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";
import { Tabs, type TabItem } from "../../../components/Tabs";
import { MOCK_SESSION } from "../../../mock/mypages";
import { CommunityPost } from "../components/sidebar/CommunityPost";
import { InternalActivityPost } from "../components/sidebar/InternalActivityPost";
import { ExternalActivityPost } from "../components/sidebar/ExternalActivityPost";
import { RecruitPost } from "../components/sidebar/RecruitPost";
import SortSelector from "../../../components/SortSelector";
import type { InfoPost, QuestionPost } from '../../../types/community';
import type { ActivityListItem, TeamRecruitPost } from '../../../types/activityPage/activityPageTypes';
import { infoPosts, questionPosts } from "../../../mock/community";

// // Mock data type
// interface CommunityPostType {
//     postId: string;
//     authorInfo: UserMini;
//     title: string;
//     preview: string;
//     likeCount: number;
//     commentCount: number;
//     tags: string[];
//     createdAt: string;
//     thumbnailUrl?: string;
// }

// interface InternalActivityPostType {
//     postId: string;
//     authorId: string;
//     title: string;
//     preview: string;
//     bookmarkCount: number;
//     tags: string[];
//     createdAt: string;
//     thumbnailUrl?: string;
// }

// interface ExternalActivityPostType {
//     postId: string;
//     authorId: string;
//     title: string;
//     location: string;
//     bookmarkCount: number;
//     tags: string[];
//     dDay: number;
//     deadline: string;
//     createdAt: string;
//     posterImg?: string;
//     isBookmarked: boolean;
// }

// interface RecruitPostType {
//     postId: string;
//     authorId: string;
//     authorName: string;
//     title: string;
//     contestName: string;
//     bookmarkCount: number;
//     recruitNow: boolean;
//     createdAt: string;
// }

// Mock data
const MOCK_COMMUNITY_POSTS: (InfoPost|QuestionPost)[] = [
    {
        id: '1',
        author: {id: "user_002", name: "박원빈", major: "시각디자인학과", studentId: "19"},
        title: '참고하시면 좋을 사이트 정리해드립니다',
        content: '제가 신입생 때 알았다면 좋았을 사이트들 여러분에게는 제가 무료로 알려드리겠습니다. 그건 바로',
        likes: 27,
        comments: 3,
        categories: ['디자인컴버전스학부', '공부'],
        saveCount: 2,
        createdAt: '2026-01-21T00:00:00.000Z',
    },
    {
        id: '2',
        author: {id: "user_002", name: "박원빈", major: "시각디자인학과", studentId: "19"},
        title: '좋은 사이트 v.2',
        content: '사이트 링크들 기타 등등 사이트 링크들 기타 등등 사이트 링크들 기타 등등',
        likes: 27,
        comments: 3,
        categories: ['디자인컴버전스학부', '공부'],
        createdAt: '2025-01-31T00:00:00.000Z',
        saveCount: 5,
        postImageUrl: "https://picsum.photos/seed/post_002/900/700",
    }
];

const MOCK_INTERNAL_ACTIVITY_POSTS: ActivityListItem[] = [
    {
        id: '3',
        authorId: 'user_002',
        title: '보드게임 소모임 NoJ 부원 모집합니다',
        content: '저 혼자 놀기 적적해 다른 사람들을 구해봅니다 소모임 목표는 저 혼자 놀기 적적해 다른 사람들을 구해봅니다 소모임 목표는',
        bookmarkCount: 5,
        tags: ['모집중', '전공'],
        createdAt: '2026-01-31T00:00:00.000Z',
        posterImg: "https://picsum.photos/seed/post_003/900/700"
    }
];

const MOCK_EXTERNAL_ACTIVITY_POSTS: ActivityListItem[] = [
    {
        id: '4',
        authorId: 'user_master',
        title: "나라사랑 공모전 나라사랑 공모전 나라사랑 공모전 공모전전전",
        location: "부산광역시",
        tags: ["광고/마케팅", "기획/아이디어"],
        posterImg: "https://picsum.photos/seed/act_001/94/134",
        deadline: "2025.10.30",
        bookmarkCount: 12,
        isBookmarked: false,
        createdAt: "2025-10-01T00:00:00.000Z",
    }
];

const MOCK_RECRUIT_POSTS: TeamRecruitPost[] = [
    {
        id: '5',
        activityId: 'external_001',
        authorId: 'user_002',
        authorName: '박원빈',
        title: '기획 포지션 한 분 구합니다. 같이 성장하실 분!',
        contestName: '나라사랑 공모전',
        bookmarkCount: 12,
        recruitNow: true,
        createdAt: '2026-01-31T00:00:00.000Z',
    },
    {
        id: '6',
        activityId: 'external_001',
        authorId: 'user_002',
        authorName: '박원빈',
        title: '두 분 구합니다. 열심히 하실 분',
        contestName: '서울시 공모전',
        bookmarkCount: 8,
        recruitNow: false,
        createdAt: '2026-02-01T00:00:00.000Z',
    }
];

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

export const MyPostsPage = () => {
    const navigate = useNavigate();
    const userId = MOCK_SESSION.meUid;
    // const userInfo: UserMini = (({ id, name, major, gradeNumber }) => ({
    //     id,
    //     name,
    //     major,
    //     gradeNumber,
    // }))(MOCK_PROFILE_DETAIL_BY_UID[userId].user);

    const [activeTab, setActiveTab] = useState<TabType>('community');
    const [sortOrder, setSortOrder] = useState<SortType>('latest');

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

    // 탭별 필터링된 게시물
    const filteredCommunityPosts = sortPosts(MOCK_COMMUNITY_POSTS.filter(post => post.author.id === userId));
    const filteredInternalActivityPosts = sortPosts(MOCK_INTERNAL_ACTIVITY_POSTS.filter(post => post.authorId === userId));
    const filteredExternalActivityPosts = sortPosts(MOCK_EXTERNAL_ACTIVITY_POSTS.filter(post => post.authorId === userId));
    const filteredRecruitPosts = sortPosts(MOCK_RECRUIT_POSTS.filter(post => post.authorId === userId));

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
                    title="작성한 글"
                    leftAction={{onClick: () => navigate(-1)}}
                />
            }
        >
            <div className="w-full bg-white h-full">
                {/* Tabs */}
                <Tabs
                    tabs={TAB_ITEMS}
                    activeId={activeTab}
                    onChange={(id) => setActiveTab(id as TabType)}
                />

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
        </HeaderLayout>
    );
};