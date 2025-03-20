"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/Constants/TemPlates";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

const Template_Gallary = () => {
  const router = useRouter();
  const create = useMutation(api.Document.createDoc);
  const [isCreated, setIsCreated] = useState(false);
  const onTemplateClick = async (title: string, initialContent: string) => {
    setIsCreated(true);
    create({ title, initialContent })
    .catch(()=>toast.error("Something went wrong"))
      .then((documentId) => {
        router.push(`/document/${documentId}`);
        toast.success("Document Created")
      })
      .finally(() => {
        setIsCreated(false);
      });
  };

  return (
    <div className=" bg-[#f1f3f4] ">
      <div className=" max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h1 className=" text-base font-medium ">Start a new Document</h1>
        <Carousel>
          <CarouselPrevious />
          <CarouselContent>
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className=" basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <div
                  className={cn(
                    " aspect-[3/4] flex flex-col gap-y-3",
                    isCreated && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreated}
                    onClick={() => onTemplateClick(template.label, template.initialContent)}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className=" size-full rounded-sm hover:border-blue-500 border hover:bgblue50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className=" text-sm font-medium px-2 truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Template_Gallary;


// function then(arg0: (documentId: any) => void) {
//   throw new Error("Function not implemented.");
// }

// function setIsCreated(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
