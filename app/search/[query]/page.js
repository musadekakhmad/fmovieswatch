"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// URL dasar untuk API
const API_KEY = ''; // <-- ISI DENGAN API KEY ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hook untuk Fetch Data
// ===================================

/**
 * Custom hook untuk mengambil data dari API secara efisien.
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
// Halaman Pencarian
// ===================================

export default function SearchPage({ params }) {
  // Mengatasi peringatan dengan menggunakan React.use()
  const resolvedParams = React.use(params);
  const searchQuery = resolvedParams.query;
  const { data, loading, error } = useFetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(searchQuery)}&api_key=${API_KEY}`);

  if (!searchQuery) {
    return (
      <div className="text-center p-8 text-white">
        <h1 className="text-2xl mb-4">Silakan masukkan kata kunci untuk pencarian.</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-8 text-white">
        <h1 className="text-2xl mb-4">Mencari hasil untuk "{searchQuery}"...</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <h1 className="text-2xl mb-4">Terjadi kesalahan.</h1>
        <p>Gagal memuat hasil pencarian.</p>
      </div>
    );
  }

  if (data && data.results.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        <h1 className="text-2xl mb-4">Tidak ada hasil yang ditemukan untuk "{searchQuery}".</h1>
        <p>Coba kata kunci lain atau periksa ejaan Anda.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Hasil Pencarian untuk "{searchQuery}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.results
          .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
          .filter(item => item.poster_path)
          .map((item) => (
            <MovieCard key={item.id} media={item} mediaType={item.media_type} />
          ))}
      </div>
    </div>
  );
}