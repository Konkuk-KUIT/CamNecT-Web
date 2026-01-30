import Icon from "../../../components/BottomSheetModal/Icon";
import { useRef } from "react";
import BottomSheetModal from "../../../components/BottomSheetModal";

interface ProfileImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (file: File, source: "album" | "camera") => void;
    onDelete: () => void;
}

export default function ProfileImageModal({ isOpen, onClose, onSelect, onDelete }: ProfileImageModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleAlbumSelect = () => fileInputRef.current?.click();
    const handleCameraSelect = () => cameraInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, source: "album" | "camera") => {
        const file = e.target.files?.[0];
        if (file) onSelect(file, source);
        e.target.value = "";
    };

    return (
        <BottomSheetModal isOpen={isOpen} onClose={onClose} height="auto">
            <div className="w-full px-[25px] pb-[50px] flex flex-col">
                <button
                    onClick={handleAlbumSelect}
                    className="flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                    type="button"
                >
                    <Icon name="photo" className="w-[20px] h-[20px] block shrink-0" />
                    <span className="text-m-16 text-gray-750">앨범에서 선택</span>                    
                </button>
                <button
                    onClick={handleCameraSelect}
                    className="flex items-center gap-[15px] pl-[10px] py-[15px] border-b border-gray-150"
                    type="button"
                >
                    <Icon name="camera" className="w-[20px] h-[20px] block shrink-0" />
                    <span className="text-m-16 text-gray-750">사진 찍기</span>
                </button>

                <button
                    onClick={onDelete}
                    className="flex items-center gap-[15px] pl-[10px] py-[15px]"
                    type="button"
                >
                    <Icon name="delete" className="w-[20px] h-[20px] block shrink-0" />
                    <span className="text-R-16 text-red">삭제</span>
                </button>

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
        </BottomSheetModal>
    );
}