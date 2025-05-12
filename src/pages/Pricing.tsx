
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, Gift, Award, Star, BadgeDollarSign, TagIcon, BadgePercent } from 'lucide-react';

const Pricing = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      icon: <CreditCard className="w-6 h-6" />,
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
      icon: <Award className="w-6 h-6" />,
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
      icon: <Star className="w-6 h-6" />,
      popular: false
    }
  ];

  // Additional packages
  const enterprisePackages = [
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For educational institutions & organizations',
      features: [
        'Unlimited access for your team',
        'Bulk credit packages',
        'Dedicated account manager',
        'Custom integration options',
        'Usage analytics dashboard'
      ]
    },
    {
      id: 'campus',
      name: 'Campus Edition',
      description: 'For universities & colleges',
      features: [
        'Discounted rates for students',
        'Teacher/admin dashboard',
        'LMS integration',
        'Usage tracking & reporting',
        'Bulk student onboarding'
      ]
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do credits work?",
      answer: "Credits are used to generate content with our AI tools. Each tool requires a certain number of credits per use, displayed on the tool card. Once purchased, credits remain in your account until used or expired based on your package validity period."
    },
    {
      question: "Can I get a refund for unused credits?",
      answer: "We don't offer refunds for purchased credits, but we do offer a free trial with limited credits so you can test our tools before committing to a purchase."
    },
    {
      question: "Do credits expire?",
      answer: "Yes, credits expire based on your package's validity period: 7 days for Basic, 30 days for Standard, and 60 days for Premium packages."
    },
    {
      question: "Can I share my credits with others?",
      answer: "Individual accounts cannot share credits. For team collaboration, consider our Enterprise solutions which allow for shared credit pools."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-10 md:pt-28 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Simple <span className="text-gradient">Credit-Based</span> Pricing
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8">
                Purchase credits to use across all our AI tools. The more credits you buy, the more you save.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <BadgeDollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-white/80">Pay only for what you use</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <BadgePercent className="w-5 h-5 text-emerald-400" />
                  <span className="text-white/80">Volume discounts available</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`relative overflow-hidden transition-all duration-300 h-full ${
                    pkg.popular ? 'transform md:scale-105 z-10' : 'z-0'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full uppercase">
                      Most Popular
                    </div>
                  )}
                  <Card className={`h-full glass-card border ${pkg.popular ? 'border-emerald-500/50' : 'border-white/10 hover:border-white/20'}`}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <span className={`p-2 rounded-full ${pkg.popular ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10'}`}>
                          {pkg.icon}
                        </span>
                      </div>
                      <CardDescription className="mt-2">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-white">${pkg.price}</span>
                          <span className="text-white/60 ml-2">one-time</span>
                        </div>
                        <div className="text-emerald-400 font-medium mt-1">
                          {pkg.credits} credits
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-white/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link to="/register" className="w-full">
                        <Button 
                          className={`w-full ${
                            pkg.popular ? 'button-gradient' : 'bg-white/10 hover:bg-white/20 text-white'
                          }`}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Offer */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-card rounded-xl p-8 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Gift className="w-12 h-12 text-emerald-400" />
                  </div>
                </div>
                <div className="md:w-2/4">
                  <h2 className="text-2xl font-bold mb-4">Free Credits for Students</h2>
                  <p className="text-white/80 mb-6">
                    We believe in supporting education. Verify your student status to receive 30 free credits and unlock exclusive student discounts on all our packages.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-2" />
                      <span>30 free credits upon verification</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-2" />
                      <span>20% discount on all packages</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-500 mr-2" />
                      <span>Extended validity periods</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/4 flex justify-center md:justify-end">
                  <Link to="/student-verification">
                    <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                      Verify Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Options */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Enterprise <span className="text-gradient">Solutions</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {enterprisePackages.map(pkg => (
                  <Card key={pkg.id} className="glass-card border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                    <CardHeader>
                      <CardTitle>{pkg.name}</CardTitle>
                      <CardDescription className="text-white/70">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-white/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link to="/contact" className="w-full">
                        <Button variant="outline" className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                          Contact Sales
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-white/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of students who are already using our AI tools to boost their academic and professional success.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="button-gradient">
                    Create Account
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                    Explore Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
