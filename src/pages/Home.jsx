import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import ProjectCard from '../components/ProjectCard';
import AnimatedBlobs from '../components/AnimatedBlobs';

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);
  const [error, setError] = useState(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);
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
    }`)
    .then(data => {
      console.log('Fetched data:', data);
      setHomeContent(data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setError(err.message);
    });
  }, []);

  // Fade out, change title, then fade in
  useEffect(() => {
    const fadeOut = setTimeout(() => setFade(false), 3200);
    const next = setTimeout(() => {
      setTitleIndex((prev) => (prev + 1) % heroTitles.length);
      setFade(true);
    }, 4000);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [titleIndex, heroTitles.length]);

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!homeContent) return <div className="text-white p-4">Loading...</div>;
  const featuredProjects = homeContent.featuredProjects || [];

  return (
    <div className="pt-12 pb-16">
      <AnimatedBlobs />
      {/* Enhanced Animated Hero Section */}
      <div className="flex flex-col items-center justify-center text-center min-h-[40vh] mb-16 pt-16 sm:pt-24">
        <div className="w-full max-w-3xl mx-auto min-h-[7.5rem] flex items-center justify-center relative">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg transition-opacity duration-[1200ms] ${fade ? 'opacity-100' : 'opacity-0'} mb-8`}
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