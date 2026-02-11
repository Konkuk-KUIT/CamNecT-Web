import { useCallback, useEffect, useRef, useState } from 'react';
import type { AxiosError } from 'axios';
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
  const [selectedPost, setSelectedPost] = useState<CommunityPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedByMe, setLikedByMe] = useState(false);
  const [detailError, setDetailError] = useState(false);
  // 동일 마운트 사이클에서 중복 호출을 방지하기 위한 플래그
  const isFetchingRef = useRef(false);

  // 게시글 상세를 재조회하는 공용 함수
  const refetchPost = useCallback(() => {
    if (!postId) return;
    const numericUserId = Number(userId);
    if (!Number.isFinite(numericUserId)) return;
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
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
        setDetailError(status === 404 || Boolean(status));
        setSelectedPost(null);
        setLikedByMe(false);
      })
      .finally(() => {
        setIsLoading(false);
        isFetchingRef.current = false;
      });
  }, [postId, userId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      refetchPost();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refetchPost]);

  if (!selectedPost) {
    return {
      selectedPost,
      isQuestionPost: false,
      isInfoPost: false,
      isPostMine: false,
      isAdopted: false,
      showAdoptButton: false,
      isLockedQuestion: false,
      requiredPoints: 0,
      textCount: 0,
      imageCount: 0,
      likedByMe,
      detailError,
      refetchPost,
      isLoading,
    };
  }

  const isQuestionPost = selectedPost.boardType === '질문';
  const isInfoPost = !isQuestionPost;
  const isPostMine = selectedPost.author.id === currentUserId;
  const isAdopted = selectedPost.isAdopted;
  const showAdoptButton = isQuestionPost && isPostMine && !isAdopted;
  const accessStatus =
    selectedPost.accessStatus ?? (isPostMine ? 'GRANTED' : 'LOCKED');
  const isLockedQuestion = isQuestionPost && !isPostMine && accessStatus !== 'GRANTED';
  const requiredPoints = selectedPost.requiredPoints ?? 100;
  const textCount = selectedPost.content?.length ?? 0;
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
    isLoading,
  };
};
