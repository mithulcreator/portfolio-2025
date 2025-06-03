import { useEffect, useState } from 'react';
import { client } from '../sanityClient';
import { urlFor } from '../sanityImage';
import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "testimonial"]{
      _id,
      name,
      company,
      quote,
      rating,
      image
    }`).then(setTestimonials);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {testimonial.image && (
              <img
                src={urlFor(testimonial.image).width(100).height(100).fit('crop').url()}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
            )}
            <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.quote}</p>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
            <p className="text-gray-500 dark:text-gray-400">{testimonial.company}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 