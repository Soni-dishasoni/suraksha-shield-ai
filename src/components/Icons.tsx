
import React from "react";
import { LucideProps } from "lucide-react";
import { Github, Mail, RefreshCcw } from "lucide-react";

// Custom Google icon
const GoogleIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8 2.175 0 4.15.87 5.587 2.292l-2.475 2.475C13.936 8.855 12.983 8.56 12 8.56c-1.898 0-3.44 1.542-3.44 3.44s1.542 3.44 3.44 3.44c1.739 0 3.171-1.296 3.392-2.96h-3.392v-2.64h6.359c.18.906.28 1.84.28 2.8 0 4.418-3.582 8-8 8z"
    ></path>
  </svg>
);

export const Icons = {
  gitHub: Github,
  google: GoogleIcon,
  mail: Mail,
  spinner: RefreshCcw,
};
