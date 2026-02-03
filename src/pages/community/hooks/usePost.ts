import { useMemo } from 'react';
import { mapToCommunityPost } from '../utils/post';

type UsePostParams = {
  postId?: string;
  currentUserId: string;
};

// 게시글 선택 및 파생 상태 계산을 캡슐화
export const usePost = ({ postId, currentUserId }: UsePostParams) => {
  const selectedPost = useMemo(() => mapToCommunityPost(postId), [postId]);

  const isQuestionPost = selectedPost.boardType === '질문';
  const isInfoPost = !isQuestionPost;
  const isPostMine = selectedPost.author.id === currentUserId;
  const isAdopted = selectedPost.isAdopted;
  const showAdoptButton = isQuestionPost && isPostMine && !isAdopted;
  const accessStatus = selectedPost.accessStatus ?? 'GRANTED';
  const isLockedQuestion = isQuestionPost && accessStatus !== 'GRANTED';
  const requiredPoints = selectedPost.requiredPoints ?? 100;
  const textCount = selectedPost.content.length;
  const imageCount = selectedPost.postImages?.length ?? 0;

  return {
    selectedPost,
    isQuestionPost,
    isInfoPost,
    isPostMine,
    isAdopted,
    showAdoptButton,
    isLockedQuestion,
    requiredPoints,
    textCount,
    imageCount,
  };
};
