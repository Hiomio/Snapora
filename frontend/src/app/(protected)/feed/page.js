"use client"
import React, { useState, useEffect } from 'react';
import {
  Camera,
  Image,
  PlusSquare,
  Sparkles,
} from 'lucide-react';
import CuratedSection from './CuratedSection';
import { useApi } from "@/hooks/useApi";
import { useAuth } from '@/context/AuthContext';
import { CategoryFilter } from '../dashboard/components';
import Link from 'next/link';

const Feed = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();
  const [loadedImages, setLoadedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isHovered, setIsHovered] = useState(false);

  const api = useApi();

  const assignRandomHeight = (images) => {
    const heights = ['tall', 'medium', 'short'];
    return images.map(img => ({
      ...img,
      height: heights[Math.floor(Math.random() * heights.length)]
    }));
  };

  const fetchImages = async (pageNum = 1, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setLoadedImages([]);
    }

    try {
      const endpoint = selectedCategory && selectedCategory !== 'all'
        ? `/api/images/public?page=${pageNum}&limit=12&category=${selectedCategory}`
        : `/api/images/public?page=${pageNum}&limit=12`;

      const response = await api.get(endpoint);

      const imagesWithHeight = assignRandomHeight(response.data.data);

      if (isLoadMore) {
        setImages(prevImages => [...prevImages, ...imagesWithHeight]);
      } else {
        setImages(imagesWithHeight);
      }

      setHasMore(response.data.metadata.page < response.data.metadata.pages);

      setTimeout(() => {
        setLoadedImages(prev => [...prev, ...imagesWithHeight.map(img => img._id)]);
        setLoading(false);
        setLoadingMore(false);
      }, 300);

    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage, true);
    }
  };

  useEffect(() => {
    if (user) {
      setPage(1);
      fetchImages(1, false);
    }
  }, [user, selectedCategory]);

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Enhanced Quick Actions Bar */}
      <div className="px-2 sm:px-4 pt-3 sm:pt-6 pb-2 sm:pb-4">
        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
          
          <div className="relative bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-950/95 rounded-xl sm:rounded-2xl p-3 sm:p-5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 transition-all duration-500 group-hover:border-violet-500/20 group-hover:shadow-violet-500/10">
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                {/* Enhanced avatar with glow */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 p-0.5 transform group-hover:scale-105 transition-transform duration-500">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center">
                      <PlusSquare className="w-4 h-4 sm:w-6 sm:h-6 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm sm:text-base font-semibold truncate bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Create Post
                    </p>
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 hidden sm:block">
                    Share your moment with the world
                  </p>
                </div>
              </div>

              {/* Enhanced action buttons */}
              <div className="flex gap-2 sm:gap-3 flex-shrink-0">
                <Link 
                  href="/upload-image" 
                  className="relative group/btn p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <Camera className="relative w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover/btn:text-white group-hover/btn:scale-110 transition-all duration-300" />
                </Link>
                
                <Link 
                  href="/upload-image" 
                  className="relative group/btn p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-violet-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <Image className="relative w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover/btn:text-white group-hover/btn:scale-110 transition-all duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Category filter with animation */}
      <div className="px-2 sm:px-4 grid grid-cols-1 mb-4">
        <div className="animate-fadeIn">
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      {/* Enhanced Curated section */}
      <div className="animate-fadeIn">
        <CuratedSection
          feedImages={images}
          loadedImages={loadedImages}
          loading={loading}
        />
      </div>

      {/* Enhanced Load more button */}
      <div className="flex justify-center mt-6 sm:mt-8 mb-16 sm:mb-20 px-4">
        {hasMore && (
          <button
            className={`group relative px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-500 overflow-hidden ${
              loadingMore ? 'opacity-70 cursor-wait' : 'hover:scale-105 active:scale-95'
            }`}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <span className="relative flex items-center gap-2 text-white">
              {loadingMore ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Load More
                  <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </span>
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Feed;