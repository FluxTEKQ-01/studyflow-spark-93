
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, FileText, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Tools = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tools = [
    {
      id: 'email-generator',
      icon: <Mail className="w-8 h-8 text-emerald-500" />,
      title: 'AI Cold Email Generator',
      description: 'Craft personalized professional emails that get responses with industry-specific templates and tone customization.',
      credits: 10,
      path: '/tools/email-generator',
      badge: 'Most Popular'
    },
    {
      id: 'resume-generator',
      icon: <FileText className="w-8 h-8 text-emerald-500" />,
      title: 'ATS-Friendly Resume Generator',
      description: 'Create resumes optimized for Applicant Tracking Systems with keyword optimization and real-time scoring.',
      credits: 25,
      path: '/tools/resume-generator',
      badge: 'Premium'
    },
    {
      id: 'interview-questions',
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
      title: 'AI Interview Questions Generator',
      description: 'Practice with role-specific interview questions customized to your experience level and industry.',
      credits: 15,
      path: '/tools/interview-questions',
      badge: 'New'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>All Tools</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">AI-Powered Tools</span> for Students
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Explore our complete suite of AI tools designed to help students accelerate their career development and communication skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {tools.map((tool, index) => (
              <div 
                key={tool.id}
                className="tool-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {tool.badge && (
                  <Badge variant="secondary" className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {tool.badge}
                  </Badge>
                )}
                
                <div className="mb-6">{tool.icon}</div>
                
                <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
                
                <p className="text-white/70 mb-6 text-sm leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="credit-badge">
                    {tool.credits} credits
                  </div>
                  
                  <Link to={tool.path}>
                    <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                      Try Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/">
              <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
