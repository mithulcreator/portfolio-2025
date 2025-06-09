import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';
import { FaArrowRight } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const hasVideo = project.content?.some(item => item._type === 'file' && item.asset?.mimeType?.startsWith('video/'));
  
  return (
    <Link to={`/project/${project.slug.current}`} className="group block h-80 md:h-96">
      <div className="relative overflow-hidden rounded-lg bg-zinc-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 h-full flex flex-col">
        {/* Cover Image or Video Thumbnail */}
        <div className="relative flex-1 h-full">
          {project.cover && (
            <img
              src={urlFor(project.cover).url()}
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          )}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900/60 backdrop-blur-sm">
            <div className="text-center px-4">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{project.title}</h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm font-medium text-blue-400">{project.category}</span>
                {project.type && (
                  <span className="text-sm text-zinc-400">•</span>
                )}
                {project.type && (
                  <span className="text-sm text-zinc-400">{project.type.join(', ')}</span>
                )}
              </div>
              <Link
                to={`/project/${project.slug.current}`}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                onClick={e => e.stopPropagation()}
              >
                View Details <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 