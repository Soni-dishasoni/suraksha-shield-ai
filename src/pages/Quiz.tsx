
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { Shield, Star, Award, ChevronRight, ChevronLeft, AlertTriangle, CheckCircle } from "lucide-react";

// Quiz questions data
const quizData = [
  {
    id: 1,
    question: "Which of the following is a common sign of a phishing email?",
    options: [
      { id: "a", text: "The email uses your full name" },
      { id: "b", text: "Urgent action required or account will be suspended" },
      { id: "c", text: "The email was sent during business hours" },
      { id: "d", text: "The email has a company logo" }
    ],
    correctAnswer: "b",
    explanation: "Phishing emails often create a false sense of urgency to pressure you into taking action without thinking carefully."
  },
  {
    id: 2,
    question: "What should you check before clicking on a link in an email?",
    options: [
      { id: "a", text: "The font style used in the email" },
      { id: "b", text: "The actual URL by hovering over the link" },
      { id: "c", text: "The time the email was sent" },
      { id: "d", text: "The length of the email" }
    ],
    correctAnswer: "b",
    explanation: "Always hover over links to see the actual URL destination before clicking. The displayed text can be different from the actual link."
  },
  {
    id: 3,
    question: "Which of these password practices is most secure?",
    options: [
      { id: "a", text: "Using the same password for all your accounts" },
      { id: "b", text: "Writing down passwords in a notebook" },
      { id: "c", text: "Using a unique passphrase for each account" },
      { id: "d", text: "Changing your password every day" }
    ],
    correctAnswer: "c",
    explanation: "Using unique passphrases for each account ensures that if one account is compromised, others remain secure."
  },
  {
    id: 4,
    question: "What is a common characteristic of a secure URL?",
    options: [
      { id: "a", text: "It uses HTTP protocol" },
      { id: "b", text: "It has many numbers in the domain name" },
      { id: "c", text: "It uses HTTPS protocol with a padlock icon" },
      { id: "d", text: "It has a very long domain name" }
    ],
    correctAnswer: "c",
    explanation: "HTTPS (with the padlock) indicates that data transfer between your browser and the website is encrypted."
  },
  {
    id: 5,
    question: "What is two-factor authentication (2FA)?",
    options: [
      { id: "a", text: "Having two passwords for the same account" },
      { id: "b", text: "Using something you know and something you have to log in" },
      { id: "c", text: "Having two separate accounts for security" },
      { id: "d", text: "Logging in twice to verify your identity" }
    ],
    correctAnswer: "b",
    explanation: "2FA combines something you know (password) with something you have (like a phone for verification codes), adding an extra layer of security."
  }
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = quizData[currentQuestionIndex];
  
  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };
  
  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    const newUserAnswers = {
      ...userAnswers,
      [currentQuestion.id]: selectedOption
    };
    
    setUserAnswers(newUserAnswers);
    setShowExplanation(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      
      // Calculate percentage score
      const percentage = (score / quizData.length) * 100;
      
      // Show appropriate toast based on score
      if (percentage >= 80) {
        toast({
          title: "Congratulations! 🎉",
          description: `You scored ${score} out of ${quizData.length}! Great security knowledge!`,
        });
      } else if (percentage >= 60) {
        toast({
          title: "Good job! 👍",
          description: `You scored ${score} out of ${quizData.length}. You have solid security awareness!`,
        });
      } else {
        toast({
          title: "Keep learning! 📚",
          description: `You scored ${score} out of ${quizData.length}. Review the security concepts and try again!`,
          variant: "destructive",
        });
      }
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(userAnswers[quizData[currentQuestionIndex - 1].id] || null);
      setShowExplanation(!!userAnswers[quizData[currentQuestionIndex - 1].id]);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setUserAnswers({});
    setQuizCompleted(false);
  };
  
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  
  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              <span className="gradient-text">Security</span> Quiz
            </h1>
            <p className="text-xl text-muted-foreground">
              Test your cybersecurity knowledge and earn points
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center text-sm mb-2">
              <span>Question {currentQuestionIndex + 1} of {quizData.length}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 mr-1" />
                <span>Score: {score}/{quizData.length}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {!quizCompleted ? (
            <Card className="border-2">
              <CardHeader className="bg-suraksha-50/50">
                <div className="flex items-start gap-2">
                  <Shield className="h-6 w-6 text-suraksha-500 mt-1 flex-shrink-0" />
                  <div>
                    <Badge className="mb-2 bg-suraksha-500">Question {currentQuestionIndex + 1}</Badge>
                    <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup 
                  value={selectedOption || ""} 
                  onValueChange={handleOptionSelect}
                  className="space-y-3"
                  disabled={showExplanation}
                >
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.id} 
                      className={`flex items-center border rounded-md p-4 ${
                        showExplanation && option.id === currentQuestion.correctAnswer 
                          ? "border-green-500 bg-green-50" 
                          : showExplanation && option.id === selectedOption 
                            ? option.id !== currentQuestion.correctAnswer 
                              ? "border-red-500 bg-red-50" 
                              : "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-suraksha-200"
                      }`}
                    >
                      <RadioGroupItem 
                        value={option.id} 
                        id={`option-${option.id}`} 
                      />
                      <Label 
                        htmlFor={`option-${option.id}`} 
                        className="ml-2 flex-grow cursor-pointer"
                      >
                        {option.text}
                      </Label>
                      {showExplanation && option.id === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      )}
                      {showExplanation && option.id === selectedOption && option.id !== currentQuestion.correctAnswer && (
                        <AlertTriangle className="h-5 w-5 text-red-500 ml-2" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
                
                {showExplanation && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-semibold text-blue-800 mb-1">Explanation</h4>
                    <p className="text-blue-700">{currentQuestion.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                </Button>
                
                {showExplanation ? (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'} <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleCheckAnswer} disabled={!selectedOption}>
                    Check Answer
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
                <CardDescription className="text-lg">
                  You scored {score} out of {quizData.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="inline-block p-4 rounded-full bg-suraksha-100 mb-4">
                    {score >= 4 ? (
                      <Award className="h-16 w-16 text-suraksha-500" />
                    ) : (
                      <Shield className="h-16 w-16 text-suraksha-500" />
                    )}
                  </div>
                  
                  {score === quizData.length && (
                    <div className="mb-4">
                      <Badge className="bg-green-500 px-3 py-1 text-base">Perfect Score!</Badge>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">
                    {score === quizData.length
                      ? "Excellent Security Knowledge!"
                      : score >= 4
                        ? "Great Security Awareness!"
                        : score >= 3
                          ? "Good Start on Security Concepts!"
                          : "Keep Learning About Security!"}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {score === quizData.length
                      ? "You're a security expert! Keep up the great work protecting yourself online."
                      : score >= 4
                        ? "You have strong security knowledge. Just a bit more to perfect your skills."
                        : score >= 3
                          ? "You're on the right track with security basics. Keep learning to improve."
                          : "Security is important! Review the quiz concepts and try again to boost your knowledge."}
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={handleRestartQuiz} className="mr-4">
                    Take Quiz Again
                  </Button>
                  <Button variant="outline">
                    Try Different Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
