"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import NoteTextInput from "./NoteTextInput";
import AskAIButton from "./AskAIButton";
import { updateNoteAction } from "@/actions/notes";
import { useToast } from "@/hooks/useToast";
import useNote from "@/hooks/useNote";

export default function NoteEditor() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("noteId");
  const { noteText } = useNote();
  const { toast } = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedText, setLastSavedText] = useState("");

  useEffect(() => {
    if (noteText !== lastSavedText) {
      const timer = setTimeout(async () => {
        if (noteId && noteText !== lastSavedText) {
          setIsSaving(true);
          const { errorMessage } = await updateNoteAction(noteId, noteText);
          setIsSaving(false);

          if (errorMessage) {
            toast({
              title: "Error saving note",
              description: errorMessage,
              variant: "destructive",
            });
          } else {
            setLastSavedText(noteText);
          }
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [noteText, lastSavedText, noteId, toast]);

  if (!noteId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">
          Select or create a note to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Note Editor</h1>
        <div className="flex items-center gap-2">
          {isSaving ? (
            <Button variant="ghost" size="sm" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </Button>
          ) : noteText !== lastSavedText ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                setIsSaving(true);
                const { errorMessage } = await updateNoteAction(
                  noteId,
                  noteText,
                );
                setIsSaving(false);

                if (errorMessage) {
                  toast({
                    title: "Error saving note",
                    description: errorMessage,
                    variant: "destructive",
                  });
                } else {
                  setLastSavedText(noteText);
                  toast({
                    title: "Note saved",
                    description: "Your note has been saved successfully",
                  });
                }
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          ) : null}
          <AskAIButton />
        </div>
      </div>

      <div className="bg-card relative flex-1 overflow-auto rounded-lg border p-4 shadow-sm">
        <NoteTextInput />
      </div>
    </div>
  );
}
