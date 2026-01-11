"use client"
import React from 'react';

// Helper component
const PlusCircle = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );
};

const CollectionsTab = ({ collections = [], loading = false, onCreate, canCreate = false }) => {
  const displayCollections = collections;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {loading && (
        <div className="col-span-full text-center text-gray-400 text-sm sm:text-base">Loading collections...</div>
      )}
      {!loading && displayCollections.length === 0 && (
        <div className="col-span-full text-center py-12 sm:py-16 bg-zinc-900/50 border border-white/10 rounded-xl">
          <div className="flex justify-center mb-3 sm:mb-4">
            <PlusCircle className="w-12 h-12 sm:w-14 sm:h-14 text-gray-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">No Collections Found</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-4">Start organizing your images by creating a new collection</p>
          {canCreate && (
            <button 
              onClick={onCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-2 px-4 transition-all duration-300 text-sm sm:text-base"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Collection</span>
            </button>
          )}
        </div>
      )}
      {displayCollections.map(collection => {
        const id = collection._id || collection.id;
        const name = collection.name || collection.title || 'Untitled';
        const count = Array.isArray(collection.images) ? collection.images.length : (collection.count || 0);
        const thumb = collection.coverImage || collection.thumbnail || collection.images?.[0]?.imageUrl || '/images/default-cover.jpg';
        return (
        <div key={id} className="group relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
          <div className="absolute inset-0">
            <img
              src={thumb}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${collection.color || 'from-violet-600 to-fuchsia-600'} opacity-60 mix-blend-overlay`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5">
            <h3 className="text-base sm:text-xl font-bold mb-1 truncate">{name}</h3>
            <p className="text-xs sm:text-sm text-gray-300">{count} images</p>

            <div className="mt-3 sm:mt-4 transform translate-y-6 sm:translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button className="w-full py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-colors text-xs sm:text-sm font-medium">
                View Collection
              </button>
            </div>
          </div>
        </div>
      )})}

      {/* Add new collection */}
      {canCreate && (
        <button
          onClick={onCreate}
          className="relative rounded-xl overflow-hidden border border-white/10 border-dashed aspect-[4/3] bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center cursor-pointer text-center"
        >
          <div className="p-3 sm:p-4 bg-white/5 rounded-full mb-2 sm:mb-3">
            <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
          </div>
          <h3 className="text-sm sm:text-lg font-medium mb-1">Create Collection</h3>
          <p className="text-xs sm:text-sm text-gray-400">Organize your works</p>
        </button>
      )}
    </div>
  );
};

export default CollectionsTab; 