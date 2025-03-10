import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteConfermationBox from "@/components/DeleteConfermationBox";
import RenameDialogue from "@/components/RenameDialogue";

interface DocumentMenuProps {
  documetId: Id<"documents">;
  title: string;
  onNewTab: (id: string) => void;
}

const DocumentMenu = ({ documetId, title, onNewTab }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className=" rounded-full hover:bg-gray-300"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialogue documentId={documetId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePenIcon className=" size-4 mr-2" /> Rename
          </DropdownMenuItem>
        </RenameDialogue>
        <DeleteConfermationBox documentId={documetId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className=" size-4 mr-2" /> Remove
          </DropdownMenuItem>
        </DeleteConfermationBox>

        <DropdownMenuItem onClick={() => onNewTab(documetId)}>
          <ExternalLinkIcon className=" size-4 mr-2" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentMenu;
