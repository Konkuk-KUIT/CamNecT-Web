import Card from '../../../components/Card';

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
            width="325px"
            height="auto"
            className="flex flex-col"
            style={{ padding: '15px 17px', gap: '13px', minHeight: '60px' }}
        >
            <div className="flex items-center justify-between">
                <span
                    style={{
                        color: 'var(--ColorBlack, #202023)',
                        fontFamily: 'Pretendard',
                        fontSize: '16px',
                        fontStyle: 'thin',
                        fontWeight: 500,
                        lineHeight: '140%',
                        letterSpacing: '-0.64px',
                    }}
                >
                    커피챗 요청이{' '}
                    <span style={{ color: 'var(--ColorMain, #00C56C)' }}>{requestCount}건</span> 도착했어요!
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
                    <span
                        style={{
                            color: 'var(--ColorGray2, #A1A1A1)',
                            fontFamily: 'Pretendard',
                            fontSize: '12px',
                            fontStyle: 'thin',
                            fontWeight: 400,
                            lineHeight: '140%',
                            letterSpacing: '-0.24px',
                        }}
                    >
                        전체보기
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 5 10" fill="none">
                        <path d="M0.5 0.5L4.5 5L0.5 9.5" stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-col" style={{ gap: '8px' }}>
                {requests.map((request) => (
                    <Card
                        key={`${request.name}-${request.studentId}`}
                        width="295px"
                        height="auto"
                        style={{
                            minHeight: '47px',
                            padding: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span
                            style={{
                                color: 'var(--ColorGray3, #646464)',
                                fontFamily: 'Pretendard',
                                fontSize: '12px',
                                fontStyle: 'thin',
                                fontWeight: 500,
                                lineHeight: '150%',
                                letterSpacing: '-0.48px',
                            }}
                        >
                            {request.name} ( {request.major} {request.studentId}학번 )
                        </span>
                        <span
                            className="cursor-pointer"
                            style={{
                                color: 'var(--ColorMain, #00C56C)',
                                fontFamily: 'Pretendard',
                                fontSize: '12px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: '150%',
                                letterSpacing: '-0.48px',
                            }}
                        >
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
