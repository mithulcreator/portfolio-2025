import React from 'react';
import profile from '../assets/profile.jpg'; // Adjust path if needed

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src={profile}
          alt="Mithul Subramanian"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            About Me
          </h1>
          <p className="text-zinc-200 text-lg max-w-2xl">
            I'm Mithul Subramanian—a multidisciplinary designer with 14+ years of experience transforming complex ideas into visual clarity. I specialize in branding, UI/UX, motion graphics, presentation storytelling, and AI-enhanced creativity. I work with tech owners, partners, and innovators. Based in Dubai, I build for both human logic and emotional impact—always experimenting, always evolving.
          </p>
        </div>
      </div>

      {/* Skills */}
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Presentation Design', tags: ['PowerPoint, Google Slides'] },
          { label: 'Motion Graphics', tags: ['After Effects, Figma'] },
          { label: 'UI/UX & Web Design', tags: [] },
          { label: 'AI + Design Automation', tags: ['MidJourney, GPT, Canva'] },
          { label: 'Print + Packaging Design', tags: [] },
          { label: 'Data Visualization & Diagram Design', tags: [] },
          { label: 'Copywriting for Creative Storytelling', tags: [] },
        ].map((skill, i) => (
          <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 shadow-lg flex flex-col gap-2">
            <span className="font-semibold text-zinc-100">{skill.label}</span>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag, j) => (
                <span key={j} className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</h2>
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 mb-10 shadow-lg">
        <h3 className="font-bold text-lg text-zinc-100 mb-1">Web Graphic & Presentation Designer</h3>
        <span className="text-blue-400 text-sm">2016–2024</span>
        <p className="text-zinc-300 mt-2 text-sm">
          Delivered 200+ successful projects across government, FZ, contractors, tech, partners and solution houses for design production, storytelling, and making decks that close deals. Key verticals: B2B, Government & Semi-Govt Sector, Advertising & PR Agencies, IT Software & Logistics Firms, Luxury Houses (Brand Position, Apparel)
        </p>
      </div>

      {/* Education */}
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Education</h2>
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-lg text-zinc-100 mb-1">Diploma in Graphic Design & Animation</h3>
        <span className="text-blue-400 text-sm">Loyola Multimedia • 2005–2006</span>
      </div>
    </div>
  );
} 