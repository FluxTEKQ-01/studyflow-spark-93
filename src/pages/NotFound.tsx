
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 bg-hero-pattern bg-cover bg-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto glass-card rounded-xl p-12 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-white/70 mb-8">
              We couldn't find the page you were looking for: {location.pathname}
            </p>
            <Link to="/">
              <Button size="lg" className="button-gradient">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
