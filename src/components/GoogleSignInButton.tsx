import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const { toast } = useToast();

  const loginWithGoogle = () => {
    toast({
      title: "error",
      description:
        "Sign in with google is yet to implement on this application",
      variant: "destructive",
    });
  };
  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
