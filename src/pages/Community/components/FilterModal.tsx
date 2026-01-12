import CategoryIcon from '../../../components/CategoryIcon';
import Icon from '../../../components/Icon';
import { interestOptions, majorOptions } from '../filterOptions';

type FilterModalProps = {
  isOpen: boolean;
  activeTab: 'major' | 'interest';
  onTabChange: (tab: 'major' | 'interest') => void;
  draftMajor: string | null;
  draftInterests: string[];
  onToggleMajor: (department: string) => void;
  onToggleInterest: (item: string) => void;
  hasDraftSelection: boolean;
  onCancel: () => void;
  onApply: () => void;
};

const FilterModal = ({
  isOpen,
  activeTab,
  onTabChange,
  draftMajor,
  draftInterests,
  onToggleMajor,
  onToggleInterest,
  hasDraftSelection,
  onCancel,
  onApply,
}: FilterModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-end justify-center'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
    >
      <div
        className='relative flex'
        style={{
          width: 'clamp(320px, 100vw, 540px)',
          height: 'min(649px, 86dvh)',
          padding: 'clamp(24px, 6cqw, 38px) clamp(18px, 6cqw, 25px)',
          borderRadius: '10px 10px 0 0',
          background: 'var(--Color_Gray_B, #FCFCFC)',
          boxShadow: '0 -1px 9.6px 0 rgba(32, 32, 35, 0.10)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type='button'
          aria-label='필터 닫기'
          onClick={onCancel}
          className='absolute right-[25px] top-[25px]'
        >
          <Icon name='cancel' />
        </button>

        {hasDraftSelection && (
          <button
            type='button'
            aria-label='필터 적용'
            onClick={onApply}
            className='absolute bottom-[25px] right-[25px]'
          >
            <Icon name='check' />
          </button>
        )}

        <div className='flex w-full' style={{ gap: '24px' }}>
          <div
            className='flex flex-col'
            style={{
              gap: '32px',
              paddingRight: '18px',
              borderRight: '1px solid var(--ColorGray2, #A1A1A1)',
            }}
          >
            {[
              { key: 'major', label: '전공' },
              { key: 'interest', label: '관심사' },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type='button'
                  onClick={() => onTabChange(tab.key as 'major' | 'interest')}
                  className='text-left text-b-16-hn'
                  style={{
                    color: isActive ? 'var(--ColorBlack, #202023)' : 'var(--ColorGray2, #A1A1A1)',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className='flex-1 overflow-y-auto' style={{ paddingTop: '4px' }}>
            {activeTab === 'major' &&
              majorOptions.map((group) => (
                <div
                  key={group.college}
                  className='flex flex-col'
                  style={{ gap: '12px', marginBottom: '20px' }}
                >
                  <div
                    className='text-b-18'
                    style={{
                      color: '#000',
                      letterSpacing: '-0.72px',
                    }}
                  >
                    {group.college}
                  </div>
                  <div className='flex flex-wrap' style={{ gap: '10px' }}>
                    {group.departments.map((department) => (
                      <CategoryIcon
                        key={department}
                        label={department}
                        selected={draftMajor === department}
                        onClick={() => onToggleMajor(department)}
                      />
                    ))}
                  </div>
                </div>
              ))}

            {activeTab === 'interest' &&
              interestOptions.map((interest) => (
                <div
                  key={interest.category}
                  className='flex flex-col'
                  style={{ gap: '12px', marginBottom: '20px' }}
                >
                  <div
                    className='text-b-18'
                    style={{
                      color: '#000',
                      letterSpacing: '-0.72px',
                    }}
                  >
                    {interest.category}
                  </div>
                  <div className='flex flex-wrap' style={{ gap: '10px' }}>
                    {interest.items.map((item) => (
                      <CategoryIcon
                        key={item}
                        label={item}
                        selected={draftInterests.includes(item)}
                        onClick={() => onToggleInterest(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
