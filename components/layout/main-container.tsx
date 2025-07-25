import type React from "react"
interface MainContainerProps {
  children: React.ReactNode
}

export function MainContainer({ children }: MainContainerProps) {
  return <div className="flex-1 flex flex-col bg-wa-panel border-l border-wa-border">{children}</div>
}
