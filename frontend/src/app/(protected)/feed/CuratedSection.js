import { Zap } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ImageCard from '@/components/cards/ImageCard';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

const CuratedSection = ({ feedImages = [], loadedImages = [], loading = false }) => {
  // Create column arrays for masonry layout
  const [columns, setColumns] = useState([]);
  const [columnCount, setColumnCount] = useState(2); // Default for mobile

  // Determine column count based on screen size
  useEffect(() => {
    const updateColumnCount = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setColumnCount(4); // lg
        } else if (window.innerWidth >= 768) {
          setColumnCount(3); // md
        } else {
          setColumnCount(2); // mobile and sm - always 2 columns for mobile
        }
      }
    };

    // Initial setup
    updateColumnCount();
    
    // Add resize listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateColumnCount);
      
      // Clean up
      return () => window.removeEventListener('resize', updateColumnCount);
    }
  }, []);

  // Distribute images into columns using the height to determine placement
  useEffect(() => {
    if (feedImages.length && columnCount > 0) {
      // Initialize column heights
      const columnHeights = new Array(columnCount).fill(0);
      const newColumns = Array.from({ length: columnCount }, () => []);
      
      // Place each image in the shortest column
      feedImages.forEach(image => {
        // Determine approximate height based on image.height property
        let heightFactor = 1; // default for "aspect-square"
        if (image.height === "tall") heightFactor = 5/3; // aspect-[3/5]
        if (image.height === "medium") heightFactor = 4/3; // aspect-[3/4]
        if (image.height === "short") heightFactor = 3/4; // aspect-[4/3]
        
        // Find index of column with smallest height
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        
        // Add image to shortest column
        newColumns[shortestColumnIndex].push(image);
        
        // Update column height
        columnHeights[shortestColumnIndex] += heightFactor;
      });
      
      setColumns(newColumns);
    }
  }, [feedImages, columnCount]);

  // Create skeleton loaders
  const renderSkeletons = () => {
    const skeletonColumns = Array.from({ length: columnCount }, () => []);
    const heights = ["aspect-square", "aspect-[3/5]", "aspect-[3/4]", "aspect-[4/3]"];
    
    // Create skeletons based on column count (2 per column minimum)
    const totalSkeletons = Math.max(columnCount * 2, 8);
    for (let i = 0; i < totalSkeletons; i++) {
      const columnIndex = i % columnCount;
      const randomHeight = heights[Math.floor(Math.random() * heights.length)];
      skeletonColumns[columnIndex].push(randomHeight);
    }
    
    return (
      <div className="flex w-full gap-1.5 sm:gap-4 max-w-full overflow-hidden">
        {skeletonColumns.map((column, colIdx) => (
          <div key={`skeleton-col-${colIdx}`} className="flex-1 flex flex-col gap-1.5 sm:gap-4 min-w-0">
            {column.map((heightClass, idx) => (
              <ImageSkeleton key={`skeleton-${colIdx}-${idx}`} heightClass={heightClass} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-6 sm:mb-10 px-2 sm:px-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-6">
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg p-1 sm:p-1.5">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
        <h2 className="text-base sm:text-xl font-bold">For You</h2>
        <span className="text-xs sm:text-sm text-gray-400 hidden sm:inline">Curated based on your preferences</span>
      </div>

      {/* Show skeleton loader while loading */}
      {loading && renderSkeletons()}

      {/* Masonry grid layout */}
      {!loading && columns.length > 0 && (
        <div className="flex w-full gap-1.5 sm:gap-4 max-w-full overflow-hidden">
          {columns.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="flex-1 flex flex-col gap-1.5 sm:gap-4 min-w-0">
              {column.map((image, imageIndex) => (
                <ImageCard 
                  key={image._id}
                  image={image}
                  isLoaded={loadedImages.includes(image._id)}
                  index={imageIndex}
                  columnIndex={columnIndex}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Empty state if no images and not loading */}
      {!loading && feedImages.length === 0 && (
        <div className="text-center py-6 sm:py-10 px-2">
          <p className="text-gray-400 text-sm sm:text-base">No images found. Try adjusting your preferences.</p>
        </div>
      )}
    </div>
  );
};

export default CuratedSection;