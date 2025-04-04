import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type ResultStatus = "safe" | "suspicious" | "malicious" | "unknown";

interface AnalysisResult {
  status: ResultStatus;
  score: number;
  domain: string;
  checkedAt: string;
  details: {
    domainAge?: string;
    isBlacklisted?: boolean;
    secureConnection?: boolean;
    suspiciousPatterns?: boolean;
    redirects?: number;
  };
  risks?: string[];
}

const URLAnalysis = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (!url.match(/^(http|https):\/\/[^ "]+$/)) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // In a real implementation, this would call an API
      // For now, we'll simulate a response with a timeout
      setTimeout(() => {
        // Mocked result - in real app this would come from the API
        const mockResult: AnalysisResult = {
          status: Math.random() > 0.7 ? "suspicious" : "safe",
          score: Math.random() * 100,
          domain: new URL(url).hostname,
          checkedAt: new Date().toISOString(),
          details: {
            domainAge: "2 years",
            isBlacklisted: Math.random() > 0.8,
            secureConnection: url.startsWith("https://"),
            suspiciousPatterns: Math.random() > 0.7,
            redirects: Math.floor(Math.random() * 3)
          },
          risks: Math.random() > 0.7 ? ["Suspicious URL pattern", "Domain recently registered"] : []
        };
        
        setResult(mockResult);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("An error occurred while analyzing the URL");
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: ResultStatus) => {
    switch (status) {
      case "safe":
        return "bg-green-500";
      case "suspicious":
        return "bg-yellow-500";
      case "malicious":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: ResultStatus) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "suspicious":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "malicious":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default:
        return <Info className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="section-heading">URL Analysis</h1>
          <p className="section-subheading">
            Check if a URL is safe before clicking. We'll analyze it for phishing, malware, and other threats.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter URL to Analyze</CardTitle>
            <CardDescription>
              Paste the complete URL including http:// or https://
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="bg-suraksha-500 hover:bg-suraksha-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze URL"
                )}
              </Button>
            </form>
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <Shield className="h-16 w-16 text-suraksha-500 mx-auto mb-4" />
            </div>
            <p className="text-lg font-medium mb-4">Analyzing URL...</p>
            <div className="max-w-md mx-auto">
              <Progress value={Math.random() * 100} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We're checking multiple databases and analyzing the URL patterns
            </p>
          </div>
        )}

        {!isLoading && result && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  Analysis Result
                </CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(result.status)}`}>
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </span>
              </div>
              <CardDescription>
                Analysis completed on {new Date(result.checkedAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">URL Information</h3>
                  <div className="bg-muted rounded-md p-4 flex items-center gap-2 overflow-hidden">
                    <span className="text-muted-foreground truncate">{url}</span>
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-suraksha-500 hover:text-suraksha-600 flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Trust Score</h3>
                  <div className="h-8 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        result.score > 70 ? "bg-green-500" : 
                        result.score > 40 ? "bg-yellow-500" : 
                        "bg-red-500"
                      }`}
                      style={{ width: `${result.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>High Risk</span>
                    <span>{Math.round(result.score)}%</span>
                    <span>Safe</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Domain Details</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Domain</span>
                        <span className="font-medium">{result.domain}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Domain Age</span>
                        <span className="font-medium">{result.details.domainAge}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Secure Connection</span>
                        <span className={result.details.secureConnection ? "text-green-500" : "text-red-500"}>
                          {result.details.secureConnection ? "Yes" : "No"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Risk Assessment</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Blacklisted</span>
                        <span className={result.details.isBlacklisted ? "text-red-500" : "text-green-500"}>
                          {result.details.isBlacklisted ? "Yes" : "No"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Suspicious Patterns</span>
                        <span className={result.details.suspiciousPatterns ? "text-red-500" : "text-green-500"}>
                          {result.details.suspiciousPatterns ? "Yes" : "No"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Redirects</span>
                        <span>{result.details.redirects}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {result.risks && result.risks.length > 0 && (
                  <Alert variant="default" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Potential Risks Detected</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {result.risks.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-4 justify-between">
              <Button variant="outline" onClick={() => setResult(null)}>
                Check Another URL
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  Report False Detection
                </Button>
                <Button variant="outline">
                  Share Result
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default URLAnalysis;
