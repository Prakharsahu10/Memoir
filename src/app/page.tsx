import { getUser } from "@/auth/server";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/AppSidebar";
import Link from "next/link";
import NoteEditor from "@/components/NoteEditor";

async function HomePage() {
  const user = await getUser();

  return (
    <div className="relative flex h-[calc(100vh-6rem)] w-full overflow-hidden">
      <AppSidebar />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        {user ? (
          <NoteEditor />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="bg-card max-w-lg space-y-6 rounded-lg p-8 shadow-lg">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to Memoir
              </h1>
              <p className="text-muted-foreground">
                Your personal note-taking app with AI capabilities. Sign in to
                start creating and managing your notes.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
