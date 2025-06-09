import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';
import { FaArrowRight } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const hasVideo = project.content?.some(item => item._type === 'file' && item.asset?.mimeType?.startsWith('video/'));
  
  return (
    <Link to={`/project/${project.slug.current}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-zinc-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
        {/* Cover Image or Video Thumbnail */}
        <div className="aspect-w-16 aspect-h-9 relative">
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
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-blue-400">{project.category}</span>
            {project.type && (
              <span className="text-sm text-zinc-400">•</span>
            )}
            {project.type && (
              <span className="text-sm text-zinc-400">{project.type.join(', ')}</span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          {project.role && (
            <p className="text-zinc-400 text-sm mb-2">Role: {project.role}</p>
          )}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-zinc-700 text-zinc-300 rounded-full transition-colors duration-300 group-hover:bg-blue-500/20 group-hover:text-blue-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 