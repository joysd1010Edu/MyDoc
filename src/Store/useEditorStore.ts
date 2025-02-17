import { type Editor } from "@tiptap/react";
import { create } from "zustand";

interface editorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

 export const useEditorState = create<editorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
