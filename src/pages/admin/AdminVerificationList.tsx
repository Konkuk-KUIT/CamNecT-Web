import { useState } from "react";
import { MainHeader } from "../../layouts/headers/MainHeader";
import { VerificationItem } from "./components/VerificationItem";

export type VerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface VerificationItemType{
    id: string;
    userId: string;
    phoneNum: string;
    date: string; // 제출 날짜
    status: VerificationStatus;
}

const mockData: VerificationItemType[] = [
    {
        id: "1",
        userId: "camnect1",    
        phoneNum: "010-0000-0001",
        date: "2025.01.01",
        status: "PENDING",
    },
    {
        id: "2",
        userId: "camnect2",    
        phoneNum: "010-0000-0002",
        date: "2025.01.01",
        status: "PENDING",
    },  
    {
        id: "3",
        userId: "camnect3",    
        phoneNum: "010-0000-0003",
        date: "2025.01.02",
        status: "PENDING",
    },
    {
        id: "4",
        userId: "camnect4",
        phoneNum: "010-0000-0004",
        date: "2025.01.01",
        status: "APPROVED",
    },
    {
        id: "5",
        userId: "camnect5",
        phoneNum: "010-0000-0005",
        date: "2025.01.05",
        status: "REJECTED",
    },
];

// todo useQuery로 제출된 증명서들 조회

// 관리자 승인 대기 화면 리스트
export const AdminVerificationList = () => {

    const [currentStatus, setCurrentStatus] = useState<VerificationStatus>('PENDING');

    const renderContent = () => {
        // 1. 상태에 맞는 데이터 필터링
        const filteredData = mockData.filter(item => item.status === currentStatus);

        // 2. 날짜별로 그룹화
        const groupedByDate = filteredData.reduce((acc, item) => {
            if (!acc[item.date]) {
                // 날짜에 해당하는 구역 생성
                acc[item.date] = [];
            }
            // 해당 날짜에 아이템 추가
            acc[item.date].push(item);
            
            return acc;
        }, {} as Record<string, VerificationItemType[]>);

        // 3. 날짜순 정렬 (내림차순)
        const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

        if (filteredData.length === 0) {
            return (
                <div className="flex justify-center items-center h-40 text-gray-400 text-m-14">
                    해당 내역이 없습니다.
                </div>
            );
        }

        return (
            <div className="flex flex-col">
                {sortedDates.map((date, index) => (
                    <section key={date} className={`flex flex-col ${index !== 0 ? 'border-t border-gray-150' : ''}`}>
                        {/* 날짜 헤더 */}
                        <div className="px-5 py-3 text-gray-900 text-sb-14 tracking-[-0.56px]">
                            {date}
                        </div>
                        {/* 해당 날짜의 아이템 리스트 */}
                        <ul className="flex flex-col border-t border-gray-150 list-none p-0 m-0">
                            {groupedByDate[date].map(item => (
                                <li key={item.id} className="px-5">
                                    <VerificationItem item={item} />
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <MainHeader title="재학증명서 승인 리스트" />
            
            {/* 큰 틀: 버튼(탭) 섹션 */}
            <div className="flex pt-[5px] px-5 py-4 gap-2 overflow-x-auto no-scrollbar">
                {[
                    { id: 'PENDING', label: '승인필요' },
                    { id: 'APPROVED', label: '승인완료' },
                    { id: 'REJECTED', label: '승인거부' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setCurrentStatus(tab.id as VerificationStatus)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors tracking-[-0.56px]
                            ${currentStatus === tab.id 
                                ? 'bg-primary text-white text-sb-14' 
                                : 'bg-gray-100 text-gray-650 text-m-14 border border-gray-200'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 큰 틀: 내용 섹션 */}
            <div className="flex-1 pb-10">
                {renderContent()}
            </div>
        </div>
    );
};