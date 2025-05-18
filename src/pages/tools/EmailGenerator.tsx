
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { emailAPI, setAuthToken } from '../../services/api';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Mail, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const EmailGenerator = () => {
  const { userProfile, getIdToken } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    purpose: 'job_application',
    content: '',
  });
  
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);

  // Set auth token for API requests
  React.useEffect(() => {
    const setToken = async () => {
      const token = await getIdToken();
      setAuthToken(token);
    };
    setToken();
  }, [getIdToken]);

  // Mock AI email generation (in a real app, this would call an AI service)
  const generateEmailContent = async (data: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const templates: Record<string, string> = {
      job_application: `Dear ${data.recipient || 'Hiring Manager'},

Thank you for considering my application for the [Position] role. I was excited to see this opportunity at your company, as my background in [Your Background] aligns perfectly with the requirements.

[Your Relevant Experience and Skills]

I would welcome the opportunity to discuss how my skills and experience could benefit your team. Please find my resume attached for your review.

Thank you for your time and consideration.

Best regards,
[Your Name]`,
      networking: `Dear ${data.recipient || 'Contact'},

I hope this email finds you well. My name is [Your Name] and I am [Your Position/Background]. I am reaching out because [Reason for Contact].

I would greatly appreciate the opportunity to connect and discuss [Topic]. Would you be available for a brief call or coffee meeting in the coming weeks?

Thank you for considering my request, and I look forward to potentially connecting.

Best regards,
[Your Name]`,
      follow_up: `Dear ${data.recipient || 'Contact'},

I hope you're doing well. I wanted to follow up on our recent conversation about [Topic/Meeting/Interview].

[Additional Context or Information]

Thank you again for your time, and I look forward to hearing from you.

Best regards,
[Your Name]`
    };
    
    return templates[data.purpose] || 'Unable to generate email. Please try again.';
  };

  // Mutation for email generation
  const emailMutation = useMutation({
    mutationFn: async (formData: any) => {
      // In a real implementation, this would call your backend API
      const emailContent = await generateEmailContent(formData);
      
      // Call your backend API to save the generated email
      const result = await emailAPI.generateEmail({
        ...formData,
        content: emailContent,
        toolCost: 10 // Cost in credits
      });
      
      return { ...result.data, generatedContent: emailContent };
    },
    onSuccess: (data) => {
      setGeneratedEmail(data.generatedContent);
      toast({
        title: 'Email generated successfully',
        description: `Used 10 credits. You have ${userProfile?.credits - 10} credits remaining.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error generating email',
        description: error.message || 'Something went wrong',
        variant: 'destructive'
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailMutation.mutate(formData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                  <BreadcrumbLink href="/">
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">
                    <Link to="/tools">Tools</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Email Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI <span className="text-gradient">Cold Email</span> Generator
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Craft personalized professional emails that get responses with our AI-powered tool.
            </p>
            <div className="mt-4 bg-emerald-500/10 text-emerald-300 py-2 px-4 rounded-full inline-flex items-center text-sm">
              <Mail className="w-4 h-4 mr-2" />
              <span>10 credits per generation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Email generation form */}
            <Card className="bg-background/40 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Name</Label>
                    <Input
                      id="recipient"
                      name="recipient"
                      placeholder="John Doe"
                      value={formData.recipient}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Application for Software Developer Position"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Email Purpose</Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) => handleSelectChange('purpose', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job_application">Job Application</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="follow_up">Follow-Up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userProfile?.credits < 10 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        You need at least 10 credits to generate an email. 
                        <Link to="/pricing" className="underline ml-1">
                          Buy more credits
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="button-gradient w-full"
                    disabled={emailMutation.isPending || userProfile?.credits < 10}
                  >
                    {emailMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>Generate Email</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Generated email display */}
            <Card className="bg-background/40 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Generated Email</h3>
                  {generatedEmail && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleCopy} 
                      className="text-white/70 hover:text-white"
                    >
                      {copied ? (
                        <><CheckCircle className="h-4 w-4 mr-1" /> Copied</>
                      ) : (
                        <><Copy className="h-4 w-4 mr-1" /> Copy</>
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="bg-card p-4 rounded-md min-h-[300px] whitespace-pre-wrap">
                  {emailMutation.isPending ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="mr-2 h-6 w-6 animate-spin text-emerald-500" />
                      <span>Generating your email...</span>
                    </div>
                  ) : generatedEmail ? (
                    generatedEmail
                  ) : (
                    <p className="text-white/50 text-center pt-16">
                      Your generated email will appear here...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmailGenerator;
