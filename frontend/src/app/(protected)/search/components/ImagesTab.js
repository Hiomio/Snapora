"use client"
import React from 'react';
import { TrendingUp, Clock, Grid, ChevronDown, ImageIcon } from 'lucide-react';
import ImageCard from '@/components/cards/ImageCard';

const ImagesTab = ({ 
  loading, 
  imageResults, 
  loadMore, 
  hasMore 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button className="bg-white/5 hover:bg-white/10 py-2 px-4 rounded-lg flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            Sort by: <span className="font-medium">Trending</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <button className="bg-white/5 hover:bg-white/10 py-2 px-4 rounded-lg text-sm hidden md:flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time: <span className="font-medium">Recent</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        <button className="bg-white/5 hover:bg-white/10 p-2 rounded-lg hidden md:flex">
          <Grid className="w-5 h-5" />
        </button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="aspect-[3/4] bg-zinc-900/60 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : imageResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageResults.map((image, index) => (
            <ImageCard
              key={image._id}
              image={image}
              heightClass="aspect-[3/4]"
              isLoaded={true}
              index={index % 4}
              columnIndex={Math.floor(index / 4)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-zinc-900/60 border border-white/10 rounded-xl">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-xl font-medium mb-2">No images found</h3>
          <p className="text-gray-400">Try different keywords or check the spelling</p>
        </div>
      )}
      
      {imageResults.length > 0 && hasMore && (
        <div className="mt-10 flex justify-center">
          <button 
            onClick={loadMore}
            className="bg-white/5 hover:bg-white/10 py-3 px-6 rounded-full text-sm flex items-center gap-2 transition-colors"
          >
            Load more results
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagesTab; 