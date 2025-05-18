
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookText, Download, Plus, Trash2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const ProjectDocumentation = () => {
  const { getIdToken, userProfile } = useAuth();
  const { toast } = useToast();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(['React', 'Node.js']);
  const [features, setFeatures] = useState<string[]>(['User authentication', 'CRUD operations']);
  const [newTechnology, setNewTechnology] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentation, setDocumentation] = useState<any>(null);

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setTechnologies([...technologies, newTechnology.trim()]);
      setNewTechnology('');
    }
  };

  const removeTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const generateDocumentation = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Project Name Required",
        description: "Please enter a name for your project.",
        variant: "destructive",
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description for your project.",
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
        'http://localhost:5000/api/tools/project-documentation',
        { 
          projectName, 
          description, 
          technologies, 
          features,
          toolCost: 15 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setDocumentation(response.data.documentation);
      toast({
        title: "Documentation Generated",
        description: "Project documentation has been successfully generated.",
      });
    } catch (error) {
      console.error('Error generating documentation:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating the documentation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadDocumentation = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
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
                  <BreadcrumbPage>Project Documentation Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Documentation Generator</h1>
            <p className="text-white/70 max-w-3xl">
              Generate comprehensive documentation for your projects including README files, API documentation, and user guides.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/60 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookText className="mr-2 h-5 w-5 text-emerald-400" />
                  Project Details
                </CardTitle>
                <CardDescription>
                  Enter your project information to generate documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input 
                    id="projectName" 
                    placeholder="e.g. My Awesome Project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="A brief description of your project..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-background/50 border-white/10 min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Technologies Used</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {technologies.map((tech, index) => (
                      <div key={index} className="bg-background/80 px-3 py-1 rounded-full text-sm flex items-center">
                        {tech}
                        <button 
                          onClick={() => removeTechnology(index)}
                          className="ml-2 text-white/60 hover:text-white/90"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="e.g. TypeScript"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      className="bg-background/50 border-white/10"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechnology();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={addTechnology}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Key Features</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {features.map((feature, index) => (
                      <div key={index} className="bg-background/80 px-3 py-1 rounded-full text-sm flex items-center">
                        {feature}
                        <button 
                          onClick={() => removeFeature(index)}
                          className="ml-2 text-white/60 hover:text-white/90"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="e.g. Dark mode support"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="bg-background/50 border-white/10"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={addFeature}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <div className="text-sm text-white/70 w-full mb-2">
                  <span className="font-medium text-emerald-400">15 credits</span> will be deducted from your account
                </div>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  onClick={generateDocumentation}
                  disabled={isLoading || !projectName || !description}
                >
                  {isLoading ? 'Generating...' : 'Generate Documentation'}
                </Button>
              </CardFooter>
            </Card>

            {documentation ? (
              <Card className="bg-card/60 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookText className="mr-2 h-5 w-5 text-emerald-400" />
                    Generated Documentation
                  </CardTitle>
                  <CardDescription>
                    Your project documentation is ready
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="readme">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="readme" className="flex-1">README.md</TabsTrigger>
                      <TabsTrigger value="api" className="flex-1">API Docs</TabsTrigger>
                      <TabsTrigger value="guide" className="flex-1">User Guide</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="readme">
                      <div className="bg-background/20 p-4 rounded-md border border-white/10 font-mono text-sm overflow-x-auto whitespace-pre-line">
                        {documentation.readme}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline"
                          onClick={() => downloadDocumentation(documentation.readme, 'README.md')}
                          className="flex gap-2"
                        >
                          <Download className="h-4 w-4" /> Download README
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="api">
                      <div className="bg-background/20 p-4 rounded-md border border-white/10 font-mono text-sm overflow-x-auto whitespace-pre-line">
                        {documentation.apiDocs}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline"
                          onClick={() => downloadDocumentation(documentation.apiDocs, 'API_DOCS.md')}
                          className="flex gap-2"
                        >
                          <Download className="h-4 w-4" /> Download API Docs
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="guide">
                      <div className="bg-background/20 p-4 rounded-md border border-white/10 font-mono text-sm overflow-x-auto whitespace-pre-line">
                        {documentation.userGuide}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline"
                          onClick={() => downloadDocumentation(documentation.userGuide, 'USER_GUIDE.md')}
                          className="flex gap-2"
                        >
                          <Download className="h-4 w-4" /> Download User Guide
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/60 backdrop-blur-sm border-white/10 h-full flex flex-col justify-center items-center">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center mb-4">
                    <BookText className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Documentation Preview</h3>
                  <p className="text-white/70 mb-6 max-w-md mx-auto">
                    Fill out the project details and click "Generate Documentation" to create comprehensive documentation files.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDocumentation;
