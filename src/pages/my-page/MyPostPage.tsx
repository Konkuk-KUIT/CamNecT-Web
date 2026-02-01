import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import { Tabs, type TabItem } from "../../components/Tabs";
import { MOCK_SESSION } from "../../mock/mypages";
import { type UserMini } from "../../types/mypage/mypageTypes";
import { CommunityPost } from "./components/sidebar/CommunityPost";
import { InternalActivityPost } from "./components/sidebar/InternalActivityPost";
import { ExternalActivityPost } from "./components/sidebar/ExternalActivityPost";
import { RecruitPost } from "./components/sidebar/RecruitPost";

// Mock data type
interface CommunityPostType {
    postId: string;
    authorInfo: UserMini;
    title: string;
    preview: string;
    likeCount: number;
    commentCount: number;
    tags: string[];
    createdAt: string;
    thumbnailUrl?: string;
}

interface InternalActivityPostType {
    postId: string;
    authorId: string;
    title: string;
    preview: string;
    bookmarkCount: number;
    tags: string[];
    createdAt: string;
    thumbnailUrl?: string;
}

interface ExternalActivityPostType {
    postId: string;
    authorId: string;
    title: string;
    location: string;
    bookmarkCount: number;
    tags: string[];
    dDay: number;
    deadline: string;
    createdAt: string;
    posterImg?: string;
    isBookmarked: boolean;
}

interface RecruitPostType {
    postId: string;
    authorId: string;
    authorName: string;
    title: string;
    contestName: string;
    bookmarkCount: number;
    recruitNow: boolean;
    createdAt: string; //나중에 변환 예정
}

// Mock data
const MOCK_COMMUNITY_POSTS: CommunityPostType[] = [
    {
        postId: '1',
        authorInfo: {id: "user_002", name: "박원빈", major: "시각디자인학과", gradeNumber: "19"},
        title: '참고하시면 좋을 사이트 정리해드립니다',
        preview: '제가 신입생 때 알았다면 좋았을 사이트들 여러분에게는 제가 무료로 알려드리겠습니다. 그건 바로',
        likeCount: 27,
        commentCount: 3,
        tags: ['디자인컴버전스학부', '공부'],
        createdAt: '2일 전'
    },
    {
        postId: '2',
        authorInfo: {id: "user_002", name: "박원빈", major: "시각디자인학과", gradeNumber: "19"},
        title: '좋은 사이트 v.2',
        preview: '사이트 링크들 기타 등등',
        likeCount: 27,
        commentCount: 3,
        tags: ['디자인컴버전스학부', '공부'],
        createdAt: '2일 전'
    }
];

const MOCK_INTERNAL_ACTIVITY_POSTS: InternalActivityPostType[] = [
    {
        postId: '3',
        authorId: 'user_002',
        title: '보드게임 소모임 NoJ 부원 모집합니다',
        preview: '저 혼자 놀기 적적해 다른 사람들을 구해봅니다 소모임 목표는 저 혼자 놀기 적적해 다른 사람들을 구해봅니다 소모임 목표는',
        bookmarkCount: 5,
        tags: ['모집중', '전공'],
        createdAt: '2026-01-31T00:00:00.000Z',
        thumbnailUrl: "https://picsum.photos/seed/post_003/900/700"
    }
];

const MOCK_EXTERNAL_ACTIVITY_POSTS: ExternalActivityPostType[] = [
    {
        postId: '4',
        authorId: 'user_002',
        title: "나라사랑 공모전 나라사랑 공모전 나라사랑 공모전 공모전전전",
        location: "부산광역시",
        tags: ["광고/마케팅", "기획/아이디어"],
        posterImg: "https://picsum.photos/seed/act_001/94/134",
        dDay: 34,
        deadline: "2025.10.30",
        bookmarkCount: 12,
        isBookmarked: false,
        createdAt: "2025-10-01T00:00:00.000Z",
    }
];

const MOCK_RECRUIT_POSTS: RecruitPostType[] = [
    {
        postId: '5',
        authorId: 'user_002',
        authorName: '박원빈',
        title: '기획 포지션 한 분 구합니다. 같이 성장하실 분!',
        contestName: '나라사랑 공모전',
        bookmarkCount: 12,
        recruitNow: true,
        createdAt: '2일 전',
    },
    {
        postId: '6',
        authorId: 'user_002',
        authorName: '박원빈',
        title: '두 분 구합니다. 열심히 하실 분',
        contestName: '서울시 공모전',
        bookmarkCount: 8,
        recruitNow: false,
        createdAt: '2일 전',
    }
];

type TabType = 'community' | 'activity' | 'recruit';

const TAB_ITEMS: TabItem[] = [
    { id: 'community', label: '커뮤니티' },
    { id: 'activity', label: '대외활동' },
    { id: 'recruit', label: '팀원 모집' }
];

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
    const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

    // 탭별 필터링된 게시물
    const filteredCommunityPosts = MOCK_COMMUNITY_POSTS.filter(post => post.authorInfo.id === userId);
    const filteredInternalActivityPosts = MOCK_INTERNAL_ACTIVITY_POSTS.filter(post => post.authorId === userId);
    const filteredExternalActivityPosts = MOCK_EXTERNAL_ACTIVITY_POSTS.filter(post => post.authorId === userId);
    const filteredRecruitPosts = MOCK_RECRUIT_POSTS.filter(post => post.authorId === userId);

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

                {/* Sort Dropdown */}
                <div className="flex justify-end px-[25px] py-[16px]">
                    <button
                        onClick={() => setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest')}
                        className="flex items-center gap-[4px] text-R-12-hn text-gray-600"
                    >
                        주최순
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Posts List */}
                <div className="flex flex-col">
                    {getPostCount() === 0 ? (
                        <div className="flex items-center justify-center py-[80px]">
                            <span className="text-R-14-hn text-gray-500">작성한 글이 없습니다</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-[20px]">
                            {/* Community Posts */}
                            {activeTab === 'community' && filteredCommunityPosts.map((post) => (
                                <CommunityPost
                                    key={post.postId}
                                    {...post}
                                />
                            ))}

                            {/* Activity Posts (Internal + External) */}
                            {activeTab === 'activity' && (
                                <>
                                    {filteredInternalActivityPosts.map((post) => (
                                        <InternalActivityPost
                                            key={post.postId}
                                                {...post}
                                        />
                                    ))}
                                    {filteredExternalActivityPosts.map((post) => (
                                        <ExternalActivityPost
                                            key={post.postId}
                                            {...post}
                                        />
                                    ))}
                                </>
                            )}

                            {/* Recruit Posts */}
                            {activeTab === 'recruit' && filteredRecruitPosts.map((post) => (
                                <RecruitPost
                                    key={post.postId}
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