"use client";
import React, { useState, useEffect } from 'react';

const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMoviesGenreOpen, setIsMoviesGenreOpen] = useState(false);
  const [isTvShowsGenreOpen, setIsTvShowsGenreOpen] = useState(false);
  const [moviesGenres, setMoviesGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch genres from TMDB API
  const fetchGenres = async (mediaType) => {
    setLoadingGenres(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data.genres;
    } catch (err) {
      console.error(`Fetch genre error for ${mediaType}:`, err);
      setError(err.message);
      return [];
    } finally {
      setLoadingGenres(false);
    }
  };

  // Effect to load genres on component mount
  useEffect(() => {
    const loadGenres = async () => {
      const movies = await fetchGenres('movie');
      const tv = await fetchGenres('tv');
      setMoviesGenres(movies);
      setTvGenres(tv);
    };
    loadGenres();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search/${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleGenreClick = (mediaType, id) => {
    window.location.href = `/genre/${mediaType}/${id}`;
    setIsMoviesGenreOpen(false);
    setIsTvShowsGenreOpen(false);
  };

  return (
    <>
      <style>
        {`
        /* CSS for rainbow effect */
        .rainbow-text-header {
            background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.5s ease-in-out;
        }

        .rainbow-text-header:hover {
            background: linear-gradient(to right, #ffffff, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .glow-on-hover {
            transition: all 0.3s ease;
            box-shadow: 0 0 5px #ff7f00, 0 0 10px #ff7f00, 0 0 15px #ff7f00;
        }
        .genre-popup-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.75);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .genre-popup {
            background: #1f2937;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            max-width: 90%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
        }
        .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        .genre-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        /* Perbaikan untuk tombol Home agar hover tidak memanjang */
        .nav-button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        /* Specific hover colors for genre buttons inside pop-ups */
        .genre-button-movie:hover {
          background-color: #2563eb; /* blue-600 */
        }
        .genre-button-tv:hover {
          background-color: #dc2626; /* red-600 */
        }
        /* Mengatur agar setiap 5 genre berada dalam satu baris, dan kemudian turun ke baris baru */
        .genre-grid-5 {
            display: grid;
            grid-template-columns: repeat(5, minmax(120px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        @media (max-width: 1024px) {
            .genre-grid-5 {
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            }
        }
        /* Gaya tambahan untuk ikon */
        .logo-icon {
            margin-right: 0.5rem;
            display: inline-block;
            vertical-align: middle;
            font-size: 1.5rem;
        }
        `}
      </style>
      <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-50 rounded-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap">
          {/* Logo or Site Name */}
          <div className="flex items-center">
            <a href="/about" className="flex items-center text-4xl font-extrabold tracking-tight cursor-pointer">
              {/* Ikon proyektor film SVG baru dengan warna emas */}
              <svg className="w-10 h-10 mr-2" fill="currentColor" viewBox="0 0 61 61" xmlns="http://www.w3.org/2000/svg">
                <style>{`.st0,.st2{fill:#455a64;stroke:#424242;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}.st2{fill:#546e7a}`}</style>
                <g id="HD_Film">
                  <path className="st0" d="M56.5 46.5h-55c-.6 0-1-.4-1-1v-39c0-.6.4-1 1-1h55c.6 0 1 .4 1 1v39c0 .6-.4 1-1 1z"/>
                  <path className="st2" d="M59.5 46.5h-55c-.6 0-1-.4-1-1v-39c0-.6.4-1 1-1h55c.6 0 1 .4 1 1v39c0 .6-.4 1-1 1z"/>
                  {/* Bagian yang diubah warnanya dari biru ke emas/oranye */}
                  <path d="M57.5 43.5h-51v-35h51v35z" style={{fill:'#FFD700', stroke:'#424242', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:10}}/>
                  <path d="M8.5 41.5v-31" style={{fill:'none', stroke:'#FFC107', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:10}}/>
                  <path d="M55.5 41.5v-31" style={{fill:'none', stroke:'#FFB300', strokeLinecap:'round', strokeLinejoin:'round', strokeMiterlimit:10}}/>
                  <path className="st0" d="M25 46.5h9v6h-9zM37 55.5H22c-.8 0-1.5-.7-1.5-1.5h0c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5h0c0 .8-.7 1.5-1.5 1.5z"/>
                  <path className="st2" d="M39 55.5H24c-.8 0-1.5-.7-1.5-1.5h0c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5h0c0 .8-.7 1.5-1.5 1.5zM27 46.5h9v6h-9z"/>
                  <g>
                    <path className="st2" d="M27.5 34c-.8 0-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5z"/>
                    <path className="st2" d="M27.5 27.5h-12c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zM42 34h-6.5c-.8 0-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5H42c4.4 0 8 3.6 8 8s-3.6 8-8 8zm-5-3h5c2.8 0 5-2.2 5-5s-2.2-5-5-5h-5v10z"/>
                    <path className="st2" d="M15.5 34c-.8 0-1.5-.7-1.5-1.5v-13c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v13c0 .8-.7 1.5-1.5 1.5z"/>
                  </g>
                </g>
              </svg>
              <span className="rainbow-text-header">FMovies</span>
            </a>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center space-x-6 mt-4 sm:mt-0">
            {/* Standalone Home button */}
            <div>
              <a href="/" className="flex items-center px-3 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
                <span className="nav-button-content">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10H6v-2h8m-8 4h8m-8 4h8M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z"></path>
                  </svg>
                  Home
                </span>
              </a>
            </div>
            
            {/* Movies Genre button with pop-up functionality */}
            <div>
              <button
                onClick={() => setIsMoviesGenreOpen(true)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <span className="nav-button-content">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M4 8h16M4 12h16M4 16h16"></path>
                  </svg>
                  Movies Genre
                </span>
              </button>
            </div>

            {/* TV Shows Genre button with pop-up functionality */}
            <div>
              <button
                onClick={() => setIsTvShowsGenreOpen(true)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <span className="nav-button-content">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20h4M10 4h4M4 10v4M20 10v4M6 6l12 12M6 18l12-12"></path>
                  </svg>
                  TV Shows Genre
                </span>
              </button>
            </div>
          </nav>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for movies or TV shows..."
              className="bg-gray-700 text-white rounded-full py-1 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-colors duration-300 w-40 sm:w-auto"
            />
            <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </header>
      
      {/* Movies Genre Pop-up */}
      {isMoviesGenreOpen && (
        <div className="genre-popup-backdrop" onClick={() => setIsMoviesGenreOpen(false)}>
          <div className="genre-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsMoviesGenreOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold text-white mb-4">Movies Genres</h2>
            {loadingGenres ? (
              <p className="text-gray-400">Loading genres...</p>
            ) : error ? (
              <p className="text-red-400">Error loading genres: {error}</p>
            ) : (
              <div className="genre-grid-5">
                {moviesGenres.map(genre => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick('movie', genre.id)}
                    className="bg-gray-700 text-white py-2 px-4 rounded-full text-sm transition-colors duration-200 genre-button-movie"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TV Shows Genre Pop-up */}
      {isTvShowsGenreOpen && (
        <div className="genre-popup-backdrop" onClick={() => setIsTvShowsGenreOpen(false)}>
          <div className="genre-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsTvShowsGenreOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold text-white mb-4">TV Shows Genres</h2>
            {loadingGenres ? (
              <p className="text-gray-400">Loading genres...</p>
            ) : error ? (
              <p className="text-red-400">Error loading genres: {error}</p>
            ) : (
              <div className="genre-grid-5">
                {tvGenres.map(genre => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick('tv', genre.id)}
                    className="bg-gray-700 text-white py-2 px-4 rounded-full text-sm transition-colors duration-200 genre-button-tv"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
