import Link from "next/link";
import Image from "next/image";
import { shadow } from "@/styles/utils";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const user = null;
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link className="flex items-center gap-2" href="/">
        <Image
          src="/memoir.png"
          height={60}
          width={60}
          alt="Memoir Logo"
          className="rounded-full"
          priority
        />
      </Link>

      <div className="flex gap-4">
        {" "}
        {user ? (
          "Logout"
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
