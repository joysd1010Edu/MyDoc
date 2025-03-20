// import Editor from "./editor";
// import { NavBar } from "./navbar";
// import { Room } from "./room";
// import ToolBar from "./ToolBar";

import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

// interface DocIdProps {
//   params: { docId: string };
// }

// const Page = async ({ params }: DocIdProps) => {
//   const { docId } = await params;
//   console.log(docId);
//   return (
//     <div className="min-h-screen bg-[#f7f7f7]">
//       <Room>
//         <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#f7f7f7] print:hidden">
//           <NavBar />
//           <ToolBar />
//         </div>
//         <div className="pt-[124px] print:pt-0">
//           <Editor />
//         </div>
//       </Room>
//     </div>
//   );
// };

// export default Page;
// -------------------------------------optimization-------------------------------------


interface DocumentIdPageProps {
params: Promise<{ docId: Id<"documents"> }>;
}

const DocumentIdPage = async ({ params}:DocumentIdPageProps) => {

const { docId } = await params;
const {getToken}= await auth();
const token =await getToken({template:"convex"})??undefined;

if(!token){
throw new Error("Unauthorized");
}

const preloadedDocument = await preloadQuery(api.Document.getById, {id:docId}, {token});

    return <Document preloadedDocument={preloadedDocument}/>
};  
 
export default DocumentIdPage;
