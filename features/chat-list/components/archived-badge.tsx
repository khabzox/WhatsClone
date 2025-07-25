import { Archive } from "lucide-react";

interface ArchivedBadgeProps {
  count: number;
}

export function ArchivedBadge({ count }: ArchivedBadgeProps) {
  if (count === 0) return null;

  return (
    <div className="hover:bg-wa-hover flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors">
      <div className="bg-wa-green flex h-10 w-10 items-center justify-center rounded-full">
        <Archive className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="text-wa-primary font-medium">Archived</div>
      </div>
      <div className="text-wa-green text-sm font-medium">{count}</div>
    </div>
  );
}
