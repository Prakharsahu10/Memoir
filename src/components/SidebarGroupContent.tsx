"use client";

import { SidebarMenuItem } from "./ui/sidebar";
import NewNoteButton from "./NewNoteButton";
import SelectNoteButton from "./SelectNoteButton";
import { User } from "@supabase/supabase-js";

type NoteType = {
  id: string;
  text: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

type SidebarGroupContentProps = {
  notes: NoteType[];
  user: User | null;
};

function SidebarGroupContent({ notes, user }: SidebarGroupContentProps) {
  return (
    <div className="space-y-1">
      <NewNoteButton user={user} />
      {notes.map((note: NoteType) => (
        <SidebarMenuItem key={note.id}>
          <SelectNoteButton note={note} />
        </SidebarMenuItem>
      ))}
    </div>
  );
}

export default SidebarGroupContent;
