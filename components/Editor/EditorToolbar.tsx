"use client";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Link,
  Image,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";

interface EditorToolbarProps {
  onInsert: (text: string) => void;
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
  const buttons = [
    {
      icon: Heading1,
      label: "Heading 1",
      insert: "# ",
    },
    {
      icon: Heading2,
      label: "Heading 2",
      insert: "## ",
    },
    {
      icon: Bold,
      label: "Bold",
      insert: "****",
      cursorOffset: -2,
    },
    {
      icon: Italic,
      label: "Italic",
      insert: "**",
      cursorOffset: -1,
    },
    {
      icon: List,
      label: "Bullet List",
      insert: "- ",
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      insert: "1. ",
    },
    {
      icon: Quote,
      label: "Quote",
      insert: "> ",
    },
    {
      icon: Code,
      label: "Code Block",
      insert: "```\n\n```",
      cursorOffset: -4,
    },
    {
      icon: Link,
      label: "Link",
      insert: "[]()",
      cursorOffset: -3,
    },
    {
      icon: Image,
      label: "Image",
      insert: "![]()",
      cursorOffset: -3,
    },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
      {buttons.map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.label}
            onClick={() => onInsert(button.insert)}
            className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            title={button.label}
            type="button"
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}

