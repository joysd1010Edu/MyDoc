"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorState } from "@/Store/useEditorStore";
import {
  BarChartHorizontal,
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlus,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Level } from "@tiptap/extension-heading";
import { type ColorResult , CirclePicker} from "react-color";

interface ToolBarProps {
  onclick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const TextColor=()=>{
  const { editor } = useEditorState();
  const value= editor?.getAttributes("textStyle").color||'#000000'
  const onChange=(color: ColorResult )=>{
    editor?.chain().focus().setColor(color.hex).run()
  }

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
            "h-7 w-32 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden"
          )}>
            <span cla>
              A
            </span>
          <CirclePicker color={value} onChange={onChange}/>
        </button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )

}

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 w-32 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1 overflow-hidden"
          )}
        >
          <span className="truncate">{currentHeading()}</span>
          <ChevronDownIcon className=" ml-3 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-1 flex flex-col gap-1 rounded-sm shadow-lg">
        {headings.map(({ label, value, fontSize }) => (
          <button
            style={{ fontSize}}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
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
  );
};

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
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
  );
};

const ToolBarButton = ({ onclick, isActive, icon: Icon }: ToolBarProps) => {
  return (
    <button
      onClick={onclick}
      className={cn(
        "text-sm h-7 min-w-7 items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon />
    </button>
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
        isActive: false, //TODO: Add comment functionality
        onclick: () => {
          //TODO: Add comment functionality
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
    <div className="bg-gray-300 px-3 py-1 rounded-xl min-h-10 flex items-center gap-x-1 overflow-x-auto">
      {sections[0].map((button, buttonIndex) => (
        <ToolBarButton key={buttonIndex} {...button} />
      ))}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      <FontFamilyButton />
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      <HeadingLevelButton/>
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: font size */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />

      {sections[1].map((button, buttonIndex) => (
        <ToolBarButton key={buttonIndex} {...button} />
      ))}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: Text Color */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: Highlight Color */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: Link */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: Image */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: Align*/}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: List */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {/* TODO: Line height */}
      <Separator orientation="vertical" className=" h-6 bg-neutral-400" />
      {sections[2].map((button, buttonIndex) => (
        <ToolBarButton key={buttonIndex} {...button} />
      ))}
    </div>
  );
};

export default ToolBar;
