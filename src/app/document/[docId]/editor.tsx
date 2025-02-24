"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorState } from "@/Store/useEditorStore";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize } from "@/extensions/Font-Size";
import { LineHeight } from "@/extensions/lineHight";
import Ruler from "./Ruler";

const Editor = () => {
  const { setEditor } = useEditorState();
  const editor = useEditor({
    immediatelyRender:false,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right: 56px",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7]  w-[816px] min-h-[1054px] flex flex-col py-10 pr-16 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      FontSize,
      LineHeight.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      Link.configure({
        defaultProtocol: "https",
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        autolink: true,
      }),
      FontFamily,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Highlight.configure({ multicolor: true }),
      Table,
      Underline,
      TableRow,
      TableHeader,
      ImageResize,
      TableCell,
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `
       
       isquam voluptatibus reiciendis ut perferendis distinctio, porro nisi itaque, aliquam culpa vitae soluta. Voluptates quas eius voluptatum! Ut dicta earum rem?
       Consequatur, ab veritatis? Perferendis cupiditate commodi accusantium rem reiciendis quibusdam vitae praesentium! Quae aut odio laudantium eum vel dolorum provident molestiae ea, cupiditate maiores. Voluptatem maiores temporibus nesciunt dignissimos? Blanditiis!
       Labore officiis ex dolorum dolores aut recusandae tempore mollitia magnam delectus ipsam! Vero tempore eius error. Quo, sint totam natus nostrum eos veniam labore quas sed, hic iste minus corrupti.
       Aperiam nihil suscipit quis reprehenderit provident magni quasi sint ipsam, id repudiandae ad velit nisi deleniti assumenda alias, tempore, dolore expedita libero rerum ex laborum voluptas perferendis? Ea, reiciendis magnam?
       Molestias iusto itaque nihil recusandae sed et eos, natus laborum quidem commodi eum ratione facere sit architecto quasi cum explicabo voluptatem distinctio! Tempore earum neque molestias odit beatae iure dolores.
       Alias odio unde facere amet veritatis quos nostrum magni asperiores reprehenderit! Impedit maiores tempore magnam vitae quia labore voluptate ea commodi amet ab expedita, quis reprehenderit, a iusto, doloremque libero?
       Nostrum fuga esse reiciendis dolor illo deserunt id perspiciatis quidem minus nisi magnam asperiores officia amet, accusamus soluta repellendus nesciunt nihil quos fugiat quia? Optio voluptatibus eum sequi autem architecto?
       Illum alias molestias voluptatem exercitationem facere? Itaque non iusto magnam eveniet repellendus sed, voluptatibus, nostrum enim nisi ipsam mollitia, possimus placeat rerum atque. Necessitatibus enim non, iusto numquam voluptate praesentium.
       Nostrum, fuga quis ab quidem earum dolores vero expedita iusto facilis, quia explicabo similique culpa rem, consectetur inventore non doloremque repudiandae repellendus totam aliquid voluptatem. Itaque magnam dignissimos et adipisci.
       Quasi quo impedit beatae, error a maiores eligendi perferendis praesentium eum repellendus pariatur placeat quidem quod maxime numquam fuga, modi aspernatur natus, deserunt amet architecto. Repudiandae deleniti saepe reprehenderit corrupti.
       Aspernatur laudantium, suscipit quam rerum sint impedit, tenetur unde magnam, autem harum adipisci soluta similique in eos blanditiis. Aut nisi adipisci dolor quibusdam doloremque facere fuga dolorem architecto repellat ab.
       Veritatis natus quidem quisquam fuga dicta, vitae quaerat illum consequatur tempore dolor optio, nam quia vero nostrum ea vel fugiat, eaque reprehenderit? Sapiente consequuntur, cupiditate molestias nam amet eligendi eius.
       Possimus dolor, rerum voluptate itaque quos modi placeat, doloremque accusantium enim veritatis quibusdam, at maxime eos qui pariatur quam nesciunt! Ipsa voluptates unde veritatis non quibusdam quaerat architecto, nemo praesentium.
       Aspernatur, voluptatibus consequuntur qui, dolorem sed nam minima fugiat repellendus quas soluta ratione! Sint, adipisci aut. Qui amet exercitationem distinctio ad esse, est, omnis eveniet necessitatibus, nesciunt doloremque totam a.
       Sequi ratione, suscipit dolor vero minus odit quaerat corrupti quos minima atque voluptate quibusdam magnam! Consequatur quo repellat hic nostrum accusamus fuga suscipit voluptate, totam illum at cupiditate earum facere!
       Illo recusandae corporis sint necessitatibus molestias unde assumenda reprehenderit mollitia. Unde corporis facere consequuntur veritatis et, quis minus, odit dolore error sit incidunt velit ea, a amet rem officia reiciendis.
        
      `,
  });

  return (
    <div className="size-full overflow-x-auto text-black bg-slate-100 px-4 print:bg-white print:overflow-visible">
      <Ruler/>
      <div className="min-w-max flex justify-center w-[816px] py-5 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
