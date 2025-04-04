
// This file simulates API interactions for security tips and threats

// Types
export interface SecurityTip {
  id: string;
  title: string;
  description: string;
  category: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

export interface ThreatUpdate {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  source: string;
}

// Simulated security tips data
const securityTips: SecurityTip[] = [
  {
    id: "tip-1",
    title: "Use Strong Passwords",
    description: "Create passwords with at least 12 characters using a mix of letters, numbers, and symbols. Avoid using personal information.",
    category: "password-security",
    difficultyLevel: "beginner",
    points: 5
  },
  {
    id: "tip-2",
    title: "Enable Two-Factor Authentication",
    description: "Add an extra layer of security to your accounts by enabling 2FA wherever available.",
    category: "account-security",
    difficultyLevel: "beginner",
    points: 5
  },
  {
    id: "tip-3",
    title: "Keep Software Updated",
    description: "Regularly update your operating system, applications, and antivirus software to protect against known vulnerabilities.",
    category: "device-security",
    difficultyLevel: "beginner",
    points: 5
  },
  {
    id: "tip-4",
    title: "Recognize Phishing Attempts",
    description: "Be cautious of unexpected emails, check sender addresses, and avoid clicking suspicious links.",
    category: "phishing-awareness",
    difficultyLevel: "intermediate",
    points: 10
  },
  {
    id: "tip-5",
    title: "Use a Password Manager",
    description: "Employ a reputable password manager to generate and store complex passwords securely.",
    category: "password-security",
    difficultyLevel: "intermediate",
    points: 10
  },
  {
    id: "tip-6",
    title: "Secure Your Home Network",
    description: "Change default router passwords, enable WPA3 encryption, and use a guest network for visitors.",
    category: "network-security",
    difficultyLevel: "intermediate",
    points: 10
  },
  {
    id: "tip-7",
    title: "Implement Network Segmentation",
    description: "Separate critical systems from general-purpose networks to contain potential breaches.",
    category: "network-security",
    difficultyLevel: "advanced",
    points: 15
  },
  {
    id: "tip-8",
    title: "Use VPN for Public Wi-Fi",
    description: "Protect your data when using public networks by employing a reliable VPN service.",
    category: "network-security",
    difficultyLevel: "intermediate",
    points: 10
  },
  {
    id: "tip-9",
    title: "Conduct Regular Security Audits",
    description: "Periodically review your security measures and permissions across all systems and applications.",
    category: "best-practices",
    difficultyLevel: "advanced",
    points: 15
  },
  {
    id: "tip-10",
    title: "Create Data Backups",
    description: "Follow the 3-2-1 backup rule: 3 copies, 2 different media types, and 1 offsite backup.",
    category: "data-security",
    difficultyLevel: "intermediate",
    points: 10
  }
];

// Simulated threat updates data
const threatUpdates: ThreatUpdate[] = [
  {
    id: "threat-1",
    title: "New Banking Trojan Campaign",
    description: "A new wave of banking trojans is spreading via fake invoice emails targeting financial institutions and their customers.",
    severity: "high",
    date: "2025-04-01",
    source: "Suraksha Threat Intelligence"
  },
  {
    id: "threat-2",
    title: "Critical Vulnerability in Popular Browser",
    description: "A zero-day vulnerability has been discovered affecting Chrome browsers. Update immediately to the latest version.",
    severity: "critical",
    date: "2025-03-28",
    source: "Browser Vendor Security Advisory"
  },
  {
    id: "threat-3",
    title: "Phishing Campaign Targeting Cloud Services",
    description: "Sophisticated phishing emails mimicking major cloud service providers are attempting to steal login credentials.",
    severity: "high",
    date: "2025-03-25",
    source: "Suraksha Phishing Detection"
  },
  {
    id: "threat-4",
    title: "New QR Code Scam Technique",
    description: "Scammers are placing malicious QR codes in public places that direct users to credential-stealing websites.",
    severity: "medium",
    date: "2025-03-22",
    source: "Suraksha Mobile Security Team"
  },
  {
    id: "threat-5",
    title: "SMS Smishing Campaign",
    description: "A new SMS phishing campaign is impersonating delivery services to trick users into providing payment information.",
    severity: "medium",
    date: "2025-03-20",
    source: "Telecom Security Alliance"
  }
];

// Simulated API functions
export const getSecurityTips = async (): Promise<SecurityTip[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return securityTips;
};

export const getSecurityTipsByCategory = async (category: string): Promise<SecurityTip[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return securityTips.filter(tip => tip.category === category);
};

export const getLatestThreats = async (): Promise<ThreatUpdate[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return threatUpdates;
};

export const submitSecurityFeedback = async (feedback: { email: string, message: string }): Promise<{ success: boolean }> => {
  // Simulate API delay and success
  await new Promise(resolve => setTimeout(resolve, 800));
  return { success: true };
};
