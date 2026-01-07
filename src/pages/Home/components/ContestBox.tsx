import Card from '../../../components/Card';

type Contest = {
    title: string;
    posterUrl: string;
    organizer: string;
    location: string;
    deadline: string;
    views: number;
    comments: number;
    isHot?: boolean;
    isClosingSoon?: boolean;
};

type ContestBoxProps = {
    contests: Contest[];
    onTitleClick?: () => void;
};

const ContestBox = ({ contests, onTitleClick }: ContestBoxProps) => {
    return (
        <div className="flex flex-col" style={{ gap: '10px' }}>
            <div
                className="flex items-center cursor-pointer"
                style={{ gap: '5px' }}
                onClick={onTitleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onTitleClick?.();
                }}
            >
                <span
                    style={{
                        color: '#000',
                        fontFamily: 'Pretendard',
                        fontSize: '20px',
                        fontStyle: 'thin',
                        fontWeight: 600,
                        lineHeight: '140%',
                        letterSpacing: '-0.8px',
                    }}
                >
                    주목받은 공모전
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M8.25 4.5L15.75 12L8.25 19.5"
                        stroke="#646464"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <div className="flex overflow-x-auto" style={{ gap: '10px', paddingBottom: '4px' }}>
                {contests.map((contest) => (
                    <Card
                        key={`${contest.title}-${contest.organizer}`}
                        width="fit-content"
                        height="265px"
                        className="flex-shrink-0"
                        style={{
                            minWidth: '155px',
                            padding: '15px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <div className="relative w-full flex justify-center">
                            <img
                                src={contest.posterUrl}
                                alt={`${contest.title} 포스터`}
                                className="object-cover"
                                style={{ width: '135px', height: '126px', borderRadius: '6px' }}
                            />

                            {(contest.isClosingSoon || contest.isHot) && (
                                <div
                                    className="absolute flex"
                                    style={{ top: '5px', left: '5px', gap: '5px', padding: '0 5px' }}
                                >
                                    {contest.isClosingSoon && (
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                padding: '0 5px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '8px',
                                                borderRadius: '3px',
                                                background: 'var(--ColorHightlight1, #9362FF)',
                                                color: '#fff',
                                                fontFamily: 'Pretendard',
                                                fontSize: '12px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                letterSpacing: '-0.24px', 
                                            }}
                                        >
                                            마감임박
                                        </span>
                                    )}
                                    {contest.isHot && (
                                        <span
                                            style={{
                                                display: 'inline-flex',
                                                padding: '0 5px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '8px',
                                                borderRadius: '3px',
                                                background: 'var(--ColorHightlight1, #FF8C44)',
                                                color: '#fff',
                                                fontFamily: 'Pretendard',
                                                fontSize: '12px',
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                    
                                                letterSpacing: '-0.24px', 
                                            }}
                                        >
                                            HOT
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <p
                                style={{
                                    color: 'var(--ColorBlack, #202023)',
                                    fontFamily: 'Pretendard',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: '140%',
                                    letterSpacing: '-0.56px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {contest.title}
                            </p>
                            <p
                                style={{
                                    color: 'var(--ColorGray3, #646464)',
                                    fontFamily: 'Pretendard',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: '150%',
                                    letterSpacing: '-0.48px',
                                }}
                            >
                                {contest.organizer}
                            </p>
                            <p
                                style={{
                                    color: 'var(--ColorGray2, #A1A1A1)',
                                    fontFamily: 'Pretendard',
                                    fontSize: '11px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                }}
                            >
                                {contest.location}
                            </p>
                            <p
                                style={{
                                    color: 'var(--ColorGray2, #A1A1A1)',
                                    fontFamily: 'Pretendard',
                                    fontSize: '10px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                }}
                            >
                                {contest.deadline}
                            </p>
                        </div>

                        <div className="flex items-center" style={{ gap: '5px' }}>
                            <span
                                style={{
                                    color: 'var(--ColorGray3, #646464)',
                                    fontFamily: 'Pretendard',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '140%',
                                    letterSpacing: '-0.24px',
                                }}
                            >
                                조회수 {contest.views.toLocaleString()}
                            </span>
                            <span
                                style={{
                                    color: 'var(--ColorGray3, #646464)',
                                    fontFamily: 'Pretendard',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: '140%',
                                    letterSpacing: '-0.24px',
                                }}
                            >
                                댓글 {contest.comments.toLocaleString()}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export type { Contest, ContestBoxProps };
export default ContestBox;
