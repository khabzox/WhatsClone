import type React from "react";
interface MainContainerProps {
  children: React.ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="bg-wa-panel border-wa-border flex flex-1 flex-col border-l">{children}</div>
  );
}
