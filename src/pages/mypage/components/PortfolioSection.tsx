import { type Portfolio } from "../../../types/portfolio/portfolioTypes";
import BaseSection from "./BaseSection";

export default function PortfolioSection({
  portfolios,
}: {
  portfolios: Portfolio[];
  listTo: string;                 // 전체보기 이동 경로
  detailTo: (id: string) => string; // 상세 이동 경로 생성
}) {
  const scroll = portfolios.length >= 3;

  return (
    <BaseSection
      title="포트폴리오"
      right={
          <div className="text-R-12 text-gray-650" onClick={() => alert("포트폴리오 전체보기로 이동")}>
            전체보기 &gt;</div>
      }
    >
      <div
        className={[
          "flex gap-[5px]",
          scroll
            ? "overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "",
        ].join(" ")}
      >
        {portfolios.length === 0 ? (
          <div className="text-R-14 text-gray-650">
            아직 포트폴리오가 등록되지 않았어요!
          </div>
        ) : (
          portfolios.map((p) => {
            const thumbnail = p.thumbnailUrl || p.images[0]?.url;

            return (
              <button
                key={p.id}
                type="button"
                className="shrink-0 flex flex-col justify-center items-start gap-[5px]"
                onClick={() => alert(`포트폴리오 열기: ${p.id}`)}
              >
                <div className="w-[160px] h-[90px] overflow-hidden rounded-[12px]">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="pl-[10px] text-M-14 text-gray-750">{p.title}</div>
              </button>
            );
          })
        )}
      </div>
    </BaseSection>
  );
}
