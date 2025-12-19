export type EditorMode = "edit" | "view" | "split";

export type WidgetType = "code" | "mermaid" | "callout" | "table";

export interface Widget {
  type: WidgetType;
  content: string;
  props?: Record<string, unknown>;
}

export interface CodeBlockProps {
  language: string;
  value: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
}

export interface DocumentState {
  content: string;
  title: string;
  lastSaved?: Date;
  isDirty: boolean;
}

export interface ThemeMode {
  mode: "light" | "dark";
}

