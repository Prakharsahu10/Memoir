import { getUser } from "@/auth/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex h-16 w-full items-center border-b px-4 backdrop-blur-sm md:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />

          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src="/goatius.png"
                alt="Memoir Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="font-semibold tracking-tight">Memoir</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground hidden text-sm md:block">
                {user.email}
              </span>
              <LogOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:flex"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
