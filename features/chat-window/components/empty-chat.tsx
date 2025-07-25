import { MessageCircle, Lock } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="bg-wa-panel flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="mb-8">
        <div className="relative mx-auto mb-8 h-80 w-80">
          <div className="from-wa-green/20 to-wa-green/5 absolute inset-0 rounded-full bg-gradient-to-br" />
          <div className="bg-wa-panel absolute inset-8 flex items-center justify-center rounded-full">
            <MessageCircle className="text-wa-green h-32 w-32" />
          </div>
        </div>
      </div>

      <h1 className="text-wa-primary mb-4 text-3xl font-light">Download WhatsApp for Windows</h1>

      <p className="text-wa-secondary mb-8 max-w-md leading-relaxed">
        Make calls, share your screen and get a faster experience when you download the Windows app.
      </p>

      <button className="bg-wa-green hover:bg-wa-green/90 rounded-full px-8 py-3 font-medium text-white transition-colors">
        Download
      </button>

      <div className="text-wa-muted mt-16 flex items-center gap-2 text-sm">
        <Lock className="h-4 w-4" />
        <span>Your personal messages are end-to-end encrypted</span>
      </div>
    </div>
  );
}
