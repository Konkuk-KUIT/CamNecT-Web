import { useState, useEffect, useMemo } from "react";
import Icon from "../../../components/Icon";
import { type CareerItem } from "../../../types/mypage/mypageTypes";

interface CareerModalProps {
    careers: CareerItem[];
    initialShowPrivate: boolean;
    onClose: () => void;
    onSave: (careers: CareerItem[], showPrivate: boolean) => void;
}

type View = 'list' | 'add' | 'edit';

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function CareerModal({ careers, initialShowPrivate, onClose, onSave }: CareerModalProps) {
    const [currentView, setCurrentView] = useState<View>('list');
    const [listCareers, setListCareers] = useState<CareerItem[]>(careers);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showPrivate, setShowPrivate] = useState(initialShowPrivate);
    
    const [formData, setFormData] = useState<Partial<CareerItem>>({
        organization: '',
        positions: [],
        startYear: new Date().getFullYear(),
        startMonth: 1,
        endYear: undefined,
        endMonth: undefined,
    });

    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showStartMonthDropdown, setShowStartMonthDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);
    const [showEndMonthDropdown, setShowEndMonthDropdown] = useState(false);
    
    const [newPosition, setNewPosition] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);


    // 변경사항 추적 (리스트 전체 추적)
    const hasChanges: boolean = useMemo(() => {
        const careersChanged = JSON.stringify(listCareers) !== JSON.stringify(careers);
        const showPrivateChanged = showPrivate !== initialShowPrivate;
        return careersChanged || showPrivateChanged;
    }, [listCareers, careers, showPrivate, initialShowPrivate]);

    // 수정/추가 각각의 변경사항 추적
    const hasFormChanges: boolean = useMemo(() => {
        if (!formData.organization || !formData.organization.trim()) {
            return false;
        }
        if (currentView === 'add') {
            return !!(formData.organization.trim());
        }
        if (currentView === 'edit' && editingIndex !== null) {
            const original = listCareers[editingIndex];
            return JSON.stringify(formData) !== JSON.stringify(original);
        }
        return false;
    }, [formData, currentView, editingIndex, listCareers]);

    const handleComplete = () => {
        if (!hasChanges) {
            onClose();
            return;
        }
        onSave(listCareers, showPrivate);
    };

    const handleAddCareer = () => {
        setFormData({
            organization: '',
            positions: [],
            startYear: currentYear,
            startMonth: 1,
            endYear: currentYear,
            endMonth: 12,
        });
        setNewPosition('');
        setCurrentView('add');
    };

    const handleEditCareer = (index: number) => {
        setEditingIndex(index);
        setFormData(listCareers[index]);
        setNewPosition('');
        setCurrentView('edit');
    };

    const handleSaveForm = () => {
        if (!formData.organization || !formData.organization.trim()) {
            alert('근무처를 입력해주세요.');
            return;
        }
        
        if (!hasFormChanges) {
            setCurrentView('list');
            return;
        }

        if (currentView === 'add') {
            setListCareers([...listCareers, formData as CareerItem]);
        } else if (currentView === 'edit' && editingIndex !== null) {
            const updated = [...listCareers];
            updated[editingIndex] = formData as CareerItem;
            setListCareers(updated);
        }
        setCurrentView('list');
    };

    const handleDeleteCareer = () => {
        if (editingIndex !== null) {
            setListCareers(listCareers.filter((_, i) => i !== editingIndex));
            setCurrentView('list');
        }
    };

    const handleAddPosition = () => {
        if (newPosition.trim()) {
            setFormData({
                ...formData,
                positions: [...(formData.positions || []), newPosition.trim()]
            });
            setNewPosition('');
        }
    };

    const handleRemovePosition = (index: number) => {
        setFormData({
            ...formData,
            positions: (formData.positions || []).filter((_, i) => i !== index)
        });
    };

    //newPosition이 비워질 때 textarea 높이를 초기화하기 위해
    useEffect(() => {
        if (newPosition === '') {
            const textarea = document.getElementById('positionTextarea');
            if (textarea) {
                textarea.style.height = 'auto';
            }
        }
    }, [newPosition]);

    //경력 리스트 화면
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
                    <span className="text-sb-20 text-gray-900">경력</span>
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
                    {/* 경력 비공개 토글 */}
                    <div className="flex items-center justify-between px-[25px] py-[15px] border-b border-gray-150">
                        <span className="text-sb-14-hn text-gray-900">경력 비공개</span>
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

                    {/* 경력 리스트 */}
                    <div className="w-full flex flex-col">
                        {listCareers.map((career, index) => (
                            <div
                                key={index}
                                className="w-full flex justify-between items-center gap-[30px] px-[25px] py-[15px] border-b border-gray-150"
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
                                            {career.startYear}.{String(career.startMonth).padStart(2, '0')}
                                            {career.endYear && career.endMonth 
                                                ? `~${career.endYear}.${String(career.endMonth).padStart(2, '0')}`
                                                : '~현재'}
                                        </span>
                                        <span className="text-m-16 text-gray-900 pb-[3px]">{career.organization}</span>
                                        <div className="flex flex-col gap-[2px]">
                                        {career.positions.map((p) => (
                                            <span className="text-r-14 text-gray-750">
                                                - {p}
                                            </span>
                                        ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="min-w-[25px] text-sb-14-hn text-gray-650"
                                    onClick={() => handleEditCareer(index)}>
                                    수정
                                </button>
                            </div>
                        ))}

                        {/* 경력 추가 버튼 */}
                        <button
                            onClick={handleAddCareer}
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
                            <span className="text-m-14 text-primary">경력 추가</span>
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
                    {currentView === 'add' ? '경력 추가' : '경력 수정'}
                </span>
                <button
                    className={`text-b-16-hn transition-colors ${
                        hasFormChanges ? 'text-primary' : 'text-gray-650'
                    }`}
                    onClick={handleSaveForm}
                    disabled={!hasFormChanges}
                >
                    완료
                </button>
            </header>

            {/* 수정/삭제 */}
            <div className="w-full flex-1 overflow-y-auto px-[25px] py-[20px]">
                <div className="flex flex-col gap-[15px]">
                    {/* 근무처 */}
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-sb-16-hn text-gray-900">근무처</span>
                        <input
                            type="text"
                            value={formData.organization || ''}
                            onChange={(e) => {
                                setFormData({ ...formData, organization: e.target.value });
                            }}
                            placeholder="근무처 이름을 입력해 주세요"
                            className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] text-r-16-hn text-gray-750 placeholder:text-gray-650 focus:outline-none"
                        />
                    </div>

                    {/* 기간 */}
                    <div className="w-full flex flex-col gap-[10px]">
                        <span className="text-sb-16-hn text-gray-900">기간</span>
                        
                        {/* 시작 */}
                        <div className="flex gap-[10px] items-center">
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
                                        {years.map((year) => (
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

                            <div className="flex-1 relative min-w-[110px]">
                                <button
                                    onClick={() => setShowStartMonthDropdown(!showStartMonthDropdown)}
                                    className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                >
                                    <span className="text-r-16-hn text-gray-750">{formData.startMonth}월</span>
                                    <Icon name="toggleDown" 
                                        className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showStartMonthDropdown ? 'rotate-180' : ''}`}/>
                                </button>
                                {showStartMonthDropdown && (
                                    <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                        {MONTHS.map((month) => (
                                            <button
                                                key={month}
                                                onClick={() => {
                                                    setFormData({ ...formData, startMonth: month });
                                                    setShowStartMonthDropdown(false);
                                                }}
                                                className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                    formData.startMonth === month ? 'text-primary' : 'text-gray-650'
                                                }`}
                                            >
                                                {month}월
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <span className="flex-1 text-r-14-hn text-gray-650 min-w-[25px] max-w-[65px]">부터</span>
                        </div>

                        {/* 종료 */}
                        <div className="flex gap-[10px] items-center">
                            <div className="flex-1 relative min-w-[110px]">
                                <button
                                    onClick={() => setShowEndYearDropdown(!showEndYearDropdown)}
                                    className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                >
                                    <span className="text-r-16-hn text-gray-750">
                                        {formData.endYear ? `${formData.endYear}년` : '현재'}
                                    </span>
                                    <Icon name="toggleDown" 
                                        className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showEndYearDropdown ? 'rotate-180' : ''}`}/>
                                </button>
                                {showEndYearDropdown && (
                                    <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                        <button
                                            onClick={() => {
                                                setFormData({ ...formData, endYear: undefined, endMonth: undefined });
                                                setShowEndYearDropdown(false);
                                            }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b text-r-16-hn ${
                                                !formData.endYear ? 'text-primary' : 'text-gray-650'
                                            }`}
                                        >
                                            현재
                                        </button>
                                        {years.map((year) => (
                                            <button
                                                key={year}
                                                onClick={() => {
                                                    setFormData({ ...formData, endYear: year, endMonth: formData.endMonth || 12 });
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

                            {formData.endYear && (
                                <div className="flex-1 relative min-w-[110px]">
                                    <button
                                        onClick={() => setShowEndMonthDropdown(!showEndMonthDropdown)}
                                        className="w-full h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none"
                                    >
                                        <span className="text-r-16-hn text-gray-750">{formData.endMonth}월</span>
                                        <Icon name="toggleDown" 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showEndMonthDropdown ? 'rotate-180' : ''}`}/>
                                    </button>
                                    {showEndMonthDropdown && (
                                        <div className="absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto">
                                            {MONTHS.map((month) => (
                                                <button
                                                    key={month}
                                                    onClick={() => {
                                                        setFormData({ ...formData, endMonth: month });
                                                        setShowEndMonthDropdown(false);
                                                    }}
                                                    className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                                        formData.endMonth === month ? 'text-primary' : 'text-gray-650'
                                                    }`}
                                                >
                                                    {month}월
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <span className="flex-1 text-r-14-hn text-gray-650 min-w-[25px] max-w-[65px]">까지</span>
                        </div>
                    </div>

                    {/* 직위 및 담당 업무 */}
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-sb-16-hn text-gray-900">직위 및 담당 업무</span>
                        
                        {/* 새 직위 입력 */}
                        <div className="min-h-[51px] flex items-center gap-[20px] p-[15px] mb-[5px] border-b border-gray-150">
                            <textarea
                                id="positionTextarea"
                                rows={1}
                                value={newPosition}
                                onChange={(e) => {
                                    setNewPosition(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                placeholder="내용을 입력해 주세요"
                                className="flex-1 text-r-16-hn text-gray-750 resize-none overflow-hidden placeholder:text-gray-650 focus:outline-none"
                            />
                            {newPosition.length > 0 && (<button
                                onClick={handleAddPosition}
                                className="text-sb-14 text-primary"
                            >
                                추가
                            </button>)}
                        </div>

                        {/* 입력된 직위 목록 */}
                        {formData.positions && formData.positions.length > 0 && (
                            <div className="flex flex-col">
                                {formData.positions.map((position, idx) => (
                                    <div key={idx} className="flex items-center gap-[15px] py-[10px] border-b border-gray-150">
                                            <svg viewBox="0 0 24 24" fill="none" className="w-[24px] h-[24px] block shrink-0">
                                                <path 
                                                    d="M3.75 9H20.25M3.75 15.75H20.25" 
                                                    stroke="#A1A1A1" 
                                                    strokeWidth="1.5" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round"/>
                                            </svg>
                                            <span className="flex-1 text-r-16-hn text-gray-750">{position}</span>
                                        <button
                                            onClick={() => handleRemovePosition(idx)}
                                            className="text-red text-sb-14-hn"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 삭제 버튼 (수정 모드일 때만) */}
                    {currentView === 'edit' && (
                        <button
                            onClick={handleDeleteCareer}
                            className="flex text-m-14 text-red mt-[20px]"
                        >
                            경력 삭제
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}