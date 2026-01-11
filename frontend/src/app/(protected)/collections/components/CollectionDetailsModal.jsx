import React from 'react';
import { Edit2, Share2, Lock, Eye, Heart, ImagePlus } from 'lucide-react';

const CollectionDetailsModal = ({
  collection,
  onClose,
  onEdit
}) => {
  if (!collection) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden w-full max-w-4xl" onClick={e => e.stopPropagation()}>
        <div className="relative h-56">
          <img src={collection.coverImage || '/images/placeholder-collection.jpg'} alt={collection.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{collection.name}</h2>
                <p className="text-gray-300 mt-1">{collection.imageCount || 0} images</p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                    onEdit(collection);
                  }}
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                {collection.visibility === 'private' && (
                  <div className="p-2 rounded-lg bg-white/10">
                    <Lock className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-300">{collection.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {collection.tags && Array.isArray(collection.tags) && collection.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({length: Math.min(6, collection.imageCount || 0)}).map((_, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden bg-zinc-800 relative group">
                <img 
                  src={`/api/placeholder/${400 + index}/${400 + index}`} 
                  alt="Collection image" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <button 
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              <span>Add More Images</span>
            </button>
            
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 transition-colors"
            >
              View All Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetailsModal; 