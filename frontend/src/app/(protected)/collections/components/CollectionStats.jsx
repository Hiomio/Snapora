import React from 'react';
import { Layers, Grid, Lock, Globe } from 'lucide-react';

const CollectionStats = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Collections</p>
            <p className="text-2xl font-bold mt-1">{collections.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-900/30">
            <Layers className="w-5 h-5 text-violet-400" />
          </div>
        </div>
        <div className="mt-2 text-xs text-emerald-400 flex items-center">
          <span>+{collections.length > 0 ? Math.round(collections.length * 0.1) : 0} this month</span>
        </div>
      </div>
      
      <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Images</p>
            <p className="text-2xl font-bold mt-1">{collections.reduce((acc, col) => acc + (col.imageCount || 0), 0)}</p>
          </div>
          <div className="p-3 rounded-lg bg-fuchsia-900/30">
            <Grid className="w-5 h-5 text-fuchsia-400" />
          </div>
        </div>
        <div className="mt-2 text-xs text-emerald-400 flex items-center">
          <span>+{collections.reduce((acc, col) => acc + (col.imageCount || 0), 0) > 0 ? Math.round(collections.reduce((acc, col) => acc + (col.imageCount || 0), 0) * 0.05) : 0} this month</span>
        </div>
      </div>
      
      <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm">Private Collections</p>
            <p className="text-2xl font-bold mt-1">{collections.filter(c => c.visibility === 'private').length}</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-900/30">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400 flex items-center">
          <span>{collections.length > 0 ? Math.round((collections.filter(c => c.visibility === 'private').length / collections.length) * 100) : 0}% of all collections</span>
        </div>
      </div>
      
      <div className="bg-zinc-900/60 border border-white/10 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm">Public Collections</p>
            <p className="text-2xl font-bold mt-1">{collections.filter(c => c.visibility === 'public').length}</p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-900/30">
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400 flex items-center">
          <span>{collections.filter(c => c.visibility === 'public').length} public collections</span>
        </div>
      </div>
    </div>
  );
};

export default CollectionStats; 