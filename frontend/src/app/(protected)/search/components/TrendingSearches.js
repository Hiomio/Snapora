"use client"
import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

const TrendingSearches = ({ 
  loading, 
  trendingSearches, 
  onTrendingClick 
}) => {
  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Trending Searches
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-5 w-3/4 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-zinc-800 rounded"></div>
            </div>
          ))
        ) : trendingSearches.length > 0 ? (
          trendingSearches.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => onTrendingClick(item.query)}
              className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 hover:border-violet-500/50 transition-colors text-left"
            >
              <p className="font-medium mb-1">{item.query}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                {item.count}
              </p>
            </button>
          ))
        ) : (
          <div className="col-span-4 text-center py-8 bg-zinc-900/60 border border-white/10 rounded-xl">
            <p className="text-gray-400">Trending searches will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSearches; 