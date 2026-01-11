"use client"
import React from 'react';
import { Users, Search, Filter, ChevronDown } from 'lucide-react';

const UsersHeader = ({ searchQuery, setSearchQuery, filterOpen, setFilterOpen }) => {
  return (
    <div className="p-6 pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1 flex items-center">
            <Users className="mr-2 w-5 h-5" />
            Users & Community
          </h1>
          <p className="text-gray-400 text-sm">Connect with creators and build your network</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find users..." 
              className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setFilterOpen(!filterOpen)} 
              className="flex items-center gap-2 bg-zinc-800/50 border border-white/10 rounded-lg py-2 px-4 hover:bg-zinc-700/50 transition"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-zinc-800 border border-white/10 rounded-lg shadow-xl z-10">
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-2">Filter by</h3>
                  <div className="space-y-2">
                    {['All Users', 'Verified', 'Pro Users', 'New Users'].map((filter, idx) => (
                      <div key={idx} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`filter-${idx}`} 
                          className="w-4 h-4 rounded border-white/20 text-violet-600 focus:ring-violet-500 bg-zinc-700"
                        />
                        <label htmlFor={`filter-${idx}`} className="ml-2 text-sm text-gray-300">{filter}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button className="text-xs text-violet-400 hover:text-violet-300">Apply Filters</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersHeader; 