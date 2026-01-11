"use client"
import React from 'react';
import { Grid, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const CollectionsTab = ({ 
  loading, 
  collectionResults, 
  loadMore, 
  hasMore 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        Array(4).fill(0).map((_, idx) => (
          <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden flex animate-pulse">
            <div className="w-16 h-16 bg-zinc-800"></div>
            <div className="p-4 flex-1">
              <div className="h-5 w-1/2 bg-zinc-800 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-zinc-800 rounded"></div>
            </div>
          </div>
        ))
      ) : collectionResults.length > 0 ? (
        collectionResults.map(collection => (
          <div key={collection._id} className="bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden flex hover:border-violet-500/50 transition-colors">
            <div className="w-16 h-16 bg-zinc-800">
              {collection.coverImage ? (
                <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover" />
              ) : (
                collection.images && collection.images[0] && (
                  <img src={collection.images[0].imageUrl} alt={collection.name} className="w-full h-full object-cover" />
                )
              )}
            </div>
            <div className="p-4 flex-1">
              <h4 className="font-medium">{collection.name}</h4>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-xs text-gray-400">
                  <span className="text-gray-300">{collection.images ? collection.images.length : 0}</span> images
                </p>
                {collection.user && (
                  <p className="text-xs text-gray-400">
                    By <span className="text-gray-300">{collection.user.username}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center px-4">
              <Link href={`/collections/${collection._id}`} className="text-xs font-medium py-1.5 px-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                View
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center py-16 bg-zinc-900/60 border border-white/10 rounded-xl">
          <Grid className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-xl font-medium mb-2">No collections found</h3>
          <p className="text-gray-400">Try different keywords or check the spelling</p>
        </div>
      )}
      
      {collectionResults.length > 0 && hasMore && (
        <div className="col-span-2 mt-10 flex justify-center">
          <button 
            onClick={loadMore}
            className="bg-white/5 hover:bg-white/10 py-3 px-6 rounded-full text-sm flex items-center gap-2 transition-colors"
          >
            Load more collections
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionsTab; 