
import React from 'react';
import { 
  CreditCard, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  UserPlus,
  Shield, 
  Zap, 
  Fingerprint
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <CreditCard className="w-8 h-8 text-emerald-500" />,
      title: 'Flexible Credit System',
      description: 'Pay only for what you use with our transparent credit-based system.'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
      title: 'Performance Analytics',
      description: 'Track the performance of your generated content with detailed analytics.'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-500" />,
      title: 'Industry Templates',
      description: 'Access specialized templates tailored to different industries and roles.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes through Applicant Tracking Systems with our advanced scoring algorithm.'
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-500" />,
      title: 'Real-Time Feedback',
      description: 'Get instant feedback and improvement suggestions for all your career documents.'
    },
    {
      icon: <UserPlus className="w-8 h-8 text-emerald-500" />,
      title: 'Student Verification',
      description: 'Verify your student status to unlock special discounts and free credits.'
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: 'Data Security',
      description: 'Your data is encrypted and never shared with third parties.'
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
      title: 'Advanced AI',
      description: 'Powered by state-of-the-art AI models for the best results.'
    },
    {
      icon: <Fingerprint className="w-8 h-8 text-emerald-500" />,
      title: 'Personalization',
      description: 'Customize every aspect of your generated content to match your needs.'
    }
  ];

  return (
    <section className="py-20 bg-card bg-opacity-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="text-gradient">Features</span> for Students
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our platform is packed with features designed to help students succeed in their academic and professional endeavors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/30"
            >
              <div className="bg-card p-3 rounded-lg w-max mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
