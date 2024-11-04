import React from 'react';
import { Twitter, Instagram } from 'lucide-react';
import TokenClaim from './TokenClaim';

const HomePage = () => {
  return (
    <main className="flex-grow flex flex-col items-center p-8 text-center min-h-[calc(100vh-4rem)] pt-24 md:pt-32">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-400">
        You're early!
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-8">
        Too early... come back later
      </p>

      <TokenClaim />

      <div className="mt-16">
        <p className="text-gray-400 mb-3 text-lg">Check our socials for updates</p>
        <div className="flex justify-center space-x-8">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
            <Twitter className="w-7 h-7" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">
            <Instagram className="w-7 h-7" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
};

export default HomePage;