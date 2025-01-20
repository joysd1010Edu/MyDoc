import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Hello, dev!</h1>
      <p className="text-center">
        Welcome to your Next.js app with Tailwind CSS and TypeScript.
      </p>
      <p className="text-center">
        Click on{" "}
        <Link href={"./document"} className="text-blue-600 underline">
          here
        </Link>{" "}
        to see the document page.
      </p>
    </div>
  );
}
