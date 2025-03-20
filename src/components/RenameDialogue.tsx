"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface RenameDialogueProps {
  documentId: Id<"documents">;
  initialTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RenameDialogue = ({
  documentId,
  initialTitle,
  open,
  onOpenChange,
}: RenameDialogueProps) => {
  const Update = useMutation(api.Document.UpdateDoc);
  const [isUpdating, setUpdate] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange(false);

    setTimeout(() => {
      lastFocusedElement.current?.focus();
    }, 50);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdate(true);

    Update({ id: documentId, title: title.trim() || "Untitled" })
    .catch(()=>toast.error("Something went wrong")).then(()=>toast.success("Document Renamed")).finally(() => {
      setUpdate(false);
      handleClose();
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Rename Document</h2>
        <p className="text-sm text-gray-500 mb-4">Enter the new name for the document.</p>

        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new name"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
              disabled={isUpdating}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={isUpdating}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenameDialogue;
