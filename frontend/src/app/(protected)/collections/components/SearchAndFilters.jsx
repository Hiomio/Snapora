import React from 'react';
import { 
  Search, 
  ChevronDown, 
  SortAsc, 
  Clock, 
  Calendar, 
  Grid, 
  Layers 
} from 'lucide-react';

const SearchAndFilters = ({ 
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortOption,
  sortOrder,
  setSortOption,
  setSortOrder,
  filterOpen,
  setFilterOpen
}) => {
  // Helper for sort option display
  const getSortDisplay = () => {
    switch(sortOption) {
      case 'updatedAt':
        return sortOrder === 'desc' ? 'Most Recent' : 'Oldest First';
      case 'name':
        return sortOrder === 'asc' ? 'Name (A-Z)' : 'Name (Z-A)';
      case 'imageCount':
        return sortOrder === 'desc' ? 'Most Images' : 'Fewest Images';
      default:
        return 'Sort';
    }
  };

  return (
    <div className="mb-6 grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-9 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search collections by name, description or tags..." 
          className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-white placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="col-span-12 md:col-span-3 grid grid-cols-2">
        <div className="flex gap-3 items-end">
          <button 
            onClick={() => setViewMode('grid')}
            className={`flex-1 flex items-center justify-center p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-white/10 border-violet-500' : 'border-white/10 hover:bg-white/5'} transition-colors`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center p-2 rounded-lg border ${viewMode === 'list' ? 'bg-white/10 border-violet-500' : 'border-white/10 hover:bg-white/5'} transition-colors`}
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters; 