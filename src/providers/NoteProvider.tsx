"use client";

import { createContext, useState, useContext } from "react";

type NoteProviderContextType = {
  noteText: string;
  setNoteText: (noteText: string) => void;
};

export const NoteProviderContext = createContext<NoteProviderContextType>({
  noteText: "",
  setNoteText: () => {},
});

export function useNote() {
  const context = useContext(NoteProviderContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
}

export default function NoteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [noteText, setNoteText] = useState("");

  return (
    <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </NoteProviderContext.Provider>
  );
}
