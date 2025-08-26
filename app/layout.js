// ---------------------------------------------------------------- //
// File Name: app/layout.js
// Function: This is the main layout for the entire website,
//         used to configure elements that appear
//         on all pages, such as the header, footer, and content width.
// ---------------------------------------------------------------- //

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper'; 
// Removed import 'video.js/dist/video-js.css'; from here

export const metadata = {
  // Changing title and description to English
  title: 'FMovies Watch | Free Movies and TV Series Streaming',
  description: 'Your ultimate destination for high-quality free movies and TV shows streaming.',
  // Open Graph meta tags for Facebook
  openGraph: {
    title: 'FMovies Watch | Free Movies and TV Series Streaming',
    description: 'Your ultimate destination for high-quality free movies and TV shows streaming.',
    url: 'https://fmovieswatch.netlify.app/',
    siteName: 'FMovies Watch',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54745510629_fe622569fd_b.jpg',
        width: 1200,
        height: 630,
        alt: 'FMovies Watch',
      },
    ],
    // Changing locale to English
    locale: 'en_US',
    type: 'website',
    // Special property for Facebook, 'og:app_id'
    appId: 'cut.erna.984',
  },
  // Twitter Card meta tags
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123', // Your Twitter user
    creator: '@WatchStream123',
    // Changing title and description to English
    title: 'FMovies Watch | Free Movies and TV Series Streaming',
    description: 'Your ultimate destination for high-quality free movies and TV sho streaming.',
    images: ['https://live.staticflickr.com/65535/54745510629_fe622569fd_b.jpg'], // Replace with the appropriate image URL
  },
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Adding suppressHydrationWarning to address hydration errors. */}
      {/* This often happens when third-party scripts or browser extensions modify the body tag. */}
      <body suppressHydrationWarning={true}>
        <AdsterraLayoutWrapper>
          {/* Main container with a maximum width */}
          {/* Moving Header, content, and Footer into this container */}
          <div className="mx-auto max-w-7xl">
            <Header />
            {children}
            <Footer />
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}
