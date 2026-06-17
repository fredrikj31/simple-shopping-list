import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcn-ui/components/ui/dialog";
import { Button } from "@shadcn-ui/components/ui/button";
import { usePWAUpdate } from "../hooks/usePWAUpdate";

export function PWAUpdatePrompt() {
  const { needRefresh, applyUpdate, dismiss } = usePWAUpdate();

  return (
    <Dialog open={needRefresh} onOpenChange={(open) => !open && dismiss()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Update available</DialogTitle>
          <DialogDescription>
            A new version of the app is ready. Update now to get the latest
            features and fixes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={dismiss}>
            Later
          </Button>
          <Button onClick={applyUpdate}>Update now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
