"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";
import { Callout } from "./Callout";

interface MarkdownPreviewProps {
  content: string;
  theme?: "light" | "dark";
  className?: string;
}

export function MarkdownPreview({
  content,
  theme = "light",
  className = "",
}: MarkdownPreviewProps) {
  // Process content to handle callouts (:::type syntax)
  const processedContent = content.replace(
    /:::(\w+)\n([\s\S]*?)\n:::/g,
    (_, type, content) => {
      return `<div data-callout="${type}">${content}</div>`;
    }
  );

  return (
    <div
      className={`prose prose-zinc dark:prose-invert max-w-none p-8 ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const value = String(children).replace(/\n$/, "");
            const language = match ? match[1] : "";

            // Handle Mermaid diagrams
            if (language === "mermaid") {
              return <MermaidDiagram chart={value} theme={theme} />;
            }

            // Handle code blocks
            if (!inline && language) {
              return (
                <CodeBlock
                  language={language}
                  value={value}
                  theme={theme}
                  {...props}
                />
              );
            }

            // Handle inline code
            return <CodeBlock language="" value={value} inline />;
          },
          div({ node, children, ...props }) {
            const calloutType = (props as any)["data-callout"];
            if (calloutType) {
              return <Callout type={calloutType}>{children}</Callout>;
            }
            return <div {...props}>{children}</div>;
          },
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-5 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold mt-4 mb-2">{children}</h4>
          ),
          p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 pl-4 border-l-4 border-zinc-300 dark:border-zinc-600 italic text-zinc-600 dark:text-zinc-400">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">
              {children}
            </td>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

