import { Link } from 'react-router-dom';
import { urlFor } from '../sanityImage';
import { FaArrowRight } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-xl bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Project Image with Overlay */}
      {project.cover && (
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <img
            src={urlFor(project.cover).width(800).height(400).fit('crop').url()}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {project.type && project.type.map((type, idx) => (
              <span key={idx} className="bg-zinc-800/90 text-zinc-300 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Smooth Hover Overlay with Title and Details */}
      <div className="absolute inset-0 flex flex-col justify-end bg-zinc-950/90 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-400 ease-in-out p-6 z-30 backdrop-blur-xl pointer-events-none group-hover:pointer-events-auto">
        <div className="flex-1 flex flex-col justify-end transition-all duration-400 ease-in-out">
          <h3 className="text-2xl font-bold text-white mb-1 truncate">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm mb-2 truncate font-semibold">
            {project.client}
          </p>
          {/* Tools Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tools && project.tools.map((tool, index) => (
              <span
                key={index}
                className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full text-xs font-medium shadow"
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-zinc-500 font-semibold">
              {project.timeline}
            </span>
            <Link to={`/work/${project.slug?.current || project.slug}`} tabIndex={-1}>
              <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-semibold shadow transition-all">
                View Details <FaArrowRight className="text-xs" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 