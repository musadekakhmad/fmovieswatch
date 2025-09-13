"use client";

import { useEffect } from 'react';
// Asumsi: file `adsterra.js` tidak ada, jadi kita hapus import-nya untuk memperbaiki error kompilasi.
// Ini mungkin perlu disesuaikan jika file tersebut benar-benar ada dan berisi logika penting.
// import { handleAdsterraClick } from '../utils/adsterra';

// Komponen khusus untuk menangani klik secara global dan menampilkan Native Banner, Social Bar, dan Popunder Adsterra.
export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Memastikan window tersedia sebelum memuat skrip iklan dan event listener.
    if (typeof window !== 'undefined') {
      // Fungsi untuk memanggil logika adsterra saat ada klik di mana saja.
      const handleClick = (e) => {
        // Dummy targetUrl dibuat karena logika handleAdsterraClick memerlukannya.
        // Kita menggunakan URL halaman saat ini.
        const targetUrl = window.location.href;
        // Kita tidak bisa memanggil fungsi `handleAdsterraClick` karena file-nya tidak ditemukan.
        // handleAdsterraClick(e, targetUrl);
      };
  
      window.addEventListener('click', handleClick);

      // Memuat skrip iklan Native Banner
      const nativeBannerScript = document.createElement('script');
      nativeBannerScript.src = "//discreetisabella.com/94f17a22860e4b4d6b99ce8c1e3dbbc3/invoke.js";
      nativeBannerScript.async = true;
      nativeBannerScript.setAttribute('data-cfasync', 'false');
      document.body.appendChild(nativeBannerScript);

      // Memuat skrip iklan Popunder
      const popunderScript = document.createElement('script');
      popunderScript.type = 'text/javascript';
      popunderScript.src = "//discreetisabella.com/64/f0/44/64f0448453921f0e8c8d5d370c1de538.js";
      popunderScript.async = true;
      document.body.appendChild(popunderScript);

      // Memuat skrip iklan Social Bar
      const socialBarScript = document.createElement('script');
      socialBarScript.type = 'text/javascript';
      socialBarScript.src = "//discreetisabella.com/01/e0/54/01e05438871c5014fcce1a184099ffda.js";
      socialBarScript.async = true;
      document.body.appendChild(socialBarScript);
  
      // Cleanup function untuk menghapus event listener dan skrip saat komponen di-unmount.
      return () => {
        window.removeEventListener('click', handleClick);
        document.body.removeChild(nativeBannerScript);
        document.body.removeChild(popunderScript);
        document.body.removeChild(socialBarScript);
      };
    }
  }, []); // Dependensi kosong memastikan efek hanya berjalan sekali saat mount.

  return (
    <>
      {children}
      {/* Container untuk iklan Native Banner */}
      <div id="container-94f17a22860e4b4d6b99ce8c1e3dbbc3"></div>
    </>
  );
}
