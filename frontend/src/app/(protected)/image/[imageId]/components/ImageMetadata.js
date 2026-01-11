import React from 'react';
import { Calendar, Eye, Download, MapPin, Info } from 'lucide-react';
import Link from 'next/link';

const ImageMetadata = ({ 
  image, 
  formatDate, 
  user, 
  isFollowing, 
  followLoading,
  handleFollowToggle 
}) => {
  return (
    <div className="rounded-xl bg-zinc-900/60 border border-white/10 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">{image.title}</h1>
      <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{image.description}</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
        <Link href={`/profile/${image.user.username}`} className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-violet-500">
            <img 
              src={image.user.profilePicture} 
              alt={image.user.username} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <p className="font-medium hover:underline">{image.user.fullName || image.user.username}</p>
            <p className="text-sm text-gray-400">
              {image.user.isPremium ? "Premium Creator" : "Creator"}
            </p>
          </div>
        </Link>

        {user && user._id !== image.user._id && (
          <button 
            className={`px-4 py-2 ${isFollowing 
              ? 'bg-violet-500/20 text-violet-400 hover:bg-rose-500/20 hover:text-rose-400' 
              : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500'} 
              rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={handleFollowToggle}
            type='button'
            disabled={!!followLoading}
            
          >
            {followLoading ? 'Please wait…' : (isFollowing ? 'Following' : 'Follow')}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 bg-white/5 p-2.5 sm:p-3 rounded-lg">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400">Upload Date</p>
            <p className="text-xs sm:text-sm">{formatDate(image.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 bg-white/5 p-2.5 sm:p-3 rounded-lg">
          <Eye className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400">Views</p>
            <p className="text-sm">-</p> {/* No view count in the schema */}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
          <Download className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400">Downloads</p>
            <p className="text-sm">-</p> {/* No download count in the schema */}
          </div>
        </div>

        {image.location ? (
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm">{image.location}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
            <Info className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Size</p>
              <p className="text-sm">{image.imageSize ? `${image.imageSize} KB` : "-"}</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 pt-6">
        {image.category && (
          <>
            <h3 className="text-lg font-medium mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-violet-900/30 text-violet-300 rounded-full text-sm">
                {image.category}
              </span>
            </div>
          </>
        )}

        {image.tags && image.tags.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag, idx) => (
                <Link 
                  href={`/tags/${tag}`} 
                  key={idx} 
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors cursor-pointer"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageMetadata; 