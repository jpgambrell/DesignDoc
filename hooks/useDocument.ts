"use client";

import { useState, useEffect, useCallback } from "react";
import { DocumentState } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_CONTENT = `# Design Document

## Overview

Write your project design documentation here.

## Architecture

\`\`\`mermaid
flowchart TD
    A[Client] --> B[API Gateway]
    B --> C[Service 1]
    B --> D[Service 2]
\`\`\`

## Code Example

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Notes

:::info
This is an informational callout.
:::
`;

export function useDocument() {
  const [content, setContent] = useLocalStorage<string>(
    "document-content",
    DEFAULT_CONTENT
  );
  const [title, setTitle] = useLocalStorage<string>(
    "document-title",
    "Untitled Document"
  );
  const [lastSaved, setLastSaved] = useState<Date | undefined>(undefined);
  const [isDirty, setIsDirty] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (isDirty) {
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setIsDirty(false);
      }, 1000); // Auto-save after 1 second of no changes

      return () => clearTimeout(timer);
    }
  }, [content, isDirty]);

  const updateContent = useCallback(
    (newContent: string) => {
      setContent(newContent);
      setIsDirty(true);
    },
    [setContent]
  );

  const updateTitle = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
      setIsDirty(true);
    },
    [setTitle]
  );

  const exportMarkdown = useCallback(() => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content, title]);

  const importMarkdown = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          updateContent(text);
          setTitle(file.name.replace(/\.md$/, ""));
        }
      };
      reader.readAsText(file);
    },
    [updateContent, setTitle]
  );

  return {
    content,
    title,
    lastSaved,
    isDirty,
    updateContent,
    updateTitle,
    exportMarkdown,
    importMarkdown,
  };
}




