
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Edit, Download, Copy, CheckCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const SOPGenerator = () => {
  const { getIdToken, userProfile } = useAuth();
  const { toast } = useToast();
  const [letterType, setLetterType] = useState('sop');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [program, setProgram] = useState('');
  const [achievements, setAchievements] = useState<string[]>(['Dean\'s List for academic excellence', 'Published research paper in related field']);
  const [achievementInput, setAchievementInput] = useState('');
  const [goals, setGoals] = useState<string[]>(['Advance my knowledge in the field', 'Contribute to cutting-edge research']);
  const [goalInput, setGoalInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const addAchievement = () => {
    if (achievementInput.trim()) {
      setAchievements([...achievements, achievementInput.trim()]);
      setAchievementInput('');
    }
  };

  const addGoal = () => {
    if (goalInput.trim()) {
      setGoals([...goals, goalInput.trim()]);
      setGoalInput('');
    }
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const generateLetter = async () => {
    if (!name) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!institution) {
      toast({
        title: "Institution Required",
        description: "Please enter the institution name.",
        variant: "destructive",
      });
      return;
    }

    if (!program) {
      toast({
        title: "Program Required",
        description: "Please enter the program you're applying for.",
        variant: "destructive",
      });
      return;
    }

    if (userProfile?.credits < 20) {
      toast({
        title: "Insufficient Credits",
        description: "You need 20 credits to use this tool. Please purchase more credits.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = await getIdToken();
      const response = await axios.post(
        'http://localhost:5000/api/tools/sop-letter-generator',
        {
          type: letterType,
          name,
          institution,
          program,
          achievements,
          goals,
          toolCost: 20
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setGeneratedContent(response.data.content);
      toast({
        title: "Letter Generated",
        description: `Your ${letterType === 'sop' ? 'Statement of Purpose' : 'Recommendation Letter'} has been generated successfully.`,
      });
    } catch (error) {
      console.error('Error generating letter:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${letterType === 'sop' ? 'Statement_of_Purpose' : 'Recommendation_Letter'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
                  <BreadcrumbPage>SOP & Recommendation Letter Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">SOP & Recommendation Letter Generator</h1>
            <p className="text-white/70 max-w-3xl">
              Create compelling Statements of Purpose and Letters of Recommendation tailored to your achievements and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/60 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit className="mr-2 h-5 w-5 text-pink-400" />
                  Letter Generator
                </CardTitle>
                <CardDescription>
                  Fill in the details to generate your personalized letter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="mb-2 block">Select Letter Type</Label>
                  <ToggleGroup type="single" value={letterType} onValueChange={(value) => value && setLetterType(value)} className="justify-start">
                    <ToggleGroupItem value="sop" className="text-sm">Statement of Purpose</ToggleGroupItem>
                    <ToggleGroupItem value="recommendation" className="text-sm">Recommendation Letter</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {letterType === 'sop' ? 'Your Full Name' : 'Student\'s Full Name'}
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Target Institution</Label>
                  <Input 
                    id="institution" 
                    placeholder="e.g. Stanford University"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="program">Program/Position</Label>
                  <Input 
                    id="program" 
                    placeholder="e.g. Master's in Computer Science"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="bg-background/80 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <span className="text-xs text-white/60">•</span>
                        {achievement}
                        <button 
                          onClick={() => removeAchievement(index)}
                          className="text-white/60 hover:text-white/90"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add an achievement..."
                      value={achievementInput}
                      onChange={(e) => setAchievementInput(e.target.value)}
                      className="bg-background/50 border-white/10"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addAchievement();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={addAchievement}
                      className="whitespace-nowrap"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="goals">Academic/Career Goals</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {goals.map((goal, index) => (
                      <div key={index} className="bg-background/80 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <span className="text-xs text-white/60">•</span>
                        {goal}
                        <button 
                          onClick={() => removeGoal(index)}
                          className="text-white/60 hover:text-white/90"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a goal..."
                      value={goalInput}
                      onChange={(e) => setGoalInput(e.target.value)}
                      className="bg-background/50 border-white/10"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addGoal();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={addGoal}
                      className="whitespace-nowrap"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <div className="text-sm text-white/70 w-full mb-2">
                  <span className="font-medium text-pink-400">20 credits</span> will be deducted from your account
                </div>
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={generateLetter}
                  disabled={isLoading || !name || !institution || !program}
                >
                  {isLoading ? 'Generating...' : 'Generate Letter'}
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit className="mr-2 h-5 w-5 text-pink-400" />
                  Generated Letter
                </CardTitle>
                <CardDescription>
                  {generatedContent ? 
                    `Your ${letterType === 'sop' ? 'Statement of Purpose' : 'Recommendation Letter'} is ready` : 
                    "Your generated letter will appear here"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <>
                    <div className="bg-background/20 p-4 rounded-md border border-white/10 font-mono text-sm overflow-y-auto whitespace-pre-line h-[400px]">
                      {generatedContent}
                    </div>
                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                      <Button 
                        variant="outline"
                        onClick={copyToClipboard}
                        className="flex gap-2"
                      >
                        {copied ? (
                          <><CheckCircle className="h-4 w-4" /> Copied</>
                        ) : (
                          <><Copy className="h-4 w-4" /> Copy Text</>
                        )}
                      </Button>
                      <Button 
                        variant="default"
                        onClick={downloadLetter}
                        className="flex gap-2 bg-pink-500 hover:bg-pink-600"
                      >
                        <Download className="h-4 w-4" /> Download Letter
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="h-[460px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-pink-500/20 mx-auto flex items-center justify-center mb-4">
                      <Edit className="h-8 w-8 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No Letter Generated Yet</h3>
                    <p className="text-white/70 mb-6 text-center max-w-sm">
                      Fill out the form and click "Generate Letter" to create your personalized {letterType === 'sop' ? 'Statement of Purpose' : 'Recommendation Letter'}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SOPGenerator;
