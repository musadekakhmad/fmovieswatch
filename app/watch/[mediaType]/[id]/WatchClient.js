// app/watch/[mediaType]/[id]/WatchClient.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircleIcon } from 'lucide-react'; // Using Lucide React for icons

// API Configuration
const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

// ===================================
// MovieCard Component
// ===================================
function MovieCard({ media }) {
    if (!media) {
      return null;
    }
    
    // Using media_type from the media object if available, otherwise default to 'movie'
    const mediaType = media.media_type || 'movie';
    const mediaTitle = media.title || media.name;
    const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const posterPath = media.poster_path && media.poster_path !== ""
      ? `${POSTER_IMAGE_URL}${media.poster_path}`
      : 'https://placehold.co/500x750?text=No+Image';
    
    const targetUrl = `/${mediaType}/${media.id}/${mediaSlug}`;
    
    return (
        <div className="relative group rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <Link href={targetUrl}>
                <img
                    src={posterPath}
                    alt={mediaTitle}
                    className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-center font-bold text-lg p-2">
                        {mediaTitle}
                    </span>
                </div>
            </Link>
        </div>
    );
}

// ===================================
// WatchClient Component
// ===================================
export default function WatchClient({ initialMedia, initialSimilarMedia }) {
    const [streamUrl, setStreamUrl] = useState(null);
    const mediaType = initialMedia.media_type || 'movie';
    const title = initialMedia.title || initialMedia.name;
    const releaseDate = initialMedia.release_date || initialMedia.first_air_date;

    const streamSources = [
        {
            name: "Vidcloud",
            url: `https://vidsrc.me/embed/${mediaType}?tmdb=${initialMedia.id}`
        },
        {
            name: "2Embed",
            url: `https://www.2embed.cc/embed/${mediaType}?tmdb=${initialMedia.id}`
        },
        {
            name: "2Embed (Backup)",
            url: `https://www.2embed.ru/embed/${mediaType}?tmdb=${initialMedia.id}`
        },
    ];

    const handleSelectStream = (url) => {
        setStreamUrl(url);
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white font-sans p-4 md:p-8">
            <div className="container mx-auto">
                <div className="relative w-full h-auto md:h-[600px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                        src={`${BACKDROP_IMAGE_URL}${initialMedia.backdrop_path}`}
                        alt={title}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/1280x720/0d1117/2d3138?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 p-4 text-white z-10 md:bottom-8 md:left-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl font-light text-gray-300 drop-shadow-md">
                            {initialMedia.tagline}
                        </p>
                        <p className="mt-2 text-sm md:text-md text-gray-400">
                            Release Date: {releaseDate}
                        </p>
                    </div>
                </div>

                {/* =================================== */}
                {/* Main Content */}
                {/* =================================== */}
                <div className="mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Synopsis & Details */}
                    <div className="lg:w-2/3">
                        <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                        <p className="text-gray-300 leading-relaxed text-justify">
                            {initialMedia.overview}
                        </p>
                    </div>

                    {/* Streaming Player Section */}
                    <div className="lg:w-1/3 mt-8 lg:mt-0">
                        <h2 className="text-2xl font-bold mb-4">Watch Now</h2>
                        <div className="mb-4">
                            <span className="font-semibold text-gray-400">Select Stream:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {streamSources.map((source) => (
                                    <button
                                        key={source.name}
                                        onClick={() => handleSelectStream(source.url)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                                    >
                                        {source.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-xl border-2 border-gray-700">
                            {streamUrl ? (
                                <iframe
                                    src={streamUrl}
                                    title={`${title} Player`}
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full border-0"
                                ></iframe>
                            ) : (
                                <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-gray-400 bg-gray-900">
                                    <PlayCircleIcon size={64} className="mb-4 text-gray-600" />
                                    Select one of the stream buttons above to start
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* =================================== */}
                {/* "You might like also" Section */}
                {/* =================================== */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">You might like also</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {initialSimilarMedia.map((media) => (
                            <MovieCard key={media.id} media={media} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
