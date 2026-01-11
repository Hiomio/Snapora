"use client"
import React from 'react';
import { Search, Loader, ArrowRight } from 'lucide-react';
import ImageCard from '@/components/cards/ImageCard';
import UserCard from '../../users/components/UserCard';
import Link from 'next/link';

const SearchResults = ({ 
  searchQuery, 
  loading,
  imageResults,
  userResults,
  collectionResults,
  tagResults,
  setActiveTab,
  isFollowing,
  handleFollowToggle,
  followLoading
}) => {
  if (!searchQuery) return null;
  
  // No results across all categories
  const noResults = imageResults.length === 0 && 
                    userResults.length === 0 && 
                    collectionResults.length === 0 && 
                    tagResults.length === 0;
  
  if (noResults && !loading) {
    return (
      <div className="text-center py-16 bg-zinc-900/60 border border-white/10 rounded-xl">
        <Search className="w-12 h-12 text-gray-500 mx-auto mb-3" />
        <h3 className="text-xl font-medium mb-2">No results found</h3>
        <p className="text-gray-400 mb-6">Try different keywords or check the spelling</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-10">
      {/* Search summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Results for &quot;{searchQuery}&quot;</h2>
        <p className="text-gray-400">
          Found {imageResults.length + userResults.length + collectionResults.length + tagResults.length} results
          {loading && <span className="inline-flex items-center ml-2"><Loader className="w-3 h-3 animate-spin mr-1" /> Searching...</span>}
        </p>
      </div>
      
      {/* Top images */}
      {imageResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Top Images</h3>
            <button 
              onClick={() => setActiveTab('images')}
              className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageResults.slice(0, 4).map((image, index) => (
              <ImageCard
                key={image._id}
                image={image}
                heightClass="aspect-[3/4]"
                isLoaded={!loading}
                index={index}
                columnIndex={Math.floor(index / 4)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Top users */}
      {userResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Creators</h3>
            <button 
              onClick={() => setActiveTab('users')}
              className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userResults.slice(0, 3).map(userItem => (
              <UserCard
                key={userItem._id}
                user={userItem}
                isFollowing={() => isFollowing(userItem._id)}
                handleFollowToggle={() => handleFollowToggle(userItem._id)}
                followLoading={followLoading}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Collections */}
      {collectionResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Collections</h3>
            <button 
              onClick={() => setActiveTab('collections')}
              className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectionResults.slice(0, 2).map(collection => (
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
            ))}
          </div>
        </div>
      )}
      
      {/* Tags */}
      {tagResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Tags</h3>
            <button 
              onClick={() => setActiveTab('tags')}
              className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {tagResults.slice(0, 8).map(tag => (
              <Link 
                href={`/tags/${tag.name}`} 
                key={tag.name} 
                className="bg-zinc-900/60 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 hover:border-violet-500/50 transition-colors"
              >
                <span className="text-sm font-medium">#{tag.name}</span>
                <span className="text-xs text-gray-400">{tag.count} posts</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults; 