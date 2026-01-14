import Icon from "../../../components/Icon";
import { forwardRef, useRef } from "react";

interface ProfileImageModalProps {
    onClose: () => void;
    onSelect: (file: File, source: 'album' | 'camera') => void;
    onDelete: () => void;
}

export default forwardRef<HTMLDivElement, ProfileImageModalProps>(
    function ProfileImageModal({ onClose, onSelect, onDelete }, ref) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleAlbumSelect = () => {
        fileInputRef.current?.click();
    };

    const handleCameraSelect = () => {
        cameraInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, source: 'album' | 'camera') => {
        const file = e.target.files?.[0];
        if (file) {
            onSelect(file, source);
        }
        e.target.value = "";
    };
    
    return (
        <div ref={ref}
            className="w-full sticky inset-0 z-50 flex items-end justify-center bg-transparent"
        >
            <div className="w-full h-[257px] px-[25px] pt-[17px] pb-[45px] flex flex-col gap-[30px] items-center bg-white rounded-t-[20px] shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.05)]">
                <div className="w-[73px] h-[5px] rounded-full bg-gray-650"></div>
                <div className="w-full flex flex-col flex-1 justify-end">
                    <button
                        onClick={handleAlbumSelect}
                        className="flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                    >
                        <Icon name="album" className="w-[20px] h-[20px] block shrink-0" />
                        <span className="text-m-16 text-gray-750">앨범에서 선택</span>                    
                    </button>
                    <button
                        onClick={handleCameraSelect}
                        className="flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                    >
                        <Icon name="cameraGray" className="w-[20px] h-[20px] block shrink-0" />
                        <span className="text-m-16 text-gray-750">사진 찍기</span>
                    </button>

                    <button
                        onClick={onDelete}
                        className="flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                    >
                        <Icon name="delete" className="w-[20px] h-[20px] block shrink-0" />
                        <span className="text-m-16 text-red-500">삭제</span>
                    </button>
                </div>

                <input

                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'album')}
                />
                <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'camera')}
                />
            </div>
        </div>
    );
});