/**
 * S3 presigned URL에서 원본 파일명을 추출합니다.
 *
 * S3 URL의 response-content-disposition 파라미터:
 * - searchParams.get()이 1차 디코딩 자동 처리
 * - filename*=UTF-8''1%EC%9B%94... 형태로 남아 있으므로 한 번 더 decodeURIComponent 필요
 */
export function getFileName(url: string | undefined): string {
    if (!url) return '파일';

    try {
        const urlObj = new URL(url);
        // searchParams.get()이 1차 디코딩을 자동으로 수행
        const disposition = urlObj.searchParams.get('response-content-disposition');

        if (disposition) {
            // filename*=UTF-8''파일명 (RFC 5987, 한글 등 비 ASCII)
            const filenameStarMatch = disposition.match(/filename\*=(?:UTF-8'')?(.+)/i);
            if (filenameStarMatch) {
                // 2차 디코딩으로 한글 등 복원
                return decodeURIComponent(filenameStarMatch[1].trim());
            }

            // filename="파일명" 일반 형식
            const filenameMatch = disposition.match(/filename="?([^";\n]+)"?/i);
            if (filenameMatch) {
                return filenameMatch[1].trim();
            }
        }
    } catch {
        // URL 파싱 실패 시 무시
    }

    return '첨부파일';
}