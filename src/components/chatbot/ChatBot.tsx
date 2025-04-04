
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bot, X, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm SurakshaBot, your cybersecurity assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, {
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
      
      // Show toast notification for important security information
      if (inputValue.toLowerCase().includes('password') || 
          inputValue.toLowerCase().includes('secure')) {
        toast({
          title: "Security Tip",
          description: "Remember to use strong, unique passwords for all your accounts!",
          duration: 5000,
        });
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Simple response generation based on keywords
  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello there! How can I assist you with cybersecurity today?";
    } else if (lowerInput.includes('password')) {
      return "Strong passwords are essential for online security. Use a mix of letters, numbers, and symbols, and never reuse passwords across different sites. Consider using a password manager!";
    } else if (lowerInput.includes('phishing')) {
      return "Phishing attacks try to steal your information by pretending to be legitimate organizations. Always verify emails by checking the sender's address and avoid clicking suspicious links.";
    } else if (lowerInput.includes('safe') && (lowerInput.includes('url') || lowerInput.includes('link'))) {
      return "To check if a URL is safe, look for HTTPS, verify the domain spelling, and use our URL Analysis tool to scan it before clicking.";
    } else if (lowerInput.includes('malware') || lowerInput.includes('virus')) {
      return "To protect against malware, keep your software updated, use reliable antivirus programs, and be cautious about downloading files or clicking links from unknown sources.";
    } else if (lowerInput.includes('badge') || lowerInput.includes('points') || lowerInput.includes('reward')) {
      return "You can earn badges and points by analyzing suspicious content, completing quizzes, and contributing to our community. Check your profile to track your progress!";
    } else if (lowerInput.includes('quiz')) {
      return "Our cybersecurity quizzes help you learn while earning points! Head to the Quiz section to test your knowledge on various security topics.";
    } else if (lowerInput.includes('thank')) {
      return "You're welcome! If you have any more questions about cybersecurity, feel free to ask.";
    } else {
      return "I'm here to help with cybersecurity questions. You can ask about phishing, safe browsing, malware protection, or how to earn points and badges in our system!";
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-suraksha-500 hover:bg-suraksha-600 text-white p-0 shadow-lg"
        >
          <Bot size={24} />
        </Button>
      </div>

      {/* Chat drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[70vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-suraksha-500" />
                SurakshaBot
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <ScrollArea className="flex-1 p-4 h-[calc(70vh-10rem)]">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.isBot 
                        ? 'bg-muted text-foreground' 
                        : 'bg-suraksha-500 text-white'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isBot ? 'text-muted-foreground' : 'text-suraksha-100'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground max-w-[80%] rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-suraksha-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-suraksha-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-2 w-2 bg-suraksha-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <DrawerFooter className="border-t pt-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={inputValue.trim() === ''}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ChatBot;
