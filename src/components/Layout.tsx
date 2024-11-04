import React, { useState, useEffect, useRef, memo } from 'react';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  children: React.ReactNode;
}

const Layout = memo(({ currentPage, setCurrentPage, children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-gray-900 text-white ${isMenuOpen ? 'overflow-hidden' : ''}`}>
      <div 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-16' : 'h-20'
        }`}
        style={{
          background: isMenuOpen 
            ? 'rgba(17, 24, 39, 0.98)' 
            : 'rgba(13, 17, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`font-bold transition-all duration-300 ease-in-out ${
              isScrolled ? 'text-xl' : 'text-2xl md:text-3xl'
            } text-yellow-400 hover:text-yellow-300`}
          >
            Money Loving Monkeys
          </button>
          <div className="flex items-center gap-3 md:gap-4">
            <nav className="hidden md:block">
              <div className="relative flex gap-2 p-1 bg-gray-800/90 rounded-lg">
                <div 
                  className="absolute inset-y-1 w-[calc(50%-0.25rem)] bg-yellow-400 rounded transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(${currentPage === 'home' ? '0' : '100%'})`,
                    marginLeft: currentPage === 'home' ? '0' : '0.5rem'
                  }}
                />
                <button 
                  onClick={() => setCurrentPage('home')}
                  className={`px-4 py-2 rounded z-10 relative transition-colors duration-300 w-24 text-center ${
                    currentPage === 'home' 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setCurrentPage('miner')}
                  className={`px-4 py-2 rounded z-10 relative transition-colors duration-300 w-24 text-center ${
                    currentPage === 'miner' 
                      ? 'text-gray-900 font-semibold' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Miner
                </button>
              </div>
            </nav>
            <button
              className="md:hidden w-10 h-10 rounded-lg bg-yellow-400 text-gray-900 flex items-center justify-center hover:bg-yellow-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />
          <div ref={menuRef} className="fixed inset-x-0 top-0 min-h-screen bg-transparent pt-20 px-4">
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className={`w-full py-4 px-6 text-left text-lg transition-colors rounded-lg ${
                  currentPage === 'home'
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'bg-gray-800/90 text-gray-300'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('miner');
                  setIsMenuOpen(false);
                }}
                className={`w-full py-4 px-6 text-left text-lg transition-colors rounded-lg ${
                  currentPage === 'miner'
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'bg-gray-800/90 text-gray-300'
                }`}
              >
                Miner
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex-grow pt-16">
        {children}
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;