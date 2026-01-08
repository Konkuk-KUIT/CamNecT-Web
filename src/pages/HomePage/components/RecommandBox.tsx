import Card from '../../../components/Card';
import Category from '../../../components/Category';
import Icon from '../../../components/Icon';


type RecommandBoxProps = {
    name: string;
    profileImage?: string;
    major: string;
    studentId: string;
    intro: string;
    categories: string[];
};

function RecommandBox({ name, profileImage, major, studentId, intro, categories }: RecommandBoxProps) {
    return (
        //TODO: 동문추천 page 라우터 연결
        <Card
            width='325px'
            height='auto'
            style={{ minHeight: '147px' }}
            className='flex items-start justify-between px-4 py-[15px]'
        >
            {/* 그룹 1: 프로필 + 정보 */}
            <div className='flex items-start gap-[15px]'>
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt={`${name} 프로필`}
                        className='w-[54px] h-[54px] shrink-0 rounded-full object-cover'
                    />
                ) : (
                    <div
                        className='w-[54px] h-[54px] shrink-0 rounded-full'
                        style={{ background: '#D5D5D5' }}
                        aria-hidden
                    />
                )}
                <div className='flex flex-col items-start gap-[5px] w-[205px]'>
                    <p className='text-sb-18 text-gray-900 tracking-[-0.04em]'>
                        {name}
                    </p>
                    <p className='text-sb-14 text-gray-750 tracking-[-0.04em]'>
                        {major} {studentId}학번
                    </p>
                    <p className='text-r-12 text-gray-750 tracking-[-0.02em]'>
                        {intro}
                    </p>
                    <div className='flex flex-wrap gap-[5px]'>
                        {categories.map((category, index) => (
                            <Category key={`${name}-${category}-${index}`} label={category} />
                        ))}
                    </div>
                </div>
            </div>

            {/*TODO: 동문 상세 프로필 페이지 라우터 연결*/}
            <div className='flex flex-col items-end'>
                <Icon name='transmit' className='w-[18px] h-[18px]' />
            </div>
        </Card>

    )
}

export type { RecommandBoxProps };
export default RecommandBox;
