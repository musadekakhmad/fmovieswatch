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

export const metadata = {
  // Changing title and description to English
  title: 'FMovies | Watch Movies and TV Series Streaming Free',
  description: 'Your ultimate destination for high-quality Watch Movies and TV shows streaming.',
  // Menambahkan meta keywords untuk SEO
  keywords: ['FMovies', 'watch free movies', 'watch free tv series', 'streaming', 'film gratis'],
  // Open Graph meta tags for Facebook
  openGraph: {
    title: 'FMovies | Watch Movies and TV Series Streaming Free',
    description: 'Your ultimate destination for high-quality Watch Movies and TV shows streaming.',
    url: 'https://fmovieswatch.netlify.app/',
    siteName: 'FMovies',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54745510629_fe622569fd_b.jpg',
        width: 1200,
        height: 630,
        alt: 'FMovies',
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
    // Mengoreksi kesalahan ketik pada deskripsi
    title: 'FMovies | Watch Movies and TV Series Streaming Free',
    description: 'Your ultimate destination for high-quality Watch Movies and TV shows streaming.',
    images: ['https://live.staticflickr.com/65535/54745510629_fe622569fd_b.jpg'], // Replace with the appropriate image URL
  },
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AdsterraLayoutWrapper>
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
