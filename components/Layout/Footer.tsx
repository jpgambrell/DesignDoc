"use client";

import { countWords } from "@/utils/markdown";

interface FooterProps {
  content: string;
}

export function Footer({ content }: FooterProps) {
  const wordCount = countWords(content);
  const charCount = content.length;
  const lineCount = content.split("\n").length;

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-6 py-2">
      <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-4">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          <span>{lineCount} lines</span>
        </div>
        <div>
          <span>Design Document Editor • Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}




