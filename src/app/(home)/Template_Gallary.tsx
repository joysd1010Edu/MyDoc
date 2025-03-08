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
import Image from "next/image";



const Template_Gallary = () => {
  const isCreated = false;

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
                    onClick={() => {}}
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
