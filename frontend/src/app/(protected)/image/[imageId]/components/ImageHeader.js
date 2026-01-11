import React, { useEffect, useRef, useState } from 'react';
import {
  Heart,
  MessageSquare,
  BookmarkIcon,
  Share2,
  Download,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Maximize2,
  Minimize2
} from 'lucide-react';
import toast from 'react-hot-toast';

const ImageHeader = ({
  image,
  isLiked,
  isBookmarked,
  handleLikeToggle,
  likesCount,
  handleBookmarkToggle,
  isOwner = false,
  onEditClick,
  onDeleteClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      toast.error('Fullscreen not supported');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  return (
    <>
      {/* Image container */}
      <div ref={containerRef} className="rounded-xl overflow-hidden bg-zinc-900 border border-white/10 relative group">
        {!imageLoaded && (
          <div className="w-full h-64 sm:h-96 bg-zinc-800 animate-pulse" />
        )}
        <img
          src={image.imageUrl}
          alt={image.title}
          className={`w-full object-cover max-h-[32rem] sm:max-h-[48rem] ${imageLoaded ? '' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />

        {/* Overlay controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex justify-between items-center">
            <a
              href={image.imageUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Download className="w-5 h-5" />
            </a>

            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors" onClick={handleCopyLink}>
                <Copy className="w-5 h-5" />
              </button>
              <a
                href={image.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Fullscreen button */}
        <button onClick={toggleFullscreen} className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition opacity-0 group-hover:opacity-100">
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>

        {/* Owner overlay controls */}
        {isOwner && (
          <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={onEditClick}
              className="px-3 py-2 text-xs rounded-md bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              Edit post
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              className="px-3 py-2 text-xs rounded-md bg-red-600/80 hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-y-2 px-2 sm:px-0">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg ${isLiked ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 hover:bg-white/10'} transition-colors`}
            onClick={handleLikeToggle}
          >
            <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${isLiked ? 'fill-rose-400' : ''}`} />
            <span className="text-sm sm:text-base">{likesCount || 0}</span>
          </button>

          <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-sm sm:text-base">{image.commentsCount || 0}</span>
          </button>

          <button
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg ${isBookmarked ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 hover:bg-white/10'} transition-colors`}
            onClick={handleBookmarkToggle}
          >
            <BookmarkIcon className={`w-4 sm:w-5 h-4 sm:h-5 ${isBookmarked ? 'fill-violet-400' : ''}`} />
            <span className="text-sm sm:text-base">Save</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Image link copied to clipboard!');
            }}
          >
            <Share2 className="w-5 h-5" />
          </button>
          <a
            href={image.imageUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {isOwner && confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setConfirmOpen(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-xl border border-white/10 bg-zinc-900/90 backdrop-blur-md p-6">
            <h3 className="text-lg font-semibold mb-2">Delete this post?</h3>
            <p className="text-sm text-gray-400 mb-4">This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                onClick={() => { setConfirmOpen(false); onDeleteClick && onDeleteClick(); }}
                className="px-4 py-2 text-sm rounded-md bg-red-600/80 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageHeader; 