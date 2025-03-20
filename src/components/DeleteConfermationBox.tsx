"use client";

import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteConfermationBoxProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

const DeleteConfermationBox = ({
  documentId,
  children,
}: DeleteConfermationBoxProps) => {
  const Remove = useMutation(api.Document.removeDoc);
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this document?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            document.
          </AlertDialogDescription>{" "}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);
              Remove({ id: documentId })
                .catch(() => toast.error("Something went wrong"))
                .then(() => {toast.success("Document Removed")
                  
                })
                .finally(() =>{ setIsRemoving(false); 
                  setTimeout(() => {
                    router.push("/");
                  }, 100);
                });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfermationBox;
