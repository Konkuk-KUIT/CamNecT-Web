import { useEffect, useRef, useState } from "react";

// 이미지 업로드 처리를 위한 훅 (유효성 검사, 미리보기, FormData 변환)
// MypageEditPage에 이미 사용되고 있으므로 임시 유지, 추후에 useFileUpload 훅 사용해서 대체해주시거나 그냥 유지하시면 됩니다
export const useImageUpload = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // 미리보기 생성된 URL들 
    const previewUrls = useRef<string[]>([]);

    // 컴포넌트 언마운트 시 생성했던 URL들 정리((메모리 누수 방지))
    useEffect(() => {
       
        const urls = previewUrls.current;
        return () => {
            urls.forEach(url => URL.revokeObjectURL(url)); 
        };
    }, []);

    const prepareImage = (image: File) => {
        if (!image) return null;

        setIsLoading(true);

        try {
            // 1. 유효성 검사 (타입)
            if (!image.type.startsWith('image/')) {
                console.warn("이미지 파일만 업로드 가능합니다.");
                return null;
            }

            // 2. 미리보기 URL 생성 (blob:http://...)
            const previewUrl = URL.createObjectURL(image);
            // 생성된 URL을 추적 목록에 등록 
            previewUrls.current.push(previewUrl);
            
            // 3. FormData 생성 (서버 전송용)
            const formData = new FormData();
            formData.append("image", image);

            // 성공 시 결과 반환
            return { file: image, previewUrl, formData };
            
        } catch (error) {
            console.error("이미지 처리 중 오류 발생:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    return { prepareImage, isLoading };
}
