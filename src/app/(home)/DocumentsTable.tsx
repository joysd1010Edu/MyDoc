import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FullScreenLoader from "@/components/fullScreenLoader";
import DocumentRow from "./DocumentRow";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className=" max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <FullScreenLoader label="Loading..." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className=" hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? <TableBody>
            <TableRow className=" hover:bg-transparent">
                <TableCell colSpan={4} className=" text-center">
                    No documents found
                </TableCell>

                </TableRow>
          </TableBody> : <TableBody>
            {documents.map((doc) => (   
                <DocumentRow key={doc._id} document={doc} />
            ))}
            </TableBody>}
        </Table>
      )}
    </div>
  );
};

export default DocumentsTable;
