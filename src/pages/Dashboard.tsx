
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import Celebration from '../components/Celebration';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { CreditCard, User, History, Settings } from 'lucide-react';

const Dashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <Celebration />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            Welcome, {userProfile?.displayName || 'User'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Available Credits</CardTitle>
                <CardDescription>Your current balance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-500">{userProfile?.credits || 0}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Buy Credits
                </Button>
              </CardFooter>
            </Card>
            
            {/* More dashboard cards will go here */}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Your Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Tool cards - similar to the ones on the Tools page */}
            <Link to="/tools/email-generator" className="tool-card">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Cold Email Generator</h3>
              <p className="text-white/70 mb-4 text-sm">
                Craft personalized professional emails that get responses.
              </p>
              <div className="mt-auto">
                <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                  Launch Tool
                </Button>
              </div>
            </Link>
            
            <Link to="/tools/resume-scorer" className="tool-card">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">ATS Resume Scorer</h3>
              <p className="text-white/70 mb-4 text-sm">
                Get instant feedback on your resume with AI analysis.
              </p>
              <div className="mt-auto">
                <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                  Launch Tool
                </Button>
              </div>
            </Link>
            
            <Link to="/tools/interview-questions" className="tool-card">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Interview Questions</h3>
              <p className="text-white/70 mb-4 text-sm">
                Practice with role-specific interview questions.
              </p>
              <div className="mt-auto">
                <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                  Launch Tool
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
