"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchParam from "@/hooks/useSearchPara";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

const SearchInput = () => {
    const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setValue(e.target.value);
  };
  console.log(search);
  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);   
     inputRef.current?.blur();


    };

  return (
    <div className="px-3 flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className=" relative max-w-[720px] w-full">
        <Input
          value={value}
          placeholder="Search"
          onChange={handleChange}
          ref={inputRef}
          className=" md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-md focus-visible:shadow-gray-500 bg-[#f0f4f8] rounded-full h-12 focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          variant="ghost"
          size={"icon"}
          className=" absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="submit"
            variant="ghost"
            size={"icon"}
            className=" absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
