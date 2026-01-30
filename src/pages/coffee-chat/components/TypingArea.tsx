import Icon from "../../../components/Icon";

export const TypingArea = () => {
    return (
        <div className="flex justify-center fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white px-[25px] pt-[6px] pb-[calc(40px+env(safe-area-inset-bottom))] z-50">
            <div className="flex items-center gap-[10px] w-full">
                {/* 추가 버튼 */}
                <button type="button" className="shrink-0 w-[36px] h-[36px] rounded-full bg-gray-150 flex items-center justify-center active:bg-gray-200 transition-colors">
                    <Icon name="plus" />
                </button>
                
                {/* 입력창 영역 */}
                <div className="relative flex-1">
                    <input 
                        placeholder="메시지 입력" 
                        type="text" 
                        className="w-full h-[44px] bg-gray-100 border border-gray-150 rounded-[30px] pl-[18px] pr-[48px] text-r-16 outline-none placeholder:text-gray-400" 
                    />
                    {/* 전송 버튼 */}
                    <button 
                        type="button" 
                        className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full bg-primary flex items-center justify-center active:opacity-80 transition-opacity"
                    >
                        <Icon name="send" />
                    </button>
                </div>
            </div>
        </div>
    )
}