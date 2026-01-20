import { useState, useMemo } from "react";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { EditHeader } from "../../../layouts/headers/EditHeader";

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
        <div className="flex items-center justify-center fixed inset-0 z-50 bg-white">
            <div className="w-full max-w-[430px] h-full bg-white flex flex-col">    
                <HeaderLayout
                    headerSlot = {
                        <EditHeader
                            title="태그"
                            leftAction = {{onClick: onClose}}
                            rightElement = {
                                <button
                                    className={`text-b-16-hn transition-colors ${
                                        hasChanges ? 'text-primary' : 'text-gray-650'
                                    }`}
                                    onClick={handleComplete}
                                    disabled={!hasChanges}
                                >
                                    완료
                                </button>
                            }
                        />
                    }
                >
                    <section className="w-full px-[25px] pt-[27px] flex flex-col gap-[5px] items-end border-t border-gray-150">
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
                </HeaderLayout>
            </div>
        </div>
    );
}