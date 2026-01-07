import Card from '../../../components/Card';

// TODO: 공모전 데이터 fetch/필터링 로직과 onTitleClick 네비게이션을 실제 라우트로 연결해야 합니다.

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
                <span className="text-sb-20 text-black tracking-[-0.04em]">주목받은 공모전</span>
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
                                            }}
                                            className="text-r-12 text-white tracking-[-0.02em]"
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
                                            }}
                                            className="text-r-12 text-white tracking-[-0.02em]"
                                        >
                                            HOT
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <p className="text-sb-14 text-gray-900 tracking-[-0.04em] whitespace-nowrap">
                                {contest.title}
                            </p>
                            <p className="text-m-12 text-gray-750 tracking-[-0.04em]">
                                {contest.organizer}
                            </p>
                            <p className="text-r-11-hn text-gray-650">
                                {contest.location}
                            </p>
                            <p className="text-r-10-hn text-gray-650">
                                {contest.deadline}
                            </p>
                        </div>

                        <div className="flex items-center" style={{ gap: '5px' }}>
                            <span className="text-r-12 text-gray-750 tracking-[-0.02em]">
                                조회수 {contest.views.toLocaleString()}
                            </span>
                            <span className="text-r-12 text-gray-750 tracking-[-0.02em]">
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
