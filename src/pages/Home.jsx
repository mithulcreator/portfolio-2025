import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import { urlFor } from '../sanityImage';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    // Fetch homepage content with featured projects populated
    client.fetch(`*[_type == "homepage"][0]{
      heroTitle,
      heroSubtitle,
      heroImage,
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
      {/* Hero Section */}
      <div className="relative w-full mb-16">
        {homeContent.heroImage && (
          <img
            src={urlFor(homeContent.heroImage).width(1600).height(500).fit('crop').url()}
            alt="Hero"
            className="w-full h-[220px] sm:h-[300px] md:h-[360px] object-cover object-center rounded-2xl shadow-xl"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="backdrop-blur-xl bg-white/20 dark:bg-zinc-900/40 rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center gap-4 max-w-2xl mx-auto border border-white/30">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg">
              {homeContent.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-white text-center">
              {homeContent.heroSubtitle}
            </p>
            {homeContent.ctaText && homeContent.ctaLink && (
              <Link to={homeContent.ctaLink}>
                <button className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg transition-all">
                  {homeContent.ctaText}
                </button>
              </Link>
            )}
          </div>
        </div>
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
    </div>
  );
} 