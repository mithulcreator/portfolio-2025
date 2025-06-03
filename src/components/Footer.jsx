export default function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-8">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
               className="text-zinc-400 hover:text-white transition-colors duration-300">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
               className="text-zinc-400 hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer"
               className="text-zinc-400 hover:text-white transition-colors duration-300">
              Twitter
            </a>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Mithul. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 