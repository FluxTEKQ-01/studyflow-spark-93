
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AnimatedBackground from '../../components/AnimatedBackground';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const ResumeGenerator = () => {
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
                  <BreadcrumbPage>ATS-Friendly Resume Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">ATS-Friendly Resume Generator</h1>
            <p className="text-white/70 max-w-3xl">
              Create professional, ATS-optimized resumes tailored to your target roles with our premium resume generation tool.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto py-12">
            <Alert variant="default" className="bg-amber-500/10 border-amber-500/20 mb-8">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle>Coming Soon!</AlertTitle>
              <AlertDescription>
                Our ATS-Friendly Resume Generator is currently under development and will be available soon. 
                In the meantime, you can use our free <Link to="/tools/resume-scorer" className="text-amber-500 underline">Resume Scorer</Link> to analyze your existing resume.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/tools">
                  Browse Other Tools
                </Link>
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600" asChild>
                <Link to="/tools/resume-scorer">
                  Try Resume Scorer Instead
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResumeGenerator;
