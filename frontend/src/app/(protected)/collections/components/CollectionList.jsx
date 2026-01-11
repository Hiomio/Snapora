import React from 'react';
import { 
  Loader2, 
  Lock, 
  Star, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  ArrowRight,
  Calendar,
  Tag,
  Globe
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const CollectionList = ({ 
  collections, 
  onEdit, 
  onDelete, 
  onToggleStar,
  onToggleVisibility,
  onCollectionClick,
  loadMoreCollections,
  loadingMore,
  hasMore 
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">All Collections</h2>
      <div className="space-y-3">
        {collections.map(collection => (
          <div 
            key={collection._id} 
            className="group bg-zinc-900/60 border border-white/10 rounded-lg overflow-hidden hover:border-violet-500/50 transition-colors flex cursor-pointer"
            onClick={() => onCollectionClick(collection)}
          >
            <div className="w-20 md:w-32 lg:w-40 relative">
              <img 
                src={collection.coverImage || '/images/placeholder-collection.jpg'} 
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 p-4 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{collection.name}</h3>
                  <p className="text-sm text-gray-300">{collection.imageCount || 0} images</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Visibility indicator */}
                  <div className={`p-1 rounded-lg ${
                    collection.visibility === "private" 
                      ? "bg-amber-500/20 border border-amber-500/30" 
                      : "bg-emerald-500/20 border border-emerald-500/30"
                  }`}>
                    {collection.visibility === "private" ? (
                      <Lock className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Globe className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  
                  {collection.isStarred && (
                    <div className="p-1 rounded-lg bg-white/10">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button 
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-800 border border-white/10 rounded-lg shadow-lg overflow-hidden z-20 min-w-40">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(collection);
                        }}
                        className="px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        <span>Edit Collection</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleVisibility(collection);
                        }}
                        className="px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      >
                        {collection.visibility === "private" ? (
                          <>
                            <Globe className="w-4 h-4 mr-2" />
                            <span>Make Public</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            <span>Make Private</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleStar(collection);
                        }}
                        className="px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                      >
                        <Star className={`w-4 h-4 mr-2 ${collection.isStarred ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                        <span>{collection.isStarred ? 'Unstar Collection' : 'Star Collection'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(collection);
                        }}
                        className="px-4 py-2 text-sm hover:bg-white/5 transition-colors text-rose-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Updated {new Date(collection.updatedAt || Date.now()).toLocaleDateString()}</span>
                </div>
                
                {/* Visibility status */}
                <div className={`flex items-center gap-1 ${
                  collection.visibility === "private" ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {collection.visibility === "private" ? (
                    <>
                      <Lock className="w-3 h-3" />
                      <span>Private</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-3 h-3" />
                      <span>Public</span>
                    </>
                  )}
                </div>
                
                {collection.tags && collection.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>
                      {Array.isArray(collection.tags) 
                        ? collection.tags.slice(0, 2).join(', ') + (collection.tags.length > 2 ? ` +${collection.tags.length - 2} more` : '') 
                        : collection.tags}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:flex items-center pr-4">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Load more button for list view */}
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

export default CollectionList; 