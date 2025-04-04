
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              <Link to="/" className="text-foreground hover:text-suraksha-500 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/url-analysis" className="text-foreground hover:text-suraksha-500 px-3 py-2 rounded-md text-sm font-medium">
                URL Analysis
              </Link>
              <Link to="/email-filtering" className="text-foreground hover:text-suraksha-500 px-3 py-2 rounded-md text-sm font-medium">
                Email Filter
              </Link>
              <Link to="/sms-analysis" className="text-foreground hover:text-suraksha-500 px-3 py-2 rounded-md text-sm font-medium">
                SMS Analysis
              </Link>
              <Link to="/phone-check" className="text-foreground hover:text-suraksha-500 px-3 py-2 rounded-md text-sm font-medium">
                Phone Check
              </Link>
              <Link to="/education" className="text-foreground hover:text-suraksha-500 px-3 py-2 rounded-md text-sm font-medium">
                Learn
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="hidden md:block">
              Sign In
            </Button>
            <Button className="hidden md:block bg-suraksha-500 hover:bg-suraksha-600">
              Sign Up
            </Button>
            
            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-suraksha-500 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
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
            Email Filter
          </Link>
          <Link to="/sms-analysis" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            SMS Analysis
          </Link>
          <Link to="/phone-check" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            Phone Check
          </Link>
          <Link to="/education" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-suraksha-50 hover:text-suraksha-500">
            Learn
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
