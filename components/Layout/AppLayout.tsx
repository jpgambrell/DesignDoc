"use client";

import { useState } from "react";
import { EditorMode } from "@/types";
import { useDocument } from "@/hooks/useDocument";
import { useTheme } from "@/hooks/useTheme";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SplitPane } from "./SplitPane";
import { MarkdownEditor } from "../Editor/MarkdownEditor";
import { EditorToolbar } from "../Editor/EditorToolbar";
import { MarkdownPreview } from "../Preview/MarkdownPreview";

export function AppLayout() {
  const [mode, setMode] = useLocalStorage<EditorMode>("editor-mode", "split");
  const { theme, toggleTheme } = useTheme();
  const {
    content,
    title,
    lastSaved,
    isDirty,
    updateContent,
    updateTitle,
    exportMarkdown,
    importMarkdown,
  } = useDocument();

  const handleInsert = (text: string) => {
    // Simple insertion at the end for now
    // In a full implementation, this would insert at cursor position
    updateContent(content + text);
  };

  const renderContent = () => {
    switch (mode) {
      case "edit":
        return (
          <div className="flex flex-col h-full">
            <EditorToolbar onInsert={handleInsert} />
            <div className="flex-1 overflow-hidden">
              <MarkdownEditor value={content} onChange={updateContent} />
            </div>
          </div>
        );

      case "view":
        return (
          <div className="h-full overflow-auto bg-white dark:bg-zinc-900">
            <MarkdownPreview content={content} theme={theme} />
          </div>
        );

      case "split":
        return (
          <SplitPane
            left={
              <div className="flex flex-col h-full">
                <EditorToolbar onInsert={handleInsert} />
                <div className="flex-1 overflow-hidden">
                  <MarkdownEditor value={content} onChange={updateContent} />
                </div>
              </div>
            }
            right={
              <div className="h-full overflow-auto bg-white dark:bg-zinc-900">
                <MarkdownPreview content={content} theme={theme} />
              </div>
            }
          />
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <Header
        mode={mode}
        onModeChange={setMode}
        theme={theme}
        onThemeToggle={toggleTheme}
        title={title}
        onTitleChange={updateTitle}
        onExport={exportMarkdown}
        onImport={importMarkdown}
        lastSaved={lastSaved}
        isDirty={isDirty}
      />

      <main className="flex-1 overflow-hidden">{renderContent()}</main>

      <Footer content={content} />
    </div>
  );
}

