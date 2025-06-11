import React, { useEffect } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';

import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  errorMessage: string | undefined;
} & React.ComponentProps<'div'>;

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className='flex flex-wrap items-center gap-2 border-b border-neutral-300 p-2.5'>
      {/* Heading dropdown */}
      <div className='font-regular rounded-[6px] border border-neutral-300 p-[8px] text-sm leading-7'>
        <select
          className='font-regular pr-[8px] text-sm leading-7'
          onChange={(e) => {
            const value = e.target.value;
            if (value === '0') {
              editor.chain().focus().setParagraph().run();
            } else {
              const level = parseInt(value) as 1 | 2;
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          value={
            editor.isActive('heading', { level: 1 })
              ? '1'
              : editor.isActive('heading', { level: 2 })
                ? '2'
                : '0'
          }
        >
          <option value='0'>Paragraph</option>
          <option value='1'>Heading 1</option>
          <option value='2'>Heading 2</option>
        </select>
      </div>

      <div className='h-[23px] w-0.25 bg-neutral-300'></div>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <Bold size={16} />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <Strikethrough size={16} />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <Italic size={16} />
      </button>

      <div className='h-[23px] w-0.25 bg-neutral-300'></div>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <List size={16} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <ListOrdered size={16} />
      </button>

      <div className='h-[23px] w-0.25 bg-neutral-300'></div>

      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <AlignLeft size={16} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <AlignCenter size={16} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <AlignRight size={16} />
      </button>

      <div className='h-[23px] w-0.25 bg-neutral-300'></div>

      <button
        type='button'
        onClick={() => {
          const url = prompt('Enter URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <LinkIcon size={16} />
      </button>

      <button
        type='button'
        onClick={() => {
          const url = prompt('Enter image URL');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
        className='flex-center size-[28px] cursor-pointer hover:bg-neutral-200'
      >
        <ImageIcon size={16} />
      </button>
    </div>
  );
};

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  className,
  errorMessage,
  ...props
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      Link,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);
  return (
    <div
      className={cn(
        'rounded-[8px] border border-neutral-300',
        errorMessage && 'border-[#EE1D52]',
        className
      )}
      {...props}
    >
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        onClick={() => editor?.commands.focus()}
        className='font-regular min-h-[186px] cursor-text border-none px-[16px] py-[12px] text-sm leading-7 text-neutral-500 outline-none [&>div[contenteditable]]:focus:border-none [&>div[contenteditable]]:focus:shadow-none [&>div[contenteditable]]:focus:ring-0 [&>div[contenteditable]]:focus:outline-none'
      />
    </div>
  );
};

export default TextEditor;
