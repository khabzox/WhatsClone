interface OnlineStatusProps {
  isOnline: boolean;
}

export function OnlineStatus({ isOnline }: OnlineStatusProps) {
  if (!isOnline) return null;

  return (
    <div className="bg-wa-online border-wa-sidebar absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2" />
  );
}
