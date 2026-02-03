export type ActivityPostTab = 'club' | 'study' | 'external' | 'job';
export type ActivityPostStatus = 'OPEN' | 'CLOSED';

export type ActivityPostAuthor = {
  id: string;
  name: string;
  major: string;
  studentId: string;
  profileImageUrl?: string;
};

export type ActivityPost = {
  id: string;
  tab: ActivityPostTab;
  title: string;
  content: string;
  categories: string[];
  likes: number;
  comments: number;
  saveCount: number;
  createdAt: string;
  author: ActivityPostAuthor;
  status?: ActivityPostStatus;
  postImages?: string[];
  thumbnailUrl?: string;
};

export type ActivityComment = {
  id: string;
  author: ActivityPostAuthor;
  content: string;
  createdAt: string;
  replies?: ActivityComment[];
};
