import { MessageCircle, Lock } from "lucide-react"

export function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-wa-panel text-center px-8">
      <div className="mb-8">
        <div className="w-80 h-80 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-wa-green/20 to-wa-green/5 rounded-full" />
          <div className="absolute inset-8 bg-wa-panel rounded-full flex items-center justify-center">
            <MessageCircle className="w-32 h-32 text-wa-green" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-light text-wa-primary mb-4">Download WhatsApp for Windows</h1>

      <p className="text-wa-secondary mb-8 max-w-md leading-relaxed">
        Make calls, share your screen and get a faster experience when you download the Windows app.
      </p>

      <button className="bg-wa-green hover:bg-wa-green/90 text-white px-8 py-3 rounded-full font-medium transition-colors">
        Download
      </button>

      <div className="flex items-center gap-2 mt-16 text-wa-muted text-sm">
        <Lock className="w-4 h-4" />
        <span>Your personal messages are end-to-end encrypted</span>
      </div>
    </div>
  )
}
