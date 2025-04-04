
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Shield, 
  LinkIcon,
  BadgePercent,
  CreditCard
} from 'lucide-react';

interface AnalysisResult {
  score: number;
  verdict: "safe" | "suspicious" | "dangerous";
  category: "unknown" | "legitimate" | "promotional" | "scam" | "phishing";
  reasons: string[];
  links: {
    url: string;
    status: "safe" | "suspicious" | "malicious";
  }[];
}

const SMSAnalysis = () => {
  const [smsContent, setSmsContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    // Skip if empty
    if (!smsContent.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Create different results based on content keywords
      let analysisResult: AnalysisResult;
      
      if (smsContent.toLowerCase().includes('verify') && 
          smsContent.toLowerCase().includes('account') && 
          smsContent.toLowerCase().includes('click')) {
        // Phishing SMS
        analysisResult = {
          score: 15,
          verdict: "dangerous",
          category: "phishing",
          reasons: [
            "Contains suspicious link to unverified domain",
            "Uses urgent language to prompt immediate action",
            "Mimics legitimate organization",
            "Requests sensitive information"
          ],
          links: [
            { url: "https://bit.ly/3xR92s", status: "malicious" }
          ]
        };
      } else if (smsContent.toLowerCase().includes('won') || 
                 smsContent.toLowerCase().includes('prize') || 
                 smsContent.toLowerCase().includes('claim')) {
        // Scam SMS
        analysisResult = {
          score: 20,
          verdict: "dangerous",
          category: "scam",
          reasons: [
            "Promises unrealistic rewards or prizes",
            "Contains suspicious link",
            "Uses urgency to force quick action",
            "Requests payment or personal information"
          ],
          links: [
            { url: "https://claim-prize.co/win", status: "malicious" }
          ]
        };
      } else if (smsContent.toLowerCase().includes('off') || 
                 smsContent.toLowerCase().includes('sale') || 
                 smsContent.toLowerCase().includes('discount')) {
        // Promotional SMS
        analysisResult = {
          score: 70,
          verdict: "suspicious",
          category: "promotional",
          reasons: [
            "Contains promotional language",
            "Includes marketing link",
            "Sent from recognized marketing number"
          ],
          links: [
            { url: "https://shop.example.com/sale", status: "safe" }
          ]
        };
      } else {
        // Legitimate SMS
        analysisResult = {
          score: 90,
          verdict: "safe",
          category: "legitimate",
          reasons: [
            "No suspicious patterns detected",
            "No unusual requests for information",
            "No malicious links detected"
          ],
          links: []
        };
      }
      
      setResult(analysisResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getVerdictColor = () => {
    if (!result) return '';
    switch(result.verdict) {
      case 'safe': return 'text-green-500';
      case 'suspicious': return 'text-amber-500';
      case 'dangerous': return 'text-red-500';
      default: return '';
    }
  };

  const getVerdictIcon = () => {
    if (!result) return null;
    switch(result.verdict) {
      case 'safe': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'suspicious': return <AlertTriangle className="h-6 w-6 text-amber-500" />;
      case 'dangerous': return <XCircle className="h-6 w-6 text-red-500" />;
      default: return null;
    }
  };

  const getCategoryIcon = () => {
    if (!result) return null;
    switch(result.category) {
      case 'legitimate': return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'promotional': return <BadgePercent className="h-5 w-5 text-amber-500" />;
      case 'scam': return <CreditCard className="h-5 w-5 text-red-500" />;
      case 'phishing': return <LinkIcon className="h-5 w-5 text-red-500" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">SMS Security Analysis</h1>
          <p className="text-muted-foreground">Analyze SMS content to detect scams, phishing, and fraud attempts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <Label htmlFor="sms-content" className="text-lg font-medium mb-2 block">
                Paste SMS Content
              </Label>
              <Textarea 
                id="sms-content"
                placeholder="Paste the SMS content here to analyze for threats..."
                className="min-h-[180px]"
                value={smsContent}
                onChange={(e) => setSmsContent(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAnalyze} 
              disabled={!smsContent.trim() || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze SMS'}
            </Button>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6 border">
            {!result && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Shield className="h-16 w-16 mb-4 text-muted" />
                <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
                <p>Paste an SMS and click "Analyze SMS" to check for threats</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="animate-pulse">
                  <Shield className="h-16 w-16 mb-4 text-suraksha-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Analyzing SMS...</h3>
                <Progress value={45} className="w-full mb-4" />
                <p className="text-muted-foreground">Checking for suspicious patterns and threats</p>
              </div>
            )}
            
            {result && !isAnalyzing && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getVerdictIcon()}
                    <h3 className={`text-xl font-semibold ${getVerdictColor()}`}>
                      {result.verdict.charAt(0).toUpperCase() + result.verdict.slice(1)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Safety Score:</span>
                    <span 
                      className={`text-lg font-bold ${
                        result.score > 70 ? 'text-green-500' : 
                        result.score > 40 ? 'text-amber-500' : 'text-red-500'
                      }`}
                    >
                      {result.score}%
                    </span>
                  </div>
                </div>
                
                <div className="mb-6 p-3 flex items-center gap-3 bg-background rounded-lg border">
                  {getCategoryIcon()}
                  <div>
                    <p className="text-sm text-muted-foreground">Message Category</p>
                    <p className="font-medium">
                      {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Analysis:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="text-sm">{reason}</li>
                    ))}
                  </ul>
                </div>
                
                {result.links.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" /> Detected Links
                    </h4>
                    <div className="space-y-2">
                      {result.links.map((link, index) => (
                        <div key={index} className="flex justify-between p-2 bg-background rounded border text-sm">
                          <span className="truncate max-w-[70%]">{link.url}</span>
                          <span className={`
                            ${link.status === 'safe' ? 'text-green-500' : 
                              link.status === 'suspicious' ? 'text-amber-500' : 'text-red-500'}
                            font-medium
                          `}>
                            {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-4">Report result accuracy:</h4>
                  <RadioGroup defaultValue="accurate" className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center space-y-2">
                      <Label 
                        htmlFor="accurate" 
                        className="p-2 w-full text-center bg-background border rounded-md cursor-pointer hover:bg-accent"
                      >
                        Accurate
                        <RadioGroupItem 
                          value="accurate" 
                          id="accurate" 
                          className="sr-only"
                        />
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Label 
                        htmlFor="somewhat" 
                        className="p-2 w-full text-center bg-background border rounded-md cursor-pointer hover:bg-accent"
                      >
                        Somewhat
                        <RadioGroupItem 
                          value="somewhat" 
                          id="somewhat"
                          className="sr-only" 
                        />
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Label 
                        htmlFor="inaccurate" 
                        className="p-2 w-full text-center bg-background border rounded-md cursor-pointer hover:bg-accent"
                      >
                        Inaccurate
                        <RadioGroupItem 
                          value="inaccurate" 
                          id="inaccurate"
                          className="sr-only" 
                        />
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SMSAnalysis;
