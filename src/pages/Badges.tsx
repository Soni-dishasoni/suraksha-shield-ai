
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, Award, Star, TrendingUp, Target, Eye, Link, Mail, MessageSquare, 
  Phone, BookOpen, AlertTriangle, CheckCircle, Zap, FileText, Clock
} from "lucide-react";

// Mock badges data
const badges = [
  {
    id: 1,
    name: "URL Guardian",
    icon: Link,
    color: "bg-blue-500",
    description: "Verify 10 suspicious URLs",
    progress: 70,
    earned: false,
    category: "Detection"
  },
  {
    id: 2,
    name: "Phishing Expert",
    icon: Mail,
    color: "bg-red-500",
    description: "Identify 5 phishing emails",
    progress: 100,
    earned: true,
    category: "Detection"
  },
  {
    id: 3,
    name: "SMS Shield",
    icon: MessageSquare,
    color: "bg-green-500",
    description: "Detect 15 spam SMS messages",
    progress: 60,
    earned: false,
    category: "Detection"
  },
  {
    id: 4,
    name: "Call Protector",
    icon: Phone,
    color: "bg-yellow-500",
    description: "Report 8 scam calls",
    progress: 25,
    earned: false,
    category: "Detection"
  },
  {
    id: 5,
    name: "Security Scholar",
    icon: BookOpen,
    color: "bg-purple-500",
    description: "Complete all beginner security quizzes",
    progress: 100,
    earned: true,
    category: "Learning"
  },
  {
    id: 6,
    name: "Vigilant Scout",
    icon: Eye,
    color: "bg-indigo-500",
    description: "Participate for 7 consecutive days",
    progress: 100,
    earned: true,
    category: "Engagement"
  },
  {
    id: 7,
    name: "Threat Hunter",
    icon: Target,
    color: "bg-orange-500",
    description: "Find a previously undetected threat",
    progress: 0,
    earned: false,
    category: "Detection"
  },
  {
    id: 8,
    name: "First Alert",
    icon: AlertTriangle,
    color: "bg-amber-500",
    description: "Be the first to report a new threat",
    progress: 100,
    earned: true,
    category: "Community"
  },
  {
    id: 9,
    name: "Perfect Score",
    icon: CheckCircle,
    color: "bg-emerald-500",
    description: "Achieve 100% on an advanced quiz",
    progress: 40,
    earned: false,
    category: "Learning"
  },
  {
    id: 10,
    name: "Speedy Response",
    icon: Zap,
    color: "bg-sky-500",
    description: "Report 5 threats within 24 hours of creation",
    progress: 80,
    earned: false,
    category: "Detection"
  },
  {
    id: 11,
    name: "Transcript Analyst",
    icon: FileText,
    color: "bg-teal-500",
    description: "Analyze 3 call transcripts for scam patterns",
    progress: 33,
    earned: false,
    category: "Detection"
  },
  {
    id: 12,
    name: "Dedicated Guardian",
    icon: Clock,
    color: "bg-rose-500",
    description: "Use the platform for 30 days",
    progress: 40,
    earned: false,
    category: "Engagement"
  }
];

// Group badges by category
const groupedBadges = badges.reduce((acc, badge) => {
  if (!acc[badge.category]) {
    acc[badge.category] = [];
  }
  acc[badge.category].push(badge);
  return acc;
}, {} as Record<string, typeof badges>);

const Badges = () => {
  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-suraksha-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              Achievement <span className="gradient-text">Badges</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn badges by contributing to the community and improving your security skills
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Your Progress</h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-amber-500 mr-2" />
                <span className="font-bold text-lg">4 of 12 Earned</span>
              </div>
            </div>
            <Progress value={33} className="h-2 bg-gray-200" />
          </div>
          
          {/* Badges by category */}
          {Object.entries(groupedBadges).map(([category, categoryBadges]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">{category} Badges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryBadges.map((badge) => (
                  <Card 
                    key={badge.id}
                    className={`hover:shadow-lg transition-shadow ${
                      badge.earned ? "border-2 border-amber-300" : ""
                    }`}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className={`p-2 rounded-full ${badge.color} text-white`}>
                        <badge.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {badge.name}
                          {badge.earned && (
                            <Award className="h-4 w-4 text-amber-500 inline-block ml-2" />
                          )}
                        </CardTitle>
                        <CardDescription>{badge.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span>{badge.earned ? "Earned" : `${badge.progress}% complete`}</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-1 mt-1" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Badges;
