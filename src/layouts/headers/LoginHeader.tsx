import Icon from '../../components/Icon';

interface LoginHeaderProps {
  onBack: () => void;
}

export const LoginHeader = ({ onBack }: LoginHeaderProps) => {

  return (
    <header
      className='sticky left-0 right-0 top-0 z-50 inline-flex w-full items-center bg-white px-[25px] py-[10px] [container-type:inline-size] relative'
      style={{
        paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
        top: 'env(safe-area-inset-top, 0px)',
      }}
      role='banner'
    >
      <div className='flex w-[28px] absolute top-[40px] items-center justify-start z-10'>
        <button
          type='button'
          className='flex items-center justify-center'
          onClick={onBack}
          aria-label='뒤로 가기'
        >
          <Icon name='back' style={{ width: 'clamp(24px, 7.467cqw, 28px)', height: 'clamp(24px, 7.467cqw, 28px)' }} />
        </button>
      </div>
    </header>
  );
};
