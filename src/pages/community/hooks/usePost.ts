import { useMemo } from 'react';
import { mapToCommunityPost } from '../utils/post';

type UsePostParams = {
  postId?: string;
  currentUserName: string;
};

// 게시글 선택 및 파생 상태 계산을 캡슐화
export const usePost = ({ postId, currentUserName }: UsePostParams) => {
  const selectedPost = useMemo(() => mapToCommunityPost(postId), [postId]);

  const isQuestionPost = selectedPost.boardType === '질문';
  const isInfoPost = !isQuestionPost;
  const isPostMine = selectedPost.author.name === currentUserName;
  const isAdopted = selectedPost.isAdopted;
  const showAdoptButton = isQuestionPost && isPostMine && !isAdopted;
  const isLockedQuestion = isQuestionPost && selectedPost.accessStatus !== 'GRANTED';
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
