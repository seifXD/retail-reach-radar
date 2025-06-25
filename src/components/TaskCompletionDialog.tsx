
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface TaskCompletionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOutcome: string;
  onConfirm: (comment: string) => void;
}

const TaskCompletionDialog = ({ isOpen, onOpenChange, selectedOutcome, onConfirm }: TaskCompletionDialogProps) => {
  const [comment, setComment] = useState("");

  const handleConfirm = () => {
    onConfirm(comment);
    setComment("");
  };

  const handleCancel = () => {
    onOpenChange(false);
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Call Comment</DialogTitle>
          <DialogDescription>
            Please add a comment about your call before marking this task as {selectedOutcome?.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Call Notes (Optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Add any notes about the call..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Mark as {selectedOutcome}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCompletionDialog;
