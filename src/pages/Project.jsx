import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../sanityClient';
import { urlFor } from '../sanityClient';

export default function Project() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    .catch(error => {
      console.error('Error fetching project:', error);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-zinc-800 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-zinc-800 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-zinc-800 rounded w-full"></div>
              <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
              <div className="h-4 bg-zinc-800 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-zinc-400">The project you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-zinc-400">
            {project.category && (
              <span className="text-blue-400">{project.category}</span>
            )}
            {project.type && project.type.length > 0 && (
              <span>{project.type.join(' • ')}</span>
            )}
            {project.role && (
              <span>Role: {project.role}</span>
            )}
            {project.timeline && (
              <span>Timeline: {project.timeline}</span>
            )}
          </div>
        </div>

        {/* Project Cover Image */}
        {project.cover && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={urlFor(project.cover).url()}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Project Content */}
        <div className="prose prose-invert max-w-none">
          {project.content && project.content.map((block, index) => {
            if (block._type === 'block') {
              return (
                <div key={index} className="mb-6">
                  {block.children.map((child, childIndex) => (
                    <p key={childIndex} className="text-zinc-300">
                      {child.text}
                    </p>
                  ))}
                </div>
              );
            }
            if (block._type === 'image') {
              return (
                <div key={index} className="my-8">
                  <img
                    src={urlFor(block).url()}
                    alt={block.alt || ''}
                    className="rounded-lg"
                  />
                </div>
              );
            }
            if (block._type === 'file' && block.asset?.mimeType?.startsWith('video/')) {
              return (
                <div key={index} className="my-8">
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={block.asset.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Tools Used */}
        {project.tools && project.tools.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Tools Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 