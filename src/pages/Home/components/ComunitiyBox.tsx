import Card from '../../../components/Card';

// TODO: 커뮤니티 진입 시 이동할 라우트 연결 및 포인트/알림 데이터 연동 필요.

// 홈 1/2-2: 포인트 박스 UI
const CommunityBox = () => {

    return (
        <Card
            width="124px"
            height="135px"
            className="relative cursor-pointer overflow-hidden"
            style={{
                padding: '13px 0 0 15px',
                background: 'var(--color-primary)',
                border: 'none',
                overflow: 'hidden',
            }}
        >
            <div className="relative z-10 flex flex-col gap-[6px]">
                <span className="text-sb-18 text-white tracking-[-0.04em]">
                    커뮤니티
                </span>
                <span className="text-m-14 text-[#F2FCF8] tracking-[-0.04em]">
                    바로가기
                </span>
            </div>

            <div className="pointer-events-none absolute -right-[28px] -bottom-[25px]" style={{ width: '150px', height: '160px' }} aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" width="124" height="135" viewBox="0 0 124 135" fill="none">
                <mask id="mask0_1718_6802" 
                style={{ maskType: 'alpha' }} 
                maskUnits="userSpaceOnUse" x="0" y="0" width="124" height="135">
                    <rect x="0.5" y="0.5" width="123" height="134" rx="14.5" fill="#202023" stroke="#ECECEC" />
                </mask>
                <g mask="url(#mask0_1718_6802)">
                    <g filter="url(#filter0_d_1718_6802)">
                        <path d="M103.137 110.568C116.435 112.065 126.002 124.058 124.505 137.357C124.078 141.156 120.651 143.889 116.851 143.462L63.9307 137.505C60.1313 137.077 57.398 133.651 57.8256 129.851C59.3224 116.553 71.316 106.987 84.6142 108.483L103.137 110.568ZM96.9741 71.2885C105.523 72.251 111.672 79.9613 110.71 88.5101C109.748 97.0589 102.038 103.209 93.4895 102.247C84.9406 101.285 78.7902 93.5745 79.7524 85.0256C80.7146 76.4767 88.4252 70.3263 96.9741 71.2885Z" fill="#00C56C" />
                        <path d="M103.137 110.568C116.435 112.065 126.002 124.058 124.505 137.357C124.078 141.156 120.651 143.889 116.851 143.462L63.9307 137.505C60.1313 137.077 57.398 133.651 57.8256 129.851C59.3224 116.553 71.316 106.987 84.6142 108.483L103.137 110.568ZM96.9741 71.2885C105.523 72.251 111.672 79.9613 110.71 88.5101C109.748 97.0589 102.038 103.209 93.4895 102.247C84.9406 101.285 78.7902 93.5745 79.7524 85.0256C80.7146 76.4767 88.4252 70.3263 96.9741 71.2885Z" fill="url(#paint0_linear_1718_6802)" />
                        <foreignObject x="38.5188" y="54.9108" width="59.4257" height="72.1056"><div style={{ backdropFilter: 'blur(0.78px)', clipPath: 'url(#bgblur_0_1718_6802_clip_path)', height: '100%', width: '100%' }}></div></foreignObject><g opacity="0.5" filter="url(#filter1_i_1718_6802)" data-figma-bg-blur-radius="1.55938">
                            <rect x="46.8454" y="56" width="50.3255" height="64.7042" rx="4.45538" transform="rotate(6.42195 46.8454 56)" fill="#ECFFE1" fill-opacity="0.7" />
                        </g>
                        <path opacity="0.5" d="M53.4381 72.417L87.9686 76.3036" stroke="white" stroke-width="1.11384" stroke-linecap="round" />
                        <path opacity="0.5" d="M52.5 80.752L87.0305 84.6386" stroke="white" stroke-width="1.11384" stroke-linecap="round" />
                        <path opacity="0.5" d="M51.5618 89.0869L86.0923 92.9735" stroke="white" stroke-width="1.11384" stroke-linecap="round" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_1718_6802" x="15.0782" y="31.4702" width="134.581" height="137.036" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="12.5" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.925531 0 0 0 0 1 0 0 0 0 0.882418 0 0 0 0.41 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1718_6802" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1718_6802" result="shape" />
                    </filter>
                    <filter id="filter1_i_1718_6802" x="38.5188" y="54.9108" width="59.4257" height="72.1056" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="5.95907" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.91 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1718_6802" />
                    </filter>
                    <clipPath id="bgblur_0_1718_6802_clip_path" transform="translate(-38.5188 -54.9108)"><rect x="46.8454" y="56" width="50.3255" height="64.7042" rx="4.45538" transform="rotate(6.42195 46.8454 56)" />
                    </clipPath><linearGradient id="paint0_linear_1718_6802" x1="60.5" y1="89.0002" x2="178" y2="135.501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ECFFE1" stop-opacity="0" />
                        <stop offset="1" stop-color="#ECFFE1" />
                    </linearGradient>
                </defs>
            </svg>
            </div>
        </Card>
    );
};

export default CommunityBox;
