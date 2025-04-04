import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import Layout from "@/components/layout/Layout";
import { Shield, Award, Star, TrendingUp } from "lucide-react";

// Mock data for leaderboard
const leaderboardUsers = [
  { 
    id: 1, 
    name: "Alex Johnson", 
    points: 2850, 
    badges: 12, 
    level: "Guardian",
    avatar: "https://i.pravatar.cc/150?img=1" 
  },
  { 
    id: 2, 
    name: "Samantha Lee", 
    points: 2375, 
    badges: 9, 
    level: "Protector",
    avatar: "https://i.pravatar.cc/150?img=5" 
  },
  { 
    id: 3, 
    name: "Michael Chen", 
    points: 2120, 
    badges: 8, 
    level: "Defender",
    avatar: "https://i.pravatar.cc/150?img=8" 
  },
  { 
    id: 4, 
    name: "Priya Sharma", 
    points: 1950, 
    badges: 7, 
    level: "Sentinel",
    avatar: "https://i.pravatar.cc/150?img=10" 
  },
  { 
    id: 5, 
    name: "David Wilson", 
    points: 1840, 
    badges: 6, 
    level: "Defender",
    avatar: "https://i.pravatar.cc/150?img=12" 
  },
  { 
    id: 6, 
    name: "Emma Davis", 
    points: 1680, 
    badges: 5, 
    level: "Guardian",
    avatar: "https://i.pravatar.cc/150?img=23" 
  },
  { 
    id: 7, 
    name: "James Rodriguez", 
    points: 1540, 
    badges: 5, 
    level: "Sentinel",
    avatar: "https://i.pravatar.cc/150?img=15" 
  },
  { 
    id: 8, 
    name: "Aisha Patel", 
    points: 1290, 
    badges: 4, 
    level: "Defender",
    avatar: "https://i.pravatar.cc/150?img=9" 
  },
  { 
    id: 9, 
    name: "Luis Morales", 
    points: 1150, 
    badges: 3, 
    level: "Guardian",
    avatar: "https://i.pravatar.cc/150?img=11" 
  },
  { 
    id: 10, 
    name: "Sarah Kim", 
    points: 980, 
    badges: 2, 
    level: "Sentinel",
    avatar: "https://i.pravatar.cc/150?img=25" 
  }
];

const Leaderboard = () => {
  return (
    <Layout>
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-suraksha-50 to-white -z-10"></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              <span className="gradient-text">Community</span> Leaderboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet our top contributors who are helping make the internet safer for everyone
            </p>
          </div>
          
          {/* Top 3 users with special styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {leaderboardUsers.slice(0, 3).map((user, index) => (
              <div 
                key={user.id}
                className={`relative rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 ${
                  index === 0 
                    ? "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-xl" 
                    : index === 1 
                      ? "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-lg" 
                      : "bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 shadow-lg"
                }`}
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant={index === 0 ? "default" : "outline"} className={
                    index === 0 
                      ? "bg-amber-500 text-white border-2 border-amber-300 px-3 py-1 text-sm font-bold" 
                      : index === 1 
                        ? "bg-slate-500 text-white border-2 border-slate-300 px-3 py-1 text-sm font-bold" 
                        : "bg-orange-500 text-white border-2 border-orange-300 px-3 py-1 text-sm font-bold"
                  }>
                    {index === 0 ? "1st Place" : index === 1 ? "2nd Place" : "3rd Place"}
                  </Badge>
                </div>
                
                <div className={`relative mb-4 ring-4 ${
                  index === 0 ? "ring-amber-400" : index === 1 ? "ring-slate-400" : "ring-orange-400"
                } rounded-full`}>
                  <Avatar className="h-24 w-24">
                    <img src={user.avatar} alt={user.name} className="object-cover" />
                  </Avatar>
                  {index === 0 && (
                    <div className="absolute -right-2 -top-2 bg-amber-500 rounded-full p-1">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-1">{user.name}</h3>
                <p className="text-muted-foreground mb-3">
                  <span className="inline-flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-suraksha-500" />
                    {user.level}
                  </span>
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col items-center p-2 bg-white/60 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-suraksha-500 mb-1" />
                    <span className="text-lg font-bold">{user.points}</span>
                    <span className="text-xs text-muted-foreground">Points</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-white/60 rounded-lg">
                    <Star className="h-5 w-5 text-amber-500 mb-1" />
                    <span className="text-lg font-bold">{user.badges}</span>
                    <span className="text-xs text-muted-foreground">Badges</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Rest of the leaderboard */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardUsers.slice(3).map((user, idx) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {idx + 4}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar>
                            <img src={user.avatar} alt={user.name} />
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" /> {user.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className="font-semibold text-suraksha-500">{user.points}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span className="flex items-center justify-end">
                        <Star className="h-4 w-4 text-amber-500 mr-1" /> {user.badges}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
