import type { ReactNode } from "react";

export default function BaseSection({
  title,
  right,
  children,
}: {
  title: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="w-full flex flex-col gap-[10px]">
      <div className="flex items-center justify-between">
        <span className="text-SB-18 text-gray-900">{title}</span>
        {right}
      </div>

      <div className="h-0 border border-gray-150" />

      {children}
    </section>
  );
}
