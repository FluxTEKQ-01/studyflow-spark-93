
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you shortly.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <p className="text-white/70">
                      Reach out to us using the contact form or through any of the channels below.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Email</h3>
                    <p className="text-white/70">
                      support@studentai.com<br />
                      partnerships@studentai.com
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Office</h3>
                    <p className="text-white/70">
                      123 Innovation Drive<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Social Media</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-white/70 hover:text-emerald-400 transition-colors">
                        Twitter
                      </a>
                      <a href="#" className="text-white/70 hover:text-emerald-400 transition-colors">
                        LinkedIn
                      </a>
                      <a href="#" className="text-white/70 hover:text-emerald-400 transition-colors">
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="bg-card/50 border-white/10"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="bg-card/50 border-white/10"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        className="bg-card/50 border-white/10"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message here..."
                        className="bg-card/50 border-white/10 min-h-[150px]"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="button-gradient w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">How can I get started with StudentAI?</h3>
                  <p className="text-white/70">
                    Simply sign up for an account on our platform and you'll receive complimentary credits to try out our AI tools.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">Do you offer student discounts?</h3>
                  <p className="text-white/70">
                    Yes! We offer special pricing for verified students. Contact us with your academic email for more information.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">Can I request a custom AI tool for my institution?</h3>
                  <p className="text-white/70">
                    Absolutely. We work with educational institutions to develop custom AI solutions. Reach out to our partnerships team to discuss your requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
