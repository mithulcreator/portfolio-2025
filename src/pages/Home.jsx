import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const heroTitles = [
    'I Design Visual Solutions That Solve Real Business Problems',
    'Helping Brands Grow Through Purposeful, High-Impact Design',
    'Strategic Design That Moves People and Grows Businesses'
  ];

  useEffect(() => {
    // Fetch homepage content with featured projects populated
    client.fetch(`*[_type == "homepage"][0]{
      heroTitle,
      heroSubtitle,
      ctaText,
      ctaLink,
      featuredProjects[]-> {
        _id,
        title,
        slug,
        cover,
        type,
        role,
        tools,
        timeline
      }
    }`).then(setHomeContent);
  }, []);

  // Cycle through hero titles every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(titleIndex);
      setTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 3500);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [titleIndex, heroTitles.length]);

  if (!homeContent) return <div>Loading...</div>;
  const featuredProjects = homeContent.featuredProjects || [];

  // Calculate minHeight based on the longest title (for layout stability)
  const minHeight = '7.5rem';

  return (
    <div className="pt-12 pb-16">
      {/* Enhanced Animated Hero Section */}
      <div className="flex flex-col items-center justify-center text-center min-h-[40vh] mb-16 pt-16 sm:pt-24">
        <div className="relative flex items-center justify-center w-full" style={{ minHeight }}>
          {prevIndex !== null && prevIndex !== titleIndex && (
            <h1
              key={prevIndex}
              className="absolute left-0 right-0 mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg max-w-3xl opacity-0 transition-opacity duration-[1200ms]"
              style={{ transition: 'opacity 1.2s' }}
            >
              {heroTitles[prevIndex]}
            </h1>
          )}
          <h1
            key={titleIndex}
            className="absolute left-0 right-0 mx-auto text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg max-w-3xl opacity-100 transition-opacity duration-[1200ms]"
            style={{ transition: 'opacity 1.2s' }}
          >
            {heroTitles[titleIndex]}
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-zinc-200 animate-fade-slide delay-150 mb-8 max-w-2xl mx-auto leading-relaxed">
          {homeContent.heroSubtitle}
        </p>
        {homeContent.ctaText && homeContent.ctaLink && (
          <Link to={homeContent.ctaLink}>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full font-bold text-lg shadow-lg transition-all animate-fade-slide delay-300">
              {homeContent.ctaText}
            </button>
          </Link>
        )}
      </div>

      {/* Featured Projects */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-white drop-shadow-sm">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>

      {/* Simple CSS for fade-in and slide-up animation */}
      <style>{`
        .animate-fade-slide {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeSlideIn 1s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .animate-fade-slide.delay-150 {
          animation-delay: 0.15s;
        }
        .animate-fade-slide.delay-300 {
          animation-delay: 0.3s;
        }
        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 