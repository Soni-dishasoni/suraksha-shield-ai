
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Mail, AlertTriangle, CheckCircle, Shield, Info, Upload, Copy, Loader2 } from "lucide-react";

const EmailFiltering = () => {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailSender, setEmailSender] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    score: number;
    verdict: "safe" | "suspicious" | "dangerous";
    reasons: string[];
    suggestions: string[];
    details: {
      links: { url: string; status: "safe" | "suspicious" | "malicious" }[];
      attachments: { name: string; status: "safe" | "suspicious" | "malicious" }[];
      senderReputation: "good" | "unknown" | "poor";
      spamScore: number;
      phishingScore: number;
      malwareScore: number;
    };
  }>(null);

  const handleAnalyze = () => {
    if (!emailSubject && !emailContent && !emailSender) {
      toast({
        title: "Missing information",
        description: "Please provide email details to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Mock analysis - in a real application, this would call an API
    setTimeout(() => {
      // This is simulated logic - in a real app this would come from the backend
      const hasSuspiciousLinks = emailContent.includes("click here") || emailContent.includes("verify now");
      const hasSuspiciousWords = emailContent.toLowerCase().includes("urgent") || emailContent.toLowerCase().includes("account suspended");
      const isSpoofedSender = emailSender.includes("@gmail.com") && emailContent.includes("bank");
      
      // Generate mock analysis result
      const result = {
        score: hasSuspiciousLinks && hasSuspiciousWords ? 85 : hasSuspiciousLinks || hasSuspiciousWords ? 65 : 20,
        verdict: hasSuspiciousLinks && hasSuspiciousWords ? "dangerous" : hasSuspiciousLinks || hasSuspiciousWords || isSpoofedSender ? "suspicious" : "safe",
        reasons: [],
        suggestions: [],
        details: {
          links: [
            { 
              url: "https://secure-looking-site.com/verify", 
              status: hasSuspiciousLinks ? "malicious" : "safe" 
            }
          ],
          attachments: [],
          senderReputation: isSpoofedSender ? "poor" : emailSender.includes("@gmail.com") ? "unknown" : "good",
          spamScore: Math.floor(Math.random() * 40) + (hasSuspiciousWords ? 40 : 0),
          phishingScore: Math.floor(Math.random() * 30) + (hasSuspiciousLinks ? 50 : 0),
          malwareScore: Math.floor(Math.random() * 10),
        }
      } as const;
      
      // Add reasons based on analysis
      if (hasSuspiciousLinks) {
        result.reasons.push("Contains suspicious links that may lead to phishing sites");
      }
      if (hasSuspiciousWords) {
        result.reasons.push("Uses urgent language commonly found in phishing attempts");
      }
      if (isSpoofedSender) {
        result.reasons.push("Potential sender spoofing detected (banking content from Gmail account)");
      }
      
      // Add suggestions
      if (result.verdict !== "safe") {
        result.suggestions.push("Do not click on any links in this email");
        result.suggestions.push("Do not download any attachments");
        result.suggestions.push("Contact the purported sender through official channels to verify");
      } else {
        result.suggestions.push("Email appears legitimate, but always stay vigilant");
      }
      
      // Update state with result
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      // Show toast notification
      toast({
        title: result.verdict === "safe" 
          ? "Email appears safe" 
          : result.verdict === "suspicious" 
            ? "Potentially suspicious email detected" 
            : "Dangerous email detected!",
        description: result.reasons[0] || "Analysis completed",
        variant: result.verdict === "safe" ? "default" : result.verdict === "suspicious" ? "default" : "destructive",
      });

      // Award points for completing an analysis (mock functionality)
      toast({
        title: "Points awarded!",
        description: "You earned 5 points for analyzing an email",
      });
    }, 2000);
  };

  const handlePasteExample = () => {
    setEmailSubject("Your account needs immediate verification");
    setEmailSender("secure@bankofamerica-verify.com");
    setEmailContent(`Dear Valued Customer,

We have detected suspicious activity on your account and need you to verify your information immediately or your account will be suspended.

Please click here to verify your account details: https://secure-looking-site.com/verify

This is an urgent matter and requires your immediate attention.

Best regards,
Bank of America Security Team`);
  };

  const clearForm = () => {
    setEmailSubject("");
    setEmailContent("");
    setEmailSender("");
    setAnalysisResult(null);
  };

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-suraksha-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              Email <span className="gradient-text">Protection</span> Scanner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analyze your emails to detect phishing, spam, and other threats
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <div className="lg:col-span-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-suraksha-500" /> 
                    Email Analysis
                  </CardTitle>
                  <CardDescription>
                    Enter the email details below to check for potential threats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sender">Sender Email</Label>
                      <Input
                        id="sender"
                        placeholder="email@example.com"
                        value={emailSender}
                        onChange={(e) => setEmailSender(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Email subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Email Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Paste the email content here..."
                        className="min-h-[200px]"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={clearForm}>
                      Clear
                    </Button>
                    <Button variant="outline" onClick={handlePasteExample}>
                      <Copy className="h-4 w-4 mr-2" /> Sample Email
                    </Button>
                  </div>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" /> Analyze Email
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-3">
              {analysisResult ? (
                <Card className={`shadow-md ${
                  analysisResult.verdict === "dangerous" ? "border-red-400" :
                  analysisResult.verdict === "suspicious" ? "border-amber-400" :
                  "border-green-400"
                }`}>
                  <CardHeader className={`${
                    analysisResult.verdict === "dangerous" ? "bg-red-50" :
                    analysisResult.verdict === "suspicious" ? "bg-amber-50" :
                    "bg-green-50"
                  }`}>
                    <div className="flex justify-between items-center">
                      <Badge className={`${
                        analysisResult.verdict === "dangerous" ? "bg-red-500" :
                        analysisResult.verdict === "suspicious" ? "bg-amber-500" :
                        "bg-green-500"
                      } text-white`}>
                        {analysisResult.verdict === "dangerous" ? "High Risk" :
                         analysisResult.verdict === "suspicious" ? "Suspicious" :
                         "Safe"}
                      </Badge>
                      <span className="text-sm font-medium">
                        Risk Score: {analysisResult.score}/100
                      </span>
                    </div>
                    <CardTitle className="flex items-center mt-2">
                      {analysisResult.verdict === "dangerous" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      ) : analysisResult.verdict === "suspicious" ? (
                        <Info className="h-5 w-5 text-amber-500 mr-2" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {analysisResult.verdict === "dangerous" ? "Dangerous Email Detected" :
                       analysisResult.verdict === "suspicious" ? "Potentially Suspicious" :
                       "Email Appears Safe"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {analysisResult.reasons.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Issues Detected:</h3>
                        <ul className="space-y-1">
                          {analysisResult.reasons.map((reason, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysisResult.suggestions.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Recommendations:</h3>
                        <ul className="space-y-1">
                          {analysisResult.suggestions.map((suggestion, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <Shield className="h-4 w-4 text-suraksha-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-6 pt-4 border-t">
                      <h3 className="text-sm font-semibold mb-3">Detailed Analysis:</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Spam Score:</span>
                          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              style={{width: `${analysisResult.details.spamScore}%`}}
                              className={`h-full ${
                                analysisResult.details.spamScore > 70 ? "bg-red-500" :
                                analysisResult.details.spamScore > 40 ? "bg-amber-500" :
                                "bg-green-500"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Phishing Score:</span>
                          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              style={{width: `${analysisResult.details.phishingScore}%`}}
                              className={`h-full ${
                                analysisResult.details.phishingScore > 70 ? "bg-red-500" :
                                analysisResult.details.phishingScore > 40 ? "bg-amber-500" :
                                "bg-green-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm">
                        <span className="text-muted-foreground">Sender Reputation:</span>
                        <Badge className={`ml-2 ${
                          analysisResult.details.senderReputation === "good" ? "bg-green-500" :
                          analysisResult.details.senderReputation === "unknown" ? "bg-amber-500" :
                          "bg-red-500"
                        }`}>
                          {analysisResult.details.senderReputation}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="w-full">
                      <p className="text-xs text-muted-foreground mb-1">
                        This analysis is provided as guidance only and may not detect all threats.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Upload className="h-4 w-4 mr-2" /> Report False Result
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="shadow-md h-full flex flex-col justify-center">
                  <CardContent className="pt-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <Shield className="h-8 w-8 text-suraksha-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Email Analysis</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter email details and click "Analyze Email" to check for potential threats.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Phishing Detection</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Spam Analysis</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm">Malware Link Scanning</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailFiltering;
