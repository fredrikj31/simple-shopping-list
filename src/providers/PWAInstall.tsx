import { createContext, useContext, useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

type PWAInstallProviderState = {
  canInstall: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<"accepted" | "dismissed" | undefined>;
};

const initialState: PWAInstallProviderState = {
  canInstall: false,
  isStandalone: false,
  isIOS: false,
  promptInstall: () => Promise.resolve(undefined),
};

const PWAInstallProviderContext =
  createContext<PWAInstallProviderState>(initialState);

function isStandaloneDisplayMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as { standalone: boolean }).standalone)
  );
}

function isIOSDevice(): boolean {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function PWAInstallProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const installPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(isStandaloneDisplayMode);
  const [isIOS] = useState(isIOSDevice);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      installPrompt.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      installPrompt.current = null;
      setCanInstall(false);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt.current) return undefined;

    await installPrompt.current.prompt();
    const { outcome } = await installPrompt.current.userChoice;

    installPrompt.current = null;
    setCanInstall(false);

    return outcome;
  };

  const value = { canInstall, isStandalone, isIOS, promptInstall };

  return (
    <PWAInstallProviderContext.Provider value={value}>
      {children}
    </PWAInstallProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePWAInstall = () => {
  const context = useContext(PWAInstallProviderContext);

  if (context === undefined)
    throw new Error("usePWAInstall must be used within a PWAInstallProvider");

  return context;
};
