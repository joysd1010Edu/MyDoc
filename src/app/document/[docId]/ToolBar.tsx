"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/Store/useEditorStore";
import {
  AlignCenterIcon,
  AlignJustify,
  AlignLeftIcon,
  AlignRightIcon,
 
  BoldIcon,
 
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlus,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Level } from "@tiptap/extension-heading";
import { type ColorResult, SketchPicker } from "react-color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TbLineHeight } from "react-icons/tb";
// import { FaBold } from "react-icons/fa";
import { IconType } from "react-icons";
import FullScreenLoader from "@/components/fullScreenLoader";

interface ToolBarProps {
  onclick: () => void;
  isActive?: boolean;
  icon: LucideIcon|IconType;
  label: string;
}

// -------------------------------------------Tool bar components----------------------------------------------------
//------------------------------align Button-------------------------------------
const LineHeight = () => {
  const { editor } = useEditorState();

  const LineHeights = [
    { label: "default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button className="shrink-0 flex flex-col items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 overflow-hidden">
                <TbLineHeight className="size-5" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Line Height</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="p-1.5 flex flex-col rounded-sm ">
          {LineHeights.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                editor?.chain().focus().setLineHeight(value).run();
              }}
              className={cn(
                "flex items-center py-1 px-1 gap-x-2 rounded-sm hover:bg-neutral-200/80",
                editor?.getAttributes("paragraph").lineHight === value &&
                  "bg-neutral-200/80"
              )}
            >
             
              <span className=" text-sm"> {label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

// ------------------------------Font Size Button-------------------------------------
const FontSizeBtn = () => {
  const { editor } = useEditorState();
  const CurrentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("", "")
    : "16px";
  const [fontSize, setFontSize] = useState(CurrentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [Editing, setEditing] = useState(false);
  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };
  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const incrementFontSize = () => {
    const size = parseInt(fontSize) + 1;
    updateFontSize(size.toString());
  };
  const DecrementFontSize = () => {
    const size = parseInt(fontSize) - 1;
    if (size > 0) {
      updateFontSize(size.toString());
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <button
              onClick={DecrementFontSize}
              className="shrink-0 flex h-7 w-7 items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 "
            >
              <MinusIcon className=" size-4" />
            </button>
            {Editing ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="shrink-0  border-2 border-neutral-400 text-center h-7 w-10  rounded-sm text-sm bg-transparent focus:ring-0 px-1 focus:outline-none"
              />
            ) : (
              <button
                onClick={() => {
                  setEditing(true);
                  setFontSize(CurrentFontSize);
                }}
                className="shrink-0  border-2 border-neutral-400 text-center h-7 w-10  rounded-sm text-sm bg-transparent hover:cursor-text px-1 "
              >
                {CurrentFontSize}
              </button>
            )}
            <button
              onClick={incrementFontSize}
              className="shrink-0 flex h-7 w-7 items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 "
            >
              <PlusIcon className=" size-4" />
            </button>
          </div>
        </TooltipTrigger>

        <TooltipContent side="top">Font Size</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

//------------------------------Image Button-------------------------------------
const ImageBtn = () => {
  const { editor } = useEditorState();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateAndInsertImage = async (src: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(src);
      const contentType = response.headers.get("content-type");

      if (!contentType?.startsWith("image/")) {
        setError("Invalid image URL. Please provide a valid image link.");
        return;
      }

      editor?.chain().focus().setImage({ src }).run();
      setUrl("");
    } catch (err) {
      setError("Failed to load image. Please check the URL and try again.");
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  const Upload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setError("Please select a valid image file.");
          return;
        }
        const imgUrl = URL.createObjectURL(file);
        await validateAndInsertImage(imgUrl);
      }
    };
    input.click();
  };

  const insertImageFromUrl = async () => {
    if (!url) {
      setError("Please enter an image URL");
      return;
    }
    await validateAndInsertImage(url);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button className="shrink-0 flex flex-col items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 overflow-hidden">
                <ImageIcon className="size-5" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Image Insertion</TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-80">
          <DropdownMenuItem onClick={Upload}>
            <UploadIcon className="size-4 mx-2" />
            Upload Image
          </DropdownMenuItem>
          <div className="p-2 flex flex-col gap-2">
            <Input
              placeholder="Paste image URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  insertImageFromUrl();
                }
              }}
            />
            {error && <p className="text-xs text-red-500 px-1">{error}</p>}
            <Button
              onClick={insertImageFromUrl}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <FullScreenLoader label="Please wait...."/> : "Insert Image"}
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------List Button-------------------------------------
const ListBtn = () => {
  const { editor } = useEditorState();

  const lists = [
    {
      label: "Bullet List",
      onclick: () => editor?.chain().focus().toggleBulletList().run(),
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
    },
    {
      label: "Ordered List",
      onclick: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
    },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button className="shrink-0 flex flex-col items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 overflow-hidden">
                <ListIcon className="size-5" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Text Listing</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="p-1.5 flex flex-col rounded-sm ">
          {lists.map(({ label, onclick, icon: Icon, isActive }) => (
            <button
              key={label}
              onClick={onclick}
              className={cn(
                "flex items-center py-1 px-2 gap-x-2 rounded-sm hover:bg-neutral-200/80",
                isActive() && "bg-neutral-200/80"
              )}
            >
              <Icon className="size-4" />
              <span className=" text-sm"> {label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------align Button-------------------------------------
const AlignBtn = () => {
  const { editor } = useEditorState();

  const alignments = [
    { label: "Left", value: "left", icon: AlignLeftIcon },
    { label: "Center", value: "center", icon: AlignCenterIcon },
    { label: "Right", value: "right", icon: AlignRightIcon },
    { label: "Justify", value: "justify", icon: AlignJustify },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button className="shrink-0 flex flex-col items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 overflow-hidden">
                <AlignLeftIcon className="size-5" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Text Alignment</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="p-1.5 flex flex-col rounded-sm ">
          {alignments.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                editor?.chain().focus().setTextAlign(value).run();
              }}
              className={cn(
                "flex items-center py-1 px-2 gap-x-2 rounded-sm hover:bg-neutral-200/80",
                editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
              )}
            >
              <Icon className="size-4" />
              <span className=" text-sm"> {label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------Link Button-------------------------------------
const LinkButton = () => {
  const { editor } = useEditorState();
  const [value, setValue] = useState<string>(
    editor?.getAttributes("link").href || ""
  );
  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setValue(editor?.getAttributes("link").href || "");
          }
        }}
      >
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button className="shrink-0 flex flex-col items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 overflow-hidden">
                <Link2Icon className="size-5" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Link</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="p-2 items-center flex gap-x-4">
          <Input
            placeholder="Enter URL"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={() => onChange(value)}>Apply</Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------------Color Picker for Highlight--------------------------------------------
const HighLightColor = () => {
  const { editor } = useEditorState();
  const value = editor?.getAttributes("highlight").color || "#ffffff";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button className="shrink-0 flex flex-col items-center rounded-sm p-1 hover:bg-neutral-200/80 px-1 overflow-hidden">
                <HighlighterIcon className="size-4" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Highlight Color</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="p-0">
          <SketchPicker
            color={value}
            onChange={onChange}
            disableAlpha
            className=""
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------------Color Picker for Text --------------------------------------------
const TextColor = () => {
  const { editor } = useEditorState();
  const value = editor?.getAttributes("textStyle")?.color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "shrink-0 flex flex-col items-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden"
                )}
              >
                <span className="text-lg">A</span>
                <div
                  className="h-0.5 w-full rounded-sm"
                  style={{ backgroundColor: value }}
                />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Text Color</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="p-0">
          <SketchPicker color={value} onChange={onChange} disableAlpha />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------------Heading Level Button--------------------------------------------
const HeadingLevelButton = () => {
  const { editor } = useEditorState();
  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];
  const currentHeading = () => {
    for (let level = 1; level < 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };
  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "h-7 w-32 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden"
                )}
              >
                <span className="truncate">{currentHeading()}</span>
                <ChevronDownIcon className=" ml-3 size-4 shrink-0" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top">Heading Size</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className=" p-1 flex flex-col gap-1 rounded-sm shadow-lg">
          {headings.map(({ label, value, fontSize }) => (
            <button
              style={{ fontSize }}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run();
                }
              }}
              key={value}
              className={cn(
                "flex items-center p-2 rounded-sm hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading")) ||
                  (editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-200/80")
              )}
            >
              <span className=" text-sm"> {label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//------------------------------------Font Family Button--------------------------------------------
const FontFamilyButton = () => {
  const { editor } = useEditorState();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Impact", value: "Impact" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Arial Black", value: "Arial Black" },
    { label: "Arial Narrow", value: "Arial Narrow" },
    { label: "Book Antiqua", value: "Book Antiqua" },
    { label: "Century Gothic", value: "Century Gothic" },
    { label: "Garamond", value: "Garamond" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "MS Serif", value: "MS Serif" },
    { label: "Palatino Linotype", value: "Palatino Linotype" },
    { label: "Symbol", value: "Symbol" },
    { label: "Wingdings", value: "Wingdings" },
    { label: "Webdings", value: "Webdings" },
    { label: "MS Sans Serif", value: "MS Sans Serif" },
  ];
  return (
    <TooltipProvider delayDuration={200}>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "h-7 w-32 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden"
                )}
              >
                <span className="truncate">
                  {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                </span>
                <ChevronDownIcon className=" ml-3 size-4 shrink-0" />
              </button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent side="top" className="text-sm">
            Font Family
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className=" p-1 flex flex-col gap-1 rounded-sm shadow-lg">
          {fonts.map(({ label, value }) => (
            <button
              onClick={() => {
                editor?.chain().focus().setFontFamily(value).run();
              }}
              key={value}
              className={cn(
                "flex items-center p-2 rounded-sm hover:bg-neutral-200/80",
                editor?.getAttributes("textStyles").fontFamily === value &&
                  "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
            >
              <span className=" text-sm"> {label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};

//-----------------------Tool Bar Button (bold,italic,underline,undo,redo,print)---------------------
const ToolBarButton = ({
  onclick,
  isActive,
  icon: Icon,
  label,
}: ToolBarProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={onclick}
          className={cn(
            "text-sm h-7 min-w-7 items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
          )}
        >
          <Icon className="h-5 mx-auto w-5" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ToolBar = () => {
  const { editor } = useEditorState();
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false);

  const sections: {
    label: string;
    icon: LucideIcon;
    onclick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onclick: () => {
          editor?.chain().focus().undo().run();
        },
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onclick: () => {
          editor?.chain().focus().redo().run();
        },
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onclick: () => {
          window.print();
        },
      },

      {
        label: "Spell Check",
        icon: SpellCheckIcon,

        onclick: () => {
          // Toggle spellcheck
          const newValue = !spellCheckEnabled;
          console.log(
            editor?.view.dom.setAttribute("spellcheck", newValue.toString())
          );
          setSpellCheckEnabled(newValue); // Update state
          console.log(`Spellcheck is now: ${newValue}`);
        },
        isActive: spellCheckEnabled, // Highlight button if active
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onclick: () => {
          editor?.chain().focus().toggleBold().run();
        },
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onclick: () => {
          editor?.chain().focus().toggleItalic().run();
        },
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onclick: () => {
          editor?.chain().focus().toggleUnderline().run();
        },
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlus,
        isActive: editor?.isActive("liveblocksCommentMark"), //TODO: Add comment functionality
        onclick: () => {
         editor?.chain().focus().addPendingComment().run();
        },
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onclick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
      },
      {
        label: "Remove formatting",
        icon: RemoveFormattingIcon,

        onclick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        },
      },
    ],
  ];

  return (
    <div className="bg-gray-200 px-3 py-1 rounded-xl min-h-10 flex items-center gap-x-1 overflow-x-auto">
      {/* ----------------Tool bar Buttons implementation-------------------- */}
      {sections[0].map((button, buttonIndex) => (
        <ToolBarButton key={buttonIndex} {...button} />
      ))}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />

      {/* -----------------Font Family Button Implementation----------------- */}
      <FontFamilyButton />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />

      {/* -----------------Heading Level Button Implementation--------------- */}
      <HeadingLevelButton />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* ------------------------ font size -------------------------*/}
      <FontSizeBtn />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />

      {/* ---------------- Tool Bar Buttons Implementation-------------- */}
      {sections[1].map((button, buttonIndex) => (
        <ToolBarButton key={buttonIndex} {...button} />
      ))}
      {/* -----------------Text color Implementation--------------- */}
      <TextColor />
      {/* -----------------Highlight color Implementation--------------- */}
      <HighLightColor />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* ------------------Link button implementation--------------*/}
      <LinkButton />
      {/* ------------------Image button implementation--------------*/}
      <ImageBtn />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* --------------------Alignment Implementation-------------------*/}
      <AlignBtn />

      {/* ---------------------- List ----------------------------------*/}
      <ListBtn />

      {/* =----------------- Line height------------------------ */}
      <LineHeight />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {sections[2].map((button, buttonIndex) => (
        <ToolBarButton key={buttonIndex} {...button} />
      ))}
    </div>
  );
};

export default ToolBar;
