
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, FileText, MessageSquare, ArrowRight, FileCheck } from 'lucide-react';

const ToolsSection = () => {
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
      id: 'resume-scorer',
      icon: <FileCheck className="w-8 h-8 text-emerald-500" />,
      title: 'ATS Resume Scorer',
      description: 'Upload your resume and get instant feedback with an ATS compatibility score, keyword analysis, and improvement suggestions.',
      credits: 15,
      path: '/tools/resume-scorer',
      badge: 'New'
    },
    {
      id: 'interview-questions',
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
      title: 'AI Interview Questions Generator',
      description: 'Practice with role-specific interview questions customized to your experience level and industry.',
      credits: 15,
      path: '/tools/interview-questions'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Tools for <span className="text-gradient">Student Success</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our suite of specialized AI tools designed to help students accelerate their career development and communication skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.slice(0, 3).map((tool, index) => (
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

        <div className="text-center mt-12">
          <Link to="/tools">
            <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
              View All Tools
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
