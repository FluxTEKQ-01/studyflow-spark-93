
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// Declare the custom element to fix TypeScript error
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
        'background-color'?: string;
        'loading-indicator-color'?: string;
      };
    }
  }
}

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles size={18} className="mr-2" />
            <span>Introducing StudyFlow Spark for Students</span>
          </div>
          
          <div className="mb-12 w-full max-w-3xl mx-auto h-[400px]">
            <spline-viewer 
              url="https://prod.spline.design/DCrJEnM5TT94f63J/scene.splinecode"
              background-color="transparent"
              loading-indicator-color="#10b981"
              className="w-full h-full"
            ></spline-viewer>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Unlock Your <span className="text-gradient">Academic Potential</span> with AI-Powered Tools
          </h1>
          
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Boost your career prospects with our suite of AI tools designed specifically for students. 
            Create professional emails, ATS-optimized resumes, and practice with tailored interview questions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/tools">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium border-white/20 bg-white/5 hover:bg-white/10">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
