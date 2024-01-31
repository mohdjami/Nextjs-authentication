import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "./UserAccountNav";
import { ModeToggle } from "./mode-toggle";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal className="dark:  text-black" />
        </Link>
        <ModeToggle />
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/sign-in"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
