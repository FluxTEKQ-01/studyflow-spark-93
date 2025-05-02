
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Careers = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: "AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Design and implement AI models for our educational tools platform, focusing on NLP and machine learning systems.",
      isNew: true
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Create intuitive and engaging user experiences for our platform, ensuring accessibility and visual appeal.",
      isNew: true
    },
    {
      id: 3,
      title: "Education Content Specialist",
      department: "Content",
      location: "Remote",
      type: "Contract",
      description: "Develop high-quality educational content that works effectively with our AI tools.",
      isNew: false
    },
    {
      id: 4,
      title: "Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead our marketing initiatives to promote our AI educational tools to universities and students.",
      isNew: false
    }
  ];

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
                Join Our <span className="text-gradient">Team</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-8">
                Help us build the future of AI-powered educational tools
              </p>
              <Button size="lg" className="button-gradient" asChild>
                <a href="#open-positions">View Open Positions</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Work With Us</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Mission-Driven Company</h3>
                  <p className="text-white/70">
                    Be part of a team that's making a real difference in education and career development for students worldwide.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Remote-First Culture</h3>
                  <p className="text-white/70">
                    Work from anywhere with our distributed team that spans multiple countries and time zones.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Cutting-Edge Technology</h3>
                  <p className="text-white/70">
                    Work with the latest AI technologies and contribute to innovative solutions in the EdTech space.
                  </p>
                </div>
                
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Growth Opportunities</h3>
                  <p className="text-white/70">
                    Continuous learning and career advancement in a rapidly growing startup environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Open Positions</h2>
              
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div key={job.id} className="glass-card p-6 rounded-xl relative">
                    {job.isNew && (
                      <Badge variant="secondary" className="absolute top-4 right-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                        New
                      </Badge>
                    )}
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="inline-flex items-center text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">
                        {job.location}
                      </span>
                      <span className="inline-flex items-center text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-white/70 mb-6">
                      {job.description}
                    </p>
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* No Positions Available Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Don't See a Fit?</h2>
              <p className="text-lg text-white/80 mb-8">
                We're always looking for talented individuals. Send us your resume and let's start a conversation.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
