"use client"
import React from 'react';
import { X } from 'lucide-react';

const ActiveFilters = ({ activeFilters, toggleFilter }) => {
  if (!activeFilters || activeFilters.length === 0) return null;
  
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-400">Active filters:</span>
      {activeFilters.map(filter => (
        <div 
          key={filter}
          className="bg-white/10 rounded-full px-3 py-1 text-xs flex items-center gap-2"
        >
          {filter}
          <button 
            onClick={() => toggleFilter(filter)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters; 