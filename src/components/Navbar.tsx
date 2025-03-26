
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu,
  X,
  User,
  CreditCard,
  Home,
  Mail,
  FileText,
  MessageSquare
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gradient">StudyFlow Spark</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/tools" className={`nav-link ${isActive('/tools') ? 'active' : ''}`}>
            AI Tools
          </Link>
          <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>
            Pricing
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="button-gradient">Register</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-white/10 animate-slide-down">
          <nav className="container mx-auto py-5 flex flex-col">
            <Link to="/" className="flex items-center space-x-2 py-3 px-4 hover:bg-white/5 rounded-md">
              <Home size={18} className="text-emerald-500" />
              <span>Home</span>
            </Link>
            <Link to="/tools" className="flex items-center space-x-2 py-3 px-4 hover:bg-white/5 rounded-md">
              <Mail size={18} className="text-emerald-500" />
              <span>AI Tools</span>
            </Link>
            <Link to="/pricing" className="flex items-center space-x-2 py-3 px-4 hover:bg-white/5 rounded-md">
              <CreditCard size={18} className="text-emerald-500" />
              <span>Pricing</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 py-3 px-4 hover:bg-white/5 rounded-md">
              <User size={18} className="text-emerald-500" />
              <span>About</span>
            </Link>
            <div className="flex flex-col space-y-2 mt-4 px-4 pt-4 border-t border-white/10">
              <Link to="/login">
                <Button variant="outline" className="w-full border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full button-gradient">Register</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
