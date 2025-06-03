import { useEffect, useState } from 'react';
import { client } from '../sanityClient';
import { urlFor } from '../sanityImage';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        console.log('Fetching about data...');
        const data = await client.fetch(`*[_type == "about"][0]{
          profileImage,
          bio,
          experience,
          education,
          skills,
          gallery
        }`);
        console.log('About data fetched:', data);
        setAboutData(data);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading about information...</p>
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
            <p className="text-red-600 dark:text-red-400">Error loading about information. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-300">No about information found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Me Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            {aboutData.profileImage && (
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-xl">
                <img
                  src={urlFor(aboutData.profileImage).width(400).height(400).fit('crop').url()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {aboutData.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(aboutData.skills || []).map((skillGroup, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {(skillGroup.items || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>
          <div className="space-y-8">
            {(aboutData.experience || []).map((exp, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {exp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{exp.company} • {exp.period}</p>
                <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
          <div className="space-y-8">
            {(aboutData.education || []).map((edu, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {edu.degree}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{edu.institution} • {edu.period}</p>
                <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        {(aboutData.gallery || []).length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(aboutData.gallery || []).map((image, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={urlFor(image).width(600).height(400).fit('crop').url()}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                      <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 