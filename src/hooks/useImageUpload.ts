import { useState } from "react";

// 이미지 업로드 Hook
export const useImageUpload = () => {
    // 버튼 상태 제어용 (로딩 중에, 버튼 disabled or 버튼 텍스트를 '변환중'으로 변경)
    const [isLoading, setIsLoading] = useState(false);

    const prepareImage = async (image: File) => {
        if (!image) return;

        setIsLoading(true);

        try {
            // 1. 유효성 검사 (타입)
            if (!image.type.startsWith('image/')) {
                alert("이미지 파일만 업로드 가능합니다.");
                return null;
            }

            // 2. 미리보기 URL 생성 (UI 표시용, blob:http://...)
            const previewUrl = URL.createObjectURL(image);

            // 3. FormData 생성 (서버 전송용)
            const formData = new FormData();
            formData.append("image", image); // 원본 파일 그대로

            // { 원본파일, 미리보기URL, FormData } 반환
            return { file: image, previewUrl, formData };
            
        } catch (error) {
            console.error("이미지 처리 중 오류 발생:", error);
            alert("이미지 업로드 처리에 실패했습니다"); // todo 해당 팝업 디자이너분께 요청 후 컴포넌트 return
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return {prepareImage, isLoading};
}