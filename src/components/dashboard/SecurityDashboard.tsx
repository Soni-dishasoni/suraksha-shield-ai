
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLatestThreats, ThreatUpdate } from "@/services/securityService";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

const SecurityDashboard: React.FC = () => {
  const { data: threatUpdates, isLoading, error } = useQuery({
    queryKey: ["latestThreats"],
    queryFn: getLatestThreats
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 hover:bg-red-600';
      case 'high':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="rounded-xl border bg-card shadow-md p-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-suraksha-500" />
              Security Dashboard
            </CardTitle>
            <CardDescription>Latest threat intelligence and security alerts</CardDescription>
          </div>
          <Badge className="bg-suraksha-500 hover:bg-suraksha-600">Live Updates</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
              <p>Failed to load threat data. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Active Threats</h3>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Updated Today
                </div>
              </div>
              <div className="divide-y">
                {threatUpdates?.map((threat: ThreatUpdate) => (
                  <div key={threat.id} className="py-3">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{threat.title}</h4>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{threat.source}</span>
                      <span>{threat.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default SecurityDashboard;
