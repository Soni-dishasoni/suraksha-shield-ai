
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/Icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// Simple mock auth function to replace next-auth
const mockSignIn = (provider: string, options: { callbackUrl: string }) => {
  return new Promise((resolve) => {
    // Simulate authentication delay
    setTimeout(() => {
      console.log(`Mock sign-in with ${provider}, redirect to: ${options.callbackUrl}`);
      resolve({ success: true });
    }, 1000);
  });
};

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const handleGoogleSignIn = () => {
    mockSignIn("google", { callbackUrl })
      .then(() => {
        toast({
          title: "Success",
          description: "Successfully signed in with Google"
        });
        navigate(callbackUrl);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        });
      });
  };

  const handleGithubSignIn = () => {
    mockSignIn("github", { callbackUrl })
      .then(() => {
        toast({
          title: "Success",
          description: "Successfully signed in with GitHub"
        });
        navigate(callbackUrl);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        });
      });
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-center">Sign In</h1>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to access your account
            </p>
          </div>
          <div className="grid gap-6">
            <Button onClick={handleGoogleSignIn}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button onClick={handleGithubSignIn}>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
