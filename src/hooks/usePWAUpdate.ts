import { useEffect, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const UPDATE_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

export function usePWAUpdate() {
  const registrationRef = useRef<ServiceWorkerRegistration | undefined>(
    undefined,
  );

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swScriptUrl, registration) {
      if (!registration) return;
      registrationRef.current = registration;
      setInterval(() => registration.update(), UPDATE_INTERVAL_MS);
    },
    onOfflineReady() {
      console.log("App is ready to work offline");
    },
  });

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        registrationRef.current?.update();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const applyUpdate = async () => {
    await updateServiceWorker(true);
  };

  const dismiss = () => {
    setNeedRefresh(false);
  };

  return { needRefresh, applyUpdate, dismiss };
}
