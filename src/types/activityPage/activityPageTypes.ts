export type ActivityPostTab = 'club' | 'study' | 'external' | 'job';
export type ActivityPostStatus = 'OPEN' | 'CLOSED';

export const categoryToTab: Record<"CLUB" | "STUDY" | "EXTERNAL" | "RECRUITMENT", ActivityPostTab> = {
    CLUB: "club",
    STUDY: "study",
    EXTERNAL: "external",
    RECRUITMENT: "job",
};

export type ActivityPostAuthor = {
  id: string;
  name: string;
  major: string;
  studentId: string;
  profileImageUrl: string | null;
};

// 공통 기본 타입
export type ActivityPost = {
  id: string;
  tab: ActivityPostTab;
  title: string;
  content?: string;
  categories: string[];
  saveCount: number;
  createdAt: string;
  author: ActivityPostAuthor;
  status?: ActivityPostStatus;
  postImages?: string[];
  thumbnailUrl?: string;
  organizer?: string;
  deadline?: string;
  contextTitle?: string;
};

// 대외활동 상세 정보 포함 타입
export type ActivityPostDetail = ActivityPost & {
  // 대외활동/취업정보에만 있는 필드들
  isMine?: boolean;
  isBookmarked?: boolean;
  location?: string;
  target?: string;
  applyPeriod: {
    start: string;
    end: string;
  } | null;
  announceDate: string | null;
  applyUrl?: string;
  context?: string;
};


//팀원 모집 인터페이스
export interface TeamPost {
	id : string,
	title : string
}

export interface TeamRecruitPost extends TeamPost{
    activityId: string; // 어떤 활동에 붙은 팀원공고인지
    authorId: string;
    authorName: string;
    activityName: string;
    recruitNow: boolean; // 모집중/완료
    bookmarkCount: number;
    createdAt: string;
}

export interface TeamRecruitDetail extends TeamRecruitPost{
    isBookmarked: boolean;

    authorMajor: string;
    authorGrade: string;
    authorProfile: string;

    recruitDeadline: string;
    recruitTeamNumber: number;

    description: string;

    isSubmitted?:boolean;
}
