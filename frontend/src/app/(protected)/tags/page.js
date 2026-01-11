"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Search, Tag, TrendingUp, Hash } from 'lucide-react';

const TagsPage = () => {
  const [popularTags, setPopularTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const api = useApi();

  // Fetch popular tags
  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await api.get('/api/images/tags/popular?limit=50');
        setPopularTags(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular tags:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchPopularTags();
    }
  }, [user, api]);

  // Filter tags based on search query
  const filteredTags = searchQuery 
    ? popularTags.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : popularTags;

  // Group tags into different sizes based on count
  const getTagSize = (count, max) => {
    if (!max) return 'md';
    const ratio = count / max;
    if (ratio > 0.8) return 'xl';
    if (ratio > 0.6) return 'lg';
    if (ratio > 0.3) return 'md';
    return 'sm';
  };

  const maxCount = popularTags.length > 0 ? Math.max(...popularTags.map(tag => tag.count)) : 0;

  // Suggested trending tags - hardcoded for demonstration
  const suggestedTags = [
    'photography', 'digital-art', 'illustration', 'portrait', 'landscape',
    'abstract', 'minimalist', 'cyberpunk', 'nature', 'urban'
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Explore Tags</h1>
        <p className="text-gray-400">Discover content through popular tags and trends</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-zinc-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Search for tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Suggested Trending Tags */}
      <div className="mb-10">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-violet-400" />
          <h2 className="text-lg font-semibold">Trending Tags</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <Link href={`/tags/${tag}`} key={tag}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full px-4 py-2 text-sm font-medium cursor-pointer"
              >
                #{tag}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags Cloud */}
      <div>
        <div className="flex items-center mb-4">
          <Hash className="w-5 h-5 mr-2 text-violet-400" />
          <h2 className="text-lg font-semibold">Popular Tags</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <div 
                key={index} 
                className="h-12 bg-zinc-800/50 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : filteredTags.length === 0 ? (
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-8 text-center">
            <Tag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">
              {searchQuery ? `No tags found matching "${searchQuery}"` : "No tags found"}
            </p>
          </div>
        ) : (
          <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {filteredTags.map((tag) => {
                const size = getTagSize(tag.count, maxCount);
                return (
                  <Link href={`/tags/${tag.name}`} key={tag.name}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`tag-${size} px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 ${
                        size === 'xl' 
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold' 
                          : 'bg-white/10 hover:bg-white/15'
                      }`}
                    >
                      <span className="flex items-center">
                        #{tag.name}
                        <span className="ml-2 text-xs text-gray-400">({tag.count})</span>
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tag Showcase */}
      {!loading && popularTags.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Featured Tag Examples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularTags.slice(0, 8).map((tag) => (
              <Link href={`/tags/${tag.name}`} key={`showcase-${tag.name}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
                  />
                  {tag.sampleImage && (
                    <img 
                      src={tag.sampleImage} 
                      alt={tag.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 p-4 z-20">
                    <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                      <span className="text-sm font-medium">#{tag.name}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .tag-xl { font-size: 1.25rem; }
        .tag-lg { font-size: 1.125rem; }
        .tag-md { font-size: 1rem; }
        .tag-sm { font-size: 0.875rem; }
      `}</style>
    </div>
  );
};

export default TagsPage;
