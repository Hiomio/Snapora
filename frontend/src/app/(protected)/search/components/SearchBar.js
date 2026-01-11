"use client"
import React, { useState, useEffect } from 'react';
import { Search, X, Filter, Loader } from 'lucide-react';

const SearchBar = ({ 
  initialQuery, 
  onSearch, 
  loading, 
  showFilterMenu, 
  setShowFilterMenu 
}) => {
  // Internal state for input value
  const [inputValue, setInputValue] = useState(initialQuery || '');
  
  // Update internal state if props change
  useEffect(() => {
    setInputValue(initialQuery || '');
  }, [initialQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const handleTrendingSearchClick = (query) => {
    setInputValue(query);
    onSearch(query);
  };

  return (
    <div className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-lg border-b border-white/10 px-6 py-4">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-zinc-800/50 border border-white/10 rounded-full py-3 pl-12 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-white placeholder-gray-400"
            placeholder="Search for images, users, tags, collections..."
          />
          {inputValue && (
            <button 
              onClick={() => setInputValue('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
        
        <div className="flex items-center gap-2 md:ml-4">
          <button 
            className="bg-white/5 hover:bg-white/10 p-3 rounded-full relative"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleSearchSubmit}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 