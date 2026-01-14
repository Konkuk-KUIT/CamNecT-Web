import { useState, useMemo } from "react";
import Icon from "../../../components/Icon";
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from "../../../mock/tags";

interface TagEditModalProps {
    tags: string[];
    onClose: () => void;
    onSave: (newTags: string[]) => void;
}

export default function TagEditModal({ tags, onClose, onSave }: TagEditModalProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>(tags);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<'전체' | '분야' | '관심사'>('전체');

    // 변경사항 추적
    const hasChanges = useMemo(() => {
        if (selectedTags.length !== tags.length) return true;
        return !selectedTags.every(tag => tags.includes(tag));
    }, [selectedTags, tags]);

    // 태그 선택/해제
    const toggleTag = (tagName: string) => {
        if (selectedTags.includes(tagName)) {
            setSelectedTags(selectedTags.filter(t => t !== tagName));
        } else {
            if (selectedTags.length >= 5) {
                alert("최대 5개까지 선택 가능합니다."); //TODO: 이 부분 modal로 따로 띄울건지 그냥 막아둘건지 상의
                return;
            }
            setSelectedTags([...selectedTags, tagName]);
        }
    };

    // 선택된 태그 제거
    const removeSelectedTag = (tagName: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tagName));
    };

    // 탭에 따른 태그 필터링
    const getFilteredTagsByTab = () => {
        // 검색어가 있을 때
        if (searchQuery) {
            const filtered = MOCK_ALL_TAGS.filter(tag => 
                tag.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            // 검색 결과를 카테고리별로 그룹화
            if (activeTab === '전체') {
                const grouped = TAG_CATEGORIES.map(cat => ({
                    ...cat,
                    tags: filtered.filter(tag => tag.category === cat.id)
                })).filter(cat => cat.tags.length > 0);
                return grouped;
            } else if (activeTab === '분야') {
                const grouped = TAG_CATEGORIES
                    .filter(cat => cat.id === 'major')
                    .map(cat => ({
                        ...cat,
                        tags: filtered.filter(tag => tag.category === cat.id)
                    }))
                    .filter(cat => cat.tags.length > 0);
                return grouped;
            } else {
                const grouped = TAG_CATEGORIES
                    .filter(cat => cat.id === 'interest' || cat.id === 'career' || cat.id === 'etc')
                    .map(cat => ({
                        ...cat,
                        tags: filtered.filter(tag => tag.category === cat.id)
                    }))
                    .filter(cat => cat.tags.length > 0);
                return grouped;
            }
        }

        // 검색어가 없을 때
        if (activeTab === '전체') {
            return TAG_CATEGORIES;
        } else if (activeTab === '분야') {
            return TAG_CATEGORIES.filter(cat => cat.id === 'major');
        } else {
            return TAG_CATEGORIES.filter(cat => 
                cat.id === 'interest' || cat.id === 'career' || cat.id === 'etc'
            );
        }
    };

    // 완료 버튼
    const handleComplete = () => {
        if (!hasChanges) {
            onClose();
            return;
        }
        onSave(selectedTags);
    };

    const filteredCategories = getFilteredTagsByTab();

    return (
        <div className="absolute inset-0 z-50 bg-white flex flex-col">
            {/* 헤더 - TODO: layout으로 변경 */}
            <header className="w-full py-[10px] px-[25px] h-[48px] border-b border-gray-150 flex items-center justify-between bg-white">
                <button 
                    className="w-[24px] h-[24px]" 
                    onClick={onClose}
                >
                    <Icon name='cancel' className="block shrink-0"/>
                </button>
                <span className="text-SB-20 text-gray-900">태그</span>
                <button
                    className={`text-b-16-hn transition-colors ${
                        hasChanges ? 'text-primary' : 'text-gray-650'
                    }`}
                    onClick={handleComplete}
                    disabled={!hasChanges}
                >
                    완료
                </button>
            </header>

            <section className="w-full px-[25px] pt-[30px] pb-[20px] border-b border-gray-150 flex flex-col gap-[13px]">
                <div className="flex items-center gap-[5px]">
                    <span className="text-sb-16-hn text-gray-900">태그 선택</span>
                    <span className="text-r-12-hn text-gray-750">(최대 5개)</span>
                </div>
                <div className="flex h-[30px] gap-[7px] overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {selectedTags.length !== 0 && (
                        selectedTags.map(tag => (
                            <button
                                key={tag}
                                className="h-[30px] flex justify-center items-center gap-[3px] px-[15px] py-[5px] rounded-[5px] border border-primary bg-green-50 text-primary text-m-14-hn"
                            >
                                {tag}
                                <svg width="16" height="16" viewBox="0 0 16 16" 
                                className="block shrink-0"
                                onClick={() => removeSelectedTag(tag)}>
                                    <path 
                                        d="M4 12L12 4M4 4L12 12" 
                                        stroke="#00C56C" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"/>
                                </svg>

                            </button>
                        ))
                    )}
                </div>
            </section>

            <section className="w-full flex flex-col flex-1 min-h-0 pt-[20px] px-[25px]">
                {/*검색창*/}
                <section className="w-full pb-[10px]">
                    <div className="relative">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
                        className="absolute left-[19px] top-[50%] translate-y-[-50%]">
                            <path 
                                d="M18.7508 18.7508L13.5538 13.5538M13.5538 13.5538C14.9604 12.1472 15.7506 10.2395 15.7506 8.25028C15.7506 6.26108 14.9604 4.35336 13.5538 2.94678C12.1472 1.54021 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.54021 2.94678 2.94678C1.54021 4.35336 0.75 6.26108 0.75 8.25028C0.75 10.2395 1.54021 12.1472 2.94678 13.5538C4.35336 14.9604 6.26108 15.7506 8.25028 15.7506C10.2395 15.7506 12.1472 14.9604 13.5538 13.5538Z" 
                                stroke="#646464" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"/>
                        </svg>
                        <input
                            type="text"
                            name="searchTags"
                            placeholder="태그 검색"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-[40px] pl-[52px] pr-[19px] py-[8px] rounded-[30px] bg-gray-150 text-gray-750 text-r-14 placeholder:text-gray-650 focus:outline-none"
                        />
                    </div>
                </section>

                {/*탭 부분*/}
                <section className="w-full border-b border-gray-150">
                    <div className="flex justify-around">
                        {['전체', '분야', '관심사'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as '전체' | '분야' | '관심사')}
                                className={`relative w-[60px] py-[10px] text-sb-14 text-align ${
                                    activeTab === tab 
                                        ? 'text-gray-900' 
                                        : 'text-gray-500'
                                }`}
                            >
                                {tab}
                                { activeTab === tab && (
                                    <div className="w-full h-0 border-[2px] border-primary rounded-full absolute bottom-0"/>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/*태그 리스트*/}
                <section className="flex-1 min-h-0 overflow-y-auto pt-[5px] pb-[40px]">
                    {searchQuery ? (
                        // 검색 결과
                        <div className="flex flex-wrap gap-[7px] py-[15px] pl-[3px]">
                            {(filteredCategories as typeof TAG_CATEGORIES).map(category =>
                            category.tags.map(tag => (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.name)}
                                    className={`h-[30px] px-[15px] py-[5px] rounded-[5px] border ${
                                        selectedTags.includes(tag.name)
                                            ? 'text-m-14-hn bg-green-50 text-primary border-primary'
                                            : 'text-r-14-hn bg-white text-gray-650 border-gray-650'
                                    }`}
                                >
                                    {tag.name}
                                </button>
                            )))}
                        </div>
                    ) : (
                        // 전체 태그
                        <div className="w-full flex flex-col">
                            {(filteredCategories as typeof TAG_CATEGORIES).map(category => (
                                <div key={category.id} className="w-full flex flex-col gap-[15px] pt-[20px] pb-[15px] border-b border-gray-250 last:border-none">
                                    <h3 className="text-sb-16-hn text-gray-900 pl-[3px]">{category.name}</h3>
                                    <div className="flex flex-wrap gap-[7px] pl-[3px]">
                                        {category.tags.map(tag => (
                                            <button
                                                key={tag.id}
                                                onClick={() => toggleTag(tag.name)}
                                                className={`h-[30px] px-[15px] py-[5px] rounded-[5px] border ${
                                                    selectedTags.includes(tag.name)
                                                        ? 'text-m-14-hn bg-green-50 text-primary border-primary'
                                                        : 'text-r-14-hn bg-white text-gray-650 border-gray-650'
                                                }`}
                                            >
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </section>
        </div>
    );
}