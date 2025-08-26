// components/About.js
"use client";
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Banner Section */}
      {/* Using rounded-xl and shadow-2xl for attractive visual effects */}
      {/* Added pt-20 for spacing from the header */}
      <div className="relative w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl pt-7">
        <img
          src="https://live.staticflickr.com/65535/54745510629_fe622569fd_b.jpg"
          alt="FMovies Watch Banner"
          className="w-full h-full object-cover object-center rounded-xl"
          // Image error handling (fallback)
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=FMovies-Watch';
          }}
        />
        {/* Gradient overlay to ensure text on the banner is clearly legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>
      
      {/* Main Content Container */}
      {/* Adjusted padding for top and bottom spacing */}
      <div className="px-4 md:px-8 py-9"> 
        {/* About Us Section */}
        <section className="bg-gray-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          {/* Main title and short description */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-2 text-blue-500">
              FMovies Watch: Watch Free Movies and TV Series
            </h1>
            <p className="text-xl md:text-2xl font-semibold opacity-80 mt-2">
              Unlimited and High-Quality HD/FHD/4K Entertainment
            </p>
          </div>
          
          {/* Our Mission and Vision Section */}
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission and Vision</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            FMovies Watch was founded on a simple belief: everyone deserves to enjoy high-quality entertainment without financial constraints. In a world filled with paid services, we emerged as a beacon of freedom, offering a vast library of HD movies and TV series completely free. Our vision goes beyond mere streaming; we envision a global community where movie enthusiasts can connect, share, and celebrate cinema. We are committed to maintaining a user-friendly platform, free from disruptive ads, and constantly updated with fresh content from around the globe. Our mission is to transform the digital entertainment landscape, making it more inclusive and accessible to everyone, no matter where they are.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            From the beginning, we have focused on providing a seamless viewing experience. Our streaming algorithms are optimized to ensure instant playback with no annoying buffering, even on slower connections. We understand that the smallest details matter, which is why we invest in an infrastructure that guarantees sharp HD quality and crystal-clear audio. We are proud of our technology, but we are even prouder of the impact it has—bringing smiles to millions of faces worldwide by allowing them to enjoy their favorite films without worrying about the cost.
          </p>

          {/* Extensive Content Library Section */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Extensive Content Library</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            The FMovies Watch library is a testament to our passion for cinema. We meticulously curate our collection to offer an unparalleled range of genres, catering to every taste and mood. Whether you're looking for the suspense of a horror film, the lighthearted laughter of a romantic comedy, the thrilling action, or the complex narratives of a drama, we have it all. Our collection includes Hollywood classics, hidden independent gems, and trending international sensations. We believe that diversity is key, and our library reflects that commitment, offering content from every corner of the world.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Every movie and TV series comes with a detailed description, cast and crew information, trailers, and audience ratings. We want you to make an informed decision about what to watch next. These features not only enhance the viewing experience but also empower you to explore new genres and directors. We are constantly adding new titles to our collection, ensuring there is always something new and exciting to discover.
          </p>

          {/* Our Community Section */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Our Community</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            FMovies Watch is more than just a streaming platform; it's a thriving community. We encourage our users to interact by sharing reviews, recommendations, and theories about their favorite films. Our platform provides a safe and supportive space for movie fans to connect, exchange ideas, and form meaningful relationships. We actively listen to feedback from our community and use it to guide our decisions on new features and content to add.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            We host virtual events, such as movie nights and discussions, to further strengthen our community. It's an opportunity for our members to come together and celebrate their shared love for cinema. Your participation is vital to us, and we are grateful to everyone who has chosen to be a part of our journey.
          </p>
          
          {/* Technology Behind the Scenes Section */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Technology Behind the Scenes</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            The technology that powers FMovies Watch is a user-focused marvel. We use an advanced content delivery network (CDN) to ensure that your movies are streamed from the nearest server, reducing latency and guaranteeing uninterrupted playback. Our infrastructure is built to withstand massive surges in traffic, ensuring that you always get the best service, no matter how many other people are watching.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Additionally, we invest in strict security measures to protect user data and ensure a safe environment. We do not collect unnecessary personal information, and we are committed to full transparency about how your data is used. Your privacy is our top priority.
          </p>

          {/* Future Developments Section */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Future Developments</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            We are not resting on our laurels. Our team is continuously exploring new technologies and innovative ideas to enhance the FMovies Watch experience. Our future plans include implementing AI-powered features for more personalized recommendations, integrating with social media for seamless sharing, and an ever-growing library of exclusive content. We also plan to expand our language support, making FMovies Watch accessible to an even wider global audience.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Every step we take is driven by our dedication to providing the best entertainment experience for free. We appreciate your support and invite you to follow us on this thrilling journey. FMovies Watch is a testament to the power of community and a shared passion for cinema. Thank you for being a part of our extended family.
          </p>

          {/* Our Team Section - Added */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Our Team</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Behind the scenes at FMovies Watch, there is a passionate team of individuals working tirelessly to bring our vision to life. From the developers who optimize your streaming experience to the content curators who find hidden gems, every team member is committed to excellence. We are a group of dedicated film and TV series fans who are devoted to sharing our love for cinema with the world.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            We believe that a strong team is built on collaboration and mutual respect. We encourage creativity, innovation, and open communication, ensuring that every idea is heard. Our team is our family, and that spirit is reflected in every aspect of the platform we build.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
