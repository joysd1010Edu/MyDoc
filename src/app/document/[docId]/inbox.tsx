"use client";
import { BellIcon } from "lucide-react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={ <Button variant={"ghost"} size={"icon"} className="relative">
    <BellIcon className="size-6" />
   
  </Button>}>
      <InboxMenu />
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();
  console.log(inboxNotifications);
  console.log(inboxNotifications.length);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="relative">
          <BellIcon className="size-6" />
          {inboxNotifications.length > 0 && (
            <span className="absolute -top-1 -right-1 size-5 bg-blue-300 rounded-full">
              {inboxNotifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" w-auto">
        {inboxNotifications.length > 0 ?
        <InboxNotificationList>
          {inboxNotifications.map((notification) => (
            <InboxNotification
              key={notification.id}
              inboxNotification={notification}
            />
          ))}
        </InboxNotificationList>:
        <div className=" p-2 w-[400px] text-center text-muted-foreground text-md">
            No new notifications
        </div>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
