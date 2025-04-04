import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/Icons";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const SignIn = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: callbackUrl })
      .then((result) => {
        if (result?.error) {
          toast({
            title: "Error",
            description: "Failed to sign in with Google",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Successfully signed in with Google",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: callbackUrl })
      .then((result) => {
        if (result?.error) {
          toast({
            title: "Error",
            description: "Failed to sign in with GitHub",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Successfully signed in with GitHub",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
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
              {/* @ts-expect-error */}
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button onClick={handleGithubSignIn}>
              {/* @ts-expect-error */}
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
