import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="w-full sm:w-auto max-h-screen overflow-scroll "
      >
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            No, take me back
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes, Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
