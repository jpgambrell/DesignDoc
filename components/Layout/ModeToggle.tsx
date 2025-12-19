"use client";

import { EditorMode } from "@/types";
import { Edit, Eye, Columns } from "lucide-react";

interface ModeToggleProps {
  mode: EditorMode;
  onChange: (mode: EditorMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const modes: Array<{ value: EditorMode; icon: any; label: string }> = [
    { value: "edit", icon: Edit, label: "Edit" },
    { value: "view", icon: Eye, label: "View" },
    { value: "split", icon: Columns, label: "Split" },
  ];

  return (
    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
            mode === value
              ? "bg-white dark:bg-zinc-700 shadow-sm"
              : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
          }`}
          title={label}
          type="button"
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}

