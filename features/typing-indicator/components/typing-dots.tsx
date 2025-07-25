export function TypingDots() {
  return (
    <div className="flex items-center gap-0.5">
      <div
        className="w-1.5 h-1.5 bg-wa-green rounded-full animate-pulse"
        style={{
          animationDelay: "0ms",
          animationDuration: "1.4s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="w-1.5 h-1.5 bg-wa-green rounded-full animate-pulse"
        style={{
          animationDelay: "200ms",
          animationDuration: "1.4s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="w-1.5 h-1.5 bg-wa-green rounded-full animate-pulse"
        style={{
          animationDelay: "400ms",
          animationDuration: "1.4s",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  )
}
