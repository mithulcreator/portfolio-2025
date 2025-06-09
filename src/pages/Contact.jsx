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

          {/* Email Address */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition-all text-base"
            >
              <FaEnvelope /> your@email.com
            </a>
          </div>
          
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