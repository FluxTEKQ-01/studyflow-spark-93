
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                About <span className="text-gradient">StudentAI</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8">
                Empowering students worldwide with AI-powered tools for academic and career success.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-white/80 mb-8 text-center">
                To democratize access to advanced AI tools that help students excel in their academic journey and career development.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Education Accessibility</h3>
                  <p className="text-white/70">
                    We believe in making cutting-edge AI accessible to students regardless of background or resources, helping level the playing field in education and career advancement.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Ethical Innovation</h3>
                  <p className="text-white/70">
                    Our development process is guided by strong ethical principles, ensuring our AI tools enhance human creativity rather than replace it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Team</h2>
              <p className="text-lg text-white/80 mb-12 text-center">
                We're a diverse team of educators, AI engineers, and students passionate about the intersection of education and technology.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="glass-card p-6 rounded-xl text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-3xl text-emerald-400">
                        {item === 1 ? "JS" : item === 2 ? "AM" : "RK"}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">
                      {item === 1 ? "James Smith" : item === 2 ? "Alice Miller" : "Raj Kumar"}
                    </h3>
                    <p className="text-emerald-400 mb-3">
                      {item === 1 ? "CEO & Co-founder" : item === 2 ? "AI Research Lead" : "Education Specialist"}
                    </p>
                    <p className="text-white/70 text-sm">
                      {item === 1 
                        ? "Former educator with 10+ years in EdTech" 
                        : item === 2 
                          ? "PhD in Machine Learning, specializing in NLP" 
                          : "M.Ed with expertise in educational psychology"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-lg text-white/80 mb-8">
                Interested in being part of our mission to transform education with AI?
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/careers">
                  <Button size="lg" className="button-gradient">
                    View Career Opportunities
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                    Contact Us
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

export default About;
