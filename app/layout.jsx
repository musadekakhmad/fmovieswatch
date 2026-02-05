import { headers } from 'next/headers'; 
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdsterraLayoutWrapper from '../components/layout/AdsterraLayoutWrapper'; 
import AdBanner from '../components/ads/AdBanner'; 

export const metadata = {
  title: 'FMovies | Watch Movies, Stream TV Series Free - Complete Movie Database',
  description: 'FMovies is your ultimate movie database with 10,000+ movies, 5,000+ TV series, actor profiles, genre pages, and yearly archives. Discover, stream, and enjoy cinematic excellence with our comprehensive entertainment platform.',
  keywords: 'movies, tv series, streaming, movie database, actors, genres, rankings, movie archives',
  openGraph: {
    title: 'FMovies | Complete Movie & TV Series Database',
    description: 'Your ultimate destination for movies, TV series, actor profiles, and streaming information. Explore genres, yearly archives, and top rankings.',
    url: 'https://fmovieswatch.netlify.app',
    siteName: 'FMovies',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54796154293_fa66ff7825_b.jpg',
        width: 1200,
        height: 630,
        alt: 'FMovies - Complete Movie Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123',
    creator: '@WatchStream123',
    title: 'FMovies | Complete Movie & TV Series Database',
    description: 'Explore 10,000+ movies, 5,000+ TV series, actor profiles, and streaming guides on FMovies.',
    images: ['https://live.staticflickr.com/65535/54796154293_fa66ff7825_b.jpg'],
  },
  // Tambahkan tag meta eksplisit untuk Facebook
  other: {
    'fb:app_id': '100074345305108',
  },
};

export default async function RootLayout({ children }) {
  // Unwrapping headers secara async (Standar Next.js 15/16)
  const headersList = await headers();
  const countryCode = headersList.get('x-vercel-ip-country') || headersList.get('cf-ipcountry') || 'ID';

  return (
    <html lang="en">
      	  <head>
        {/* Tag verifikasi Google Search Console */}
        <meta name="google-site-verification" content="Op253moeSLgz53Zc2b4oZ0oc088akfDPrQLeRsQA008" />
        {/* Schema.org markup untuk Movie Database */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovieDatabase",
              "name": "FMovies",
              "description": "Complete movie and TV series database with streaming information",
              "url": "https://fmovieswatch.netlify.app",
              "logo": "https://live.staticflickr.com/65535/54796154293_fa66ff7825_b.jpg",
              "sameAs": [
                "https://fmovieswatch.netlify.app"
              ]
            })
          }}
        />
      </head>
      <body>
        <AdsterraLayoutWrapper countryCode={countryCode}>
          <div className="flex flex-col min-h-screen bg-slate-900">
            <header className="w-full max-w-7xl mx-auto px-4 py-4 sticky top-0 z-50 bg-slate-900 shadow-lg">
              <Navbar />
            </header>
            
            <div className="w-full bg-slate-900 py-2">
              <div className="max-w-7xl mx-auto px-4 flex justify-center">
                <AdBanner 
                  adId="728x90_header"
                  scriptKey="b726ddc12f7a453bee2b067945c2ad49"
                  height={90} 
                  width={728}
                  className="rounded-lg overflow-hidden shadow-lg"
                />
              </div>
            </div>
            
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 mt-2">
              {children}
            </main>
            
            <footer className="w-full max-w-7xl mx-auto px-4 py-8">
              <div id="container-94f17a22860e4b4d6b99ce8c1e3dbbc3"></div>
              <Footer />
            </footer>
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}