import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);

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

  if (!homeContent) return <div>Loading...</div>;
  const featuredProjects = homeContent.featuredProjects || [];

  return (
    <div className="pt-12 pb-16">
      {/* Clean Animated Hero Section */}
      <div className="flex flex-col items-center justify-center text-center min-h-[40vh] mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white animate-fade-slide mb-4">
          {homeContent.heroTitle}
        </h1>
        <p className="text-lg sm:text-xl text-zinc-300 animate-fade-slide delay-150 mb-6">
          {homeContent.heroSubtitle}
        </p>
        {homeContent.ctaText && homeContent.ctaLink && (
          <Link to={homeContent.ctaLink}>
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg transition-all animate-fade-slide delay-300">
              {homeContent.ctaText}
            </button>
          </Link>
        )}
      </div>

      {/* Featured Projects */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
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