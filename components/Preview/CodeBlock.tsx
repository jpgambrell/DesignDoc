"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  language: string;
  value: string;
  inline?: boolean;
  filename?: string;
  theme?: "light" | "dark";
}

export function CodeBlock({
  language,
  value,
  inline = false,
  filename,
  theme = "light",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono text-zinc-800 dark:text-zinc-200">
        {value}
      </code>
    );
  }

  return (
    <div className="relative group my-4">
      {filename && (
        <div className="px-4 py-2 bg-zinc-700 dark:bg-zinc-800 text-zinc-200 text-sm font-mono rounded-t-lg border-b border-zinc-600">
          {filename}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Copy code"
          type="button"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        <SyntaxHighlighter
          language={language}
          style={theme === "dark" ? oneDark : oneLight}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            borderRadius: filename ? "0 0 0.5rem 0.5rem" : "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

