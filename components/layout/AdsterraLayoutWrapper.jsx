// components/layout/AdsterraLayoutWrapper.jsx
"use client";

import { useEffect, useRef } from 'react';
import { getAIOptimizer } from '../../utils/adsterra';

export default function AdsterraLayoutWrapper({ children, countryCode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
        const optimizer = getAIOptimizer();
        if (optimizer) {
            optimizer.setGeo(countryCode);
        }

        const nativeContainer = document.getElementById('container-94f17a22860e4b4d6b99ce8c1e3dbbc3');

        const visibleAds = [
            { id: 'native', src: '//fundingfashioned.com/94f17a22860e4b4d6b99ce8c1e3dbbc3/invoke.js' },
            { id: 'social', src: '//fundingfashioned.com/01/e0/54/01e05438871c5014fcce1a184099ffda.js' }
        ];

        visibleAds.forEach(s => {
            if(document.querySelector(`script[src="${s.src}"]`)) return;
            const el = document.createElement('script');
            el.src = s.src;
            el.async = true;
            
            // PERBAIKAN: Masukkan script native ke kontainer footer jika ada
            if (s.id === 'native' && nativeContainer) {
                nativeContainer.appendChild(el);
            } else {
                document.body.appendChild(el);
            }
        });

        setTimeout(() => {
            if(document.querySelector(`script[src*="64f0448453921f0e8c8d5d370c1de538"]`)) return;
            const popunder = document.createElement('script');
            popunder.src = '//fundingfashioned.com/64/f0/44/64f0448453921f0e8c8d5d370c1de538.js'; 
            document.head.appendChild(popunder);
        }, 3500);

        initialized.current = true;
    }
  }, [countryCode]);

  return <>{children}</>;
}