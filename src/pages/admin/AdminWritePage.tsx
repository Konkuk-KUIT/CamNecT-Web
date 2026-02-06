import { useNavigate } from 'react-router-dom';
import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

export const AdminWritePage = () => {
    const navigate = useNavigate();

    return (
        <FullLayout
            headerSlot={
                <MainHeader
                    title='대외활동 등록'
                />
            }
            >
            <div className='flex h-full w-full flex-col items-center justify-center bg-white px-[25px] py-[30px]'>
                <div className='flex w-full max-w-[720px] flex-col gap-[40px]'>
                    {/* 대외활동 등록 페이지 */}
                    <div className='flex flex-col gap-[15px]'>
                        <span className='text-sb-20 text-gray-900'>대외활동 등록 페이지</span>
                    </div>

                    {/* 버튼 영역 */}
                    <div className='flex gap-[20px]'>
                        <button
                        type='button'
                        onClick={() => navigate('external-write')}
                        className='w-full py-[20px] rounded-[12px] bg-gray-100 flex flex-col items-center justify-center gap-[15px] border border-gray-150'
                        >
                            <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full bg-primary'>
                                <svg width='30' height='30' viewBox='0 0 24 24' fill='none'>
                                <path
                                    d='M12 4V20M4 12H20'
                                    stroke='white'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                </svg>
                            </div>
                            <span className='text-m-16-hn text-gray-900'>대외활동 등록하기</span>
                        </button>

                        <button
                        type='button'
                        onClick={() => navigate('job-write')}
                        className='w-full py-[20px] rounded-[12px] bg-gray-100 flex flex-col items-center justify-center gap-[15px] border border-gray-150'
                        >
                        <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full bg-primary'>
                            <svg width='30' height='30' viewBox='0 0 24 24' fill='none'>
                            <path
                                d='M12 4V20M4 12H20'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            </svg>
                        </div>
                        <span className='text-m-16-hn text-gray-900'>취업정보 등록하기</span>
                        </button>
                    </div>
                </div>
            </div>
        </FullLayout>
    );
};