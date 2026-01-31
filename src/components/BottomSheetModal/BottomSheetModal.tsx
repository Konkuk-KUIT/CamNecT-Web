import { AnimatePresence, motion } from 'framer-motion';
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
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    {/* 배경 어둡게 처리 (단순 투명도 조절) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/30"
                    />

                    {/* 바텀 시트 본체 */}
                    <motion.div
                        drag="y" // 수직방향 드래그 
                        dragConstraints={{ top: 0 }} // 윗쪽 방향 제한 
                        dragElastic={0} // 저항 없이 손가락 따라 즉각 반응
                        onDragEnd={(_, info) => {
                            // 80px 이상 내리면 닫힘 (반응 감도 상향)
                            if (info.offset.y > 60) {
                                onClose();
                            }
                        }}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.2 }} // 애니메이션 속도 빠르게 (0.2초)
                        className="relative flex w-full max-w-[430px] flex-col bg-white"
                        style={{
                            height: height,
                            borderRadius: "20px 20px 0 0",
                            boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 상단 핸들 (잡는 곳) */}
                        <div className="flex justify-center pt-[17px] pb-[10px] cursor-grab">
                            <div className="w-[73px] h-[5px] bg-gray-650 rounded-full" />
                        </div>

                        {/* 내용물 */}
                        <div className="pb-[40px]">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BottomSheetModal;
