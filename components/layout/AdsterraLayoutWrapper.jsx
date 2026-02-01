"use client";

import { useEffect, useRef } from 'react';

export default function AdsterraLayoutWrapper({ children }) {
  const scriptsLoaded = useRef(false);
  const retryCount = useRef(0);
  const MAX_RETRIES = 2;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let timer;

      // ✅ SKRIPT IKLAN TANPA POPUNDER (Hanya Native Banner & Social Bar)
      const scripts = [
        {
          id: 'adsterra-native-banner',
          src: '//fundingfashioned.com/94f17a22860e4b4d6b99ce8c1e3dbbc3/invoke.js',
          attributes: { 'data-cfasync': 'false' }
        },
        {
          id: 'adsterra-social-bar',
          src: '//fundingfashioned.com/01/e0/54/01e05438871c5014fcce1a184099ffda.js'
        }
        // ❌ POPUNDER DIHAPUS
      ];

      const loadScripts = () => {
        if (scriptsLoaded.current) return;
        
        scripts.forEach(scriptConfig => {
          if (document.getElementById(scriptConfig.id)) return;

          const script = document.createElement('script');
          script.id = scriptConfig.id;
          script.src = scriptConfig.src;
          script.async = true;

          if (scriptConfig.attributes) {
            Object.entries(scriptConfig.attributes).forEach(([key, value]) => {
              script.setAttribute(key, value);
            });
          }

          script.onerror = () => {
            console.error(`❌ ${scriptConfig.id} failed to load`);
            retryCount.current++;
            if (retryCount.current <= MAX_RETRIES) {
              console.log(`🔄 Retrying ${scriptConfig.id}... (${retryCount.current}/${MAX_RETRIES})`);
              setTimeout(loadScripts, 1000 * retryCount.current);
            }
          };

          script.onload = () => {
            console.log(`✅ ${scriptConfig.id} loaded`);
          };

          document.body.appendChild(script);
        });

        scriptsLoaded.current = true;
        console.log('🎉 Adsterra scripts loaded (without popunder)');
      };

      // Delay initial load
      timer = setTimeout(loadScripts, 2000);

      // ✅ USER INTERACTION TRIGGER
      const handleInteraction = () => {
        if (!scriptsLoaded.current) {
          loadScripts();
        }
      };

      // Attach listeners dengan once
      ['click', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, handleInteraction, { once: true });
      });

      return () => {
        clearTimeout(timer);
        
        // Remove listeners
        ['click', 'scroll', 'touchstart'].forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });

        // Cleanup scripts
        scripts.forEach(scriptConfig => {
          const script = document.getElementById(scriptConfig.id);
          if (script?.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
        
        scriptsLoaded.current = false;
      };
    }
  }, []);

  return <>{children}</>;
}