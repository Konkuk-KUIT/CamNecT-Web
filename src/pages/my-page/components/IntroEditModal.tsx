import { useState, useMemo } from "react";
import Icon from "../../../components/Icon";

interface IntroEditModalProps {
    initialStatement: string;
    onClose: () => void;
    onSave: (newIntro: string) => void;
}

const MAX_LENGTH = 100;

export default function TagEditModal({ initialStatement, onClose, onSave }: IntroEditModalProps) {
    const [statement, setStatement] = useState<string>(initialStatement);


    // 변경사항 추적
    const hasChanges = useMemo(() => statement !== initialStatement
    , [statement, initialStatement])

    

    // 완료 버튼
    const handleComplete = () => {
        if (!hasChanges) {
            onClose();
            return;
        }
        onSave(statement);
    };

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
                <span className="text-sb-20 text-gray-900">자기 소개</span>
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

            <section className="w-full px-[25px] pt-[27px] flex flex-col gap-[5px] items-end">
                    <textarea
                        value={statement}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_LENGTH) {
                                setStatement(e.target.value);
                            }
                        }}
                        placeholder="내용을 입력해주세요. (최대 100자)"
                        className="w-full h-[130px] p-[15px] border border-gray-150 rounded-[10px] text-r-16 text-gray-750 placeholder:text-gray-650 resize-none focus:outline-none"
                    />
                    <div className="text-r-12-hn text-gray-650">
                        {statement.length}/{MAX_LENGTH}
                    </div>
                
            </section>
        </div>
    );
}