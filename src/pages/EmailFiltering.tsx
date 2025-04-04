
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertTriangle, LinkIcon, PaperclipIcon, User, Shield } from 'lucide-react';

interface AnalysisResult {
  score: number;
  verdict: "safe" | "suspicious" | "dangerous";
  reasons: string[];
  suggestions: string[];
  details: {
    links: {
      url: string;
      status: "safe" | "suspicious" | "malicious";
    }[];
    attachments: {
      name: string;
      type: string;
      status: "safe" | "suspicious" | "malicious";
    }[];
    senderReputation: "good" | "neutral" | "poor";
    spamScore: number;
    phishingScore: number;
    malwareScore: number;
  };
}

const EmailFiltering = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    // Skip if empty
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Create different results based on content keywords
      let analysisResult: AnalysisResult;
      const reasons: string[] = [];
      const suggestions: string[] = [];
      
      if (emailContent.toLowerCase().includes('verify') && 
          emailContent.toLowerCase().includes('account') && 
          emailContent.toLowerCase().includes('click')) {
        // Suspicious phishing email
        reasons.push('Email contains urgent action requests');
        reasons.push('Contains suspicious links');
        reasons.push('Sender domain doesn\'t match claimed organization');
        
        suggestions.push('Do not click any links in this email');
        suggestions.push('Contact the company directly through official channels');
        suggestions.push('Report this email as phishing');
        
        analysisResult = {
          score: 20,
          verdict: "dangerous",
          reasons: reasons,
          suggestions: suggestions,
          details: {
            links: [
              { url: "https://secure-looking-site.com/verify", status: "malicious" }
            ],
            attachments: [],
            senderReputation: "poor",
            spamScore: 85,
            phishingScore: 95,
            malwareScore: 40
          }
        };
      } else if (emailContent.toLowerCase().includes('offer') || 
                 emailContent.toLowerCase().includes('discount') || 
                 emailContent.toLowerCase().includes('limited time')) {
        // Likely marketing email
        reasons.push('Contains promotional language');
        reasons.push('Bulk sending patterns detected');
        
        suggestions.push('Mark as promotional if not interested');
        suggestions.push('Check if sender is in your contacts');
        
        analysisResult = {
          score: 65,
          verdict: "suspicious",
          reasons: reasons,
          suggestions: suggestions,
          details: {
            links: [
              { url: "https://legitimate-store.com/offer", status: "safe" }
            ],
            attachments: [],
            senderReputation: "neutral",
            spamScore: 45,
            phishingScore: 20,
            malwareScore: 5
          }
        };
      } else {
        // Likely safe email
        reasons.push('No suspicious patterns detected');
        reasons.push('Sender has good reputation');
        
        suggestions.push('Email appears to be legitimate');
        
        analysisResult = {
          score: 85,
          verdict: "safe",
          reasons: reasons,
          suggestions: suggestions,
          details: {
            links: [],
            attachments: [
              { name: "document.pdf", type: "PDF", status: "safe" }
            ],
            senderReputation: "good",
            spamScore: 10,
            phishingScore: 5,
            malwareScore: 0
          }
        };
      }
      
      setResult(analysisResult);
      setIsAnalyzing(false);
    }, 2000);
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

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Email Security Analysis</h1>
          <p className="text-muted-foreground">Analyze email content to detect phishing attempts and spam</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <Label htmlFor="email-content" className="text-lg font-medium mb-2 block">
                Paste Email Content
              </Label>
              <Textarea 
                id="email-content"
                placeholder="Paste the email content here to analyze for threats..."
                className="min-h-[240px]"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleAnalyze} 
              disabled={!emailContent.trim() || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Email'}
            </Button>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6 border">
            {!result && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Shield className="h-16 w-16 mb-4 text-muted" />
                <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
                <p>Paste an email and click "Analyze Email" to check for threats</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="animate-pulse">
                  <Shield className="h-16 w-16 mb-4 text-suraksha-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Analyzing Email...</h3>
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
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Findings:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="text-sm">{reason}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm">{suggestion}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" /> Links
                    </h4>
                    {result.details.links.length > 0 ? (
                      <div className="space-y-2">
                        {result.details.links.map((link, index) => (
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
                    ) : (
                      <p className="text-sm text-muted-foreground">No links detected</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <PaperclipIcon className="h-4 w-4" /> Attachments
                    </h4>
                    {result.details.attachments.length > 0 ? (
                      <div className="space-y-2">
                        {result.details.attachments.map((attachment, index) => (
                          <div key={index} className="flex justify-between p-2 bg-background rounded border text-sm">
                            <span>{attachment.name} ({attachment.type})</span>
                            <span className={`
                              ${attachment.status === 'safe' ? 'text-green-500' : 
                                attachment.status === 'suspicious' ? 'text-amber-500' : 'text-red-500'}
                              font-medium
                            `}>
                              {attachment.status.charAt(0).toUpperCase() + attachment.status.slice(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No attachments detected</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" /> Sender
                    </h4>
                    <div className="p-2 bg-background rounded border text-sm flex justify-between">
                      <span>Reputation</span>
                      <span className={`
                        ${result.details.senderReputation === 'good' ? 'text-green-500' : 
                          result.details.senderReputation === 'neutral' ? 'text-amber-500' : 'text-red-500'}
                        font-medium
                      `}>
                        {result.details.senderReputation.charAt(0).toUpperCase() + result.details.senderReputation.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailFiltering;
