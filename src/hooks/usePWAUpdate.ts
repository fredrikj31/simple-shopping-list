import { useRegisterSW } from "virtual:pwa-register/react";

export function usePWAUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
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
