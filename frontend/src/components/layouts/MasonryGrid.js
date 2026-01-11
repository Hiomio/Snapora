import React, { useState, useEffect } from 'react';
import ImageCard from '@/components/cards/ImageCard';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

const MasonryGrid = ({ 
  images = [], 
  loading = false, 
  columns = [2, 3, 4],
  onUnlike,
  onRemoveFavorite,
  onImageOptions
}) => {
  // columns is an array of [mobile, tablet, desktop] column counts
  const [imageColumns, setImageColumns] = useState([]);
  const [columnCount, setColumnCount] = useState(columns[0]); // Default to mobile
  const [loadedImages, setLoadedImages] = useState([]);

  // Track loaded images for animation
  useEffect(() => {
    if (images.length > 0 && !loading) {
      // Simulate images loading over time
      const timer = setTimeout(() => {
        setLoadedImages(images.map(img => img._id));
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [images, loading]);

  // Determine column count based on screen size
  useEffect(() => {
    const updateColumnCount = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setColumnCount(columns[2]); // desktop
        } else if (window.innerWidth >= 768) {
          setColumnCount(columns[1]); // tablet
        } else {
          setColumnCount(columns[0]); // mobile
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
  }, [columns]);

  // Distribute images into columns for masonry layout
  useEffect(() => {
    if (images.length > 0 && columnCount > 0) {
      // Create empty columns
      const columns = Array.from({ length: columnCount }, () => []);
      
      // Distribute images into columns
      images.forEach((image, index) => {
        // Find the shortest column
        const shortestColumnIndex = columns
          .map(column => column.reduce((height, img) => height + getImageHeight(img), 0))
          .reduce((minIndex, height, index, heights) => 
            height < heights[minIndex] ? index : minIndex, 0);
        
        // Add image to the shortest column
        columns[shortestColumnIndex].push(image);
      });
      
      setImageColumns(columns);
    } else {
      setImageColumns([]);
    }
  }, [images, columnCount]);
  
  // Helper to determine relative height of an image
  const getImageHeight = (image) => {
    if (image.height === "tall") return 5;
    if (image.height === "medium") return 4;
    if (image.height === "short") return 3;
    return 4; // default
  };

  // Create skeleton loaders for loading state
  const renderSkeletons = () => {
    const skeletonColumns = Array.from({ length: columnCount }, () => []);
    const heights = ["aspect-square", "aspect-[3/5]", "aspect-[3/4]", "aspect-[4/3]"];
    
    // Create skeleton items (2 per column)
    for (let i = 0; i < columnCount * 2; i++) {
      const columnIndex = i % columnCount;
      const randomHeight = heights[Math.floor(Math.random() * heights.length)];
      skeletonColumns[columnIndex].push(randomHeight);
    }
    
    return (
      <div className="flex w-full gap-4">
        {skeletonColumns.map((column, colIdx) => (
          <div key={`skeleton-col-${colIdx}`} className="flex-1 flex flex-col gap-4">
            {column.map((heightClass, idx) => (
              <ImageSkeleton key={`skeleton-${colIdx}-${idx}`} heightClass={heightClass} />
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Show loading skeletons
  if (loading) {
    return renderSkeletons();
  }

  // Show empty state
  if (!loading && images.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No images found.</p>
      </div>
    );
  }

  // Render masonry grid layout
  return (
    <div className="flex w-full gap-4">
      {imageColumns.map((column, columnIndex) => (
        <div key={`column-${columnIndex}`} className="flex-1 flex flex-col gap-4">
          {column.map((image, imageIndex) => (
            <ImageCard 
              key={image._id}
              image={image}
              isLoaded={loadedImages.includes(image._id)}
              index={imageIndex}
              columnIndex={columnIndex}
              onUnlike={onUnlike}
              onRemoveFavorite={onRemoveFavorite}
              onCollectionOptions={onImageOptions ? () => onImageOptions(image) : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid; 