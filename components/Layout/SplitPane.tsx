"use client";

import { useState, useRef, useEffect } from "react";

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialSplitPosition?: number; // percentage
}

export function SplitPane({
  left,
  right,
  initialSplitPosition = 50,
}: SplitPaneProps) {
  const [splitPosition, setSplitPosition] = useState(initialSplitPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setSplitPosition(Math.min(Math.max(newPosition, 20), 80));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div ref={containerRef} className="flex h-full relative">
      <div
        className="overflow-auto"
        style={{ width: `${splitPosition}%` }}
      >
        {left}
      </div>

      <div
        className="w-1 bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-500 cursor-col-resize relative"
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
      </div>

      <div
        className="overflow-auto"
        style={{ width: `${100 - splitPosition}%` }}
      >
        {right}
      </div>
    </div>
  );
}




