import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import { format } from "date-fns";
import DocumentMenu from "./DocumentMenu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
  document: Doc<"documents">;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  const router=useRouter()
  const onNewTabClick = (id: string) => {
    window.open(`/document/${id}`, "_blank");
  };
  
  

  return (
    <TableRow  className="cursor-pointer hover:bg-gray-100">
      <TableCell className=" w-14">
        <SiGoogledocs className="size-6  fill-blue-500" />
      </TableCell>
      <TableCell onClick={()=>router.push(`/document/${document._id}`)} className=" font-medium md:w-[45%]">
        {document.title}
      </TableCell>
      <TableCell className=" hidden font-bold md:flex items-center gap-2 text-muted-foreground">
        {document.organizationId ? (
          <Building2Icon className=" size-4" />
        ) : (
          <CircleUserIcon className=" size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="font-bold hidden text-muted-foreground md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documetId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
