import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <p className={cn("mono-label flex items-center gap-3", className)}>
      <span className="text-pink">{index}</span>
      <span className="h-px w-8 bg-[var(--line-strong)] inline-block" />
      {label}
    </p>
  );
}
