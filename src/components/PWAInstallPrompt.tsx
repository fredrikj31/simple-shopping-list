import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn-ui/components/ui/dialog";
import { Button } from "@shadcn-ui/components/ui/button";
import { useEffect, useRef, useState } from "react";

const DISMISSED_COOKIE = "pwa-install-dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

function isDismissed(): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${DISMISSED_COOKIE}=`));
}

function setDismissed() {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${DISMISSED_COOKIE}=1; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone: boolean }).standalone)
  );
}

export function PWAInstallPrompt() {
  const installPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isStandalone() || isDismissed()) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      installPrompt.current = e as BeforeInstallPromptEvent;
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt.current) return;

    await installPrompt.current.prompt();
    const { outcome } = await installPrompt.current.userChoice;

    if (outcome === "dismissed") {
      setDismissed();
    }

    installPrompt.current = null;
    setOpen(false);
  };

  const handleDismiss = () => {
    setDismissed();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleDismiss()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Install the app</DialogTitle>
          <DialogDescription>
            Install this app on your device for quick access and an improved
            experience.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleDismiss}>
            Not now
          </Button>
          <Button onClick={handleInstall}>Install</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
