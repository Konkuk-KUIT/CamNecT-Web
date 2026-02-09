import { useState } from "react";
import { MOCK_PROFILE_DETAIL_BY_UID, MOCK_SESSION } from "../../mock/mypages";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import PopUp from "../../components/Pop-up";
import { useNavigate } from "react-router-dom";

type TabType = "follower" | "following";

export const FollowerPage = () => {
    const navigate = useNavigate();
    const userId = MOCK_SESSION.meUid;
    const userDetail = MOCK_PROFILE_DETAIL_BY_UID[userId];
    
    const [activeTab, setActiveTab] = useState<TabType>("follower");
    const [searchQuery, setSearchQuery] = useState("");

    if (!userDetail) {
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

    const { user } = userDetail;
    type FollowUser = {
  uid: string;
  name: string;
  major: string;
  gradeNumber: number;
  profileImg: string;
};

const followers: FollowUser[] = [
  {
    uid: "u1",
    name: "김나연",
    major: "컴퓨터공학과",
    gradeNumber: 23,
    profileImg: "https://picsum.photos/seed/u1/200",
  },
  {
    uid: "u2",
    name: "이서현",
    major: "전자공학과",
    gradeNumber: 22,
    profileImg: "https://picsum.photos/seed/u2/200",
  },
];

const followings: FollowUser[] = [
  {
    uid: "u3",
    name: "박지민",
    major: "경영학과",
    gradeNumber: 21,
    profileImg: "https://picsum.photos/seed/u3/200",
  },
]; //TODO: mock 지우고 api 연결
    // const followers = user.follower || [];
    // const followings = user.following || [];

    // 검색 필터링
    const getFilteredList = () => {
        const list = activeTab === "follower" ? followers : followings;
        if (!searchQuery) return list;
        
        return list.filter(person => 
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.major.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredList = getFilteredList();

    const handleCoffeeChat = (personId: string) => {
        // TODO: 커피챗 기능 구현 이후 연결
        alert(`${personId}에게 커피챗 요청`);
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
                        <div className="flex items-center justify-center h-full text-r-14 text-gray-650">
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
                                    key={user.uid} 
                                    className="w-full flex items-center justify-between gap-[15px] py-[15px] px-[25px] border-b border-gray-150"
                                >
                                    <div className="flex items-center gap-[15px]">
                                        {/* 프로필 이미지 */}
                                        <button
                                            onClick={() => alert(`${user.uid}의 프로필로 이동`)} //TODO: 프로필로 navigate
                                            className="flex-shrink-0"
                                        >
                                            <img
                                                src={user.profileImg}
                                                alt={user.name}
                                                className="w-[48px] h-[48px] rounded-full object-cover"
                                            />
                                        </button>

                                        {/* 유저 정보 */}
                                        <button
                                            onClick={() => alert(`${user.uid}의 프로필로 이동`)} //TODO: 프로필로 navigate
                                            className="flex-1 flex flex-col gap-[3px] items-start"
                                        >
                                            <span className="text-b-18-hn text-gray-900">{user.name}</span>
                                            <span className="text-r-14-hn text-gray-650 break-keep text-left">
                                                {user.major} {user.gradeNumber}학번
                                            </span>
                                        </button>
                                    </div>
                                    {/* 커피챗 버튼 */}
                                    <button
                                        onClick={() => handleCoffeeChat(user.uid)}
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