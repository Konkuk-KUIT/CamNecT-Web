import Card from '../../../components/Card';


type Contest = {
    id: string;
    title: string;
    posterImgUrl?: string;
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
    onItemClick?: (contest: Contest) => void;
};

const ContestBox = ({ contests, onTitleClick, onItemClick }: ContestBoxProps) => {
    return (
        <div className="flex flex-col gap-[10px]">
            <div
                className="flex items-center gap-[5px]"
                onClick={onTitleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onTitleClick?.();
                }}
            >
                {/*TODO: 주목받은 공모전 글씨 클릭 시 공모전 페이지 라우터 연결*/}
                <span className="text-sb-20 text-black tracking-[-0.04em]">주목받은 대외활동</span>
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

            <div className="flex overflow-x-auto gap-[10px] pb-[4px]">
                {/*TODO: 공모전 카드 클릭 시 공모전 상세페이지 라우터 연결*/}
                {contests.map((contest) => (
                    <Card
                        key={`${contest.title}-${contest.organizer}`}
                        width="fit-content"
                        height="265px"
                        className="flex-shrink-0 min-w-[155px] flex flex-col gap-[10px] px-[10px] pt-[10px] pb-[15px]"
                        onClick={() => onItemClick?.(contest)}
                    >
                        <div className="relative w-full flex justify-center">
                            {contest.posterImgUrl ? (
                                <img
                                    src={contest.posterImgUrl}
                                    alt={`${contest.title} 포스터`}
                                    className="object-cover w-full h-[126px] rounded-[6px]"
                                />
                            ) : (
                                <div
                                    className="shrink-0 w-full h-[126px] rounded-[6px] bg-gray-300"
                                    aria-hidden
                                />
                            )}

                            {(contest.isClosingSoon || contest.isHot) && (
                                <div
                                    className="absolute left-[5px] top-[5px] flex gap-[5px] px-[5px]"
                                >
                                    {contest.isClosingSoon && (
                                        <span
                                            className="inline-flex items-center justify-center gap-[8px] rounded-[3px] bg-[#9362FF] px-[5px] text-r-12 text-white tracking-[-0.02em]"
                                        >
                                            마감임박
                                        </span>
                                    )}
                                    {contest.isHot && (
                                        <span
                                            className="inline-flex items-center justify-center gap-[8px] rounded-[3px] bg-[#FF8C44] px-[5px] text-r-12 text-white tracking-[-0.02em]"
                                        >
                                            HOT
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-[5px]">
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

                        <div className="flex items-center gap-[5px]">
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
