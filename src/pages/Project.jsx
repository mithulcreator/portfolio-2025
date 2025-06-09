import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../sanityClient';
import { urlFor } from '../sanityImage';

export default function Project() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client.fetch(`*[_type == "project" && slug.current == $slug][0]{
      title,
      category,
      type,
      role,
      tools,
      timeline,
      content,
      cover
    }`, { slug })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 text-center text-zinc-400">Loading project...</div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-16 text-center text-zinc-400">Project not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
        {project.title}
      </h1>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {project.category && <span className="text-blue-400 font-medium">{project.category}</span>}
        {project.type && project.type.length > 0 && <span className="text-zinc-400">{project.type.join(' • ')}</span>}
        {project.role && <span className="text-zinc-400">Role: {project.role}</span>}
        {project.timeline && <span className="text-zinc-400">{project.timeline}</span>}
      </div>
      {project.cover && (
        <img
          src={urlFor(project.cover).width(900).height(400).fit('crop').url()}
          alt={project.title}
          className="w-full rounded-xl mb-8 object-cover"
        />
      )}
      {/* Render content blocks if present */}
      <div className="prose prose-invert max-w-none mb-8">
        {project.content && project.content.map((block, i) => {
          if (block._type === 'block') {
            return block.children.map((child, j) => (
              <p key={i + '-' + j}>{child.text}</p>
            ));
          }
          if (block._type === 'image') {
            return (
              <img
                key={i}
                src={urlFor(block).width(900).url()}
                alt={block.alt || ''}
                className="rounded-lg my-6"
              />
            );
          }
          if (block._type === 'file' && block.asset?.mimeType?.startsWith('video/')) {
            return (
              <video
                key={i}
                controls
                className="w-full rounded-lg my-6"
                src={block.asset.url}
              >
                Your browser does not support the video tag.
              </video>
            );
          }
          return null;
        })}
      </div>
      {/* Tools Used */}
      {project.tools && project.tools.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-2">Tools Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 