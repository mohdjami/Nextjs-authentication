import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signIn("google");
      console.log("result from signin = ", result);
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
