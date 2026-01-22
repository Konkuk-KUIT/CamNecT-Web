import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";
import Icon from "../../components/Icon";
import Input from "../../components/Input";
import { useSignupStore } from "../../store/useSignupStore";

interface ProfileStepProps {
  onNext: () => void;
}

export const ProfileStep = ({ onNext }: ProfileStepProps) => {
  const { storedIntroduction, storedProfileImage, setProfileImage, setSelfIntroduction } = useSignupStore(
    useShallow((state) => ({
      storedIntroduction: state.selfIntroduction,
      storedProfileImage: state.profileImage,
      setProfileImage: state.setProfileImage,
      setSelfIntroduction: state.setSelfIntroduction,
    }))
  );

  const [introduction, setIntroduction] = useState(storedIntroduction);
  const [selectedFile, setSelectedFile] = useState<File | null>(storedProfileImage);
  const [showPreview, setShowPreview] = useState(!!storedProfileImage);

  // 상태 변경 시 전역 스토어 동기화
  useEffect(() => {
    setSelfIntroduction(introduction);
  }, [introduction, setSelfIntroduction]);

  useEffect(() => {
    setProfileImage(selectedFile);
  }, [selectedFile, setProfileImage]);

  // useMemo : 같은 의존성에 대해 같은 결과 캐싱 
  const previewUrl = useMemo(() => {
    return selectedFile ? URL.createObjectURL(selectedFile) : null;
  }, [selectedFile]);

  // URL cleanup (메모리 누수 방지)
  useEffect(() => {

    // cleanup : 언마운트 or 의존성 변경 시 실행
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 파일 첨부
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowPreview(true);
    }
  };

  // 다음 버튼 클릭
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex flex-col overflow-hidden absolute inset-0 bg-white px-[25px]">
      <h1 className="flex-none relative z-10 pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900">
        <p>인증 자료 제출 완료!</p>
        <p>프로필을 설정해볼까요?</p>
      </h1>

      {/* 프로필 사진 업로드 */}
      {showPreview && previewUrl ? (
        <div className="mt-[55px] mx-auto relative w-[100px] h-[100px]">
          <img
            src={previewUrl}
            alt="프로필 미리보기"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <label
            htmlFor="profileImage"
            className="absolute inset-0 cursor-pointer rounded-full"
          >
            <span className="sr-only">프로필 사진 변경</span>
          </label>
          {/* 회색 원형 배경 */}
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="mt-[55px] mx-auto relative w-[100px] h-[100px] bg-primary rounded-full">
          <label
            htmlFor="profileImage"
            className="absolute inset-0 cursor-pointer"
          >
            <span className="sr-only">프로필 사진 업로드</span>
          </label>

          {/* 회색 원형 배경 */}
          <div className="absolute bottom-0 right-0 w-[32px] h-[32px] bg-[#646464] rounded-full border-2 border-white flex items-center justify-center z-10">
            {/* 카메라 아이콘 */}
            <Icon
              name="camera"
              className="w-[20px] h-[20px] text-white"
            />
          </div>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="mt-[30px] flex flex-col w-full max-w-[325px]">
          <label className="text-m-16 tracking-[-0.4px] text-gray-750 mb-1 block">
            자기소개
          </label>

          <Input
            width="100%"
            placeholder="자기소개 내용을 입력해주세요! (최대 100자)"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={100}
            height={130}
          />

          <div className="mt-2 self-end text-R-12 text-gray-650">
            {introduction.length}/100
          </div>
        </div>

        <div className="max-h-[140px] h-full flex-none" />

        <div className="flex-none pb-[60px] w-full flex justify-center">
          <div className="flex items-center gap-[10px] w-full max-w-[325px]">
            <ButtonWhite
              label="건너뛰기"
              onClick={onNext}
              className="flex-1 !h-[50px] !rounded-[10px]"
            />

            <Button
              disabled={!(introduction && selectedFile)}
              label="다음"
              onClick={handleNext}
              className="flex-1 !h-[50px] !rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
