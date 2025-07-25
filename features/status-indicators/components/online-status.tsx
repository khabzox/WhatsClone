interface OnlineStatusProps {
  isOnline: boolean
}

export function OnlineStatus({ isOnline }: OnlineStatusProps) {
  if (!isOnline) return null

  return (
    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-wa-online rounded-full border-2 border-wa-sidebar" />
  )
}
