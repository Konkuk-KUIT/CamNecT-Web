import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from "../../mock/tags";
import { useSignupStore } from "../../store/useSignupStore";
import TagsChooseModal from "./components/TagsChooseModal";
interface InterestsStepProps {
    onNext: () => void;
}

// todo useEffect로 실제 서버에서 태그들 불러오기
export const InterestsStep = ({ onNext }: InterestsStepProps) => {

    const { tags, setTags } = useSignupStore(
        useShallow((state) => ({
            tags: state.tags,
            setTags: state.setTags,
        }))
    );

    const [selectedTags, setSelectedTags] = useState<string[]>(tags);

    // 태그 토글 핸들러 (부모에서 관리)
    const handleToggleTag = (tagName: string) => {
        setSelectedTags(prev => {
            if (prev.includes(tagName)) {
                return prev.filter(t => t !== tagName);
            } else {
                if (prev.length >= 5) return prev;
                return [tagName, ...prev];
            }
        });
    };

    // 다음 버튼 클릭 시 전역스토어에 저장
    const handleNext = () => {
        setTags(selectedTags);
        onNext();
    };

    return (
        <div className="absolute inset-0 bg-white px-[25px] flex flex-col overflow-hidden">
            {/* 1. 헤더 영역 (고정) */}
            <h1 className="flex-none relative z-10 pt-[86px] text-[24px] font-bold leading-[140%] tracking-[-0.6px] text-gray-900">
                관심분야를 알려주세요!
            </h1>

            {/* 2. 태그 선택 영역 (나머지 공간 모두 차지) */}
            <div className="flex-1 min-h-0">
                <TagsChooseModal 
                    selectedTags={selectedTags} 
                    categories={TAG_CATEGORIES} 
                    allTags={MOCK_ALL_TAGS} 
                    onToggle={handleToggleTag} 
                />
            </div>

            {/* 3. 버튼 영역 (바닥에서 60px 유지) */}
            <div className="flex-none pt-[20px] pb-[60px] w-full flex justify-center">
                <div className="flex items-center gap-[10px] w-full max-w-[325px]">
                    <ButtonWhite
                        label="건너뛰기"
                        className="flex-1 !h-[50px] !rounded-[10px]"
                        onClick={onNext}
                    />

                    <Button
                        label="다음"
                        disabled={selectedTags.length === 0}
                        className="flex-1 !h-[50px] !rounded-[10px]"
                        onClick={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};