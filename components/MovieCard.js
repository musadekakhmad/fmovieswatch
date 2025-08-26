// components/MovieCard.js
import Link from 'next/link';
import MovieImage from './MovieImage';

// A function to create a clean, SEO-friendly "slug" from a title.
const createSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters.
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens.
    .replace(/--+/g, '-') // Replace multiple hyphens with a single one.
    .trim(); // Remove leading/trailing spaces.
};

const MovieCard = ({ media, mediaType }) => {
  // A more robust check to ensure the media object and its title are valid.
  if (!media || (!media.title && !media.name)) {
    console.error("MovieCard was rendered with an undefined 'media' or missing title/name.");
    return null;
  }

  // Determine the correct media type, with a fallback to 'movie' if none is provided.
  const correctMediaType = mediaType || media.media_type || 'movie';

  // Get the ID and title from the media data.
  const id = media.id;
  const title = media.title || media.name;
  
  // Create a slug from the title for the URL.
  const slug = createSlug(title);

  // Ensure the ID and slug are available before rendering.
  if (!id || !slug) {
    return null; // Don't render if the data is incomplete.
  }

  // Build the URL with the correct mediaType, ID, and slug.
  const mediaUrl = `/${correctMediaType}/${id}/${slug}`;

  return (
    <Link href={mediaUrl} passHref className="block rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800">
      <div className="relative w-full h-auto">
        <MovieImage
          src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
          alt={`Poster for ${title}`}
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80"></div>
        {media.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center bg-gray-900/70 text-yellow-400 text-sm font-semibold p-1 rounded-full backdrop-blur-sm">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{media.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white leading-tight truncate">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {correctMediaType === 'movie' ? media.release_date?.substring(0, 4) : media.first_air_date?.substring(0, 4)}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
