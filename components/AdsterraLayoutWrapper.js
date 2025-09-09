"use client";

import { useEffect } from 'react';

// This component is a wrapper to include Adsterra scripts
// It will only render on the client side
export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Add Popunder script
    const popunderScript = document.createElement('script');
    popunderScript.type = 'text/javascript';
    popunderScript.src = '//discreetisabella.com/64/f0/44/64f0448453921f0e8c8d5d370c1de538.js';
    document.body.appendChild(popunderScript);

    // Add Social Bar script
    const socialBarScript = document.createElement('script');
    socialBarScript.type = 'text/javascript';
    socialBarScript.src = '//discreetisabella.com/01/e0/54/01e05438871c5014fcce1a184099ffda.js';
    document.body.appendChild(socialBarScript);

    // Add Native Banner script and div container
    const nativeBannerScript = document.createElement('script');
    nativeBannerScript.async = true;
    nativeBannerScript.setAttribute('data-cfasync', 'false');
    nativeBannerScript.src = '//discreetisabella.com/94f17a22860e4b4d6b99ce8c1e3dbbc3/invoke.js';
    
    // Add a div for the native banner
    const nativeBannerDiv = document.createElement('div');
    nativeBannerDiv.id = 'container-94f17a22860e4b4d6b99ce8c1e3dbbc3';
    
    // Find the main content container to place the ad
    const mainContainer = document.querySelector('.mx-auto.max-w-7xl');

    // Find the footer element
    const footerElement = document.querySelector('footer');

    if (mainContainer && footerElement) {
      // Insert the ad div just before the footer
      mainContainer.insertBefore(nativeBannerDiv, footerElement);
    }
    
    // Append the native banner script to the body
    document.body.appendChild(nativeBannerScript);

    // Clean up function to remove scripts and divs when the component unmounts
    return () => {
      document.body.removeChild(popunderScript);
      document.body.removeChild(socialBarScript);
      document.body.removeChild(nativeBannerScript);
      if (mainContainer && nativeBannerDiv && nativeBannerDiv.parentNode === mainContainer) {
        mainContainer.removeChild(nativeBannerDiv);
      }
    };
  }, []);

  return children;
}
