"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface RenameDialogueProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

const RenameDialogue = ({
  documentId,
  children,
  initialTitle,
}: RenameDialogueProps) => {
  
  const Update = useMutation(api.Document.UpdateDoc);
  const [isUpdating, setUpdate] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdate(true);
    console.log("Update =", {
      id: documentId,
      title: title.trim() || "Untitled",
    });

    Update({ id: documentId, title: title.trim() || "Untitled" }).finally(
      () => {
        setUpdate(false);
        setOpen(false);
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter the new name for the document.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              defaultValue={title}
              placeholder="Enter new name"
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={"ghost"}
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialogue;
