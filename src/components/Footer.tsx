
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'AI Tools', href: '/tools' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Student Discounts', href: '/student-verification' },
        { label: 'Testimonials', href: '/testimonials' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Help Center', href: '/help' },
        { label: 'API Documentation', href: '/api-docs' },
        { label: 'Status', href: '/status' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/privacy' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-gradient">StudyFlow Spark</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              Empowering students with AI-powered tools to enhance their academic and professional success.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.href} 
                      className="text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {currentYear} StudyFlow Spark. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <Link to="/terms" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          <p className="flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-emerald-500" /> for students worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
