import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client } from '../sanityClient';
import { urlFor } from '../sanityImage';
import Lightbox from '../components/Lightbox';
import { FaArrowRight, FaCheckCircle, FaInfoCircle, FaImages, FaExchangeAlt, FaListOl, FaLightbulb, FaGraduationCap } from 'react-icons/fa';

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      role,
      tools,
      timeline,
      type,
      cover,
      gallery,
      client,
      problem,
      process,
      solution,
      outcome,
      learned,
      video,
      beforeText,
      beforeImg,
      afterText,
      afterImg
    }`, { slug }).then(setProject);
  }, [slug]);

  if (!project) return <div className="text-center py-20">Project not found.</div>;

  const singleGallery = project.gallery && project.gallery.length === 1;

  return (
    <div className="pt-12 pb-16">
      {/* Hero Section with Glassmorphism Overlay */}
      <div className="w-full relative mb-8">
        {project.cover && (
          <img src={urlFor(project.cover).width(1600).height(500).fit('crop').url()} alt={project.title} className="w-full h-[220px] sm:h-[300px] md:h-[360px] object-cover object-center rounded-2xl shadow-xl" />
        )}
        {/* Glassmorphism Overlay Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="backdrop-blur-xl bg-white/20 dark:bg-zinc-900/40 rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center gap-4 max-w-2xl mx-auto border border-white/30">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg">{project.title}</h1>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.type && project.type.map((type, idx) => (
                <span key={idx} className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {type}
                </span>
              ))}
              {project.role && <span className="bg-white/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">{project.role}</span>}
              {project.timeline && <span className="bg-white/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow">{project.timeline}</span>}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.tools && project.tools.map((tool, idx) => (
                <span key={idx} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium shadow">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern, auto-balancing bento grid */}
      {(() => {
        const cards = [];
        let cardCount = 0;
        // Overview
        cards.push(
          <div key="overview" className="bento-card bg-white/20 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 flex flex-col justify-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/30 dark:hover:bg-gray-800/90 cursor-pointer">
            <div className="flex items-center gap-2 mb-2">
              <FaInfoCircle className="text-blue-400 text-lg" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Overview</h2>
            </div>
            <div className="text-lg text-gray-700 dark:text-gray-200 font-semibold mb-2">{project.client}</div>
            <div className="text-base text-gray-500 dark:text-gray-400 mb-2">{project.problem}</div>
          </div>
        );
        cardCount++;
        // Gallery (featured, spans 2 columns on large screens)
        if (project.gallery && project.gallery.length > 0) {
          cards.push(
            <div key="gallery" className="bento-card bg-white/20 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 flex flex-col justify-center lg:col-span-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/30 dark:hover:bg-gray-800/90 cursor-pointer">
              <div className="flex items-center gap-2 mb-4">
                <FaImages className="text-purple-400 text-lg" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gallery</h2>
              </div>
              {singleGallery ? (
                <img
                  src={urlFor(project.gallery[0]).width(800).height(400).fit('crop').url()}
                  alt={project.gallery[0].alt || project.title}
                  className="rounded-xl shadow-lg w-full max-w-xl h-[240px] object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300 mx-auto"
                  onClick={() => setLightboxIndex(0)}
                />
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-400/40 scrollbar-track-transparent hide-scrollbar">
                  {project.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={urlFor(img).width(600).height(340).fit('crop').url()}
                      alt={img.alt || project.title}
                      className="rounded-xl shadow-md min-w-[320px] h-[200px] object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => setLightboxIndex(idx)}
                    />
                  ))}
                </div>
              )}
              <Lightbox
                images={project.gallery.map(img => ({ src: urlFor(img).url(), alt: img.alt || project.title }))}
                activeIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
              />
            </div>
          );
          cardCount += 2; // spans 2 columns
        }
        // Before/After
        if (project.beforeText || project.afterText || project.beforeImg || project.afterImg) {
          cards.push(
            <div key="beforeafter" className="bento-card bg-white/20 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 flex flex-col gap-6 lg:col-span-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/30 dark:hover:bg-gray-800/90 cursor-pointer">
              <div className="flex items-center gap-2 mb-4">
                <FaExchangeAlt className="text-pink-400 text-lg" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Before / After</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Before / Challenge */}
                {(project.beforeText || project.beforeImg) && (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">⏮️</span>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Before / Challenge</h2>
                    </div>
                    {project.beforeImg && (
                      <img
                        src={urlFor(project.beforeImg).width(500).height(300).fit('crop').url()}
                        alt="Before"
                        className="rounded-lg shadow mb-4 w-full object-cover max-h-48"
                      />
                    )}
                    {project.beforeText && (
                      <p className="text-gray-700 dark:text-gray-300 text-center">{project.beforeText}</p>
                    )}
                  </div>
                )}
                {/* After / Result */}
                {(project.afterText || project.afterImg) && (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">⏭️</span>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">After / Result</h2>
                    </div>
                    {project.afterImg && (
                      <img
                        src={urlFor(project.afterImg).width(500).height(300).fit('crop').url()}
                        alt="After"
                        className="rounded-lg shadow mb-4 w-full object-cover max-h-48"
                      />
                    )}
                    {project.afterText && (
                      <p className="text-gray-700 dark:text-gray-300 text-center">{project.afterText}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
          cardCount++;
        }
        // Process
        if (project.process && project.process.length > 0) {
          cards.push(
            <div key="process" className="bento-card bg-white/20 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/30 dark:hover:bg-gray-800/90 cursor-pointer">
              <div className="flex items-center gap-2 mb-4">
                <FaListOl className="text-yellow-400 text-lg" />
                <h2 className="text-lg font-bold text-white dark:text-white">Process</h2>
              </div>
              <ol className="space-y-4 list-decimal list-inside">
                {project.process.map((step, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-semibold text-blue-400 dark:text-blue-300">{step.step}:</span> <span className="text-white/90 dark:text-white/90">{step.description}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
          cardCount++;
        }
        // Solution
        if (project.solution) {
          cards.push(
            <div key="solution" className="bento-card bg-white/20 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/30 dark:hover:bg-gray-800/90 cursor-pointer">
              <div className="flex items-center gap-2 mb-4">
                <FaLightbulb className="text-amber-400 text-lg" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Solution</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
            </div>
          );
          cardCount++;
        }
        // Outcome
        if (project.outcome) {
          cards.push(
            <div key="outcome" className="bento-card bg-gradient-to-r from-green-100 via-green-50 to-green-100 dark:from-green-900 dark:via-green-800 dark:to-green-900 border-l-4 border-green-500 rounded-2xl shadow-xl p-6 flex items-center gap-3 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <FaCheckCircle className="text-green-600 dark:text-green-300 text-2xl" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FaCheckCircle className="text-green-600 dark:text-green-300 text-lg" />
                  <h2 className="text-lg font-bold text-green-800 dark:text-green-200">Outcome</h2>
                </div>
                <p className="text-green-900 dark:text-green-100 font-semibold text-base">{project.outcome}</p>
              </div>
            </div>
          );
          cardCount++;
        }
        // What I Learned
        if (project.learned) {
          cards.push(
            <div key="learned" className="bento-card bg-white/20 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/30 dark:hover:bg-gray-800/90 cursor-pointer">
              <div className="flex items-center gap-2 mb-4">
                <FaGraduationCap className="text-cyan-400 text-lg" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">What I Learned</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{project.learned}</p>
            </div>
          );
          cardCount++;
        }
        // Calculate columns (3 for lg, 2 for sm, 1 for mobile)
        let columns = 1;
        if (typeof window !== 'undefined') {
          if (window.innerWidth >= 1024) columns = 3;
          else if (window.innerWidth >= 640) columns = 2;
        }
        // Fallback for SSR
        if (!columns) columns = 3;
        // If last row is not full, add a spacer
        if (cardCount % columns !== 0) {
          const missing = columns - (cardCount % columns);
          for (let i = 0; i < missing; i++) {
            cards.push(<div key={`spacer-${i}`} className="bento-card invisible" />);
          }
        }
        return (
          <div className="max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min grid-auto-flow-dense">
            {cards}
          </div>
        );
      })()}

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center mt-12">
        <Link to="/contact">
          <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg transition-all">
            Contact Me <FaArrowRight />
          </button>
        </Link>
        <Link to="/work" className="mt-4 text-blue-500 hover:underline font-semibold">← See More Work</Link>
      </div>

      {/* Custom scrollbar style for gallery */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #60a5fa99;
          border-radius: 8px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        @media (max-width: 640px) {
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
} 