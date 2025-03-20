"use client";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Editor from "./editor";
import { NavBar } from "./navbar";
import { Room } from "./room";
import ToolBar from "./ToolBar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.Document.getById>;
}

export const Document =  ({ preloadedDocument }: DocumentProps) => {

  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen bg-[#f7f7f7]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#f7f7f7] print:hidden">
          <NavBar data={document}/>
          <ToolBar />
        </div>
        <div className="pt-[124px] ">
          <Editor  initialContent={document.initialContent}/>
        </div>
      </div>
    </Room>
  );
};
