import { Button } from "@shadcn-ui/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export const InstallButton = () => {
  const installPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      installPrompt.current = e as BeforeInstallPromptEvent;
      setIsInstallable(true);
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

    console.log(
      outcome === "accepted"
        ? "User accepted the installation prompt"
        : "User dismissed the installation prompt",
    );

    installPrompt.current = null;
    setIsInstallable(false);
  };

  if (!isInstallable) return null;

  return (
    <Button className="w-fit" onClick={handleInstall}>
      Install App
    </Button>
  );
};
