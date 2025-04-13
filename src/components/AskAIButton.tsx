"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, SendHorizontal } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import { useToast } from "@/hooks/useToast";

export default function AskAIButton() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [newQuestions, setNewQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;

    setAsking(true);
    setNewQuestions([...newQuestions, question]);

    try {
      const response = await askAIAboutNotesAction(
        [...newQuestions, question],
        responses,
      );

      setResponses([...responses, response]);
      setQuestion("");
    } catch {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAsking(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bot className="mr-2 h-4 w-4" />
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ask AI about your notes</DialogTitle>
        </DialogHeader>

        <div className="bg-muted/20 my-4 max-h-[400px] overflow-y-auto rounded-md border p-4">
          {newQuestions.length === 0 ? (
            <p className="text-muted-foreground text-center text-sm">
              Ask a question about your notes
            </p>
          ) : (
            <div className="space-y-4">
              {newQuestions.map((q, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-primary rounded-full p-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground h-3 w-3"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-sm">{q}</div>
                  </div>

                  {responses[i] && (
                    <div className="flex items-start gap-2">
                      <div className="bg-primary rounded-full p-1.5">
                        <Bot className="text-primary-foreground h-3 w-3" />
                      </div>
                      <div
                        className="bg-muted rounded-lg p-3 text-sm"
                        dangerouslySetInnerHTML={{ __html: responses[i] }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {asking && (
                <div className="flex items-center justify-center">
                  <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something about your notes..."
              disabled={asking}
              className="flex-1"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!question.trim() || asking}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
