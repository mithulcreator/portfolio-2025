import { FaEnvelope, FaLinkedin, FaGithub, FaDribbble, FaBehance } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="pt-12 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Let's Connect</h1>
        
        <div className="bg-zinc-800 rounded-2xl p-8 text-center">
          <p className="text-lg text-zinc-300 mb-6">
            I'm currently focusing on building my portfolio and taking on select projects. 
            Feel free to connect with me on social media for updates and future opportunities.
          </p>
          
          <div className="flex justify-center gap-6 mt-8">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://dribbble.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <FaDribbble className="w-8 h-8" />
            </a>
            <a
              href="https://behance.net/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <FaBehance className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 