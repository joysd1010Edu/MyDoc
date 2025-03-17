"use client";
import Navbar from "./navbar";
import Template_Gallary from "./Template_Gallary";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "./DocumentsTable";
import useSearchParam from "@/hooks/useSearchPara";
import FullScreenLoader from "@/components/fullScreenLoader";

export default function Home() {
  const [search]=useSearchParam()
  const {results,status,loadMore} = usePaginatedQuery(api.Document.GetDocs,{ search},{initialNumItems:10});
  // console.log(results);
  if(results===undefined){
    return  <FullScreenLoader label="Data is Loading please wait...." />
  }
  return (
    <div className=" min-h-screen flex flex-col ">
      <div className=" fixed top-0 left-0 right-0 z-10 bg-[#ffffff] h-16">
        <Navbar />
      </div>
      <div className=" mt-16">
        <Template_Gallary />
      <DocumentsTable documents={results} loadMore={loadMore} status={status}/>
      </div>
      
     
    </div>
  );
}
