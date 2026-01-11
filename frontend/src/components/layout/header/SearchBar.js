"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

const SearchBar = ({ searchActive, toggleSearch, setActiveDropdown, activeDropdown }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const api = useApi();

  useEffect(() => {
    if (searchActive) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      loadRecentSearches();
      loadTrendingSearches();
    }
  }, [searchActive]);

  // Load recent searches from localStorage
  const loadRecentSearches = () => {
    try {
      const recent = JSON.parse(localStorage.getItem('pixora_recent_searches') || '[]');
      setRecentSearches(recent.slice(0, 5));
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  // Load trending searches
  const loadTrendingSearches = async () => {
    try {
      const response = await api.get('/api/images/trending-search?limit=5');
      setTrendingSearches(response.data.data || []);
    } catch (error) {
      console.error('Error loading trending searches:', error);
    }
  };

  // Save search to recent searches
  const saveSearch = (query) => {
    try {
      const recent = JSON.parse(localStorage.getItem('pixora_recent_searches') || '[]');
      const filtered = recent.filter(item => item !== query);
      const updated = [query, ...filtered].slice(0, 10);
      localStorage.setItem('pixora_recent_searches', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  // Handle search suggestions
  const handleSearchInput = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      setLoading(true);
      try {
        // Get suggestions from multiple endpoints
        const [imagesRes, usersRes, tagsRes] = await Promise.allSettled([
          api.get(`/api/images/search?q=${query}&limit=3`),
          api.get(`/api/users/search?query=${query}&limit=3`),
          api.get(`/api/images/tags/search?query=${query}&limit=3`)
        ]);

        const suggestions = [];
        
        if (imagesRes.status === 'fulfilled' && imagesRes.value.data.data) {
          suggestions.push(...imagesRes.value.data.data.map(img => ({
            type: 'image',
            title: img.title,
            id: img._id,
            thumbnail: img.thumbnail || img.url
          })));
        }
        
        if (usersRes.status === 'fulfilled' && usersRes.value.data.data) {
          suggestions.push(...usersRes.value.data.data.map(user => ({
            type: 'user',
            title: user.username,
            id: user._id,
            thumbnail: user.profilePicture
          })));
        }
        
        if (tagsRes.status === 'fulfilled' && tagsRes.value.data.data) {
          suggestions.push(...tagsRes.value.data.data.map(tag => ({
            type: 'tag',
            title: `#${tag.name}`,
            id: tag.name,
            count: tag.count
          })));
        }

        setSuggestions(suggestions.slice(0, 6));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      toggleSearch();
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'image') {
      router.push(`/image/${suggestion.id}`);
    } else if (suggestion.type === 'user') {
      router.push(`/profile/${suggestion.title}`);
    } else if (suggestion.type === 'tag') {
      router.push(`/search?q=${encodeURIComponent(suggestion.title)}`);
    }
    toggleSearch();
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleRecentSearchClick = (query) => {
    saveSearch(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    toggleSearch();
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleTrendingSearchClick = (query) => {
    saveSearch(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    toggleSearch();
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <AnimatePresence>
      {searchActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 mx-auto w-full max-w-4xl px-6 z-70"
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search images, people, collections, or tags..."
                className="w-full bg-zinc-800/90 backdrop-blur-xl border border-white/10 rounded-full py-3 pl-12 pr-20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-xl shadow-black/30"
                value={searchQuery}
                onChange={handleSearchInput}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <div className="absolute right-4 flex items-center space-x-2">
                <button
                  type="button"
                  className="text-gray-400 hover:text-violet-400 transition-colors"
                  onClick={() => setActiveDropdown("searchFilters")}
                >
                  <Filter className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={toggleSearch}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (searchQuery.trim() || recentSearches.length > 0 || trendingSearches.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl shadow-black/30 overflow-hidden"
                >
                  {/* Search Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="p-4 border-b border-white/10">
                      <h3 className="text-sm font-medium text-violet-300 mb-3">Quick Results</h3>
                      <div className="space-y-2">
                        {suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
                          >
                            {suggestion.thumbnail ? (
                              <img 
                                src={suggestion.thumbnail} 
                                alt={suggestion.title}
                                className="w-8 h-8 rounded object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded bg-zinc-700 flex items-center justify-center">
                                {suggestion.type === 'user' ? '👤' : suggestion.type === 'tag' ? '#' : '🖼️'}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm truncate">{suggestion.title}</p>
                              <p className="text-gray-400 text-xs capitalize">{suggestion.type}</p>
                            </div>
                            {suggestion.count && (
                              <span className="text-xs text-gray-500">{suggestion.count} posts</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="p-4 border-b border-white/10">
                      <h3 className="text-sm font-medium text-violet-300 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((search, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleRecentSearchClick(search)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
                          >
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Searches */}
                  {trendingSearches.length > 0 && (
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-violet-300 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Trending
                      </h3>
                      <div className="space-y-2">
                        {trendingSearches.map((trend, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleTrendingSearchClick(trend.name)}
                            className="w-full flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
                          >
                            <TrendingUp className="w-4 h-4 text-amber-400" />
                            <span className="text-gray-300 text-sm">#{trend.name}</span>
                            <span className="text-xs text-gray-500 ml-auto">{trend.count} posts</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No results message */}
                  {!loading && suggestions.length === 0 && recentSearches.length === 0 && trendingSearches.length === 0 && searchQuery.trim() && (
                    <div className="p-4 text-center text-gray-400">
                      <p>No results found for &quot;{searchQuery}&quot;</p>
                      <p className="text-sm mt-1">Try searching for something else</p>
                    </div>
                  )}

                  {/* Loading state */}
                  {loading && (
                    <div className="p-4 text-center text-gray-400">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-500 mx-auto"></div>
                      <p className="mt-2 text-sm">Searching...</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <SearchFilters activeDropdown={activeDropdown} />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SearchFilters = ({ activeDropdown }) => {
  if (activeDropdown !== "searchFilters") return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-4 mt-2 w-64 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden z-50"
    >
      <div className="p-3 border-b border-white/10">
        <h3 className="text-sm font-medium text-violet-300">Search Filters</h3>
      </div>
      <div className="p-3 space-y-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Content Type</label>
          <div className="grid grid-cols-3 gap-1">
            <button className="bg-violet-600/20 text-violet-400 rounded-lg p-2 text-xs">Images</button>
            <button className="bg-white/5 hover:bg-white/10 rounded-lg p-2 text-xs">People</button>
            <button className="bg-white/5 hover:bg-white/10 rounded-lg p-2 text-xs">Collections</button>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Date Added</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs">
            <option>Any time</option>
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>
        <button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg p-2 text-xs font-medium transition-colors">
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
};

export default SearchBar; 