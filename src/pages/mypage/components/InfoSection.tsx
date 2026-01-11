import BaseSection from "./BaseSection";

export default function InfoSection({
  title,
  lines,
  emptyText,
}: {
  title: string;
  lines: string[];
  emptyText: string;
}) {
  return (
    <BaseSection title={title}>
      <div className="text-R-14">
        {lines.length === 0 ? (
          <div className="text-gray-650">{emptyText}</div>
        ) : (
          lines.map((line, idx) => <div className="text-gray-750" key={`${idx}-${line}`}>{line}</div>)
        )}
      </div>
    </BaseSection>
  );
}
