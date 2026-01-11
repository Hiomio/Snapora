"use client"
import React from 'react';
import { X } from 'lucide-react';

const FilterMenu = ({ showFilterMenu, activeFilters, toggleFilter, clearFilters }) => {
  if (!showFilterMenu) return null;
  
  const filterCategories = [
    {
      title: 'Time period',
      filters: ['recent', 'past week', 'past month', 'past year', 'all time']
    },
    {
      title: 'Image type',
      filters: ['photography', 'digital art', 'illustration', 'vector', '3D']
    },
    {
      title: 'License',
      filters: ['all rights reserved', 'creative commons', 'commercial use', 'free to use']
    }
  ];
  
  return (
    <div className="max-w-screen-2xl mx-auto mt-4 p-4 bg-zinc-900/80 backdrop-blur-xl rounded-xl border border-white/10 animate-in fade-in-0 slide-in-from-top-5 duration-300">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-xs text-violet-400 hover:text-violet-300"
        >
          Clear all filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filterCategories.map((category, idx) => (
          <div key={idx}>
            <h4 className="text-sm text-gray-400 mb-2">{category.title}</h4>
            <div className="space-y-2">
              {category.filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    activeFilters.includes(filter)
                      ? 'bg-violet-600 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  } transition-colors`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMenu; 