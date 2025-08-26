// components/WatchNowButton.js
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

/*
  WatchNowButton Component.
  This component now directs the user to the new video player page
  using the `/watch/[mediaType]/[id]` route.
*/
export default function WatchNowButton({ mediaType, mediaId }) {
  const watchUrl = `/watch/${mediaType}/${mediaId}`;
  return (
    <Link
      href={watchUrl}
      className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
    >
      <PlayCircle className="w-6 h-6 mr-2" />
      Watch Now
    </Link>
  );
}
