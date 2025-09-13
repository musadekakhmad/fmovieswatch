"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react';

// API Key is not needed here as we are using a proxy URL
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// ===================================
// Custom Hooks
// ===================================

/**
 * Custom hook to fetch data from an API efficiently.
 * Uses useCallback to prevent unnecessary re-renders.
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return { data, loading, error };
};

// ===================================
// MovieCard component to display a movie or TV show
// ===================================

const MovieCard = ({ media, mediaType }) => {
  const mediaTitle = media.title || media.name;
  const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const posterPath = media.poster_path && media.poster_path !== ""
    ? `${IMAGE_BASE_URL}${media.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  return (
    <Link href={`/${mediaType}/${media.id}/${mediaSlug}`} passHref>
      <div className="relative group rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
        <img
          src={posterPath}
          alt={`Poster for ${mediaTitle}`}
          className="w-full h-auto object-cover rounded-lg transition-all duration-300 transform group-hover:blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircleIcon size={64} className="text-white transform group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="p-4 bg-gray-800 rounded-b-lg">
          <h3 className="text-lg font-semibold text-white truncate">{mediaTitle}</h3>
          <p className="text-sm text-gray-400">
            {media.release_date || media.first_air_date ? (media.release_date || media.first_air_date).substring(0, 4) : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
};

// ===================================
// Main MovieApp component
// ===================================

const MovieApp = () => {
  const { data, loading, error } = useFetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">FMovies Watch: Watch Free Movies and TV Shows</h1>
          <p className="text-gray-300 text-justify">
            FMovies Watch is your ultimate destination for high-quality free movie and TV show streaming. Explore our extensive collection of popular films, trending movies, and the most talked-about TV shows. With a user-friendly interface and a seamless video player, we ensure an enjoyable viewing experience. Start streaming today!
          </p>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
          Popular Movies
        </h2>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>An error occurred while fetching data: {error}. Please ensure you have a valid API key and a stable internet connection.</p>
          </div>
        )}

        {!loading && !error && data && data.results && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {data.results.map(item => (
              <MovieCard key={item.id} media={item} mediaType="movie" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieApp;
