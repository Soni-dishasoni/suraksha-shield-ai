
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Shield, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Shield className="h-24 w-24 text-muted" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-suraksha-500" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! We couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild className="bg-suraksha-500 hover:bg-suraksha-600">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
