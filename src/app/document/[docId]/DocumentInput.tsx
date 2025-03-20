import {  LoaderIcon } from "lucide-react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
// import { set } from "date-fns";
import { useStatus } from "@liveblocks/react";

interface DocumentInputProps {
  id: Id<"documents">;
  title: string;
}

const DocumentInput = ({ id, title }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const mutation = useMutation(api.Document.UpdateDoc);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceUpdate = useDebounce((newTitle: string) => {
    if (newTitle === title) {
      return;
    }
    setIsPending(true);
    mutation({ id, title: newTitle })
      .then(() => toast.success("Document title updated"))
      .catch(() => toast.error("Failed to update document title"))
      .finally(() => setIsPending(false));
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    mutation({ id, title: value })
      .then(() => {
        toast.success("Document title updated");
        setEditing(false);
      })
      .catch(() => toast.error("Failed to update document title"))
      .finally(() => setIsPending(false));
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue(newTitle);
    debounceUpdate(newTitle);
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative max-w-[50ch] w-fit">
          <span className=" invisible whitespace-pre px-2 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onValueChange}
            onBlur={() => setEditing(false)}
            className="inset-0 text-lg absolute text-black bg-transparent px-2 truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className=" text-lg px-2 cursor-pointer truncate"
        >
          {" "}
          {title}
        </span>
      )}
        {showError && <BsCloudSlash className="text-red-500 size-5" />}
      {!showLoader && !showError && <BsCloudCheck className=" text-blue-500 size-5" />}
      {showLoader&&<LoaderIcon className="animate-spin text-muted-foreground size-5" />}
    </div>
  );
};

export default DocumentInput;
