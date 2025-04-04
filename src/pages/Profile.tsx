
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Target, Zap } from "lucide-react";

const Profile = () => {
  // Mock user data - in a real application, this would come from authentication
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joined: "March 2025",
    points: 750,
    level: 3,
    pointsToNextLevel: 250,
    badges: [
      { name: "Security Guardian", icon: <Shield className="h-4 w-4" />, date: "April 1, 2025" },
      { name: "Phishing Expert", icon: <Target className="h-4 w-4" />, date: "March 24, 2025" },
      { name: "Quick Learner", icon: <Zap className="h-4 w-4" />, date: "March 15, 2025" },
    ],
    recentActivity: [
      { action: "Analyzed suspicious URL", points: 10, date: "Today" },
      { action: "Completed Phishing Quiz", points: 25, date: "Yesterday" },
      { action: "Reported malicious email", points: 15, date: "2 days ago" },
    ]
  };

  // Calculate progress percentage to next level
  const progressToNextLevel = Math.floor((user.points % 1000) / 10);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="col-span-1 bg-card rounded-lg shadow-md p-6 border">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-suraksha-200">
                <div className="bg-suraksha-100 text-suraksha-500 h-full w-full flex items-center justify-center text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">Member since {user.joined}</p>
              </div>
              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Level {user.level}</span>
                  <span className="text-sm">{user.points} points</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">
                  {user.pointsToNextLevel} points to level {user.level + 1}
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="col-span-1 bg-card rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="inline-block mr-2 text-amber-500" /> 
              Earned Badges
            </h3>
            <div className="space-y-4">
              {user.badges.map((badge, index) => (
                <div key={index} className="flex items-center p-3 bg-background rounded-md border">
                  <div className="h-10 w-10 rounded-full bg-suraksha-100 flex items-center justify-center text-suraksha-500">
                    {badge.icon}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">Earned on {badge.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-1 bg-card rounded-lg shadow-md p-6 border">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {user.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-md border">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <Badge variant="secondary" className="bg-suraksha-100 text-suraksha-500">
                    +{activity.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
