import Card from '../../../components/Card';

// TODO: 백엔드 커피챗 요청 데이터와 페이지 이동 핸들러(onViewAll)를 연결해야 합니다.

type CoffeeChatRequest = {
    name: string;
    major: string;
    studentId: string;
};

type CoffeeChatBoxProps = {
    requests: CoffeeChatRequest[];
    totalCount?: number;
    onViewAll?: () => void;
};

const CoffeeChatBox = ({ requests, totalCount, onViewAll }: CoffeeChatBoxProps) => {
    const requestCount = typeof totalCount === 'number' ? totalCount : requests.length;
    const visibleRequests = requests.slice(0, 2);

    return (
        <Card
            width="100%"
            height="auto"
            className="flex min-h-[60px] flex-col gap-[13px] px-[17px] py-[15px]"
        >
            <div className="flex items-center justify-between">
                <span
                    className="text-gray-900 tracking-[-0.04em]"
                    style={{ fontSize: 'clamp(13px, 4.5cqw, 16px)', lineHeight: '1.35', fontWeight: 600 }}
                >
                    커피챗 요청이{' '}
                    <span className="text-primary">{requestCount}건</span> 도착했어요!
                </span>

                <div
                    className="flex items-center cursor-pointer gap-[3px]"
                    onClick={onViewAll}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onViewAll?.();
                    }}
                >
                    <span className="text-r-12 text-gray-650 tracking-[-0.02em]">전체보기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
                        <path d="M0.5 0.5L4.5 5L0.5 9.5" stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col gap-[8px]">
                {visibleRequests.map((request) => {
                    const shortStudentId = request.studentId?.slice(2, 4) ?? '';
                    return (
                    <Card
                        key={`${request.name}-${request.studentId}`}
                        width="100%"
                        height="auto"
                        className="flex min-h-[47px] items-center justify-between p-[15px]"
                    >
                        <span className="text-m-12 text-gray-750 tracking-[-0.04em]">
                            {request.name} ( {request.major} {shortStudentId}학번 )
                        </span>
                        <button
                            type="button"
                            className="cursor-pointer text-m-12 text-primary tracking-[-0.04em]"
                            onClick={() => {
                                // TODO: 요청확인 클릭 시 커피챗 요청 상세 라우터 연결 예정
                            }}
                        >
                            요청확인
                        </button>
                    </Card>
                );
                })}
            </div>
        </Card>
    );
};

export type { CoffeeChatRequest, CoffeeChatBoxProps };
export default CoffeeChatBox;
