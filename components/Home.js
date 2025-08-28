// Home.js
"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// Base URL for the API
const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- REPLACE WITH YOUR API KEY
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hook to fetch API data
// ===================================

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
      
      // Update the data by appending the new results
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
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
// Home Component
// ===================================

export default function Home() {
  // State for Popular Movies
  const [popularMoviesPage, setPopularMoviesPage] = useState(1);
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);
  const [popularMoviesError, setPopularMoviesError] = useState(null);
  const [hasMorePopularMovies, setHasMorePopularMovies] = useState(true);
  const [popularMoviesDisplayCount, setPopularMoviesDisplayCount] = useState(6);

  // State for Top Rated Movies
  const [topRatedMoviesPage, setTopRatedMoviesPage] = useState(1);
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
  const [topRatedMoviesLoading, setTopRatedMoviesLoading] = useState(true);
  const [topRatedMoviesError, setTopRatedMoviesError] = useState(null);
  const [hasMoreTopRatedMovies, setHasMoreTopRatedMovies] = useState(true);
  const [topRatedMoviesDisplayCount, setTopRatedMoviesDisplayCount] = useState(6);

  // State for Upcoming Movies
  const [upcomingMoviesPage, setUpcomingMoviesPage] = useState(1);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [upcomingMoviesLoading, setUpcomingMoviesLoading] = useState(true);
  const [upcomingMoviesError, setUpcomingMoviesError] = useState(null);
  const [hasMoreUpcomingMovies, setHasMoreUpcomingMovies] = useState(true);
  const [upcomingMoviesDisplayCount, setUpcomingMoviesDisplayCount] = useState(6);

  // State for Now Playing Movies
  const [nowPlayingMoviesPage, setNowPlayingMoviesPage] = useState(1);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);
  const [nowPlayingMoviesLoading, setNowPlayingMoviesLoading] = useState(true);
  const [nowPlayingMoviesError, setNowPlayingMoviesError] = useState(null);
  const [hasMoreNowPlayingMovies, setHasMoreNowPlayingMovies] = useState(true);
  const [nowPlayingMoviesDisplayCount, setNowPlayingMoviesDisplayCount] = useState(6);

  // State for Popular TV Shows
  const [popularTvPage, setPopularTvPage] = useState(1);
  const [popularTvData, setPopularTvData] = useState([]);
  const [popularTvLoading, setPopularTvLoading] = useState(true);
  const [popularTvError, setPopularTvError] = useState(null);
  const [hasMorePopularTv, setHasMorePopularTv] = useState(true);
  const [popularTvDisplayCount, setPopularTvDisplayCount] = useState(6);

  // State for Top Rated TV Shows
  const [topRatedTvPage, setTopRatedTvPage] = useState(1);
  const [topRatedTvData, setTopRatedTvData] = useState([]);
  const [topRatedTvLoading, setTopRatedTvLoading] = useState(true);
  const [topRatedTvError, setTopRatedTvError] = useState(null);
  const [hasMoreTopRatedTv, setHasMoreTopRatedTv] = useState(true);
  const [topRatedTvDisplayCount, setTopRatedTvDisplayCount] = useState(6);

  // State for On The Air TV Shows
  const [onTheAirTvPage, setOnTheAirTvPage] = useState(1);
  const [onTheAirTvData, setOnTheAirTvData] = useState([]);
  const [onTheAirTvLoading, setOnTheAirTvLoading] = useState(true);
  const [onTheAirTvError, setOnTheAirTvError] = useState(null);
  const [hasMoreOnTheAirTv, setHasMoreOnTheAirTv] = useState(true);
  const [onTheAirTvDisplayCount, setOnTheAirTvDisplayCount] = useState(6);

  // State for Airing Today TV Shows
  const [airingTodayTvPage, setAiringTodayTvPage] = useState(1);
  const [airingTodayTvData, setAiringTodayTvData] = useState([]);
  const [airingTodayTvLoading, setAiringTodayTvLoading] = useState(true);
  const [airingTodayTvError, setAiringTodayTvError] = useState(null);
  const [hasMoreAiringTodayTv, setHasMoreAiringTodayTv] = useState(true);
  const [airingTodayTvDisplayCount, setAiringTodayTvDisplayCount] = useState(6);

  // Function to fetch data for a specific category
  const fetchData = useCallback(async (category, page, setData, setLoading, setError, setHasMore) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      // Update the data by appending the new results
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch data for a specific TV category
  const fetchTvData = useCallback(async (category, page, setData, setLoading, setError, setHasMore) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/tv/${category}?api_key=${API_KEY}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      // Update the data by appending the new results
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetches on component mount
  useEffect(() => {
    fetchData('popular', popularMoviesPage, setPopularMoviesData, setPopularMoviesLoading, setPopularMoviesError, setHasMorePopularMovies);
    fetchData('top_rated', topRatedMoviesPage, setTopRatedMoviesData, setTopRatedMoviesLoading, setTopRatedMoviesError, setHasMoreTopRatedMovies);
    fetchData('upcoming', upcomingMoviesPage, setUpcomingMoviesData, setUpcomingMoviesLoading, setUpcomingMoviesError, setHasMoreUpcomingMovies);
    fetchData('now_playing', nowPlayingMoviesPage, setNowPlayingMoviesData, setNowPlayingMoviesLoading, setNowPlayingMoviesError, setHasMoreNowPlayingMovies);
    fetchTvData('popular', popularTvPage, setPopularTvData, setPopularTvLoading, setPopularTvError, setHasMorePopularTv);
    fetchTvData('top_rated', topRatedTvPage, setTopRatedTvData, setTopRatedTvLoading, setTopRatedTvError, setHasMoreTopRatedTv);
    fetchTvData('on_the_air', onTheAirTvPage, setOnTheAirTvData, setOnTheAirTvLoading, setOnTheAirTvError, setHasMoreOnTheAirTv);
    fetchTvData('airing_today', airingTodayTvPage, setAiringTodayTvData, setAiringTodayTvLoading, setAiringTodayTvError, setHasMoreAiringTodayTv);
  }, [
    fetchData,
    fetchTvData,
    popularMoviesPage,
    topRatedMoviesPage,
    upcomingMoviesPage,
    nowPlayingMoviesPage,
    popularTvPage,
    topRatedTvPage,
    onTheAirTvPage,
    airingTodayTvPage
  ]);

  // Handle load more for Movies
  const handleLoadMorePopularMovies = () => {
    setPopularMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setPopularMoviesPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreTopRatedMovies = () => {
    setTopRatedMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setTopRatedMoviesPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreUpcomingMovies = () => {
    setUpcomingMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setUpcomingMoviesPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreNowPlayingMovies = () => {
    setNowPlayingMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setNowPlayingMoviesPage(prevPage => prevPage + 1);
  };

  // Handle load more for TV Shows
  const handleLoadMorePopularTv = () => {
    setPopularTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setPopularTvPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreTopRatedTv = () => {
    setTopRatedTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setTopRatedTvPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreOnTheAirTv = () => {
    setOnTheAirTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setOnTheAirTvPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreAiringTodayTv = () => {
    setAiringTodayTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setAiringTodayTvPage(prevPage => prevPage + 1);
  };

  const CategorySection = ({ title, data, loading, error, hasMore, onLoadMore, mediaType, displayCount }) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      {loading && <p className="text-center text-gray-400">Loading {mediaType}...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}
      {data.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data.filter(item => item.poster_path).slice(0, displayCount).map((item) => (
              <MovieCard key={item.id} media={item} mediaType={mediaType} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={onLoadMore}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <div className="relative mt-8 w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl" suppressHydrationWarning={true}>
          <img
              src="https://live.staticflickr.com/65535/54745510629_fe622569fd_b.jpg"
              alt="FMovies Watch Banner"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=fmovieswatch';
              }}
          />
      </div>
      
      {/* Main content container with padding */}
      <div className="px-4 md:px-8">
        <h1 className="text-2xl font-bold text-center mt-8 mb-12 text-blue-300 leading-tight md:text-3xl">
          FMovies Watch: The hub for high-quality free movies and TV shows for you.
        </h1>

        {/* Movies Section */}
        <h2 className="text-4xl font-extrabold text-white mt-8 mb-8 text-center">Movies</h2>

        {/* Popular Movies Section */}
        <CategorySection
          title="Popular Movies"
          data={popularMoviesData}
          loading={popularMoviesLoading}
          error={popularMoviesError}
          hasMore={hasMorePopularMovies}
          onLoadMore={handleLoadMorePopularMovies}
          mediaType="movie"
          displayCount={popularMoviesDisplayCount}
        />

        {/* Top Rated Movies Section */}
        <CategorySection
          title="Top Rated Movies"
          data={topRatedMoviesData}
          loading={topRatedMoviesLoading}
          error={topRatedMoviesError}
          hasMore={hasMoreTopRatedMovies}
          onLoadMore={handleLoadMoreTopRatedMovies}
          mediaType="movie"
          displayCount={topRatedMoviesDisplayCount}
        />

        {/* Upcoming Movies Section */}
        <CategorySection
          title="Upcoming Movies"
          data={upcomingMoviesData}
          loading={upcomingMoviesLoading}
          error={upcomingMoviesError}
          hasMore={hasMoreUpcomingMovies}
          onLoadMore={handleLoadMoreUpcomingMovies}
          mediaType="movie"
          displayCount={upcomingMoviesDisplayCount}
        />
        
        {/* Now Playing Movies Section */}
        <CategorySection
          title="Now Playing Movies"
          data={nowPlayingMoviesData}
          loading={nowPlayingMoviesLoading}
          error={nowPlayingMoviesError}
          hasMore={hasMoreNowPlayingMovies}
          onLoadMore={handleLoadMoreNowPlayingMovies}
          mediaType="movie"
          displayCount={nowPlayingMoviesDisplayCount}
        />

        {/* TV Shows Section */}
        <h2 className="text-4xl font-extrabold text-white mt-16 mb-8 text-center">TV Shows</h2>

        {/* Popular TV Shows Section */}
        <CategorySection
          title="Popular TV Shows"
          data={popularTvData}
          loading={popularTvLoading}
          error={popularTvError}
          hasMore={hasMorePopularTv}
          onLoadMore={handleLoadMorePopularTv}
          mediaType="tv"
          displayCount={popularTvDisplayCount}
        />

        {/* Top Rated TV Shows Section */}
        <CategorySection
          title="Top Rated TV Shows"
          data={topRatedTvData}
          loading={topRatedTvLoading}
          error={topRatedTvError}
          hasMore={hasMoreTopRatedTv}
          onLoadMore={handleLoadMoreTopRatedTv}
          mediaType="tv"
          displayCount={topRatedTvDisplayCount}
        />
        
        {/* On The Air TV Shows Section */}
        <CategorySection
          title="On The Air TV Shows"
          data={onTheAirTvData}
          loading={onTheAirTvLoading}
          error={onTheAirTvError}
          hasMore={hasMoreOnTheAirTv}
          onLoadMore={handleLoadMoreOnTheAirTv}
          mediaType="tv"
          displayCount={onTheAirTvDisplayCount}
        />
        
        {/* Airing Today TV Shows Section */}
        <CategorySection
          title="Airing Today TV Shows"
          data={airingTodayTvData}
          loading={airingTodayTvLoading}
          error={airingTodayTvError}
          hasMore={hasMoreAiringTodayTv}
          onLoadMore={handleLoadMoreAiringTodayTv}
          mediaType="tv"
          displayCount={airingTodayTvDisplayCount}
        />
      </div>
    </div>
  );
}
