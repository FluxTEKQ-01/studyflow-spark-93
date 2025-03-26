
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Gift, Award, Star } from 'lucide-react';

const CreditSection = () => {
  const packages = [
    {
      id: 'basic',
      name: 'Basic',
      credits: 50,
      price: 5,
      features: [
        'Access to all tools',
        '50 AI credits',
        'Email support',
        '7-day validity'
      ],
      icon: <CreditCard className="w-5 h-5" />,
      popular: false
    },
    {
      id: 'standard',
      name: 'Standard',
      credits: 150,
      price: 12,
      features: [
        'Access to all tools',
        '150 AI credits',
        'Priority email support',
        '30-day validity',
        'Download in multiple formats'
      ],
      icon: <Award className="w-5 h-5" />,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      credits: 300,
      price: 20,
      features: [
        'Access to all tools',
        '300 AI credits',
        'Priority email support',
        '60-day validity',
        'Download in multiple formats',
        'Advanced customization options'
      ],
      icon: <Star className="w-5 h-5" />,
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple <span className="text-gradient">Credit-Based</span> Pricing
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Purchase credits to use across all our AI tools. The more credits you buy, the more you save.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
                pkg.popular ? 'border-emerald-500/50 scale-105 relative z-10' : 'hover:border-white/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full uppercase">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <span className={`p-2 rounded-full ${pkg.popular ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10'}`}>
                    {pkg.icon}
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${pkg.price}</span>
                    <span className="text-white/60 ml-2">one-time</span>
                  </div>
                  <div className="text-emerald-400 font-medium mt-1">
                    {pkg.credits} credits
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/register">
                  <Button 
                    className={`w-full ${
                      pkg.popular ? 'button-gradient' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-emerald-500/20">
              <Gift className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Free Credits for Students</h3>
              <p className="text-white/70 text-sm">
                Verify your student status to get 30 free credits and unlock exclusive student discounts.
              </p>
            </div>
            <div className="ml-auto">
              <Link to="/student-verification">
                <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  Verify Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditSection;
