import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallButton: React.FC<{ compact?: boolean }> = ({
  compact = false,
}) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!deferredPrompt) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <button
      type="button"
      onClick={handleInstall}
      className={`inline-flex items-center gap-1.5 border border-[#3478F6]/40 bg-[#3478F6]/10 font-semibold text-[#173B78] transition-colors hover:bg-[#3478F6] hover:text-white ${
        compact ? 'min-h-[40px] px-3 text-xs' : 'min-h-[44px] px-4 py-2 text-sm'
      }`}
    >
      <Download className="h-4 w-4 shrink-0" />
      <span>Install App</span>
    </button>
  );
};
