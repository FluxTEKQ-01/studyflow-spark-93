
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import EmailGenerator from "./pages/tools/EmailGenerator";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Import tools pages
import ResumeScorer from "./pages/tools/ResumeScorer";
import InterviewQuestions from "./pages/tools/InterviewQuestions";
import ProjectDocumentation from "./pages/tools/ProjectDocumentation";
import SOPGenerator from "./pages/tools/SOPGenerator";
import ResumeGenerator from "./pages/tools/ResumeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected dashboard route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected tool routes */}
            <Route 
              path="/tools/email-generator" 
              element={
                <ProtectedRoute>
                  <EmailGenerator />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tools/resume-generator" 
              element={
                <ProtectedRoute>
                  <ResumeGenerator />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tools/project-documentation" 
              element={
                <ProtectedRoute>
                  <ProjectDocumentation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tools/resume-scorer" 
              element={
                <ProtectedRoute>
                  <ResumeScorer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tools/interview-questions" 
              element={
                <ProtectedRoute>
                  <InterviewQuestions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tools/sop-letter-generator" 
              element={
                <ProtectedRoute>
                  <SOPGenerator />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
