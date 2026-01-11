import Card from '../components/Card';
import Category from '../components/Category';
import Icon from '../components/Icon';

//커뮤티니 ui 리스트 페이지
function CommunityUI() {
    return (
        <Card
            width='3px'
            height='304px'
            className='flex flex-col items-start justify-start px-4 py-3'
        >
            {/* 그룹 1: 프로필 + 내용 */}
            <div
                className='flex flex-col items-start justify-start gap-[10px] py-[3px]'
                style={{ width: '264px', height: '113px' }}
            >
                {/* 프로필 */}
                <div
                    className='flex items-center justify-start gap-[10px]'
                    style={{ width: '124px', height: '36px' }}
                >
                    <div className='w-9 h-9 rounded-full bg-gray-300' aria-hidden />
                    <div className='flex flex-col'>
                        <span className='text-R-14 text-gray-900'>닉네임</span>
                        <span className='text-R-12 text-gray-650'>1시간 전</span>
                    </div>
                </div>

                {/* 내용 */}
                <div
                    className='flex flex-col items-start justify-start gap-[10px] bg-gray-100/60 rounded-[8px]'
                    style={{ width: '264px', height: '67px', paddingLeft: '2px', paddingRight: '2px' }}
                >
                    <h6>참고하면 좋을 사이트 정리해드립니다</h6>
                    <p className='text-R-14 text-gray-700 leading-tight traking-[-0.04em]'>
                        콘텐츠 내용이 들어가는 영역입니다. 최대 두 줄 정도의 본문을 가정한 자리표시자입니다.
                    </p>
                </div>
            </div>

            {/* 그룹 2: 반응/이미지 영역 */}
            <div
                className='mt-3 flex flex-col items-start justify-start gap-[10px]'
                style={{ width: '264px', height: '152px', paddingLeft: '1px', paddingRight: '1px' }}
            >
                <div
                    className='flex items-start justify-start gap-[8px] bg-gray-100/60 rounded-[8px]'
                    style={{ width: '264px', height: '128px' }}
                >
                    <div className='w-[119px] h-[96px] bg-gray-150' aria-hidden />
                    <div className='w-[119px] h-[96px] bg-gray-150' aria-hidden />
                </div>
                <div
                    className='flex items-start justify-start gap-[10px] bg-gray-100/60 '
                    style={{ width: '284px', height: '128px' }}
                >
                    <p className='flex gap-[5px]'>
                        <Category label='카테고리' />
                        <Category label='카테고리' />
                    </p>
                </div>
                <div
                    className='flex items-center justify-between text-R-12 text-gray-750'
                    style={{ width: '266px', height: '14px' }}
                >
                    <span className='flex items-center gap-[8px]'>
                        <span className='flex items-center gap-[4px]'>
                            <image  />
                            <span>12</span>
                        </span>
                        <span className='flex items-center gap-[4px]'>
                            <Icon name='chat' className='w-[14px] h-[14px]' />
                            <span>5</span>
                        </span>
                    </span>
                    <span>2일 전</span>
                </div>
            </div>
        </Card>
    )
}
export default CommunityUI;
