"use client";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const AvatarSize = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  console.log(users)
  const currentUser = useSelf();
  if (users.length === 0) {
    return null;
  }
  return (
    <>
      <div className="flex items-center space-x-2">
        {currentUser && (
          <div className=" relative ml-2">
            <Avatar src={currentUser.info.avatar} name={"You"} />
          </div>
        )}

        <div className=" flex">
          {users.map(({ connectionId, info }) => {
            return (
              <Avatar key={connectionId} src={info.avatar} name={info.name} />
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" className=" h-6" />
    </>
  );
};

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      style={{ width: AvatarSize, height: AvatarSize }}
      className=" group -ml-3 flex items-center shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-500"
    >
      <div className=" absolute group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-black whitespace-nowrap rounded-lg text-white text-xs px-2 py-1 mt-3 z-10 top-full">
        {name}
      </div>
      <Image
        width={50}
        height={50}
        src={src}
        alt={name}
        className=" size-full rounded-full"
      />
    </div>
  );
};
