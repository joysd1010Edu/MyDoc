import Link from "next/link";
import Navbar from "./navbar";
import Template_Gallary from "./Template_Gallary";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col ">
      <div className=" fixed top-0 left-0 right-0 z-10 bg-[#ffffff] h-16">
        <Navbar />
      </div>
      <div className=" mt-16">
        <Template_Gallary/>
      </div>

      click <Link href="/document/25683">here</Link> to go to document
    </div>
  );
}
