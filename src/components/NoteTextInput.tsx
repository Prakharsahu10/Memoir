"use client";

import { useRef, useEffect } from "react";
import useNote from "@/hooks/useNote";

export default function NoteTextInput() {
  const { noteText, setNoteText } = useNote();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [noteText]);

  return (
    <textarea
      ref={textareaRef}
      value={noteText}
      onChange={(e) => setNoteText(e.target.value)}
      className="min-h-[calc(100%-2rem)] w-full resize-none bg-transparent p-2 text-lg outline-none"
      placeholder="Start writing your note here..."
    />
  );
}
