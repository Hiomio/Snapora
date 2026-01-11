"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { CategoryFilter } from '@/app/(protected)/dashboard/components';
import ImageCard from '@/components/cards/ImageCard';
import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

const TagPage = () => {
  const params = useParams();
  const tag = params.tag;
  const { user } = useAuth();
  const api = useApi();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadedImages, setLoadedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch images by tag
  const fetchTagImages = async (pageNum = 1, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setLoadedImages([]);
    }

    try {
      // Add category to the API request if it's not 'all'
      const endpoint = selectedCategory && selectedCategory !== 'all'
        ? `/api/images/tags/${tag}?page=${pageNum}&limit=12&category=${selectedCategory}`
        : `/api/images/tags/${tag}?page=${pageNum}&limit=12`;

      const response = await api.get(endpoint);
      
      if (isLoadMore) {
        setImages(prevImages => [...prevImages, ...response.data.data]);
      } else {
        setImages(response.data.data);
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
      console.error('Error fetching tag images:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load more images
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTagImages(nextPage, true);
    }
  };

  // Fetch images when component mounts or tag/category changes
  useEffect(() => {
    if (user && tag) {
      setPage(1);
      fetchTagImages(1, false);
    }
  }, [user, tag, selectedCategory]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">#{tag}</h1>
        <p className="text-gray-400">Browse images tagged with #{tag}</p>
      </div>

      {/* Category filter */}
      <div className="grid grid-cols-1 mb-3">
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Images grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <ImageSkeleton key={`skeleton-${index}`} heightClass="aspect-[3/4]" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-zinc-900/60 border border-white/10 rounded-xl mt-4">
          <p className="text-gray-400">No images found with tag #{tag}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {images.map((image, index) => (
            <ImageCard
              key={image._id}
              image={image}
              heightClass="aspect-[3/4]"
              isLoaded={loadedImages.includes(image._id)}
              index={index % 4}
              columnIndex={Math.floor(index / 4)}
            />
          ))}
        </div>
      )}

      {/* Load more button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8 mb-8">
          <button
            className={`px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 ${loadingMore ? 'opacity-70 cursor-wait' : ''}`}
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

export default TagPage;