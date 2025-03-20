"use client";

import {
  ConvexReactClient,
  Authenticated,
  AuthLoading,
  Unauthenticated,
} from "convex/react";
import { ReactNode } from "react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import FullScreenLoader from "./fullScreenLoader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated> {children} </Authenticated>
        <AuthLoading>
          <FullScreenLoader label="Authenticating please wait...." />
        </AuthLoading>
        <Unauthenticated>
          {" "}
          <div className=" flex flex-col justify-center  items-center min-h-screen">
            {" "}
            <SignIn routing="hash"/>
          </div>{" "}
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
