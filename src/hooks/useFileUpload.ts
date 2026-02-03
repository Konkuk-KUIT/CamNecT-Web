import { useCallback, useEffect, useRef } from 'react';

export interface FileItem {
  id: string;
  file: File;
  previewUrl: string;
}

interface UseFileUploadOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
}

/**
 * useFileUpload: 파일 검증 및 미리보기 생성 도구
 * - 상태(useState)를 관리하지 않아 컴포넌트 로직과 충돌하지 않습니다.
 * - 사용법이 useImageUpload와 거의 동일하여 이해하기 쉽습니다.
 */
export const useFileUpload = (options: UseFileUploadOptions = {}) => {
  const {
    maxSizeMB = 10,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  } = options;

  // 생성된 URL들을 추적하여 언마운트 시 일괄 정리 (메모리 누수 방지 유틸)
  const activeUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urls = activeUrls.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  /**
   * 파일 한 개를 검증하고 미리보기와 함께 반환
   */
  const prepareFile = useCallback((file: File): FileItem | null => {
    if (!file) return null;

    // 1. 형식 검사
    const isAllowed = allowedTypes.some((type) => {
      if (type.endsWith('/*')) return file.type.startsWith(type.replace('/*', ''));
      return file.type === type;
    });

    if (!isAllowed) {
      alert("허용되지 않는 파일 형식입니다.");
      return null;
    }

    // 2. 용량 검사
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`파일 용량이 너무 큽니다. (최대 ${maxSizeMB}MB)`);
      return null;
    }

    // 3. 미리보기 생성
    const previewUrl = URL.createObjectURL(file);
    activeUrls.current.add(previewUrl);

    return {
      id: crypto.randomUUID(),
      file,
      previewUrl,
    };
  }, [maxSizeMB, allowedTypes]);

  /**
   * 수동으로 특정 URL 메모리 해제
   */
  const revokeUrl = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    activeUrls.current.delete(url);
  }, []);

  return { prepareFile, revokeUrl };
};