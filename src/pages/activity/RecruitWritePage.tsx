import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { EditHeader } from '../../layouts/headers/EditHeader';
import { getTeamRecruitDetail } from '../../mock/teamRecruit';
import PopUp from '../../components/Pop-up';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export const RecruitWritePage = () => {
  const navigate = useNavigate();
  const { recruitId } = useParams();
  
  const existingRecruit = useMemo(
    () => (recruitId ? getTeamRecruitDetail(recruitId) : null),
    [recruitId]
  );

  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [teamNumber, setTeamNumber] = useState(1);
  const [description, setDescription] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  const maxLength = 300;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  
  // 선택된 연도/월에 따른 일수 계산
  const daysInMonth = useMemo(() => {
    return new Date(year, month, 0).getDate();
  }, [year, month]);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (existingRecruit) {
      setTitle(existingRecruit.title);
      const deadlineDate = new Date(existingRecruit.recruitDeadline);
      setYear(deadlineDate.getFullYear());
      setMonth(deadlineDate.getMonth() + 1);
      setDay(deadlineDate.getDate());
      setTeamNumber(existingRecruit.recruitTeamNumber);
      setDescription(existingRecruit.description);
    }
  }, [existingRecruit]);

  // 초기값 저장
  const initialData = useMemo(() => ({
    title: existingRecruit?.title || '',
    year: existingRecruit ? new Date(existingRecruit.recruitDeadline).getFullYear() : currentYear,
    month: existingRecruit ? new Date(existingRecruit.recruitDeadline).getMonth() + 1 : 1,
    day: existingRecruit ? new Date(existingRecruit.recruitDeadline).getDate() : 1,
    teamNumber: existingRecruit?.recruitTeamNumber || 1,
    description: existingRecruit?.description || '',
  }), [existingRecruit, currentYear]);

  // 변경사항 추적
  const hasChanges = useMemo(
    () =>
      title !== initialData.title ||
      year !== initialData.year ||
      month !== initialData.month ||
      day !== initialData.day ||
      teamNumber !== initialData.teamNumber ||
      description !== initialData.description,
    [title, year, month, day, teamNumber, description, initialData]
  );

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  const handleClose = () => {
    if (hasChanges) {
      setShowWarning(true);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    
    // TODO: API 호출하여 팀원 모집 글 생성/수정
    console.log({
      id: recruitId,
      title,
      deadline: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      teamNumber,
      description,
    });
    
    navigate(-1);
  };

  const handleIncrement = () => {
    setTeamNumber(prev => (prev < 20 ? prev + 1 : 20));
  };

  const handleDecrement = () => {
    setTeamNumber(prev => (prev > 1 ? prev - 1 : 1));
  };

  // 월이 변경되면 일자가 유효한지 확인
  useEffect(() => {
    if (day > daysInMonth) {
      setDay(daysInMonth);
    }
  }, [day, daysInMonth]);

    return (
        <>
            <HeaderLayout
                headerSlot={
                    <EditHeader
                        title='팀원 모집'
                        leftAction={{ onClick: handleClose }}
                        rightElement={
                            <button
                                type='button'
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                                className={`text-b-16-hn transition-colors ${
                                isFormValid ? 'text-primary' : 'text-gray-650'
                                }`}
                            >
                                완료
                            </button>
                            }
                    />
                }
            >
                <div className='flex w-full h-full justify-center bg-white'>
                    <div className='w-full flex flex-col gap-[20px] px-[25px] py-[20px]'>
                        {/* 제목 */}
                        <div className='flex flex-col gap-[10px]'>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='제목'
                                className='w-full p-[15px] border-b border-gray-650 text-b-18-hn text-gray-900 placeholder:text-gray-650 focus:outline-none'
                            />
                        </div>

                        {/* 모집 마감일 */}
                        <div className='flex flex-col gap-[10px]'>
                            <span className='text-sb-14-hn text-gray-750'>
                            모집 마감일
                            </span>
                            <div className='flex flex-wrap gap-[10px]'>
                                {/* 연도 */}
                                <div className='flex-1 relative'>
                                    <button
                                    type='button'
                                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                                    className='w-full min-w-[113px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between gap-[5px] focus:outline-none'
                                    >
                                        <span className='text-r-16-hn text-gray-750'>{year}년</span>
                                        <Icon 
                                            name='toggleDown' 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {showYearDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {years.map((y) => (
                                        <button
                                            key={y}
                                            type='button'
                                            onClick={() => {
                                            setYear(y);
                                            setShowYearDropdown(false);
                                            }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                            year === y ? 'text-primary' : 'text-gray-650'
                                            }`}
                                        >
                                            {y}년
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                {/* 월 */}
                                <div className='flex-1 relative'>
                                    <button
                                    type='button'
                                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                                    className='w-full min-w-[79px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'
                                    >
                                        <span className='text-r-16-hn text-gray-750'>{month}월</span>
                                        <Icon 
                                            name='toggleDown' 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showMonthDropdown ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {showMonthDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {MONTHS.map((m) => (
                                        <button
                                            key={m}
                                            type='button'
                                            onClick={() => {
                                            setMonth(m);
                                            setShowMonthDropdown(false);
                                            }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                            month === m ? 'text-primary' : 'text-gray-650'
                                            }`}
                                        >
                                            {m}월
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                {/* 일 */}
                                <div className='flex-1 relative'>
                                    <button
                                    type='button'
                                    onClick={() => setShowDayDropdown(!showDayDropdown)}
                                    className='w-full min-w-[89px] h-[52px] p-[15px] border border-gray-150 rounded-[5px] flex items-center justify-between focus:outline-none'
                                    >
                                        <span className='text-r-16-hn text-gray-750'>{day}일</span>
                                        <Icon 
                                            name='toggleDown' 
                                            className={`w-[24px] h-[24px] block shrink-0 transition-transform ${showDayDropdown ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {showDayDropdown && (
                                    <div className='absolute top-full left-0 right-0 bg-gray-100 border border-gray-150 rounded-[5px] z-10 max-h-[200px] overflow-y-auto mt-1'>
                                        {days.map((d) => (
                                        <button
                                            key={d}
                                            type='button'
                                            onClick={() => {
                                            setDay(d);
                                            setShowDayDropdown(false);
                                            }}
                                            className={`flex w-full p-[15px] border-gray-150 border-b last:border-b-0 text-r-16-hn ${
                                            day === d ? 'text-primary' : 'text-gray-650'
                                            }`}
                                        >
                                            {d}일
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 모집 인원 */}
                        <div className='flex flex-col gap-[10px]'>
                            <span className='text-sb-14-hn text-gray-750'>
                            모집 인원
                            </span>
                            <div className='flex items-center justify-between h-[52px] px-[15px] border border-gray-150 rounded-[5px]'>
                                <button
                                    type='button'
                                    onClick={handleDecrement}
                                    className='flex items-center justify-center w-[32px] h-[32px] text-[20px] text-gray-750'
                                >
                                    −
                                </button>
                                <span className='text-r-16-hn text-gray-750'>
                                    {teamNumber}인
                                </span>
                                <button
                                    type='button'
                                    onClick={handleIncrement}
                                    className='flex items-center justify-center w-[32px] h-[32px] text-[20px] text-gray-750'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* 모집 내용 */}
                        <div className='flex flex-col gap-[10px]'>
                            <span className='text-sb-14-hn text-gray-750'>
                            모집 내용
                            </span>
                            <Card width='100%' height={200} className='px-[15px] py-[15px]'>
                            <textarea
                                value={description}
                                onChange={(e) => {
                                const value = e.target.value.slice(0, maxLength);
                                    setDescription(value);
                                }}
                                placeholder='팀원 모집 시 내용을 입력해주세요.&#10;(예: 기획 분야 or 개발자분을 구합니다.)'
                                className='h-full w-full resize-none bg-transparent outline-none text-r-16-hn text-gray-750 placeholder:text-gray-650'
                            />
                            </Card>
                            <div className='flex justify-end text-r-12-hn text-gray-650'>
                                {description.length}/{maxLength}
                            </div>
                        </div>
                    </div>
                </div>
            </HeaderLayout>

            <PopUp
                isOpen={showWarning}
                type='warning'
                title='변경사항이 있습니다.\n나가시겠습니까?'
                content='저장하지 않을 시 변경사항이 삭제됩니다.'
                leftButtonText='나가기'
                onLeftClick={() => {
                    setShowWarning(false);
                    navigate(-1);
                }}
                onRightClick={() => setShowWarning(false)}
            />
        </>
    );
};