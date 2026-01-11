import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { CollectionCard } from './index';

const CollectionGrid = ({ 
  collections, 
  onEdit, 
  onDelete, 
  onToggleStar,
  onToggleVisibility,
  loadMoreCollections,
  loadingMore,
  hasMore 
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">All Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {collections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStar={onToggleStar}
              onToggleVisibility={onToggleVisibility}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button 
            onClick={loadMoreCollections} 
            disabled={loadingMore}
            className="flex items-center gap-2 bg-zinc-800/50 border border-white/10 rounded-lg px-4 py-2 hover:bg-zinc-800 transition-colors"
          >
            {loadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Collections
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionGrid; 