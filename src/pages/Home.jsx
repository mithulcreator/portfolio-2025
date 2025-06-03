import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';

export default function Home() {
  const { projects, error, loading } = useProjects();
  const featuredProjects = projects?.slice(0, 3) || [];

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-400 mx-auto"></div>
            <p className="mt-4 text-zinc-400">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-400">Error loading projects. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="space-y-8">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
                <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                  Hi, I'm
                </span>
                <br />
                <span className="inline-block transform hover:scale-105 transition-transform duration-300 text-zinc-400">
                  Mithul
                </span>
              </h1>
              <p className="text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                A creative designer and developer passionate about building beautiful, 
                user-centered digital experiences.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="/work"
                  className="group px-8 py-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 hover:scale-105"
                >
                  View My Work
                </a>
                <a
                  href="/contact"
                  className="group px-8 py-4 border border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 hover:scale-105"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project._id || index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 