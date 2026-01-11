import React from 'react';
import { Shuffle, Star, Clock, Tag, Users, Lock } from 'lucide-react';

const CollectionQuickAccess = () => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <button className="bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors flex flex-col items-center justify-center aspect-square">
          <div className="p-3 bg-white/10 rounded-lg mb-2">
            <Shuffle className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-sm font-medium">Random</p>
          <p className="text-xs text-gray-400">Explore randomly</p>
        </button>
        
        <button className="bg-gradient-to-br from-rose-900/50 to-violet-900/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors flex flex-col items-center justify-center aspect-square">
          <div className="p-3 bg-white/10 rounded-lg mb-2">
            <Star className="w-5 h-5 text-rose-400" />
          </div>
          <p className="text-sm font-medium">Favorites</p>
          <p className="text-xs text-gray-400">Starred collections</p>
        </button>
        
        <button className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors flex flex-col items-center justify-center aspect-square">
          <div className="p-3 bg-white/10 rounded-lg mb-2">
            <Clock className="w-5 h-5 text-teal-400" />
          </div>
          <p className="text-sm font-medium">Recent</p>
          <p className="text-xs text-gray-400">Last 30 days</p>
        </button>
        
        <button className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors flex flex-col items-center justify-center aspect-square">
          <div className="p-3 bg-white/10 rounded-lg mb-2">
            <Tag className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-sm font-medium">By Tags</p>
          <p className="text-xs text-gray-400">Filter by keywords</p>
        </button>
        
        <button className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors flex flex-col items-center justify-center aspect-square">
          <div className="p-3 bg-white/10 rounded-lg mb-2">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-sm font-medium">Shared</p>
          <p className="text-xs text-gray-400">Collaborative</p>
        </button>
        
        <button className="bg-gradient-to-br from-gray-800/50 to-zinc-900/50 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors flex flex-col items-center justify-center aspect-square">
          <div className="p-3 bg-white/10 rounded-lg mb-2">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium">Private</p>
          <p className="text-xs text-gray-400">Your eyes only</p>
        </button>
      </div>
    </div>
  );
};

export default CollectionQuickAccess; 