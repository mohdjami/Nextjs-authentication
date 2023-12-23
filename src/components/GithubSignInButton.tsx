import { FC, JSX, ReactNode, SVGProps, useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface GithubSignInButtonProps {
  children: ReactNode;
}

const GithubSignInButton: FC<GithubSignInButtonProps> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: "/admin" });
        setLoading(false);
      }}
      className="flex items-center space-x-2 w-full"
      variant="outline"
    >
      <GithubIcon className="h-4 w-4" />
      Sign in with GitHub
    </Button>
  );
};

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
export default GithubSignInButton;
