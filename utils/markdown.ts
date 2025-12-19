// Markdown utility functions

export function extractHeadings(markdown: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level, text, id });
  }

  return headings;
}

export function countWords(markdown: string): number {
  // Remove code blocks
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, "");
  // Remove inline code
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]+`/g, "");
  // Remove markdown syntax
  const withoutMarkdown = withoutInlineCode
    .replace(/[#*_~\[\]()]/g, "")
    .trim();
  // Count words
  return withoutMarkdown.split(/\s+/).filter((word) => word.length > 0).length;
}

export function insertAtCursor(
  content: string,
  cursorPos: number,
  textToInsert: string
): { newContent: string; newCursorPos: number } {
  const before = content.slice(0, cursorPos);
  const after = content.slice(cursorPos);
  const newContent = before + textToInsert + after;
  const newCursorPos = cursorPos + textToInsert.length;
  return { newContent, newCursorPos };
}

