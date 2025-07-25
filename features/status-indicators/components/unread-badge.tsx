interface UnreadBadgeProps {
  count: number
}

export function UnreadBadge({ count }: UnreadBadgeProps) {
  if (count === 0) return null

  return (
    <div className="bg-wa-green text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
      {count > 99 ? "99+" : count}
    </div>
  )
}
