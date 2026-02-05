import { useCallback, useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { mapToCommunityPost } from '../utils/post';
import { useAuthStore } from '../../../store/useAuthStore';
import { getCommunityPostDetail } from '../../../api/community';
import { mapToCommunityPostDetail } from '../../../utils/communityMapper';
import type { CommunityPostDetail } from '../../../types/community';

type UsePostParams = {
  postId?: string;
  currentUserId: string;
};

// 게시글 선택 및 파생 상태 계산을 캡슐화
export const usePost = ({ postId, currentUserId }: UsePostParams) => {
  const userId = useAuthStore((state) => state.user?.id);
  const [selectedPost, setSelectedPost] = useState<CommunityPostDetail>(() =>
    mapToCommunityPost(postId),
  );
  const [likedByMe, setLikedByMe] = useState(false);
  const [detailError, setDetailError] = useState(false);

  const refetchPost = useCallback(() => {
    if (!postId) return;
    const numericUserId = Number(userId);
    if (!Number.isFinite(numericUserId)) return;

    getCommunityPostDetail({
      postId,
      params: { userId: numericUserId },
    })
      .then((response) => {
        setSelectedPost(mapToCommunityPostDetail(response.data));
        setLikedByMe(Boolean(response.data.likedByMe));
        setDetailError(false);
      })
      .catch((error: AxiosError) => {
        const status = error.response?.status;
        if (status === 404) {
          setDetailError(true);
          return;
        }
        setSelectedPost(mapToCommunityPost(postId));
        setLikedByMe(false);
      });
  }, [postId, userId]);

  useEffect(() => {
    refetchPost();
  }, [refetchPost]);

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
    likedByMe,
    detailError,
    refetchPost,
  };
};
