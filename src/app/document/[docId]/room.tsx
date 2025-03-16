"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params=useParams()
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_7asDm2C5gC-qLGoPJh4JZBZUpxhhA8HA92HZEyIrQLfGy9kPqPt3ziVAF8IY5FIH"}>
      <RoomProvider id={params.docId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}