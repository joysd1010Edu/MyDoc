import Editor from "./editor";
import ToolBar from "./ToolBar";

interface DocIdProps {
  params: { docId: string };
}

const Page = async ({ params }: DocIdProps) => {
  const { docId } = await params;
  console.log(docId);
  return (
    <div>
      <ToolBar />
      <Editor />
    </div>
  );
};

export default Page;
