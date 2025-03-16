import Editor from "./editor";
import { NavBar } from "./navbar";
import { Room } from "./room";
import ToolBar from "./ToolBar";

interface DocIdProps {
  params: { docId: string };
}

const Page = async ({ params }: DocIdProps) => {
  const { docId } = await params;
  console.log(docId);
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#f7f7f7] print:hidden">
        <NavBar />
        <ToolBar />
      </div>
      <div className="pt-[124px] ">
        <Room>

        <Editor />
        </Room>
      </div>
    </div>
  );
};

export default Page;
