import { useRef, useState, useEffect } from "react";
import { registerSW } from "virtual:pwa-register";

export function usePWAUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const updateSWRef = useRef<((reloadPage?: boolean) => Promise<void>) | null>(
    null,
  );

  useEffect(() => {
    updateSWRef.current = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        console.log("App is ready to work offline");
      },
    });
  }, []);

  const applyUpdate = async () => {
    await updateSWRef.current?.(true);
  };

  const dismiss = () => {
    setNeedRefresh(false);
  };

  return { needRefresh, applyUpdate, dismiss };
}
