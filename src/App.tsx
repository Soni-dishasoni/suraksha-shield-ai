
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import URLAnalysis from "./pages/URLAnalysis";
import SignIn from "./pages/SignIn";
import EmailFiltering from "./pages/EmailFiltering";
import SMSAnalysis from "./pages/SMSAnalysis";
import Leaderboard from "./pages/Leaderboard";
import Badges from "./pages/Badges";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import ChatBot from "./components/chatbot/ChatBot";

const App = () => {
  // Create a client inside the component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/url-analysis" element={<URLAnalysis />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/email-filtering" element={<EmailFiltering />} />
            <Route path="/sms-analysis" element={<SMSAnalysis />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
