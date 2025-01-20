import Link from "next/link";

const Page = () => {
    return (
        <div>
            <p>This is the document page</p>
            <p>Click on <Link href="./document/25683" className="text-blue-600 underline">here</Link> to see the details</p>
        </div>
    );
};

export default Page;