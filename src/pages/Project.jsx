import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { client } from '../sanityClient';
import { urlFor } from '../sanityImage';
import Lightbox from '../components/Lightbox';
import { FaArrowRight, FaCheckCircle, FaInfoCircle, FaImages, FaExchangeAlt, FaListOl, FaLightbulb, FaGraduationCap, FaVideo } from 'react-icons/fa';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: <FaInfoCircle /> },
  { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
  { id: 'beforeafter', label: 'Before/After', icon: <FaExchangeAlt /> },
  { id: 'process', label: 'Process', icon: <FaListOl /> },
  { id: 'solution', label: 'Solution', icon: <FaLightbulb /> },
  { id: 'outcome', label: 'Outcome', icon: <FaCheckCircle /> },
  { id: 'learned', label: 'Learned', icon: <FaGraduationCap /> },
  { id: 'video', label: 'Video', icon: <FaVideo /> },
];

export default function Project() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState('overview');

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

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const offsets = Object.entries(sectionRefs.current).map(([id, el]) => {
        if (!el) return { id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id, top: Math.abs(rect.top - 120) }; // 120px offset for sticky nav
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) setActiveSection(offsets[0].id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  if (!project) return <div className="text-center py-20">Project not found.</div>;

  // Build available sections
  const sectionData = [
    {
      id: 'overview',
      show: project.client || project.problem,
      content: (
        <>
          <div className="flex items-center gap-2 mb-2">
            <FaInfoCircle className="text-blue-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Overview</h2>
          </div>
          <div className="text-lg text-blue-300 font-semibold mb-2">{project.client}</div>
          <div className="text-base text-zinc-300 mb-2">{project.problem}</div>
        </>
      ),
    },
    {
      id: 'gallery',
      show: project.gallery && project.gallery.length > 0,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaImages className="text-purple-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Gallery</h2>
          </div>
          {project.gallery && project.gallery.length === 1 ? (
            <img
              src={urlFor(project.gallery[0]).width(1200).height(700).fit('crop').url()}
              alt={project.gallery[0].alt || project.title}
              className="rounded-xl shadow-lg w-full max-w-3xl h-[350px] object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300 mx-auto"
              onClick={() => setLightboxIndex(0)}
            />
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 custom-gallery-scrollbar hide-scrollbar">
              {project.gallery && project.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={urlFor(img).width(900).height(600).fit('crop').url()}
                  alt={img.alt || project.title}
                  className="rounded-xl shadow-md min-w-[220px] sm:min-w-[320px] md:min-w-[420px] h-[220px] sm:h-[260px] md:h-[320px] object-cover object-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setLightboxIndex(idx)}
                />
              ))}
            </div>
          )}
          <Lightbox
            images={project.gallery ? project.gallery.map(img => ({ src: urlFor(img).url(), alt: img.alt || project.title })) : []}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        </>
      ),
    },
    {
      id: 'beforeafter',
      show: project.beforeText || project.afterText || project.beforeImg || project.afterImg,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaExchangeAlt className="text-pink-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Before / After</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(project.beforeText || project.beforeImg) && (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⏮️</span>
                  <h2 className="text-lg font-bold text-white">Before / Challenge</h2>
                </div>
                {project.beforeImg && (
                  <img
                    src={urlFor(project.beforeImg).width(500).height(300).fit('crop').url()}
                    alt="Before"
                    className="rounded-lg shadow mb-4 w-full object-cover max-h-48"
                  />
                )}
                {project.beforeText && (
                  <p className="text-zinc-300 text-center">{project.beforeText}</p>
                )}
              </div>
            )}
            {(project.afterText || project.afterImg) && (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">⏭️</span>
                  <h2 className="text-lg font-bold text-white">After / Result</h2>
                </div>
                {project.afterImg && (
                  <img
                    src={urlFor(project.afterImg).width(500).height(300).fit('crop').url()}
                    alt="After"
                    className="rounded-lg shadow mb-4 w-full object-cover max-h-48"
                  />
                )}
                {project.afterText && (
                  <p className="text-zinc-300 text-center">{project.afterText}</p>
                )}
              </div>
            )}
          </div>
        </>
      ),
    },
    {
      id: 'process',
      show: project.process && project.process.length > 0,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaListOl className="text-yellow-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Process</h2>
          </div>
          <ol className="space-y-4 list-decimal list-inside">
            {project.process && project.process.map((step, idx) => (
              <li key={idx} className="mb-2">
                <span className="font-semibold text-blue-400">{step.step}:</span> <span className="text-zinc-200">{step.description}</span>
              </li>
            ))}
          </ol>
        </>
      ),
    },
    {
      id: 'solution',
      show: project.solution,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaLightbulb className="text-green-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Solution</h2>
          </div>
          <p className="text-zinc-200">{project.solution}</p>
        </>
      ),
    },
    {
      id: 'outcome',
      show: project.outcome,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaCheckCircle className="text-blue-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Outcome</h2>
          </div>
          <p className="text-zinc-200 font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg px-2 py-1 border border-blue-500/40 shadow-lg">{project.outcome}</p>
        </>
      ),
    },
    {
      id: 'learned',
      show: project.learned,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaGraduationCap className="text-purple-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Learned</h2>
          </div>
          <p className="text-zinc-200">{project.learned}</p>
        </>
      ),
    },
    {
      id: 'video',
      show: project.video,
      content: (
        <>
          <div className="flex items-center gap-2 mb-4">
            <FaVideo className="text-blue-400 text-lg" />
            <h2 className="text-xl font-bold text-white">Video</h2>
          </div>
          <video
            controls
            className="w-full rounded-lg my-6 max-h-96"
            src={project.video}
          >
            Your browser does not support the video tag.
          </video>
        </>
      ),
    },
  ];

  // Filter only shown sections
  const shownSections = sectionData.filter(s => s.show);

  return (
    <div className="pt-12 pb-16">
      {/* Fixed Section Navigation (below Navbar) */}
      <nav className="fixed top-16 left-0 w-full z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 shadow-lg flex justify-center py-2 px-2">
        <div className="flex gap-4 max-w-2xl w-full justify-center">
          {shownSections.map((section, i) => {
            const sec = SECTIONS.find(s => s.id === section.id);
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  sectionRefs.current[section.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeSection === section.id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-500 shadow-lg' : 'bg-white/10 text-zinc-200 border-zinc-700 hover:bg-blue-500/10'}`}
              >
                {sec.icon} {sec.label}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed nav */}
      {/* Project Header */}
      <div className="max-w-4xl mx-auto mb-10 px-4">
        {project.cover && (
          <img src={urlFor(project.cover).width(1600).height(500).fit('crop').url()} alt={project.title} className="w-full h-[220px] sm:h-[300px] md:h-[360px] object-cover object-center rounded-2xl shadow-xl mb-6" />
        )}
        <div className="backdrop-blur-xl bg-zinc-900/80 rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center gap-4 border border-white/10">
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

      {/* Masonry/Bento Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-8 xl:px-24 auto-rows-min"
        style={{ gridAutoFlow: 'dense' }}
      >
        {shownSections.map((section, i) => (
          <section
            key={section.id}
            ref={el => sectionRefs.current[section.id] = el}
            id={section.id}
            className={`bg-zinc-800 border border-zinc-700 rounded-2xl shadow-xl
              ${section.id === 'gallery' || section.id === 'beforeafter' ? 'lg:col-span-2 p-8' : 'p-4'}
              ${section.id === 'overview' ? 'max-w-md p-4 text-base' : ''}
              flex flex-col justify-center transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              ${section.id === 'outcome' ? 'ring-2 ring-blue-500/40 ring-offset-2 ring-offset-zinc-900' : ''}
              ${section.id === 'overview' && activeSection === 'overview' ? 'ring-2 ring-blue-400/30 ring-offset-2 ring-offset-zinc-900' : ''}`}
          >
            {section.content}
          </section>
        ))}
      </div>

      {/* Custom scrollbar style for gallery */}
      <style>{`
        .custom-gallery-scrollbar::-webkit-scrollbar {
          height: 12px;
        }
        .custom-gallery-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #3b82f6 40%, #a78bfa 100%);
          border-radius: 8px;
        }
        .custom-gallery-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 8px;
        }
        .custom-gallery-scrollbar {
          scrollbar-color: #6366f1 #18181b;
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
} 