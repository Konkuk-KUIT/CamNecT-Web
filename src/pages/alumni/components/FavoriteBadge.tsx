type FavoriteBadgeProps = {
  className?: string;
};

const FavoriteBadge = ({ className }: FavoriteBadgeProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2500_1404)">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.788 3.20997C11.236 2.13297 12.764 2.13297 13.212 3.20997L15.294 8.21597L20.698 8.64997C21.862 8.74297 22.334 10.195 21.447 10.955L17.33 14.482L18.587 19.755C18.858 20.891 17.623 21.788 16.627 21.18L12 18.354L7.373 21.18C6.377 21.788 5.142 20.89 5.413 19.755L6.67 14.482L2.553 10.955C1.666 10.195 2.138 8.74297 3.302 8.64997L8.706 8.21597L10.788 3.20997Z" fill="#00C56C" />
      </g>
      <defs>
        <filter id="filter0_d_2500_1404" x="-1.90771" y="-1.59778" width="27.8154" height="26.974" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2500_1404" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2500_1404" result="shape" />
        </filter>
      </defs>
    </svg>

  );
};

export default FavoriteBadge;
