"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center space-y-6">
      <div className=" text-center space-y-4">
        <div className=" flex justify-center">
          <div className=" bg-rose-200 p-3 rounded-full">
            <AlertTriangle className=" size-12 text-rose-600" />
          </div>
        </div>
        <div>
          <h1 className=" text-xl font-semibold text-gray-700">
            {" "}
            Something went wrong 😕..........
          </h1>
          <p className=" text-center">{error.message}</p>
        </div>
      </div>
      <div className=" flex items-center gap-3">
        <Button onClick={reset} className=" font-medium px-6">
          Try again
        </Button>
        <Button variant={"ghost"} asChild className=" font-medium px-6">
          <Link href={"/"}>Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
