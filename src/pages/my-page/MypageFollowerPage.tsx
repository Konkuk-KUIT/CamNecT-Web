import { useState } from "react";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import PopUp from "../../components/Pop-up";
import { useNavigate } from "react-router-dom";
import defaultProfileImg from "../../assets/image/defaultProfileImg.png"
import { useAuthStore } from "../../store/useAuthStore";
import { getFollowers, getFollowings } from "../../api/profileApi";
import type { FollowUser } from "../../api-types/profileApiTypes";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_PROFILE_IMAGE = defaultProfileImg;

type TabType = "follower" | "following";

export const FollowerPage = () => {
    const navigate = useNavigate();
    const authUser = useAuthStore(state => state.user);
    const userId = authUser?.id ? parseInt(authUser.id) : null;
    
    const [activeTab, setActiveTab] = useState<TabType>("follower");
    const [searchQuery, setSearchQuery] = useState("");

    //팔로워 목록 조회
    const { data: followersResponse, isLoading: isFollowersLoading, isError: isFollowersError } = useQuery({
        queryKey: ["followers", userId],
        queryFn: () => getFollowers(userId!),
        enabled: !!userId,
    });

    // 팔로잉 목록 조회
    const { data: followingsResponse, isLoading: isFollowingsLoading, isError: isFollowingsError } = useQuery({
        queryKey: ["followings", userId],
        queryFn: () => getFollowings(userId!),
        enabled: !!userId,
    });

    const isLoading = isFollowersLoading || isFollowingsLoading;
    const isError = isFollowersError || isFollowingsError;

    if (isLoading) {
        return (
            <PopUp
                type="loading"
                isOpen={true}
            />
        );
    }

    if (!userId || isError) {
        return (
            <PopUp
                type="error"
                title='일시적 오류로 인해\n프로필 정보를 찾을 수 없습니다.'
                titleSecondary='잠시 후 다시 시도해주세요'
                isOpen={true}
                rightButtonText='확인'
                onClick={() => navigate(-1)}
            />
        );
    }

    const followers = followersResponse?.data.users ?? [];
    const followings = followingsResponse?.data.users ?? [];

    // 검색 필터링
    const getFilteredList = (): FollowUser[] => {
        const list = activeTab === "follower" ? followers : followings;
        if (!searchQuery) return list;

        return list.filter(person =>
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.majorName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredList = getFilteredList();

    const handleCoffeeChat = (personId: number) => {
        navigate(`/alumni/profile/${personId}`);
    };

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title="팔로워"
                />
            }
        >
            <div className="w-full h-full bg-white flex flex-col">
                {/* 탭 */}
                <div className="w-full px-[21px] border-b border-gray-650">
                    <div className="flex items-center justify-around">
                        <button
                            onClick={() => setActiveTab("follower")}
                            className={`flex justify-center items-center flex-1 pt-[10px] pb-[16px] relative flex text-sb-16-hn ${
                                activeTab === "follower" 
                                    ? "text-gray-900" 
                                    : "text-gray-650"
                            }`}
                        >
                            팔로워
                            {activeTab === "follower" && (
                                <div className="w-[60px] absolute bottom-0 h-0 border-[2px] border-primary rounded-full" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("following")}
                            className={`flex justify-center items-center flex-1 pt-[10px] pb-[16px] relative flex text-sb-16-hn ${
                                activeTab === "following" 
                                    ? "text-gray-900" 
                                    : "text-gray-650"
                            }`}
                        >
                            팔로잉
                            {activeTab === "following" && (
                                <div className="w-[60px] absolute bottom-0 h-0 border-[2px] border-primary rounded-full" />
                            )}
                        </button>
                    </div>
                </div>

                {/* 검색창 */}
                <div className="w-full px-[25px] pt-[20px] pb-[10px]">
                    <div className="relative">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
                        className="absolute left-[19px] top-[50%] translate-y-[-50%]">
                            <path 
                                d="M18.7508 18.7508L13.5538 13.5538M13.5538 13.5538C14.9604 12.1472 15.7506 10.2395 15.7506 8.25028C15.7506 6.26108 14.9604 4.35336 13.5538 2.94678C12.1472 1.54021 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.54021 2.94678 2.94678C1.54021 4.35336 0.75 6.26108 0.75 8.25028C0.75 10.2395 1.54021 12.1472 2.94678 13.5538C4.35336 14.9604 6.26108 15.7506 8.25028 15.7506C10.2395 15.7506 12.1472 14.9604 13.5538 13.5538Z" 
                                stroke="#646464" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"/>
                        </svg>
                        <input
                            type="text"
                            placeholder = {activeTab === "follower" ? "팔로워 검색":"팔로잉 검색"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-[40px] pl-[52px] pr-[19px] py-[8px] rounded-[30px] bg-gray-150 text-r-14 text-gray-750 placeholder:text-gray-650 focus:outline-none"
                        />
                    </div>
                </div>

                {/* 팔로워/팔로잉 리스트 */}
                <div className="flex-1 overflow-y-auto">
                    {filteredList.length === 0 ? (
                        <div className="flex items-center justify-center py-[20px] h-full text-r-14 text-gray-650">
                            {searchQuery 
                                ? "검색 결과가 없습니다" 
                                : activeTab === "follower" 
                                    ? "팔로워가 없습니다" 
                                    : "팔로잉이 없습니다"
                            }
                        </div>
                    ) : (
                        <div className="w-full flex flex-col">
                            {filteredList.map((user) => (
                                <div 
                                    key={user.userId} 
                                    className="w-full flex items-center justify-between gap-[15px] py-[15px] px-[25px] border-b border-gray-150"
                                >
                                    <div className="flex items-center gap-[15px]">
                                        {/* 프로필 이미지 */}
                                        <button
                                            onClick={() => navigate(`/alumni/profile/${user.userId}`)} //TODO: 프로필로 navigate
                                            className="flex-shrink-0"
                                        >
                                            <img
                                                src={user.profileImageUrl ?? defaultProfileImg}
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null; //이미지 깨짐 방지->S3에서 403
                                                    e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                                                }}
                                                alt={user.name}
                                                className="w-[48px] h-[48px] rounded-full object-cover"
                                            />
                                        </button>

                                        {/* 유저 정보 */}
                                        <button
                                            onClick={() => alert(`${user.userId}의 프로필로 이동`)} //TODO: 프로필로 navigate
                                            className="flex-1 flex flex-col gap-[3px] items-start"
                                        >
                                            <span className="text-b-18-hn text-gray-900">{user.name}</span>
                                            <span className="text-r-14-hn text-gray-650 break-keep text-left">
                                                {user.majorName} {user.studentNo.slice(2,4)}학번
                                            </span>
                                        </button>
                                    </div>
                                    {/* 커피챗 버튼 */}
                                    <button
                                        onClick={() => handleCoffeeChat(user.userId)}
                                        className="min-w-[83px] p-[10px] rounded-[10px] border border-primary bg-white text-m-12-hn text-primary"
                                    >
                                        커피챗 보내기
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </HeaderLayout>
    );
};