
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Shield, Link as LinkIcon, Mail, MessageSquare, Phone, FileText, Award, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="shield-bg py-20 px-4 md:px-6 flex flex-col justify-center items-center text-center">
        <div className="animate-pulse-slow mb-6">
          <Shield className="h-16 w-16 md:h-24 md:w-24 text-suraksha-500 mx-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="gradient-text">Suraksha</span>{" "}
          <span className="text-foreground">Shield AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          An AI-powered platform to detect and protect against spam, scams, phishing and online threats
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-suraksha-500 hover:bg-suraksha-600">
            <Link to="/sign-up">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-5xl mx-auto">
          <div className="flex items-start gap-2">
            <div className="bg-suraksha-100 rounded-full p-2 mt-1">
              <Shield className="h-4 w-4 text-suraksha-500" />
            </div>
            <div>
              <h3 className="font-medium">Advanced Detection</h3>
              <p className="text-sm text-muted-foreground">Utilizes AI and ML for accurate threat detection</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-suraksha-100 rounded-full p-2 mt-1">
              <Shield className="h-4 w-4 text-suraksha-500" />
            </div>
            <div>
              <h3 className="font-medium">Multi-Channel Protection</h3>
              <p className="text-sm text-muted-foreground">Covers URLs, emails, SMS, calls and more</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-suraksha-100 rounded-full p-2 mt-1">
              <Shield className="h-4 w-4 text-suraksha-500" />
            </div>
            <div>
              <h3 className="font-medium">User Education</h3>
              <p className="text-sm text-muted-foreground">Learn to recognize and avoid online threats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Tools Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading text-center">Detection Tools</h2>
          <p className="section-subheading text-center max-w-3xl mx-auto">
            Comprehensive threat detection across multiple channels
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <LinkIcon className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>URL Analysis</CardTitle>
                <CardDescription>
                  Detect phishing, malicious websites, and unsafe links in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Our advanced URL analysis checks against multiple threat databases and performs deep feature extraction to identify suspicious URLs.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/url-analysis">Check URL</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <Mail className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Email Filtering</CardTitle>
                <CardDescription>
                  Filter out spam, phishing, and malware from your emails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Using NLP and machine learning, our email filter analyzes content, headers, and attachments for comprehensive protection.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/email-filtering">Analyze Email</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <MessageSquare className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>SMS Analysis</CardTitle>
                <CardDescription>
                  Identify spam and fraudulent SMS messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Our SMS detection system identifies scam patterns, suspicious links, and fraudulent requests in text messages.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/sms-analysis">Check SMS</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <Phone className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Phone Number Check</CardTitle>
                <CardDescription>
                  Verify phone numbers and detect potential scammers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Validate phone numbers and check against known spam databases to protect yourself from fraudulent callers.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/phone-check">Verify Number</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <FileText className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Call Transcript Analysis</CardTitle>
                <CardDescription>
                  Detect fraudulent intent in call conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Upload call transcripts to analyze for scam patterns, high-pressure tactics, and fraudulent behavior.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/call-transcript">Analyze Transcript</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <LinkIcon className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Domain Analysis</CardTitle>
                <CardDescription>
                  Research domains for reputation and security issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Check domain age, reputation, ownership, and security practices to determine trustworthiness.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/domain-analysis">Research Domain</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* User Engagement Section */}
      <section className="py-16 px-4 md:px-6 bg-suraksha-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-heading text-center">Engage & Learn</h2>
          <p className="section-subheading text-center max-w-3xl mx-auto">
            Boost your security knowledge while helping improve our detection systems
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="feature-card h-full">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <Award className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Gamification</CardTitle>
                <CardDescription>
                  Earn points and badges while contributing to safer online experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participate in our gamified reporting system to identify new threats and earn recognition on our leaderboards. Your contributions help make the platform better for everyone.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/leaderboard">View Leaderboard</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="feature-card h-full">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <BookOpen className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Cybersecurity Education</CardTitle>
                <CardDescription>
                  Learn how to protect yourself from common online threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access our comprehensive library of cybersecurity resources, take interactive quizzes, and stay updated with the latest security practices to protect yourself online.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/education">Start Learning</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-heading">Start Your Protection Journey Today</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Join thousands of users safeguarding their online presence with Suraksha Shield AI
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-suraksha-500 hover:bg-suraksha-600">
              <Link to="/sign-up">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
