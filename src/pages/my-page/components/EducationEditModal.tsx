import { useState, useMemo } from "react";
import Icon from "../../../components/Icon";
import { EDUCATION_STATUS_KR, type EducationStatus, type EducationItem } from "../../../types/mypage/mypageTypes";

interface EducationModalProps {
    educations: EducationItem[];
    initialShowPrivate: boolean;
    onClose: () => void;
    onSave: (educations: EducationItem[], showPrivate: boolean) => void; //TODO: mock data에 학력 비공개 boolean 추가하기
}

type View = 'list' | 'add' | 'edit';

const STATUS_OPTIONS = Object.entries(EDUCATION_STATUS_KR).map(([value, label]) => ({
    value: value as EducationStatus,
    label
}));

export default function EducationModal({ educations, initialShowPrivate, onClose, onSave }: EducationModalProps) {
    const [currentView, setCurrentView] = useState<View>('list');
    const [listEducations, setListEducations] = useState<EducationItem[]>(educations);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showPrivate, setShowPrivate] = useState(initialShowPrivate);
    
    const [formData, setFormData] = useState<Partial<EducationItem>>({
        school: '',
        status: 'ENROLLED',
        year: new Date().getFullYear(),
        endYear: undefined,
    });

    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    //변경사항 추적 (리스트 전체 추적)
    const hasChanges: boolean = useMemo(() => {
        const educationsChanged = JSON.stringify(listEducations) !== JSON.stringify(educations);
        const showPrivateChanged = showPrivate !== initialShowPrivate;
        return educationsChanged || showPrivateChanged;
    }, [listEducations, educations, showPrivate, initialShowPrivate]);

    //수정/추가 각각의 변경사항 추적
    const hasFormChanges: boolean = useMemo(() => {
        if (!formData.school || !formData.school.trim()) {
            return false;
        }
        if (currentView === 'add') {
            return !!(formData.school.trim() || formData.status !== 'ENROLLED' || formData.year !== currentYear);
        }
        if (currentView === 'edit' && editingIndex !== null) {
            const original = listEducations[editingIndex];
            return (
                formData.school !== original.school ||
                formData.status !== original.status ||
                formData.year !== original.year ||
                formData.endYear !== original.endYear
            );
        }
        return false;
    }, [formData, currentView, editingIndex, listEducations, currentYear]);

    const handleComplete = () => {
        if (!hasChanges) {
            onClose();
            return;
        }
        onSave(listEducations, showPrivate);
    };

    const handleAddEducation = () => {
        setFormData({
            school: '',
            status: 'ENROLLED',
            year: currentYear,
            endYear: undefined,
        });
        setCurrentView('add');
    };

    const handleEditEducation = (index: number) => {
        setEditingIndex(index);
        setFormData(listEducations[index]);
        setCurrentView('edit');
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
            setListEducations([...listEducations, formData as EducationItem]);
        } else if (currentView === 'edit' && editingIndex !== null) {
            const updated = [...listEducations];
            updated[editingIndex] = formData as EducationItem;
            setListEducations(updated);
        }
        setCurrentView('list');
    };

    const handleDeleteEducation = () => {
        if (editingIndex !== null) {
            setListEducations(listEducations.filter((_, i) => i !== editingIndex));
            setCurrentView('list');
        }
    };

    const getStatusLabel = (status?: EducationStatus) => {
        return status ? EDUCATION_STATUS_KR[status] : "재학";
    };

    //학력 리스트 화면
    if (currentView === 'list') {
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
                    <span className="text-sb-20 text-gray-900">학력</span>
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

                
                <div className="flex-1 overflow-y-auto">
                    {/* 학력 비공개 토글 */}
                    <div className="flex items-center justify-between px-[25px] py-[15px] border-b border-gray-150">
                        <span className="text-sb-14-hn text-gray-900">학력 비공개</span>
                        <button
                            onClick={() => setShowPrivate(!showPrivate)}
                            className={`relative w-[50px] h-[24px] rounded-full transition-colors ${
                                showPrivate ? 'bg-gray-300' : 'bg-primary'
                            }`}
                        >
                            <div
                                className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform ${
                                    showPrivate ? 'translate-x-[2px]' : 'translate-x-[28px]'
                                }`}
                            />
                        </button>
                    </div>

                    {/* 학력 리스트 */}
                    <div className="w-full flex flex-col">
                        {listEducations.map((edu, index) => (
                            <div
                                key={index}
                                className="w-full flex justify-between items-center px-[20px] py-[25px] border-b border-gray-150"
                            >
                                <div className="flex items-center gap-[20px]">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-[24px] h-[24px] block shrink-0">
                                        <path 
                                            d="M3.75 9H20.25M3.75 15.75H20.25" 
                                            stroke="#A1A1A1" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"/>
                                    </svg>
                                    <div className="flex flex-col justify-center gap-[7px]">
                                        <span className="text-r-12-hn text-gray-650">
                                            {edu.year}{edu.endYear ? `~${edu.endYear}` : '~현재'}
                                        </span>
                                        <div className="flex gap-[10px] items-end">
                                            <span className="text-m-16 text-gray-900">{edu.school}</span>
                                            <span className="text-r-14 text-gray-750">{getStatusLabel(edu.status)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="text-sb-14-hn text-gray-650"
                                    onClick={() => handleEditEducation(index)}>
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
            </div>
        );
    }

    // 추가/수정 화면
    return (
        <div className="absolute inset-0 z-50 bg-white flex flex-col">
            {/* 헤더 - TODO: layout으로 변경 */}
            <header className="w-full py-[10px] px-[25px] h-[48px] border-b border-gray-150 flex items-center justify-between bg-white">
                <button 
                    className="w-[24px] h-[24px]" 
                    onClick={() => setCurrentView('list')}
                >
                    <Icon name='cancel' className="block shrink-0"/>
                </button>
                <span className="text-sb-20 text-gray-900">
                    {currentView === 'add' ? '학력 추가' : '학력 수정'}
                </span>
                <button
                    className={`text-b-16-hn transition-colors ${
                        hasFormChanges ? 'text-primary' : 'text-gray-400'
                    }`}
                    onClick={handleSaveForm}
                    disabled={!hasFormChanges}
                >
                    완료
                </button>
            </header>

            {/* 수정/삭제 */}
            <div className="w-full flex-1 overflow-y-auto px-[25px] py-[20px]">
                <div className="flex flex-col gap-[17px]">
                    {/* 학교 이름 */}
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-sb-16-hn text-gray-900">학교 이름</span>
                        <input
                            type="text"
                            value={formData.school || ''}
                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                            placeholder="학교 이름을 입력해 주세요"
                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none"
                        />
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
                            <div className="flex-1 relative">
                                <button
                                    onClick={() => setShowStartYearDropdown(!showStartYearDropdown)}
                                    className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                >
                                    <span className="text-r-16-hn text-gray-750">{formData.year}년</span>
                                    
                                    <Icon name="toggleDown" 
                                    className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showStartYearDropdown ? 'rotate-180' : ''}`}/>
                                </button>

                                {showStartYearDropdown && (
                                    <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                        {years.map((year) => (
                                            <button
                                                key={year}
                                                onClick={() => {
                                                    setFormData({ ...formData, year });
                                                    setShowStartYearDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    formData.year === year ? 'text-primary' : 'text-gray-650'
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
                            <div className="flex-1 relative">
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
                                        {years.map((year) => (
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
        </div>
    );
}