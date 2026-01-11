"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { useLikesFavorites } from '@/context/LikesFavoritesContext';
import { CategoryFilter } from '@/app/(protected)/dashboard/components';
import ImageCard from '@/components/cards/ImageCard';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';
import { BookmarkPlus, Bookmark, BookmarkX } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const FavoritesPage = () => {
  const { user } = useAuth();
  const api = useApi();
  const { favoritedImages, toggleFavorite } = useLikesFavorites();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Custom toggle favorite handler to remove images from the list
  const handleRemoveFavorite = useCallback(async (imageId) => {
    const result = await toggleFavorite(imageId);
    if (result.success) {
      // Remove the image from the list if unfavorited
      setImages(prevImages => prevImages.filter(img => img._id !== imageId));
    }
  }, [toggleFavorite]);

  // Fetch favorite images
  const fetchFavoriteImages = async (pageNum = 1, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setLoadedImages([]);
    }

    try {
      // Add category to the API request if it's not 'all'
      const endpoint = selectedCategory && selectedCategory !== 'all'
        ? `/api/favorites?page=${pageNum}&limit=12&category=${selectedCategory}`
        : `/api/favorites?page=${pageNum}&limit=12`;

      const response = await api.get(endpoint);
      
      // Format the data to work with ImageCard component
      const formattedImages = response.data.data.map(item => ({
        ...item.image,
        user: item.user
      }));
      
      if (isLoadMore) {
        setImages(prevImages => [...prevImages, ...formattedImages]);
      } else {
        setImages(formattedImages);
      }

      // Check if more images are available
      setHasMore(response.data.metadata.page < response.data.metadata.pages);

      // After a short delay, mark images as loaded for animation
      setTimeout(() => {
        setLoadedImages(prev => [...prev, ...formattedImages.map(img => img._id)]);
        setLoading(false);
        setLoadingMore(false);
      }, 300);
    } catch (error) {
      console.error('Error fetching favorite images:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more images
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFavoriteImages(nextPage, true);
    }
  };

  // Listen for changes to the favoritedImages object from context
  useEffect(() => {
    // If any image in our current list is no longer in favoritedImages, remove it
    setImages(prevImages => 
      prevImages.filter(img => img._id && favoritedImages[img._id] !== false)
    );
  }, [favoritedImages]);

  // Fetch images when component mounts or category changes
  useEffect(() => {
    if (user) {
      setPage(1);
      fetchFavoriteImages(1, false);
    }
  }, [user, selectedCategory]);

  return (
    <div className="p-2 sm:p-6 w-full max-w-full overflow-hidden">
      <div className="mb-3 sm:mb-6">
        <div className="flex items-center mb-2">
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-violet-500 flex-shrink-0" />
          <h1 className="text-lg sm:text-2xl font-bold truncate">Your Favorites Collection</h1>
        </div>
        <p className="text-gray-400 text-sm sm:text-base">Browse all the images you&apos;ve saved to your favorites</p>
      </div>

      {/* Category filter */}
      <div className="grid grid-cols-1 mb-3">
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Images grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-4 mt-2 sm:mt-4 w-full">
          {Array.from({ length: 12 }).map((_, index) => (
            <ImageSkeleton key={`skeleton-${index}`} heightClass="aspect-[3/4]" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-48 sm:h-64 bg-zinc-900/60 border border-white/10 rounded-xl mt-2 sm:mt-4 mx-1 sm:mx-0"
        >
          <BookmarkX className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4" />
          <p className="text-gray-400 text-base sm:text-lg mb-1 sm:mb-2 text-center px-4">No favorites found</p>
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base text-center px-4">You haven&apos;t added any images to your favorites in this category yet</p>
          <Link href="/feed">
            <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40">
              Discover Images
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-3 mt-2 sm:mt-4 w-full">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
                className="w-full"
              >
                <ImageCard
                  image={image}
                  heightClass="aspect-[3/4]"
                  isLoaded={loadedImages.includes(image._id)}
                  index={index % 4}
                  columnIndex={Math.floor(index / 4)}
                  onRemoveFavorite={() => handleRemoveFavorite(image._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Load more button */}
      {hasMore && !loading && images.length > 0 && (
        <div className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8 px-2 sm:px-0">
          <button
            className={`w-full max-w-xs sm:max-w-none px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 ${loadingMore ? 'opacity-70 cursor-wait' : ''}`}
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

export default FavoritesPage;