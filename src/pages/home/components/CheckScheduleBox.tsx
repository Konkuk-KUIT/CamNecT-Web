import Card from '../../../components/Card';
import { useNavigate } from 'react-router-dom';


// 홈 1/2-1: 일정 확인 카드 UI
const CheckScheduleBox = () => {
  const navigate = useNavigate();

  return (
    // TODO: 일정확인 page Router 연결 필요.
    <Card
      width="100%"
      height="84px"
      className="flex items-center justify-between overflow-hidden cursor-pointer rounded-[12px] border border-[var(--color-gray-150)] pl-[20px] pr-[90px]"
      style={{
        background: 'linear-gradient(102deg, rgba(236, 255, 225, 0.00) 10%, #ECFFE1 500%), #FFF',
      }}
      onClick={() => navigate('/schedule')}
    >
      <p className="text-sb-16-hn text-gray-900 tracking-[-0.04em]">
        일정 확인하기
      </p>

      <div
        aria-hidden
        className="h-[85.417px] w-[81.691px] rotate-[2.302deg] drop-shadow-[0_0_6.7px_rgba(0,197,108,0.20)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="183" height="84" viewBox="0 0 183 84" fill="none">
          <g filter="url(#filter0_d_1741_8183)">
            <path
              d="M124.914 8.66992C131.656 9.65393 136.323 15.9176 135.34 22.6599L128.451 69.8641C127.467 76.6063 121.204 81.274 114.462 80.2903L67.258 73.4019C60.5157 72.418 55.8471 66.155 56.8309 59.4127L63.7192 12.2086C64.7031 5.4662 70.967 0.797666 77.7094 1.78156L79.7995 2.08657L79.2832 5.62527C78.9182 8.12618 80.6498 10.449 83.1506 10.8143C85.6517 11.1792 87.9755 9.4481 88.3405 6.94698L88.8569 3.40829L113.765 7.04305L113.249 10.5808C112.884 13.0817 114.615 15.4046 117.116 15.7698C119.617 16.1348 121.941 14.4036 122.306 11.9025L122.822 8.36476L124.914 8.66992Z"
              fill="#00C56C"
            />
            <path
              d="M124.914 8.66992C131.656 9.65393 136.323 15.9176 135.34 22.6599L128.451 69.8641C127.467 76.6063 121.204 81.274 114.462 80.2903L67.258 73.4019C60.5157 72.418 55.8471 66.155 56.8309 59.4127L63.7192 12.2086C64.7031 5.4662 70.967 0.797666 77.7094 1.78156L79.7995 2.08657L79.2832 5.62527C78.9182 8.12618 80.6498 10.449 83.1506 10.8143C85.6517 11.1792 87.9755 9.4481 88.3405 6.94698L88.8569 3.40829L113.765 7.04305L113.249 10.5808C112.884 13.0817 114.615 15.4046 117.116 15.7698C119.617 16.1348 121.941 14.4036 122.306 11.9025L122.822 8.36476L124.914 8.66992Z"
              fill="url(#paint0_linear_1741_8183)"
            />
            <foreignObject x="60.7555" y="12.6195" width="85.3239" height="85.324">
              <div style={{ backdropFilter: 'blur(1.64px)', clipPath: 'url(#bgblur_0_1741_8183_clip_path)', height: '100%', width: '100%' }} />
            </foreignObject>
            <g filter="url(#filter1_i_1741_8183)" data-figma-bg-blur-radius="3.27651">
              <rect
                x="72.8329"
                y="14.2456"
                width="72.3792"
                height="72.3792"
                rx="12.3375"
                transform="rotate(8.30239 72.8329 14.2456)"
                fill="#ECFFE1"
                fillOpacity="0.7"
              />
              <rect
                x="72.8329"
                y="14.2456"
                width="72.3792"
                height="72.3792"
                rx="12.3375"
                transform="rotate(8.30239 72.8329 14.2456)"
                fill="url(#paint1_linear_1741_8183)"
                fillOpacity="0.2"
              />
            </g>
            <foreignObject x="83.1167" y="39.0088" width="46.1362" height="35.855">
              <div style={{ backdropFilter: 'blur(1px)', height: '100%', width: '10%' }} />
            </foreignObject>
            <g filter="url(#filter2_i_1741_8183)" data-figma-bg-blur-radius="4">
              <path
                d="M89.2994 54.2302L99.2616 67.5967L123.07 45.1916"
                stroke="url(#paint2_radial_1741_8183)"
                strokeWidth="4.36508"
                strokeLinecap="round"
              />
              <path
                d="M89.2994 54.2302L99.2616 67.5967L123.07 45.1916"
                stroke="url(#paint3_linear_1741_8183)"
                strokeWidth="4.36508"
                strokeLinecap="round"
              />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_1741_8183" x="1.14441e-05" y="-55.0491" width="199.503" height="206.416" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="28.35" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.00114543 0 0 0 0 0.772048 0 0 0 0 0.423113 0 0 0 0.2 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1741_8183" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1741_8183" result="shape" />
            </filter>
            <filter id="filter1_i_1741_8183" x="60.7555" y="12.6195" width="85.3239" height="85.324" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.819127" />
              <feGaussianBlur stdDeviation="1.96591" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1741_8183" />
            </filter>
            <clipPath id="bgblur_0_1741_8183_clip_path" transform="translate(-60.7555 -12.6195)">
              <rect
                x="72.8329"
                y="14.2456"
                width="72.3792"
                height="72.3792"
                rx="12.3375"
                transform="rotate(8.30239 72.8329 14.2456)"
              />
            </clipPath>
            <filter id="filter2_i_1741_8183" x="83.1167" y="39.0088" width="46.1362" height="35.855" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.15" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1741_8183" />
            </filter>
            <linearGradient id="paint0_linear_1741_8183" x1="130.266" y1="18.3967" x2="22.4437" y2="73.1957" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ECFFE1" stopOpacity="0" />
              <stop offset="1" stopColor="#ECFFE1" />
            </linearGradient>
            <linearGradient id="paint1_linear_1741_8183" x1="105.632" y1="41.3243" x2="149.111" y2="109.974" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00C56C" stopOpacity="0" />
              <stop offset="1" stopColor="#00C56C" />
            </linearGradient>
            <radialGradient
              id="paint2_radial_1741_8183"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(76.4848 69.8307) rotate(-20.45) scale(60.0124 75.2537)"
            >
              <stop stopColor="white" />
              <stop offset="0.427951" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
            <linearGradient id="paint3_linear_1741_8183" x1="112.797" y1="59.602" x2="107.286" y2="74.796" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </Card>
  );
};

export default CheckScheduleBox;
