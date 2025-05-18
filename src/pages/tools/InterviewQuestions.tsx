
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, RefreshCcw } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const InterviewQuestions = () => {
  const { getIdToken, userProfile } = useAuth();
  const { toast } = useToast();
  const [role, setRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  const generateQuestions = async () => {
    if (!role) {
      toast({
        title: "Role Required",
        description: "Please enter the job role you're interviewing for.",
        variant: "destructive",
      });
      return;
    }

    if (userProfile?.credits < 15) {
      toast({
        title: "Insufficient Credits",
        description: "You need 15 credits to use this tool. Please purchase more credits.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = await getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/tools/interview-questions',
        { 
          role, 
          industry, 
          experience, 
          count: questionCount,
          toolCost: 15 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setQuestions(response.data.questions);
      toast({
        title: "Questions Generated",
        description: `${response.data.questions.length} interview questions generated successfully.`,
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/tools">Tools</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Interview Questions Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Interview Questions Generator</h1>
            <p className="text-white/70 max-w-3xl">
              Prepare for your next interview with custom AI-generated questions tailored to your job role, industry, and experience level.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="bg-card/60 backdrop-blur-sm border-white/10 sticky top-28">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
                    Generate Questions
                  </CardTitle>
                  <CardDescription>
                    Customize your interview question set
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role</Label>
                    <Input 
                      id="role" 
                      placeholder="e.g. Frontend Developer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry (Optional)</Label>
                    <Input 
                      id="industry" 
                      placeholder="e.g. Healthcare, Finance, Tech"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="bg-background/50 border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select 
                      value={experience} 
                      onValueChange={setExperience}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="count">Number of Questions</Label>
                    <Select 
                      value={questionCount.toString()} 
                      onValueChange={(val) => setQuestionCount(parseInt(val))}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue placeholder="Select question count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Questions</SelectItem>
                        <SelectItem value="10">10 Questions</SelectItem>
                        <SelectItem value="15">15 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <div className="text-sm text-white/70 w-full mb-2">
                    <span className="font-medium text-purple-400">15 credits</span> will be deducted from your account
                  </div>
                  <Button 
                    className="w-full bg-purple-500 hover:bg-purple-600"
                    onClick={generateQuestions}
                    disabled={isLoading || !role}
                  >
                    {isLoading ? 'Generating...' : 'Generate Questions'}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {questions.length > 0 ? (
                <Card className="bg-card/60 backdrop-blur-sm border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Interview Questions</CardTitle>
                      <CardDescription>
                        Practice these questions to prepare for your interview
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={generateQuestions}
                      disabled={isLoading}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {questions.map((q, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger className="text-left">
                            <span className="mr-2 text-purple-400">{index + 1}.</span> {q.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="bg-background/30 p-4 rounded-md border border-white/10 mt-2">
                              <p className="text-sm font-medium mb-2 text-purple-300">Tips for answering:</p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-white/80 pl-2">
                                <li>Structure your answer with a situation, task, action, and result (STAR method)</li>
                                <li>Be specific and use concrete examples from your experience</li>
                                <li>Keep your answer concise and relevant to the role</li>
                                <li>Highlight skills relevant to the job description</li>
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card/60 backdrop-blur-sm border-white/10 h-full flex flex-col justify-center items-center">
                  <CardContent className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 mx-auto flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Questions Generated Yet</h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">
                      Fill out the form and click "Generate Questions" to create custom interview questions for your preparation.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterviewQuestions;
