interface UnreadBadgeProps {
  count: number;
}

export function UnreadBadge({ count }: UnreadBadgeProps) {
  if (count === 0) return null;

  return (
    <div className="bg-wa-green min-w-[20px] rounded-full px-2 py-0.5 text-center text-xs font-medium text-white">
      {count > 99 ? "99+" : count}
    </div>
  );
}
