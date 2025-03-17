"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/fullScreenLoader";
import { getUser } from "./action";
import { toast } from "sonner";

type user = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
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
      authEndpoint="/api/liveblocks"
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => user.find((u) => u.id === userId) ?? undefined
        );
      }}
      resolveRoomsInfo={({}) => []}
      resolveMentionSuggestions={({ text }) => {
        let filteredUser = user;
        if (text) {
          filteredUser = user.filter((u) =>
            u.name?.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUser.map((user) => user.id);
      }}
    >
      <RoomProvider id={params.docId as string}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Document is getting ready" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
