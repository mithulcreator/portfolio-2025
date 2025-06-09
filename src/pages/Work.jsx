import { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import ProjectCard from '../components/ProjectCard';

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all projects
    client.fetch(`*[_type == "project"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      cover,
      type,
      role,
      tools,
      timeline,
      category
    }`).then(data => {
      setProjects(data);
      setFilteredProjects(data);
      
      // Extract unique categories, filter out empty/null, fallback to []
      const uniqueCategories = [...new Set(data.map(project => project.category).filter(Boolean))];
      setCategories(uniqueCategories);
    });
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  return (
    <div className="pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">My Work</h1>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-8 z-10 relative bg-zinc-950/80 backdrop-blur rounded-full px-4 py-2">
          <button
            onClick={() => handleFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            All
          </button>
          {categories.length === 0 && (
            <span className="text-zinc-400 text-sm">No categories found</span>
          )}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
} 