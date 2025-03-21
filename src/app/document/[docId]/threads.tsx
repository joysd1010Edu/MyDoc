import { ClientSideSuspense, useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

export const Threads=({editor}: { editor: Editor | null })=>{
  return <ClientSideSuspense fallback={null}>
    <ThreadList editor={editor}/>
  </ClientSideSuspense>
}

export function ThreadList({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads({ query: { resolved: false } });

  return (
    <>
      <div className="anchored-threads print:hidden">
        <AnchoredThreads className="" editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="floating-threads print:hidden"
      />
      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  );
}