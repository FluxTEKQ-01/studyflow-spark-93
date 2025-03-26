
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Computer Science Student',
      university: 'MIT',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      quote: 'The AI Cold Email Generator helped me secure an internship at a top tech company. The personalized emails really made a difference in getting responses!'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Business Administration Student',
      university: 'Stanford University',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      quote: 'The ATS-friendly resume generator completely transformed my job application process. I've received callbacks from 80% of the positions I've applied to!'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Engineering Graduate',
      university: 'UC Berkeley',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
      quote: 'Practicing with the AI Interview Questions Generator gave me the confidence I needed for my job interviews. The industry-specific questions were spot on!'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Success Stories</span> From Our Users
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            See how students around the world are using StudyFlow Spark to advance their careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/30"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-emerald-500 fill-emerald-500" />
                ))}
              </div>
              
              <p className="text-white/80 italic mb-6">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                  <div className="text-emerald-400 text-xs">{testimonial.university}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
