"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  theme?: "light" | "dark";
}

export function MermaidDiagram({ chart, theme = "light" }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function renderDiagram() {
      try {
        // Dynamic import to avoid SSR issues
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "neutral",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
          },
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (mounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setSvg("");
        }
      }
    }

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [chart, theme]);

  if (error) {
    return (
      <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-800 dark:text-red-200 text-sm font-semibold">
          Mermaid Diagram Error:
        </p>
        <pre className="mt-2 text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap">
          {error}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-4 p-8 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">Rendering diagram...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-4 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}




