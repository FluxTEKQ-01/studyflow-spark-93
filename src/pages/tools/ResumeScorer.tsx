
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Upload, Check, AlertTriangle, Info } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const ResumeScorer = () => {
  const { getIdToken } = useAuth();
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Empty Resume",
        description: "Please paste your resume content first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = await getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/tools/resume-scorer',
        { resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setFeedback(response.data.feedback);
      toast({
        title: "Resume Analysis Complete",
        description: "Your resume has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
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
                  <BreadcrumbPage>ATS Resume Scorer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">ATS Resume Scorer</h1>
            <p className="text-white/70 max-w-3xl">
              Get instant feedback on your resume with our AI analysis. Find out if your resume will pass through Applicant Tracking Systems (ATS) with our free scoring tool.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card className="bg-card/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileCheck className="mr-2 h-5 w-5 text-emerald-400" />
                    Resume Content
                  </CardTitle>
                  <CardDescription>
                    Paste your resume content below for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste your resume text content here..."
                    className="h-[400px] bg-background/50 border-white/10"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={analyzeResume} 
                      disabled={isLoading} 
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      {isLoading ? (
                        <>Analyzing...</>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" /> Analyze Resume
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              {feedback ? (
                <Card className="bg-card/60 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-5 w-5 text-blue-400" />
                      Resume Analysis Results
                    </CardTitle>
                    <CardDescription>
                      Your ATS compatibility score and feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2">ATS Compatibility Score:</p>
                      <div className="flex items-center">
                        <Progress value={feedback.score} className="h-4 mr-4" />
                        <span className="font-bold text-lg">{feedback.score}%</span>
                      </div>
                      <p className="text-sm text-white/60 mt-2">
                        {feedback.score >= 80 ? 
                          "Excellent! Your resume is highly ATS-compatible." : 
                          feedback.score >= 60 ? 
                          "Good. Your resume will pass most ATS systems but could be improved." : 
                          "Your resume needs improvement to pass ATS systems effectively."}
                      </p>
                    </div>

                    <Tabs defaultValue="strengths">
                      <TabsList className="mb-4">
                        <TabsTrigger value="strengths">Strengths</TabsTrigger>
                        <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="strengths">
                        <ul className="space-y-2">
                          {feedback.strengths.map((strength: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      
                      <TabsContent value="weaknesses">
                        <ul className="space-y-2">
                          {feedback.weaknesses.map((weakness: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      
                      <TabsContent value="suggestions">
                        <ul className="space-y-2">
                          {feedback.suggestions.map((suggestion: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card/60 backdrop-blur-sm border-white/10 h-full flex flex-col justify-center items-center">
                  <CardContent className="py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 mx-auto flex items-center justify-center mb-4">
                      <FileCheck className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Ready to Analyze Your Resume</h3>
                    <p className="text-white/70 mb-6 max-w-md mx-auto">
                      Paste your resume content in the text area and click "Analyze Resume" to get feedback on your resume's ATS compatibility.
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

export default ResumeScorer;
