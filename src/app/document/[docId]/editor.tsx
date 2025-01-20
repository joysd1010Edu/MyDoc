"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import ImageResize from 'tiptap-extension-resize-image';

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] rounded-lg min-w-[820px] min-h-[1054px] flex flex-col py-10 pr-16 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      Table,
      TableRow,
      TableHeader,
      ImageResize,
      TableCell,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `
        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg?format=750w" />
        <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg" />
      `,
  });

  return (
    <div className="size-full overflow-x-auto text-black bg-slate-100 px-4 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[820px] py-5 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
