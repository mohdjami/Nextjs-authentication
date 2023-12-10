// import User from "@/components/User";
import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h1 className="text-2xl">Home </h1>
      <Link className={buttonVariants()} href={"/admin"}>
        Open My Admin
      </Link>
      <h2>Client session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </div>
  );
}
