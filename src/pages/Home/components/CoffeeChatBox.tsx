import Card from '../../../components/Card';

// TODO: 백엔드 커피챗 요청 데이터와 페이지 이동 핸들러(onViewAll)를 연결해야 합니다.

type CoffeeChatRequest = {
    name: string;
    major: string;
    studentId: string;
};

type CoffeeChatBoxProps = {
    requests: CoffeeChatRequest[];
    onViewAll?: () => void;
};

const CoffeeChatBox = ({ requests, onViewAll }: CoffeeChatBoxProps) => {
    const requestCount = requests.length;

    return (
        <Card
            width="100%"
            height="auto"
            className="flex flex-col"
            style={{ padding: '15px 17px', gap: '13px', minHeight: '60px' }}
        >
            <div className="flex items-center justify-between">
                <span className="text-sb-16-hn text-gray-900 tracking-[-0.04em]">
                    커피챗 요청이{' '}
                    <span className="text-primary">{requestCount}건</span> 도착했어요!
                </span>

                <div
                    className="flex items-center cursor-pointer"
                    style={{ gap: '3px' }}
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

            <div className="flex flex-col" style={{ gap: '8px' }}>
                {requests.map((request) => (
                    <Card
                        key={`${request.name}-${request.studentId}`}
                        width="100%"
                        height="auto"
                        style={{
                            minHeight: '47px',
                            padding: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span className="text-m-12 text-gray-750 tracking-[-0.04em]">
                            {request.name} ( {request.major} {request.studentId}학번 )
                        </span>
                        {/*TODO: CoffeeChat page로 연결*/}
                        <span className="cursor-pointer text-m-12 text-primary tracking-[-0.04em]">
                            요청확인
                        </span>
                    </Card>
                ))}
            </div>
        </Card>
    );
};

export type { CoffeeChatRequest, CoffeeChatBoxProps };
export default CoffeeChatBox;
