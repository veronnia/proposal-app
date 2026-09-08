import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle: string;
  onConfirm: (title: string) => void;
  isPending?: boolean;
}

export function RenameDialog({ open, onOpenChange, initialTitle, onConfirm, isPending }: RenameDialogProps) {
  const [title, setTitle] = useState(initialTitle);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setTitle(initialTitle);
        onOpenChange(next);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Proposal</DialogTitle>
        </DialogHeader>
        <Label htmlFor="rename-title">Proposal title</Label>
        <Input id="rename-title" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!title.trim() || isPending}
            onClick={() => {
              onConfirm(title.trim());
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
