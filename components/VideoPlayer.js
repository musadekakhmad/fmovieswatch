'use client';

import React from 'react';

/**
 * A React component for playing videos using the native HTML5 <video> element.
 * This is a lighter and more reliable alternative to video.js.
 * @param {string} videoUrl - The URL of the video to be played.
 */
function VideoPlayer({ videoUrl }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
      {/*
        Native HTML5 video element. The 'controls' attribute provides the browser's
        built-in playback controls. 'autoPlay' ensures the video starts automatically.
        'w-full' and 'h-full' ensure the video fills its container.
      */}
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        controls
        autoPlay
        preload="auto"
        // Add a fallback if the browser does not support the video tag
        onError={(e) => console.error("Error loading video:", e)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
