
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/layout/Layout";
import { AlertTriangle, FileText, Lock, ShieldAlert, Eye, FileCode, Users, Smartphone } from "lucide-react";

const Guidelines = () => {
  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-suraksha-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              Cybersecurity <span className="gradient-text">Guidelines</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential best practices and tips to stay safe online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <ShieldAlert className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Why Cybersecurity Matters</CardTitle>
                <CardDescription>The importance of protecting yourself online</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In today's digital world, cybersecurity is no longer optional. With the increasing number of online threats, 
                  from phishing attempts to malware attacks, protecting your personal information has never been more crucial. 
                  Understanding these guidelines can help you avoid becoming a victim of cybercrime.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardHeader>
                <div className="bg-suraksha-100 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                  <AlertTriangle className="h-6 w-6 text-suraksha-500" />
                </div>
                <CardTitle>Common Threats</CardTitle>
                <CardDescription>Recognizing different types of cyber threats</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cyber threats come in many forms: phishing attacks that trick you into revealing sensitive information, 
                  malware that can damage your system, ransomware that locks your files, and social engineering that manipulates 
                  you into breaking security procedures. Awareness is your first line of defense.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Security Best Practices</h2>
          
          <Accordion type="single" collapsible className="mb-12 bg-white rounded-md shadow">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-suraksha-500" />
                  <span>Password Security</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use strong, unique passwords for each account (12+ characters with a mix of letters, numbers, and symbols)</li>
                  <li>Enable two-factor authentication (2FA) whenever possible</li>
                  <li>Consider using a reputable password manager to create and store complex passwords</li>
                  <li>Avoid sharing passwords or storing them in unsecured locations</li>
                  <li>Change passwords periodically, especially for high-value accounts</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-suraksha-500" />
                  <span>Phishing Awareness</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Be suspicious of unexpected emails, especially those requesting personal information</li>
                  <li>Verify the sender's email address for legitimacy</li>
                  <li>Don't click on links in suspicious emails; instead, visit websites directly</li>
                  <li>Watch for poor spelling, grammar, or design in emails claiming to be from reputable sources</li>
                  <li>Be cautious of urgent requests that pressure you to act quickly</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  <FileCode className="h-5 w-5 text-suraksha-500" />
                  <span>Software and Device Security</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Keep all software, operating systems, and apps up-to-date with the latest security patches</li>
                  <li>Use reputable antivirus/anti-malware software and keep it updated</li>
                  <li>Only download software from trusted sources</li>
                  <li>Enable firewalls on your devices and networks</li>
                  <li>Regularly back up important data following the 3-2-1 rule: 3 copies, 2 different media types, 1 off-site</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-suraksha-500" />
                  <span>Data Protection</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Encrypt sensitive information before storing or sending</li>
                  <li>Use secure and private browsing when handling sensitive information</li>
                  <li>Be mindful of what you share online, especially on social media</li>
                  <li>Regularly review privacy settings on all your accounts</li>
                  <li>Properly dispose of digital data by securely wiping devices before discarding them</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-suraksha-500" />
                  <span>Social Engineering Defense</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Verify identities before sharing sensitive information, even if the request seems legitimate</li>
                  <li>Be cautious of unsolicited phone calls claiming to be from tech support or financial institutions</li>
                  <li>Don't share personal information on social media that could be used to answer security questions</li>
                  <li>Be aware that legitimate organizations won't ask for passwords or full credit card details</li>
                  <li>Trust your instincts—if something seems suspicious, it probably is</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-suraksha-500" />
                  <span>Mobile Security</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Set strong passcodes or use biometric authentication for your devices</li>
                  <li>Only download apps from official app stores</li>
                  <li>Review app permissions and limit access to only what's necessary</li>
                  <li>Use secure, private networks rather than public Wi-Fi for sensitive activities</li>
                  <li>Enable remote tracking and wiping features in case your device is lost or stolen</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-suraksha-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Get Certified in Cybersecurity</h3>
            <p className="mb-4">
              Take your knowledge to the next level by completing our comprehensive learning modules and earning
              professional cybersecurity badges. Test your skills with our quizzes and climb the leaderboard!
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="/quiz" className="bg-white text-suraksha-500 px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Take a Quiz
              </a>
              <a href="/badges" className="border border-white px-6 py-2 rounded-md font-medium hover:bg-white hover:text-suraksha-500 transition-colors">
                View Badges
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guidelines;
