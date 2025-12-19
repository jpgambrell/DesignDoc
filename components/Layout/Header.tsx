"use client";

import { EditorMode } from "@/types";
import { ModeToggle } from "./ModeToggle";
import {
  Download,
  Upload,
  Sun,
  Moon,
  Save,
  FileText,
} from "lucide-react";

interface HeaderProps {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  title: string;
  onTitleChange: (title: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  lastSaved?: Date;
  isDirty: boolean;
}

export function Header({
  mode,
  onModeChange,
  theme,
  onThemeToggle,
  title,
  onTitleChange,
  onExport,
  onImport,
  lastSaved,
  isDirty,
}: HeaderProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Title */}
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            placeholder="Document Title"
          />
          {isDirty && (
            <span className="text-xs text-zinc-500" title="Unsaved changes">
              •
            </span>
          )}
          {lastSaved && !isDirty && (
            <span className="text-xs text-zinc-500">
              Saved {new Date(lastSaved).toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Center: Mode Toggle */}
        <ModeToggle mode={mode} onChange={onModeChange} />

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <label
            className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            title="Import Markdown"
          >
            <Upload className="w-5 h-5" />
            <input
              type="file"
              accept=".md,.markdown"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>

          <button
            onClick={onExport}
            className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Export Markdown"
            type="button"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={onThemeToggle}
            className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            type="button"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

