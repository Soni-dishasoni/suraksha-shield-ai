
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-suraksha-500" />
              <span className="ml-2 text-lg font-bold text-foreground">
                Suraksha<span className="text-suraksha-500">AI</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Protecting you from online threats with advanced AI-powered detection technologies.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-suraksha-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-suraksha-500">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-suraksha-500">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-suraksha-500">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Detection Tools
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/url-analysis" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  URL Analysis
                </Link>
              </li>
              <li>
                <Link to="/email-filtering" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Email Filtering
                </Link>
              </li>
              <li>
                <Link to="/sms-analysis" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  SMS Analysis
                </Link>
              </li>
              <li>
                <Link to="/phone-check" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Phone Number Check
                </Link>
              </li>
              <li>
                <Link to="/call-transcript" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Call Transcript Analysis
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/education" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Cybersecurity Education
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Security Quiz
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-suraksha-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} SurakshaAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
