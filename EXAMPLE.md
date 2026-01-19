# Example Design Document

## Project Overview

This document demonstrates all the features available in the Design Document Editor. You can use this as a template for your own design documents.

## System Architecture

Here's a high-level architecture diagram using Mermaid:

```mermaid
flowchart TD
    A[Client Browser] --> B[Next.js Frontend]
    B --> C[CodeMirror Editor]
    B --> D[React Markdown Preview]
    D --> E[Mermaid Renderer]
    D --> F[Syntax Highlighter]
    B --> G[Local Storage]
```

## Component Structure

```mermaid
classDiagram
    class AppLayout {
        +EditorMode mode
        +useDocument() hook
        +useTheme() hook
        +render()
    }
    class MarkdownEditor {
        +string value
        +onChange(value)
        +CodeMirror view
    }
    class MarkdownPreview {
        +string content
        +theme string
        +render()
    }
    AppLayout --> MarkdownEditor
    AppLayout --> MarkdownPreview
    MarkdownPreview --> CodeBlock
    MarkdownPreview --> MermaidDiagram
```

## Technical Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 16.1.0 |
| React | React | 19.2.3 |
| Editor | CodeMirror | 6.x |
| Styling | Tailwind CSS | 4.x |
| Diagrams | Mermaid.js | Latest |

## Code Examples

### TypeScript Example

Here's how we implement the document hook:

```typescript
export function useDocument() {
  const [content, setContent] = useLocalStorage<string>(
    "document-content",
    DEFAULT_CONTENT
  );
  
  const updateContent = useCallback(
    (newContent: string) => {
      setContent(newContent);
      setIsDirty(true);
    },
    [setContent]
  );

  return {
    content,
    updateContent,
    exportMarkdown,
    importMarkdown,
  };
}
```

### React Component Example

```jsx
export function CodeBlock({ language, value, theme }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button onClick={handleCopy}>
        {copied ? <Check /> : <Copy />}
      </button>
      <SyntaxHighlighter language={language} style={theme}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
```

### Python Example

```python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    a, b = 0, 1
    result = []
    
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    
    return result

# Example usage
print(fibonacci(10))
```

## User Flow

```mermaid
sequenceDiagram
    participant User
    participant Editor
    participant Preview
    participant Storage

    User->>Editor: Type markdown
    Editor->>Preview: Update content
    Preview->>Preview: Render markdown
    Editor->>Storage: Auto-save (1s debounce)
    User->>Editor: Click Export
    Editor->>Storage: Generate .md file
    Storage->>User: Download file
```

## State Management

```mermaid
stateDiagram-v2
    [*] --> Edit
    Edit --> View: Toggle Mode
    View --> Split: Toggle Mode
    Split --> Edit: Toggle Mode
    View --> [*]: Export
    Edit --> [*]: Export
    Split --> [*]: Export
    
    Edit: Edit Mode
    View: View Mode
    Split: Split Mode
```

## Feature Callouts

:::info
**Auto-save Feature**: The editor automatically saves your work to localStorage every second after you stop typing. This ensures you never lose your work!
:::

:::tip
**Keyboard Shortcuts**: Use the toolbar buttons for quick access to common markdown formatting. More keyboard shortcuts coming soon!
:::

:::warning
**Large Documents**: For documents over 10,000 words, performance may be impacted. Consider breaking them into smaller files.
:::

:::error
**Browser Compatibility**: This editor requires a modern browser with ES6+ support. Internet Explorer is not supported.
:::

## Data Flow

```mermaid
graph LR
    A[User Input] --> B{Mode?}
    B -->|Edit| C[CodeMirror]
    B -->|View| D[React Markdown]
    B -->|Split| E[Both]
    C --> F[State Update]
    D --> F
    E --> F
    F --> G[Local Storage]
    F --> H[Re-render]
```

## Deployment Process

```mermaid
gantt
    title Deployment Timeline
    dateFormat  YYYY-MM-DD
    section Development
    Setup & Dependencies    :2024-01-01, 1d
    Core Editor            :2024-01-02, 3d
    Preview System         :2024-01-05, 2d
    Diagrams & Syntax      :2024-01-07, 3d
    section Testing
    Component Tests        :2024-01-10, 2d
    Integration Tests      :2024-01-12, 1d
    section Deployment
    Production Build       :2024-01-13, 1d
    Deploy to Vercel       :2024-01-14, 1d
```

## API Documentation

### Document Hook API

```typescript
interface UseDocumentReturn {
  content: string;
  title: string;
  lastSaved?: Date;
  isDirty: boolean;
  updateContent: (content: string) => void;
  updateTitle: (title: string) => void;
  exportMarkdown: () => void;
  importMarkdown: (file: File) => void;
}
```

### Theme Hook API

```typescript
interface UseThemeReturn {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}
```

## Performance Considerations

1. **Code Splitting**: Next.js automatically splits code at the page level
2. **Lazy Loading**: Mermaid is dynamically imported to reduce initial bundle size
3. **Memoization**: Preview components use React.memo to prevent unnecessary re-renders
4. **Debouncing**: Auto-save is debounced to reduce localStorage writes

## Security

- All user input is sanitized through `rehype-sanitize`
- Mermaid's `securityLevel` is set to "loose" (consider "strict" for production)
- No external API calls except for optional PlantUML (removed in current version)
- All data stored locally in browser

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast mode compatible
- Screen reader friendly

## Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| IE 11 | - | ❌ Not Supported |

## Conclusion

This design document editor provides a powerful, modern interface for creating technical documentation with rich formatting, code examples, and diagrams. It's built with performance, usability, and extensibility in mind.

---

**Last Updated**: December 19, 2025  
**Version**: 1.0.0  
**Author**: Design Doc Team




