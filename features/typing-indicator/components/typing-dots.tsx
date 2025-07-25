export function TypingDots() {
  return (
    <div className="flex items-center gap-0.5">
      <div
        className="bg-wa-green h-1.5 w-1.5 animate-pulse rounded-full"
        style={{
          animationDelay: "0ms",
          animationDuration: "1.4s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="bg-wa-green h-1.5 w-1.5 animate-pulse rounded-full"
        style={{
          animationDelay: "200ms",
          animationDuration: "1.4s",
          animationIterationCount: "infinite",
        }}
      />
      <div
        className="bg-wa-green h-1.5 w-1.5 animate-pulse rounded-full"
        style={{
          animationDelay: "400ms",
          animationDuration: "1.4s",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  );
}
