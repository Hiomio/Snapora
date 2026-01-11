import React from 'react';
import { FolderPlus } from 'lucide-react';

const CollectionHeader = ({ onCreateClick }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold">My Collections</h1>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onCreateClick}
          className="hidden md:flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-2 px-4 transition-all duration-300"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
        
        <button 
          onClick={onCreateClick}
          className="md:hidden p-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600"
        >
          <FolderPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CollectionHeader; 