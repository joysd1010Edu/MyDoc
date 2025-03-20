"use client";
import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./DocumentInput";
// import RenameDialogue from "@/components/RenameDialogue";
import DeleteConfermationBox from "@/components/DeleteConfermationBox";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  FileIcon,
  FileJsonIcon,
  
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  Strikethrough,
  Table2Icon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { Avatars } from "./avatar";
import { FaBold } from "react-icons/fa";
import { useEditorState } from "@/Store/useEditorStore";
import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnLeft,
  RiInsertColumnRight,
} from "react-icons/ri";
import {
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowBelow,
} from "react-icons/ai";

import {  useState } from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
// import { Room } from "./room";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";


interface NavBarProps {
  data: Doc<"documents">;
}

export const NavBar = ({data}:NavBarProps) => {
  const { editor } = useEditorState();
  const [Rows, setRows] = useState(0);
  const [column, setCols] = useState(0);

  const addRowAbove = () => {
    editor?.chain().focus().addRowBefore().run();
  };

  const addRowBelow = () => {
    editor?.chain().focus().addRowAfter().run();
  };

  const addColumnBefore = () => {
    editor?.chain().focus().addColumnBefore().run();
  };
  const addColumnAfter = () => {
    editor?.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor?.chain().focus().deleteColumn().run();
  };

  const deleteRow = () => {
    editor?.chain().focus().deleteRow().run();
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  const OnSaveJson = () => {
    if (!editor) return;

    const json = editor.getJSON();
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    onDownload(blob, `${data.title}.json`); 
  };

  const OnSaveHtml = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    onDownload(blob, `${data.title}.html`); 
  };

  const OnSavePdf = () => {
    if (!editor) return;

    window.print();
  };

  const OnSaveDocx = () => {
    if (!editor) return;

    const file = editor.getText();
    const blob = new Blob([file], { type: "text/plain" });

    onDownload(blob, `${data.title}.docx`); 
  };
  const router = useRouter();
  // const pathname = usePathname();
  const mutation= useMutation(api.Document.createDoc)
  const onNewDoc=()=>{
    mutation({
      title:"Untitled Document",
      initialContent:""
    }).catch(()=>{toast.error("Something went wrong, Failed to create document")})
    .then((id)=>{
      toast.success("Document Created");
      router.push(`/document/${id}`)
    })
  }

  
  return (
    <nav className=" flex items-center justify-between">
      <div className=" flex gap-2 items-center">
        <Link href={"/"}>
          {" "}
          <Image width={80} height={80} src="/APP.svg" alt="logo" />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id}/>
          <div className="flex gap-2">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              {/* ------------------------------------------------------File----------------------------------------------- */}
              <MenubarMenu>
                <MenubarTrigger className=" text-sm font-normal py-1 px-2 rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className=" print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger className=" py-1 px-2 rounded-sm hover:bg-muted h-auto">
                      <FileIcon className=" size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={OnSaveJson}>
                        <FileJsonIcon className=" size-4 mr-2" /> JSON
                      </MenubarItem>
                      <MenubarItem onClick={OnSaveHtml}>
                        <GlobeIcon className=" size-4 mr-2" /> HTML
                      </MenubarItem>
                      <MenubarItem onClick={OnSavePdf}>
                        <BsFilePdf className=" size-4 mr-2" /> PDF
                      </MenubarItem>
                      <MenubarItem onClick={OnSaveDocx}>
                        <FileTextIcon className=" size-4 mr-2" /> Docx (MS Word
                        File)
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDoc}>
                    <FilePlusIcon className=" size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                 
                  <DeleteConfermationBox documentId={data._id}>
                    <MenubarItem
                     onSelect={(e) =>{ e.preventDefault();
                      
                     }}
                   
                    >
                      <TrashIcon className=" size-4 mr-2" />
                      Remove
                    </MenubarItem>
                  </DeleteConfermationBox>
                  
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className=" size-4 mr-2" />
                    Print <MenubarShortcut>Ctrl + P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/* ------------------------------------------------Edit----------------------------------------------------- */}
              <MenubarMenu>
                <MenubarTrigger className=" text-sm font-normal py-1 px-2 rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent className=" print:hidden">
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className=" size-4 mr-2" />
                    Undo{" "}
                    <MenubarShortcut className=" font-bold">
                      Ctrl + Z
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className=" size-4 mr-2" />
                    Redo{" "}
                    <MenubarShortcut className=" font-bold">
                      Ctrl + Y
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              {/* ----------------------------------------------------Insert----------------------------------------------- */}
              <MenubarMenu>
                <MenubarTrigger className=" text-sm font-normal py-1 px-2 rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Table2Icon className=" size-4 mr-2" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 X 1 Table
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 X 2 Table
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        3 X 3 Table
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 X 4 Table
                      </MenubarItem>
                      <div className="p-2 text-sm text-center flex gap-2 items-center">
                        <label className="">Rows:</label>
                        <input
                          type="number"
                          value={Rows}
                          onChange={(e) => setRows(Number(e.target.value))}
                          className="border p-1  w-10 rounded"
                          min={1}
                        />
                        <label className="">Columns:</label>
                        <input
                          type="number"
                          value={column}
                          onChange={(e) => setCols(Number(e.target.value))}
                          className="border p-1  w-10 rounded"
                          min={1}
                        />
                      </div>
                      <button
                        onClick={() =>
                          insertTable({ rows: Rows, cols: column })
                        }
                        className="bg-gray-500 text-white text-xs py-1 px-2 rounded"
                      >
                        Insert Table
                      </button>
                      <MenubarItem onClick={addColumnBefore}>
                        <RiInsertColumnLeft />
                        Add Column Left
                      </MenubarItem>
                      <MenubarItem onClick={addColumnAfter}>
                        <RiInsertColumnRight />
                        Add Column Right
                      </MenubarItem>
                      <MenubarItem onClick={addRowAbove}>
                        <AiOutlineInsertRowAbove />
                        Add Row Above
                      </MenubarItem>
                      <MenubarItem onClick={addRowBelow}>
                        <AiOutlineInsertRowBelow /> Add Row Below
                      </MenubarItem>
                      <MenubarItem onClick={deleteColumn}>
                        <RiDeleteColumn /> Remove Column
                      </MenubarItem>
                      <MenubarItem onClick={deleteRow}>
                        <RiDeleteRow /> Remove Row
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              {/* ----------------------------------------------------Format----------------------------------------------- */}
              <MenubarMenu>
                <MenubarTrigger className=" text-sm font-normal py-1 px-2 rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>

                <MenubarContent className=" print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className=" size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <FaBold className=" size-4 mr-2" /> Bold{" "}
                        <MenubarShortcut className="  font-bold">
                          Ctrl + B
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className=" size-4 mr-2" /> Italic{" "}
                        <MenubarShortcut className=" font-bold">
                          Ctrl + I
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className=" size-4 mr-2" /> Underline
                        &nbsp; &nbsp;{" "}
                        <MenubarShortcut className=" font-bold">
                          Ctrl + U
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <Strikethrough className=" size-4 mr-2" /> Strikethrough
                      </MenubarItem>
                    </MenubarSubContent>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().unsetAllMarks().run()
                      }
                    >
                      <RemoveFormatting className=" size-4 mr-2" />
                      Clear Formatting
                    </MenubarItem>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
      
          <Avatars />
          <Inbox/>
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
