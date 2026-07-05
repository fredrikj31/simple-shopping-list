import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn-ui/components/ui/dialog";
import { Button } from "@shadcn-ui/components/ui/button";
import { useState } from "react";
import { usePWAInstall } from "../providers/PWAInstall";

const DISMISSED_COOKIE = "pwa-install-dismissed";

function isDismissed(): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${DISMISSED_COOKIE}=`));
}

function setDismissed() {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${DISMISSED_COOKIE}=1; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export function PWAInstallPrompt() {
  const { canInstall, isStandalone, promptInstall } = usePWAInstall();
  const [dismissed, setDismissedState] = useState(isDismissed);

  const open = canInstall && !isStandalone && !dismissed;

  const handleInstall = async () => {
    const outcome = await promptInstall();

    if (outcome === "dismissed") {
      setDismissed();
      setDismissedState(true);
    }
  };

  const handleDismiss = () => {
    setDismissed();
    setDismissedState(true);
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
