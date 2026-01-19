"use client";

import { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  className = "",
}: MarkdownEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!editorRef.current || isInitialized) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        history(),
        syntaxHighlighting(defaultHighlightStyle),
        markdown({ codeLanguages: languages }),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            onChange(newValue);
          }
        }),
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
          },
          ".cm-scroller": {
            fontFamily: "'SF Mono', 'Monaco', 'Consolas', monospace",
            overflow: "auto",
          },
          ".cm-content": {
            padding: "16px 0",
          },
          ".cm-line": {
            padding: "0 16px",
          },
          "&.cm-focused": {
            outline: "none",
          },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;
    setIsInitialized(true);

    return () => {
      view.destroy();
      viewRef.current = null;
      setIsInitialized(false);
    };
  }, []);

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (viewRef.current && isInitialized) {
      const currentValue = viewRef.current.state.doc.toString();
      if (currentValue !== value) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentValue.length,
            insert: value,
          },
        });
      }
    }
  }, [value, isInitialized]);

  return (
    <div
      ref={editorRef}
      className={`h-full overflow-hidden bg-white dark:bg-zinc-900 ${className}`}
    />
  );
}




