import axios from 'axios';

// S3 Presigned URL을 사용하여 파일을 직접 업로드
// uploadUrl: 업로드할 대상 URL (S3)
// file: 업로드할 파일 객체
// headers: 서버에서 전달받은 필수 헤더들
export const uploadFileToS3 = async (
  uploadUrl: string, // presigned url (S3주소)
  file: File, // 파일 객체
  headers: Record<string, string> // 헤더 정보(presign response)
) => {
  // S3 업로드는 보통 PUT 메서드를 사용
  // axiosInstance사용 X
  return await axios.put(uploadUrl, file, {
    headers: {
      ...headers,
      'Content-Type': file.type, // 파일 타입 명시 필수
    },
  });
};
