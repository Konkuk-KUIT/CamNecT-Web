import { useState, useEffect, useMemo } from "react";
import Icon from "../../../components/Icon";
import { EDUCATION_STATUS_KR, type EducationStatus, type EducationItem } from "../../../types/mypage/mypageTypes";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { EditHeader } from "../../../layouts/headers/EditHeader";
import { useModalHistory } from "../hooks/useModalHistory";
import PopUp from "../../../components/Pop-up";

interface EducationModalProps {
    educations: EducationItem[];
    initialShowPublic: boolean;
    onClose: () => void;
    onSave: (educations: EducationItem[], showPublic: boolean) => void;
}

type View = 'list' | 'add' | 'edit';

const STATUS_OPTIONS = Object.entries(EDUCATION_STATUS_KR).map(([value, label]) => ({
    value: value as EducationStatus,
    label
}));

// 학교 추천 목록 (임시 데이터)
//TODO: api 연결하고 삭제
const allSchools = [
    '건국대학교',
    '건욱대학교',
    '세종대학교',
    '서울대학교',
    '카이스트',
    '이화여자대학교',
    '동경미술대학'
];

export default function EducationModal({ educations, initialShowPublic, onClose, onSave }: EducationModalProps) {
    const [currentView, setCurrentView] = useState<View>('list');
    const [listEducations, setListEducations] = useState<EducationItem[]>(educations);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showPublic, setShowPublic] = useState(initialShowPublic);
    const [showWarning, setShowWarning] = useState(false);

    const [formData, setFormData] = useState<Partial<EducationItem>>({
        school: '',
        status: 'ENROLLED',
        startYear: new Date().getFullYear(),
        endYear: undefined,
    });

    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    const [showSchoolSuggestions, setShowSchoolSuggestions] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //검색 필터링
    const filteredSchools = useMemo(() => {
        if (!formData.school || formData.school.trim() === '') {
            return [];
        }
        return allSchools.filter(s => 
            s.toLowerCase().includes(formData.school!.toLowerCase())
        );
    }, [formData.school]);

    //변경사항 추적 (리스트 전체 추적)
    const hasListChanges: boolean = useMemo(() => {
        const educationsChanged = JSON.stringify(listEducations) !== JSON.stringify(educations);
        const showPublicChanged = showPublic !== initialShowPublic;
        return educationsChanged || showPublicChanged;
    }, [listEducations, educations, showPublic, initialShowPublic]);

    //수정/추가 각각의 변경사항 추적
    const hasFormChanges: boolean = useMemo(() => {
        if (!formData.school || !formData.school.trim()) {
            return false;
        }
        if (currentView === 'add') {
            return !!(formData.school.trim() || formData.status !== 'ENROLLED' || formData.startYear !== currentYear);
        }
        if (currentView === 'edit' && editingId !== null) {
            const original = listEducations.find(e => e.id === editingId);
            if (!original) return false;
            return (
                formData.school !== original.school ||
                formData.status !== original.status ||
                formData.startYear !== original.startYear ||
                formData.endYear !== original.endYear
            );
        }
        return false;
    }, [formData, currentView, editingId, listEducations, currentYear]);

    const handleComplete = () => {
        if (!hasListChanges) {
            onClose();
            return;
        }
        onSave(listEducations, showPublic);
    };

    const handleAddEducation = () => {
        setFormData({
            school: '',
            status: 'ENROLLED',
            startYear: currentYear,
            endYear: undefined,
        });
        setCurrentView('add');
    };

    const handleEditEducation = (id: string) => {
        setEditingId(id);
        const edu = listEducations.find(e => e.id === id);
        if (edu) {
            setFormData(edu);
            setCurrentView('edit');
        }
    };

    const handleSaveForm = () => {
        if (!formData.school || !formData.school.trim()) {
            alert('학교 이름을 입력해주세요.');
            return;
        }
        
        if (!hasFormChanges) {
            setCurrentView('list');
            return;
        }

        if (currentView === 'add') {
            const newEdu: EducationItem = {
                id: crypto.randomUUID(),
                ...formData as Omit<EducationItem, 'id'>
            };
            setListEducations([...listEducations, newEdu]);
        } else if (currentView === 'edit' && editingId !== null) {
            setListEducations(listEducations.map(e => 
                e.id === editingId ? { ...e, ...formData } : e
            ));
        }
        setCurrentView('list');
    };

    const handleDeleteEducation = () => {
        if (editingId !== null) {
            setListEducations(listEducations.filter(e => e.id !== editingId));
            setCurrentView('list');
        }
    };

    const getStatusLabel = (status?: EducationStatus) => {
        return status ? EDUCATION_STATUS_KR[status] : "재학";
    };

    const handleModalClose = currentView === 'list' ? onClose : () => setCurrentView('list');
    const currentHasChanges = currentView === 'list' ? hasListChanges : hasFormChanges;

    useModalHistory(
        handleModalClose,
        currentHasChanges,
        () => setShowWarning(true)
    )

    const handleFormClose = () => {
        if (hasFormChanges) {
            setShowWarning(true);
        } else {
            setCurrentView('list');
        }
    };
    
    const handleListClose = () => {
        if (hasListChanges) {
            setShowWarning(true);
        } else {
            onClose();
        }
    };

    //학력 리스트 화면
    if (currentView === 'list') {
        return (
            <div className="flex items-center justify-center fixed inset-0 z-50 bg-white">
                <div className="w-full max-w-[430px] h-full bg-white flex flex-col"> 
                    <HeaderLayout
                        headerSlot = {
                            <EditHeader
                                title="학력"
                                leftAction = {{onClick: handleListClose}}
                                rightElement = {
                                    <button
                                        className={`text-b-16-hn transition-colors ${
                                            hasListChanges ? 'text-primary' : 'text-gray-650'
                                        }`}
                                        onClick={handleComplete}
                                        disabled={!hasListChanges}
                                    >
                                        완료
                                    </button>
                                }
                            />
                        }
                    >
                        <div className="flex flex-col flex-1 overflow-y-auto border-t border-gray-150">
                            {/* 학력 비공개 토글 */}
                            <div className="flex items-center justify-between px-[25px] py-[15px] border-b border-gray-150">
                                <span className="text-sb-14-hn text-gray-900">학력 비공개</span>
                                <button
                                    onClick={() => setShowPublic(!showPublic)}
                                    className={`relative w-[50px] h-[24px] rounded-full transition-colors ${
                                        showPublic ? 'bg-gray-300' : 'bg-primary'
                                    }`}
                                >
                                    <div
                                        className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
                                            showPublic ? 'translate-x-[2px]' : 'translate-x-[28px]'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* 학력 리스트 */}
                            <div className="w-full flex flex-col">
                                {listEducations
                                    .slice()
                                    .sort((a, b) => {
                                        // 시작 연도 비교
                                        if (b.startYear !== a.startYear) {
                                            return b.startYear - a.startYear;
                                        }
                                        // 종료 연도 비교 (현재 재학중이면 undefined)
                                        const aEnd = a.endYear || 9999;
                                        const bEnd = b.endYear || 9999;
                                        return bEnd - aEnd;
                                    })
                                    .map((edu, index) => (
                                    <div
                                        key={edu.id}
                                        className="w-full flex justify-between items-center px-[25px] py-[20px] border-b border-gray-150"
                                    >
                                        <div className="flex items-center gap-[20px]">
                                            <span className="text-m-16 text-gray-650 min-w-[24px] text-center">{index + 1}</span>
                                            <div className="flex flex-col justify-center gap-[7px]">
                                                <span className="text-r-12-hn text-gray-650">
                                                    {edu.startYear}{edu.endYear ? `~${edu.endYear}` : '~현재'}
                                                </span>
                                                <div className="flex gap-[10px] items-end">
                                                    <span className="text-m-16 text-gray-900">{edu.school}</span>
                                                    <span className="text-r-14 text-gray-750">{getStatusLabel(edu.status)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <button className="text-sb-14-hn text-gray-650"
                                            onClick={() => handleEditEducation(edu.id)}>
                                            수정
                                        </button>
                                    </div>
                                ))}

                                {/* 학력 추가 버튼 */}
                                <button
                                    onClick={handleAddEducation}
                                    className="flex items-center px-[25px] py-[15px] gap-[5px]"
                                >
                                    <svg viewBox="0 0 20 20" fill="none" className="w-[20px] h-[20px] block shrink-0">
                                        <path 
                                            d="M10 3.75V16.25M16.25 10H3.75" 
                                            stroke="#00C56C" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"/>
                                    </svg>
                                    <span className="text-m-14 text-primary">학력 추가</span>
                                </button>
                            </div>
                        </div>
                    </HeaderLayout>
                </div>
                <PopUp
                    isOpen={showWarning}
                    type="warning"
                    title="변경사항이 있습니다.\n나가시겠습니까?"
                    content="저장하지 않을 시 변경사항이 삭제됩니다."
                    leftButtonText="나가기"
                    onLeftClick={() => {
                        setShowWarning(false);
                        onClose();
                    }}
                    onRightClick={() => setShowWarning(false)}
                />
            </div>
        );
    }

    // 추가/수정 화면
    return (
        <div className="flex items-center justify-center fixed inset-0 z-50 bg-white">
            <div className="w-full max-w-[430px] h-full bg-white flex flex-col">    
                <HeaderLayout
                    headerSlot = {
                        <EditHeader
                            title= {currentView === 'add' ? '학력 추가' : '학력 수정'}
                            leftAction = {{onClick: handleFormClose}}
                            rightElement = {
                                <button
                                    className={`text-b-16-hn transition-colors ${
                                        hasFormChanges ? 'text-primary' : 'text-gray-650'
                                    }`}
                                    onClick={handleSaveForm}
                                    disabled={!hasFormChanges}
                                >
                                    완료
                                </button>
                            }
                        />
                    }
                >
                    {/* 수정/삭제 */}
                    <div className="w-full flex-1 overflow-y-auto px-[25px] pt-[20px] pb-[220px] border-t border-gray-150">
                        <div className="flex flex-col gap-[15px]">
                            {/* 학교 이름 */}
                            <div className="flex flex-col gap-[10px] relative">
                                <span className="text-sb-16-hn text-gray-900">학교 이름</span>
                                <input
                                    type="text"
                                    value={formData.school || ''}
                                    onChange={(e) => {
                                        setFormData({ ...formData, school: e.target.value });
                                        setShowSchoolSuggestions(e.target.value.length > 0);
                                    }}
                                    onFocus={() => setShowSchoolSuggestions((formData.school?.length || 0) > 0)}
                                    placeholder="학교 이름을 입력해 주세요"
                                    className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none"
                                />

                                {showSchoolSuggestions && filteredSchools.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10">
                                        {filteredSchools.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setFormData({ ...formData, school: suggestion });
                                                    setShowSchoolSuggestions(false);
                                                }}
                                                className="w-full flex p-[15px] text-r-16-hn text-gray-650 border-b border-gray-150 last:border-b-0"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div> {/* TODO: 대학 데이터 내에서 선택할 수 있게 설정 */}
                            

                            {/* education 상태 */}
                            <div className="relative flex flex-col gap-[10px]">
                                <span className="text-sb-16-hn text-gray-900">재학 상태</span>
                                <button
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                    className="w-full p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                >
                                    <span className="text-r-16-hn text-gray-750">{getStatusLabel(formData.status)}</span>
                                    <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`}/>
                                </button>

                                {showStatusDropdown && (
                                    <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                        {STATUS_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setFormData({ ...formData, status: option.value });
                                                    setShowStatusDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    formData.status === option.value ? 'text-primary' : 'text-gray-650'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 기간 */}
                            <div className="w-full flex flex-col gap-[10px]">
                                <span className="text-sb-16-hn text-gray-900">재학 기간</span>
                                <div className="flex gap-[7px] justify-center items-center">
                                    {/* 시작 연도 */}
                                    <div className="flex-1 relative min-w-[110px]">
                                        <button
                                            onClick={() => setShowStartYearDropdown(!showStartYearDropdown)}
                                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                        >
                                            <span className="text-r-16-hn text-gray-750">{formData.startYear}년</span>
                                            
                                            <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showStartYearDropdown ? 'rotate-180' : ''}`}/>
                                        </button>

                                        {showStartYearDropdown && (
                                            <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                                {years
                                                    .filter(year => {
                                                        if (formData.endYear) {
                                                            return year <= formData.endYear; // 종료 연도 이하만
                                                        }
                                                        return true;
                                                    })
                                                    .map((year) => (
                                                    <button
                                                        key={year}
                                                        onClick={() => {
                                                            setFormData({ ...formData, startYear: year });
                                                            setShowStartYearDropdown(false);
                                                        }}
                                                        className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                            formData.startYear === year ? 'text-primary' : 'text-gray-650'
                                                        }`}
                                                    >
                                                        {year}년
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-[15px] h-0 border-[2px] rounded-full border-gray-750"/>

                                    {/* 종료 연도 */}
                                    <div className="flex-1 relative min-w-[110px]">
                                        <button
                                            onClick={() => setShowEndYearDropdown(!showEndYearDropdown)}
                                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                        >
                                            <span className="text-r-16-hn text-gray-750">{formData.endYear ? `${formData.endYear}년` : '현재'}</span>
                                            <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showEndYearDropdown ? 'rotate-180' : ''}`}/>
                                        </button>

                                        {showEndYearDropdown && (
                                            <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                                <button
                                                    onClick={() => {
                                                        setFormData({ ...formData, endYear: undefined });
                                                        setShowEndYearDropdown(false);
                                                    }}
                                                    className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                        !formData.endYear ? 'text-primary' : 'text-gray-650'
                                                    }`}
                                                >
                                                    현재
                                                </button>
                                                {years
                                                    .filter(year => {
                                                        if (formData.startYear !== undefined) {
                                                            return year >= formData.startYear; // 시작 연도 이상만
                                                        }
                                                        return true;
                                                    })
                                                    .map((year) => (
                                                    <button
                                                        key={year}
                                                        onClick={() => {
                                                            setFormData({ ...formData, endYear: year });
                                                            setShowEndYearDropdown(false);
                                                        }}
                                                        className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                            formData.endYear === year ? 'text-primary' : 'text-gray-650'
                                                        }`}
                                                    >
                                                        {year}년
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 삭제 버튼 (수정 모드일 때만) */}
                            {currentView === 'edit' && (
                                <button
                                    onClick={handleDeleteEducation}
                                    className="flex text-m-14 text-red mt-[20px]"
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                    </div>
                </HeaderLayout>
            </div>
            <PopUp
                isOpen={showWarning}
                type="warning"
                title="변경사항이 있습니다.\n나가시겠습니까?"
                content="저장하지 않을 시 변경사항이 삭제됩니다."
                leftButtonText="나가기"
                onLeftClick={() => {
                    setShowWarning(false);
                    setCurrentView('list');
                }}
                onRightClick={() => setShowWarning(false)}
            />
        </div>
    );
}