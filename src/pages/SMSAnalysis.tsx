
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { MessageSquare, Shield, AlertTriangle, CheckCircle, Loader2, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { Label } from "@/components/ui/label";

const SMSAnalysis = () => {
  const [sender, setSender] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    score: number;
    verdict: "safe" | "suspicious" | "dangerous";
    category: "legitimate" | "promotional" | "scam" | "phishing" | "unknown";
    reasons: string[];
    links: { url: string; status: "safe" | "suspicious" | "malicious" }[];
  }>(null);

  const handleAnalyze = () => {
    if (!messageContent) {
      toast({
        title: "Missing message content",
        description: "Please enter the SMS message to analyze",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Mock analysis - in a real application, this would call an API
    setTimeout(() => {
      const messageText = messageContent.toLowerCase();
      
      // Simplified detection logic
      const hasUrlShorteners = /(bit\.ly|goo\.gl|tinyurl\.com|t\.co)/i.test(messageText);
      const hasUrgentLanguage = /(urgent|immediately|alert|warning|account.*suspend)/i.test(messageText);
      const askingForInfo = /(verify|confirm|send|code|password|pin)/i.test(messageText);
      const mentionsMoney = /(money|bank|credit|loan|payment|cash|prize|claim|won)/i.test(messageText);
      const hasLinks = messageText.includes("http") || messageText.includes("www");
      
      // Calculate risk score and determine verdict
      let riskScore = 0;
      if (hasUrlShorteners) riskScore += 30;
      if (hasUrgentLanguage) riskScore += 25;
      if (askingForInfo) riskScore += 20;
      if (mentionsMoney) riskScore += 15;
      if (hasLinks) riskScore += 10;
      
      // Generate result
      const result = {
        score: riskScore,
        verdict: riskScore >= 60 ? "dangerous" : riskScore >= 30 ? "suspicious" : "safe",
        category: "unknown" as const,
        reasons: [],
        links: []
      };
      
      // Determine category
      if (riskScore >= 50 && askingForInfo) {
        result.category = "phishing";
      } else if (riskScore >= 40 && mentionsMoney) {
        result.category = "scam";
      } else if (messageText.includes("off") || messageText.includes("sale") || messageText.includes("discount")) {
        result.category = "promotional";
      } else if (riskScore < 20) {
        result.category = "legitimate";
      }
      
      // Extract reasons
      if (hasUrlShorteners) {
        result.reasons.push("Contains shortened URLs that may hide malicious destinations");
      }
      if (hasUrgentLanguage) {
        result.reasons.push("Uses urgent language to pressure quick action without thinking");
      }
      if (askingForInfo && riskScore >= 40) {
        result.reasons.push("Requests sensitive information that legitimate organizations wouldn't ask for via SMS");
      }
      if (mentionsMoney && riskScore >= 40) {
        result.reasons.push("Mentions financial topics in a suspicious context");
      }
      
      // Extract and analyze links
      if (hasLinks) {
        // Extract URLs (simplified)
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matches = messageText.match(urlRegex);
        
        if (matches) {
          matches.forEach(url => {
            const isShortened = /(bit\.ly|goo\.gl|tinyurl\.com|t\.co)/i.test(url);
            const linkStatus = isShortened || riskScore >= 60 ? "malicious" : 
                               riskScore >= 40 ? "suspicious" : "safe";
                               
            result.links.push({
              url: url,
              status: linkStatus as "safe" | "suspicious" | "malicious"
            });
          });
        }
      }
      
      // If no reasons but still suspicious or dangerous, add generic reason
      if (result.reasons.length === 0 && result.verdict !== "safe") {
        result.reasons.push("Multiple suspicious patterns detected in message content");
      }
      
      // Update state with result
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      // Show toast
      toast({
        title: result.verdict === "safe" 
          ? "SMS appears legitimate" 
          : result.verdict === "suspicious" 
            ? "Potentially suspicious SMS" 
            : "Dangerous SMS detected!",
        description: result.reasons[0] || "Analysis completed",
        variant: result.verdict === "safe" ? "default" : "destructive",
      });

      // Award points for completing an analysis (mock functionality)
      toast({
        title: "Points awarded!",
        description: "You earned 5 points for analyzing an SMS message",
      });
    }, 1500);
  };

  const handlePasteExample = () => {
    setSender("67890");
    setMessageContent("URGENT: Your bank account has been suspended. Verify your identity now: http://bit.ly/fakebank");
  };

  const clearForm = () => {
    setSender("");
    setMessageContent("");
    setAnalysisResult(null);
  };

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-suraksha-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              SMS <span className="gradient-text">Threat</span> Analysis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Detect scam, phishing, and spam messages to stay safe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            <div className="lg:col-span-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-suraksha-500" /> 
                    SMS Message Analysis
                  </CardTitle>
                  <CardDescription>
                    Enter the message details below to check for potential threats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender">Sender (Phone Number or Short Code)</Label>
                    <Input
                      id="sender"
                      placeholder="e.g., +1234567890 or 54321"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message Content</Label>
                    <Textarea
                      id="message"
                      placeholder="Paste the SMS message content here..."
                      className="min-h-[150px]"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={clearForm}>
                      Clear
                    </Button>
                    <Button variant="outline" onClick={handlePasteExample}>
                      <Copy className="h-4 w-4 mr-2" /> Sample SMS
                    </Button>
                  </div>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" /> Analyze Message
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
                      <Badge className={`${
                        analysisResult.category === "phishing" || analysisResult.category === "scam" ? "bg-red-500" :
                        analysisResult.category === "promotional" ? "bg-amber-500" :
                        analysisResult.category === "legitimate" ? "bg-green-500" :
                        "bg-gray-500"
                      } text-white`}>
                        {analysisResult.category.charAt(0).toUpperCase() + analysisResult.category.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center mt-2">
                      {analysisResult.verdict === "dangerous" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      ) : analysisResult.verdict === "suspicious" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      {analysisResult.verdict === "dangerous" ? "Dangerous SMS Detected" :
                       analysisResult.verdict === "suspicious" ? "Potentially Suspicious" :
                       "Message Appears Safe"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Risk Score:</h3>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          style={{width: `${analysisResult.score}%`}}
                          className={`h-full ${
                            analysisResult.score > 60 ? "bg-red-500" :
                            analysisResult.score > 30 ? "bg-amber-500" :
                            "bg-green-500"
                          }`}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Safe (0)</span>
                        <span>Dangerous (100)</span>
                      </div>
                    </div>
                    
                    {analysisResult.reasons.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Why this rating:</h3>
                        <ul className="space-y-1">
                          {analysisResult.reasons.map((reason, i) => (
                            <li key={i} className="text-sm flex items-start">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysisResult.links.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Links Detected:</h3>
                        <div className="space-y-2">
                          {analysisResult.links.map((link, i) => (
                            <div key={i} className="text-sm flex items-center p-2 bg-gray-50 rounded">
                              {link.status === "malicious" ? (
                                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                              ) : link.status === "suspicious" ? (
                                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              )}
                              <span className="truncate flex-grow">{link.url}</span>
                              <Badge className={`ml-2 ${
                                link.status === "malicious" ? "bg-red-500" :
                                link.status === "suspicious" ? "bg-amber-500" :
                                "bg-green-500"
                              }`}>
                                {link.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {analysisResult.verdict !== "safe" && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                        <h3 className="text-sm font-bold text-amber-800 mb-1">Safety Tips:</h3>
                        <ul className="text-xs text-amber-700 list-disc pl-4 space-y-1">
                          <li>Never click on suspicious links in SMS messages</li>
                          <li>Don't respond to messages asking for personal information</li>
                          <li>Contact the purported sender through official channels to verify</li>
                          <li>Report suspicious messages to your mobile carrier</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="w-full">
                      <div className="flex justify-between mb-2">
                        <p className="text-xs text-muted-foreground">Was this analysis helpful?</p>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Report as {analysisResult.verdict === "safe" ? "Spam" : "Safe"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="shadow-md h-full flex flex-col justify-center">
                  <CardContent className="pt-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-green-100 rounded-full">
                        <MessageSquare className="h-8 w-8 text-suraksha-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">SMS Analysis</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter a message and click "Analyze Message" to check for potential threats.
                    </p>
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center">
                        <Badge className="mb-2">Detect</Badge>
                        <div className="flex flex-wrap justify-center gap-2">
                          <Badge variant="outline" className="bg-red-50">Phishing</Badge>
                          <Badge variant="outline" className="bg-red-50">Scams</Badge>
                          <Badge variant="outline" className="bg-amber-50">Spam</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-3">Recent Threat Patterns</h2>
            <p className="text-muted-foreground mb-4">
              Stay vigilant against these common SMS scams currently circulating:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  Package Delivery Scams
                </h3>
                <p className="text-sm text-gray-600">
                  SMS claiming you have a package that needs delivery confirmation, asking you to click a link or pay a fee.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  Bank Account Alert Scams
                </h3>
                <p className="text-sm text-gray-600">
                  Messages claiming your account is suspended or unusual activity detected, requiring immediate verification.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  Government Impersonation
                </h3>
                <p className="text-sm text-gray-600">
                  Messages claiming to be from government agencies requesting personal information or payment.
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <h3 className="font-semibold mb-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  Prize or Lottery Scams
                </h3>
                <p className="text-sm text-gray-600">
                  Messages stating you've won a prize or lottery and need to claim it by clicking a link or sending money.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SMSAnalysis;
