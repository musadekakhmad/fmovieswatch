// app/watch/[mediaType]/[id]/page.js
// MAKE SURE THERE IS NO 'use client' line here.
import { notFound } from 'next/navigation';
import WatchClient from './WatchClient';

// API Configuration
const API_KEY = 'tmdb-api-proxy.argoyuwono119.workers.dev'; // <-- FILL IN YOUR API KEY HERE
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ====================================================================================
// FUNCTION TO GET DATA (server-side)
// ====================================================================================
async function getMediaDetails(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    // If it fails, navigate to the 404 page
    notFound();
  }
  return res.json();
}

// New function to get a static list from TMDB
async function getStaticListMedia(listId) {
  const res = await fetch(`${BASE_URL}/list/${listId}?api_key=${API_KEY}`);
  if (!res.ok) {
    // If it fails, return an empty array
    return { items: [] };
  }
  return res.json();
}

// ====================================================================================
// FUNCTION TO GET DYNAMIC METADATA (Important for SEO)
// ====================================================================================
export async function generateMetadata({ params }) {
  // FIX: Use 'await params' to fix Next.js error
  const { mediaType, id } = await params;

  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  const details = res.ok ? await res.json() : null;

  if (!details) {
    return {};
  }

  const title = `${details.title || details.name} | FMovies Watch`;
  const description = details.overview || 'Your hub for high-quality free movie and TV show streaming.';
  const imageUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/original${details.poster_path}`
    : 'https://placehold.co/1200x630/000000/FFFFFF?text=FMovies-Watch';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://fmovieswatch.netlify.app/${mediaType}/${id}`,
      siteName: 'FMovies Watch',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US', // Change locale to English
      type: 'website',
      appId: 'cut.erna.984',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WatchStream123',
      creator: '@WatchStream123',
      title,
      description,
      images: [imageUrl],
    },
  };
}

// ====================================================================================
// MAIN PLAYER PAGE COMPONENT (SERVER COMPONENT)
// ====================================================================================
export default async function WatchPage({ params }) {
    const { mediaType, id } = params;

    if (!API_KEY) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500 text-lg p-4 text-center">
                <p>
                    Please fill in your TMDB API Key in the `page.js` file to fetch movie and TV show data.
                </p>
            </div>
        );
    }

    try {
        const [mediaDetails, similarMediaList] = await Promise.all([
            getMediaDetails(mediaType, id),
            getStaticListMedia('8267252') // TMDB static list ID for 'you might also like'
        ]);

        const initialSimilarMedia = similarMediaList.items;

        return (
            <WatchClient
                initialMedia={mediaDetails}
                initialSimilarMedia={initialSimilarMedia}
            />
        );
    } catch (error) {
        // Render a graceful error page
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500 text-lg p-4 text-center">
                <p>
                    Oops! Something went wrong while fetching data. Please try again later.
                </p>
            </div>
        );
    }
}
