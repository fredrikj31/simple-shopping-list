import { useRegisterSW } from "virtual:pwa-register/react";

const UPDATE_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

export function usePWAUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (!registration) return;
      setInterval(() => registration.update(), UPDATE_INTERVAL_MS);
    },
    onOfflineReady() {
      console.log("App is ready to work offline");
    },
  });

  const applyUpdate = async () => {
    await updateServiceWorker(true);
  };

  const dismiss = () => {
    setNeedRefresh(false);
  };

  return { needRefresh, applyUpdate, dismiss };
}
