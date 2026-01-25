import {
  communityCommentList,
  communityPostData,
  communityPostSamples,
  infoPosts,
  questionPosts,
  type CommunityPostDetail,
  type InfoPost,
  type QuestionPost,
} from '../data';

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
