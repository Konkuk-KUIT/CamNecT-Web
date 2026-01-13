import FilterIcon from '../../../components/FilterIcon';

type FilterHeaderProps = {
  activeFilters: string[];
  onOpenFilter: () => void;
  onRemoveFilter: (filter: string) => void;
};

const FilterHeader = ({ activeFilters, onOpenFilter, onRemoveFilter }: FilterHeaderProps) => {
  return (
    <div className='flex flex-wrap items-center gap-[15px]'>
      <FilterIcon onClick={onOpenFilter} />

      <div className='flex flex-wrap items-center gap-[10px]'>
        {activeFilters.map((filter) => (
          <button
            key={filter}
            type='button'
            onClick={() => onRemoveFilter(filter)}
            className='flex items-center gap-[5px]'
            style={{
              display: 'flex',
              padding: '5px 10px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              borderRadius: '5px',
              border: '1px solid var(--ColorGray2, #A1A1A1)',
              background: 'var(--ColorGray1, #ECECEC)',
            }}
          >
            <span className='text-m-12 text-gray-750'>{filter}</span>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3 9L9 3M3 3L9 9'
                stroke='#A1A1A1'
                strokeWidth='1'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterHeader;
