import { useState, useEffect } from 'react';
import { urlFor } from '../sanityImage';
import { client } from '../sanityClient';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Fetch logo from Sanity
    client.fetch(`*[_type == "siteSettings"][0].logo`).then(setLogo);
  }, []);

  return (
    <nav className="fixed left-0 right-0 w-full bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              {logo ? (
                <img 
                  src={urlFor(logo).width(40).height(40).fit('crop').url()} 
                  alt="Logo" 
                  className="h-8 w-auto mr-2 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="text-xl font-bold text-white group-hover:text-zinc-400 transition-colors duration-300">
                  Mithul
                </span>
              )}
            </a>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors duration-300">Home</Link>
            <Link to="/about" className="text-zinc-400 hover:text-white transition-colors duration-300">About</Link>
            <Link to="/work" className="text-zinc-400 hover:text-white transition-colors duration-300">Work</Link>
            <Link to="/contact" className="text-zinc-400 hover:text-white transition-colors duration-300">Contact</Link>
            <Link to="/testimonials" className="text-zinc-400 hover:text-white transition-colors duration-300">Testimonials</Link>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 