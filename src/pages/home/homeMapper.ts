import type { HomeResponse, TagItem } from "../../api-types/homeApiTypes";
import type { CoffeeChatRequest } from "./components/CoffeeChatBox";
import type { Contest } from "./components/ContestBox";
import type { RecommendBoxProps } from "./components/RecommendBox";

export type HomeViewModel = {
    userName: string;
    coffeeChatRequests: CoffeeChatRequest[];
    coffeeChatTotalCount: number;
    pointBalance: number;
    recommendList: RecommendBoxProps[];
    contests: Contest[];
};

const normalizeCategoryCode = (value?: string) => (value ?? "").toLowerCase();

const isMajorCategory = (tag?: TagItem) => {
    if (!tag?.category) return false;
    const code = normalizeCategoryCode(tag.category.code);
    return code === "field_major" || code.includes("major");
};

const resolveMajorName = (tags: TagItem[], majorId?: number) => {
    const majorTag = tags.find((tag) => isMajorCategory(tag));
    if (majorTag?.name) return majorTag.name;
    if (majorId && majorId > 0) return `Major ${majorId}`;
    return "-";
};

const resolveCategories = (tags: TagItem[]) => {
    return tags
        .filter((tag) => !isMajorCategory(tag))
        .map((tag) => tag.name)
        .filter((name) => name);
};

export const mapHomeResponseToViewModel = (
    response: HomeResponse | undefined,
    fallback: HomeViewModel,
): HomeViewModel => {
    if (!response?.data) return fallback;

    const { data } = response;

    const coffeeChatRequests: CoffeeChatRequest[] = (data.coffeeChat?.latest2 ?? []).map((request) => ({
        name: request.senderName,
        major: request.majorName,
        studentId: request.studentNo,
    }));

    const recommendList: RecommendBoxProps[] = (data.alumni?.items ?? []).map((alumni) => {
        const tags = alumni.tagList ?? [];
        const majorName = resolveMajorName(tags, alumni.profile?.majorId);
        const categories = resolveCategories(tags);

        return {
            userId: String(alumni.userId),
            name: alumni.name,
            profileImage: alumni.profile?.profileImageUrl || undefined,
            major: majorName,
            studentId: alumni.profile?.studentNo ?? "",
            intro: alumni.profile?.bio ?? "",
            categories,
        };
    });

    const contests: Contest[] = (data.contests?.items ?? []).map((contest) => ({
        id: String(contest.contestId),
        title: contest.title,
        posterImgUrl: contest.thumbnailUrl || undefined,
        organizer: contest.organizer,
        location: "-",
        deadline: "-",
        views: 0,
        comments: 0,
        isHot: false,
        isClosingSoon: false,
    }));

    return {
        userName: data.user?.displayName || fallback.userName,
        coffeeChatRequests,
        coffeeChatTotalCount:
            typeof data.coffeeChat?.pendingCount === "number"
                ? data.coffeeChat.pendingCount
                : coffeeChatRequests.length,
        pointBalance:
            typeof data.point?.balance === "number" ? data.point.balance : fallback.pointBalance,
        recommendList,
        contests,
    };
};
