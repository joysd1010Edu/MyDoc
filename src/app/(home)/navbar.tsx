import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
const Navbar = () => {
  return (
    <nav className=" flex items-center justify-between h-full w-full px-5">
      <div className="flex items-center gap-3 shrink-0 pr-7">
        <Link href="/" className=" flex items-center gap-3 ">
          <Image src="/APP.svg" alt="logo" width={100} height={50} />
        <h1 className=" text-xl font-bold"> TextKumir</h1>
        </Link>
      </div>
      <SearchInput/>
      <div></div>
    </nav>
  );
};

export default Navbar;
