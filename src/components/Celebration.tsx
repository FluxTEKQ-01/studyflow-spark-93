
import React, { useState, useEffect } from 'react';
import { PartyPopper, Sparkles, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Toast } from '@/components/ui/toast';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import './Celebration.css';

const Confetti = () => {
  const colors = [
    '#10b981', // emerald-500
    '#34d399', // emerald-400
    '#6ee7b7', // emerald-300
    '#a7f3d0', // emerald-200
    '#f97316', // orange-500
    '#fb923c', // orange-400
    '#fdba74', // orange-300
    '#9333ea', // purple-600
    '#a855f7', // purple-500
    '#c084fc', // purple-400
  ];

  return (
    <div className="confetti-container fixed inset-0 w-full h-full pointer-events-none z-50">
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.floor(Math.random() * 10) + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = `${Math.random() * 100}%`;
        const animDuration = Math.random() * 3 + 2;
        const animDelay = Math.random() * 5;
        
        return (
          <motion.div 
            key={i}
            className="confetti absolute"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              left: left,
              top: '-20px',
              borderRadius: Math.random() > 0.5 ? '50%' : '0'
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ 
              y: ['0%', '100vh'], 
              opacity: [1, 1, 0],
              rotate: [`${Math.random() * 360}deg`, `${Math.random() * 720 + 360}deg`] 
            }}
            transition={{
              duration: animDuration,
              delay: animDelay,
              ease: [0.1, 0.25, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
};

const Celebration = () => {
  const { userProfile } = useAuth();
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    // Check if the user is new
    if (userProfile?.isNewUser) {
      setShowCelebration(true);
      
      // Show welcome toast
      toast({
        title: "🎉 Welcome to StudyFlow Spark!",
        description: "Congratulations on joining! You've received 10 free credits to start exploring our AI tools.",
        action: (
          <ToastAction altText="Explore Tools">
            <a href="/tools">Explore Tools</a>
          </ToastAction>
        ),
        duration: 10000,
      });
      
      // Clean up celebration effect after 15 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 15000);
      
      return () => clearTimeout(timer);
    }
  }, [userProfile]);
  
  if (!showCelebration) return null;
  
  return (
    <>
      <Confetti />
      
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="welcome-popup text-center">
          <motion.div 
            animate={{ 
              y: [0, -20, 0], 
              rotate: [0, -10, 10, -10, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            className="inline-block"
          >
            <PartyPopper className="h-16 w-16 mx-auto text-emerald-400 mb-2" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 shiny"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome to StudyFlow Spark!
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-white/80 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="h-6 w-6 text-yellow-400" /> 
            <span>Congratulations on joining our community!</span>
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </motion.div>
          
          <motion.div 
            className="mt-8 flex justify-center items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Gift className="h-5 w-5 text-emerald-400" />
            <span className="text-lg text-emerald-300">You've received 10 free credits to start exploring!</span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Celebration;
