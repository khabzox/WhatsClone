import { Archive } from "lucide-react"

interface ArchivedBadgeProps {
  count: number
}

export function ArchivedBadge({ count }: ArchivedBadgeProps) {
  if (count === 0) return null

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-wa-hover cursor-pointer transition-colors">
      <div className="w-10 h-10 bg-wa-green rounded-full flex items-center justify-center">
        <Archive className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="text-wa-primary font-medium">Archived</div>
      </div>
      <div className="text-wa-green text-sm font-medium">{count}</div>
    </div>
  )
}
