
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ToolsSection from '../components/ToolsSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialSection from '../components/TestimonialSection';
import CreditSection from '../components/CreditSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ToolsSection />
        <FeaturesSection />
        <TestimonialSection />
        <CreditSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
