import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Icon';

type WriteButtonProps = {
  onClick?: () => void;
};

const WriteButton = ({ onClick }: WriteButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate('/community/write');
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='fixed bottom-[70px] inline-flex flex-col items-start'
      style={{
        right: 'calc(50% - clamp(160px, 50vw, 270px) + 25px)',
        padding: '13px 20px',
        gap: '10px',
        borderRadius: '30px',
        background: 'var(--ColorMain, #00C56C)',
      }}
    >
      <span className='inline-flex items-center' style={{ gap: '7px' }}>
        <Icon name='edit' className='text-white' />
        <span className='text-b-16-hn' style={{ color: 'var(--ColorWhite, #FFF)' }}>
          글쓰기
        </span>
      </span>
    </button>
  );
};

export default WriteButton;
