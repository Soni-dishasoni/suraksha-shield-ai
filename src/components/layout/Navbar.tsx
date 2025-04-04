
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Bell, User, Award, BookOpen, MessageSquare, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-suraksha-500" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Suraksha<span className="text-suraksha-500">AI</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActiveRoute('/') 
                    ? 'text-suraksha-500 bg-suraksha-50' 
                    : 'text-foreground hover:text-suraksha-500'
                }`}>
                Home
              </Link>
              <Link 
                to="/url-analysis" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActiveRoute('/url-analysis') 
                    ? 'text-suraksha-500 bg-suraksha-50' 
                    : 'text-foreground hover:text-suraksha-500'
                }`}>
                URL Analysis
              </Link>
              <Link 
                to="/email-filtering" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActiveRoute('/email-filtering') 
                    ? 'text-suraksha-500 bg-suraksha-50' 
                    : 'text-foreground hover:text-suraksha-500'
                }`}>
                <Mail className="h-4 w-4 inline mr-1" />
                Email Filter
              </Link>
              <Link 
                to="/sms-analysis" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActiveRoute('/sms-analysis') 
                    ? 'text-suraksha-500 bg-suraksha-50' 
                    : 'text-foreground hover:text-suraksha-500'
                }`}>
                <MessageSquare className="h-4 w-4 inline mr-1" />
                SMS Analysis
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="inline-flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Rewards
                    <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem asChild>
                    <Link to="/leaderboard" className="w-full cursor-pointer">Leaderboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/badges" className="w-full cursor-pointer">Badges</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link 
                to="/quiz" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActiveRoute('/quiz') 
                    ? 'text-suraksha-500 bg-suraksha-50' 
                    : 'text-foreground hover:text-suraksha-500'
                }`}>
                <BookOpen className="h-4 w-4 inline mr-1" />
                Quiz
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <span className="font-medium">Notifications</span>
                  <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                </div>
                <div className="py-2 px-4 border-b">
                  <div className="flex items-start gap-3 mb-2">
                    <Award className="h-5 w-5 text-amber-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">New Badge Earned!</p>
                      <p className="text-xs text-muted-foreground">You've earned the "Security Scholar" badge.</p>
                      <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-suraksha-500 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Points Awarded</p>
                      <p className="text-xs text-muted-foreground">+20 points for analyzing suspicious URL.</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuItem asChild className="justify-center">
                  <Link to="/notifications" className="w-full text-center cursor-pointer font-medium">View all notifications</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 border">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-3 p-3 border-b">
                  <div className="rounded-full bg-suraksha-100 h-10 w-10 flex items-center justify-center">
                    <User className="h-5 w-5 text-suraksha-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Guest User</p>
                    <p className="text-xs text-muted-foreground">guest@example.com</p>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/badges" className="cursor-pointer">My Badges</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">Settings</Link>
                </DropdownMenuItem>
                <div className="border-t my-1"></div>
                <DropdownMenuItem asChild>
                  <Link to="/sign-in" className="cursor-pointer text-red-500 hover:text-red-600">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background shadow-lg">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            Home
          </Link>
          <Link to="/url-analysis" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            URL Analysis
          </Link>
          <Link to="/email-filtering" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            <Mail className="h-4 w-4 inline mr-2" /> Email Filter
          </Link>
          <Link to="/sms-analysis" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            <MessageSquare className="h-4 w-4 inline mr-2" /> SMS Analysis
          </Link>
          <Link to="/leaderboard" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            <Award className="h-4 w-4 inline mr-2" /> Leaderboard
          </Link>
          <Link to="/badges" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            <Award className="h-4 w-4 inline mr-2" /> Badges
          </Link>
          <Link to="/quiz" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            <BookOpen className="h-4 w-4 inline mr-2" /> Quiz
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <Button variant="outline" className="w-full mb-2">
              Sign In
            </Button>
            <Button className="w-full bg-suraksha-500 hover:bg-suraksha-600">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
