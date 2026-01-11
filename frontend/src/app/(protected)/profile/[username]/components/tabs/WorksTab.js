"use client"
import React, { useState, useEffect } from 'react';
import {
  Filter,
  ChevronDown,
} from 'lucide-react';
import ImageCard from '@/components/cards/ImageCard';
import { CategoryFilter } from '@/app/(protected)/dashboard/components';
import { useApi } from '@/hooks/useApi';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

const WorksTab = ({user}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadedImages, setLoadedImages] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const api = useApi();

  const fetchUserImages = async (pageNum = 1, isLoadMore = false) => {
    if (!user?._id) return;
    
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      // Add category to the API request if it's not 'all'
      const endpoint = selectedCategory && selectedCategory !== 'all'
        ? `/api/images/user/${user._id}?page=${pageNum}&limit=9&category=${selectedCategory}`
        : `/api/images/user/${user._id}?page=${pageNum}&limit=9`;
        
      const response = await api.get(endpoint);
      
      if (isLoadMore) {
        setUserImages(prevImages => [...prevImages, ...response.data.data]);
      } else {
        setUserImages(response.data.data);
      }

      // Check if more images are available
      setHasMore(response.data.metadata.page < response.data.metadata.pages);

      // After a short delay, mark images as loaded for animation
      setTimeout(() => {
        setLoadedImages(prev => [...prev, ...response.data.data.map(img => img._id)]);
        setLoading(false);
        setLoadingMore(false);
      }, 300);
    } catch (error) {
      console.error('Error fetching user images:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more images
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUserImages(nextPage, true);
    }
  };

  useEffect(() => {
    if (user?._id) {
      setPage(1);
      fetchUserImages(1, false);
    }
  }, [user, selectedCategory]);

  if(!user) return null;

  return (
    <div>
      {/* Category filter */}
      <div className="grid grid-cols-1 mb-3">
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ImageSkeleton key={`skeleton-${index}`} heightClass="aspect-[4/4]" />
          ))}
        </div>
      ) : userImages.length === 0 ? (
        <div className="flex justify-center items-center h-48 sm:h-64 bg-zinc-900/60 border border-white/10 rounded-xl mt-4">
          <p className="text-sm sm:text-base text-gray-400 px-4 text-center">No images available for this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3 mt-4 sm:mt-6">
          {userImages.map((image, index) => (
            <ImageCard
              key={image._id}
              image={image}
              heightClass="aspect-[4/4]"
              isLoaded={loadedImages.includes(image._id)}
              index={index % 3}
              columnIndex={Math.floor(index / 3)}
            />
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-6 sm:mt-8">
          <button 
            className={`px-4 sm:px-6 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-xs sm:text-sm font-medium ${loadingMore ? 'opacity-70 cursor-wait' : ''}`}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default WorksTab; 