"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/fullScreenLoader";
import { getUser , getDocuments } from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

type user = {
  id: string;
  name: string;
  avatar: string;
  color: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  // console.log(params);
  const [user, setUser] = useState<user[]>([]);

  const fetchUser = useMemo(
    () => async () => {
      try {
        const list = await getUser();
        setUser(list);
      } catch {
        toast.error("Failed to fetch user");
      }
    },
    []
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks";
        const room= params.docId as string;
        const response = await fetch(endpoint, {
          method: "POST",
          
          body: JSON.stringify({ room }),
        });
        return await response.json()
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => user.find((u) => u.id === userId) ?? undefined
        );
      }}
      resolveRoomsInfo={ async({roomIds}) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name, 
        }));
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUser = user;
        if (text) { 
          filteredUser = user.filter((u) =>
            u.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUser.map((user) => user.id);
      }}
    >
      <RoomProvider id={params.docId as string} initialStorage={{ leftMargine: 56, rightMargine: 56 }}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Document is getting ready" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
