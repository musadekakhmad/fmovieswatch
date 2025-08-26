"use client";
import React from 'react';
import Image from 'next/image'; // Use the Next.js Image component

const MovieImage = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/500x750?text=No+Image';
  };

  const isPlaceholder = src && src.includes('placehold.co');

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={500} // Adjust the appropriate width
      height={750} // Adjust the appropriate height
      unoptimized={isPlaceholder}
      onError={handleError}
    />
  );
};

export default MovieImage;
