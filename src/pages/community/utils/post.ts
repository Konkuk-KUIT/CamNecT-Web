import type {
  CommunityPostDetail,
  InfoPost,
  QuestionPost,
} from '../../../types/community';
import {
  communityCommentList,
  communityPostData,
  communityPostSamples,
  infoPosts,
  questionPosts,
} from '../../../mock/community';

// 게시글 타입별 상세 모델 매핑 유틸
const buildInfoPostDetail = (post: InfoPost): CommunityPostDetail => ({
  id: post.id,
  boardType: '정보',
  title: post.title,
  likes: post.likes,
  comments: post.comments,
  saveCount: post.saveCount,
  isAdopted: false,
  createdAt: post.createdAt,
  author: post.author,
  content: post.content,
  categories: post.categories,
  postImages: post.postImageUrl ? [post.postImageUrl] : undefined,
});

const buildQuestionPostDetail = (post: QuestionPost): CommunityPostDetail => ({
  id: post.id,
  boardType: '질문',
  title: post.title,
  likes: post.likes,
  comments: post.answers,
  saveCount: post.saveCount,
  isAdopted: post.isAdopted,
  // TODO: 실제 API 연동 시 채택 댓글 ID 필드 추가 또는 별도 API에서 조회 필요
  adoptedCommentId: post.isAdopted ? communityCommentList[0]?.id : undefined,
  createdAt: post.createdAt,
  accessStatus: post.accessStatus,
  requiredPoints: post.requiredPoints,
  myPoints: post.myPoints,
  author: post.author,
  content: post.content,
  categories: post.categories,
});

export const mapToCommunityPost = (postId?: string | null): CommunityPostDetail => {
  // TODO: postId가 없을 때 더미 데이터 대신 에러 팝업 처리 필요
  if (!postId) return communityPostData;
  if (communityPostData.id === postId) return communityPostData;

  const infoMatch = infoPosts.find((post) => post.id === postId);
  if (infoMatch) return buildInfoPostDetail(infoMatch);

  const questionMatch = questionPosts.find((post) => post.id === postId);
  if (questionMatch) return buildQuestionPostDetail(questionMatch);

  const sampleMatch = communityPostSamples.find((post) => post.id === postId);
  if (sampleMatch) {
    return {
      ...sampleMatch,
      adoptedCommentId:
        sampleMatch.isAdopted
          ? sampleMatch.adoptedCommentId ?? communityCommentList[0]?.id
          : undefined,
    };
  }

  return communityPostData;
};

// 게시글 날짜를 YY.MM.DD HH:mm 형식으로 정규화
export const formatPostDisplayDate = (value: string) => {
  if (!value) return value;
  if (/^\d{2}\.\d{2}\.\d{2} \d{2}:\d{2}/.test(value)) {
    return value;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  const year = String(parsed.getFullYear()).slice(-2);
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  const hours = String(parsed.getHours()).padStart(2, '0');
  const minutes = String(parsed.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
