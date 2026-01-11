import React from 'react';

const ImageSkeleton = ({ heightClass = "aspect-square" }) => {
  return (
    <div className={`rounded-xl overflow-hidden ${heightClass} bg-zinc-800/50 border border-white/5 animate-pulse`}>
      <div className="w-full h-full flex items-end p-4">
        <div className="w-full">
          <div className="h-3 bg-zinc-700 rounded w-1/3 mb-2"></div>
          <div className="h-5 bg-zinc-700 rounded w-3/4 mb-3"></div>
          <div className="flex justify-between items-center">
            <div className="h-2 bg-zinc-700 rounded w-1/5"></div>
            <div className="h-2 bg-zinc-700 rounded w-1/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSkeleton; 