"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight'
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import FontFamily from '@tiptap/extension-font-family'
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorState } from "@/Store/useEditorStore";
import TextStyle from "@tiptap/extension-text-style";

const Editor = () => {
  const { setEditor } = useEditorState();
  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right: 56px",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] rounded-lg min-w-[820px] min-h-[1054px] flex flex-col py-10 pr-16 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      FontFamily,
      TextStyle,Color , Highlight.configure({multicolor:true}),
      Table,Underline,
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
       
       <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
        
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
