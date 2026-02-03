import { type ReactNode } from 'react';

type BottomSheetModalProps = {
    isOpen: boolean;
    onClose: () => void;
    height?: number | string;
    children: ReactNode;
};

const BottomSheetModal = ({
    isOpen,
    onClose,
    height = 'auto',
    children,
}: BottomSheetModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            // 오버레이: 시트 바깥 클릭 시 닫힘.
            className='fixed inset-0 z-50 flex items-end justify-center'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
            onClick={onClose}
        >
            <div
                // 시트 컨테이너: 내부 클릭이 닫힘으로 전파되지 않도록 차단.
                className='flex w-[clamp(320px,100vw,540px)] flex-col'
                style={{
                    height: height,
                    borderRadius: '10px 10px 0 0',
                    background: 'var(--Color_Gray_B, #FCFCFC)',
                    boxShadow: '0 -1px 9.6px 0 rgba(32, 32, 35, 0.10)',
                    gap: '20px',
                    paddingBottom: 'var(--bottom-sheet-safe-padding, 0px)',
                }}
                onClick={(event) => event.stopPropagation()}
            >
                {/* 드래그 핸들 시각적 표시 */}
                <div className='flex justify-center pt-[17px]'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='78'
                        height='5'
                        viewBox='0 0 78 5'
                        fill='none'
                    >
                        <path d='M2.5 2.5H75.5' stroke='#A1A1A1' strokeWidth='5' strokeLinecap='round' />
                    </svg>
                </div>
                {children}
            </div>
        </div>
    );
};

export default BottomSheetModal;
