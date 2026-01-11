import { BookmarkIcon, Heart, Info, MessageSquare, Share2, Zap, EyeIcon, X, FolderPlus, MoreVertical } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useLikesFavorites } from '@/context/LikesFavoritesContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CollectionPickerModal from '@/components/features/collections/CollectionPickerModal';
import toast from 'react-hot-toast';

const ImageCard = ({
  image,
  isLoaded = true,
  heightClass = "aspect-square",
  index = 0,
  columnIndex = 0,
  onUnlike,
  onRemoveFavorite,
  onCollectionOptions
}) => {
  const { user } = useAuth();
  const {
    toggleLike,
    toggleFavorite,
    checkLikeStatus,
    checkFavoriteStatus,
    likedImages,
    favoritedImages
  } = useLikesFavorites();

  // Local state for optimistic updates and UI interactions
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(image.likesCount || 0);
  const [isHovering, setIsHovering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [showImageDetails, setShowImageDetails] = useState(false);
  const [showCollectionPicker, setShowCollectionPicker] = useState(false);
  const router = useRouter();
  const cardRef = useRef(null);

  // Check initial status from context or fetch it
  useEffect(() => {
    if (user && image._id) {
      const checkStatus = async () => {
        // First check if we have the status in context
        if (likedImages[image._id] !== undefined) {
          setIsLiked(likedImages[image._id]);
        } else {
          const likedStatus = await checkLikeStatus(image._id);
          setIsLiked(likedStatus);
        }

        if (favoritedImages[image._id] !== undefined) {
          setIsFavorited(favoritedImages[image._id]);
        } else {
          const favoritedStatus = await checkFavoriteStatus(image._id);
          setIsFavorited(favoritedStatus);
        }
      };

      checkStatus();
    }
  }, [user, image._id, checkLikeStatus, checkFavoriteStatus, likedImages, favoritedImages]);

  // Handle like toggle with animation and optimistic update
  const handleLikeToggle = async (e) => {
    e.stopPropagation(); // Prevent navigating to image detail

    if (!user) {
      showLoginTooltip('like', e);
      return;
    }

    // Update local state immediately (optimistic update)
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    setLikesCount(prev => newLikedStatus ? prev + 1 : prev - 1);

    // Trigger animation if liking
    if (newLikedStatus) {
      setLikeAnimation(true);
      setTimeout(() => setLikeAnimation(false), 1000);
    }

    // Call the context method to sync with backend
    const result = await toggleLike(image._id);

    // If the API call failed, revert the optimistic update
    if (!result.success) {
      setIsLiked(!newLikedStatus);
      setLikesCount(prev => newLikedStatus ? prev - 1 : prev + 1);
    } else if (!newLikedStatus && onUnlike) {
      // If we're unliking and there's an onUnlike callback, call it
      onUnlike(image._id);
    }
  };

  // Handle favorite toggle with optimistic update
  const handleFavoriteToggle = async (e) => {
    e.stopPropagation(); // Prevent navigating to image detail

    if (!user) {
      showLoginTooltip('bookmark', e);
      return;
    }

    // Update local state immediately (optimistic update)
    const newFavoritedStatus = !isFavorited;
    setIsFavorited(newFavoritedStatus);

    // Call the context method to sync with backend
    const result = await toggleFavorite(image._id);

    // If the API call failed, revert the optimistic update
    if (!result.success) {
      setIsFavorited(!newFavoritedStatus);
    } else if (!newFavoritedStatus && onRemoveFavorite) {
      // If we're removing from favorites and there's an onRemoveFavorite callback, call it
      onRemoveFavorite(image._id);
    }
  };

  const showLoginTooltip = (action, e) => {
    // Position the tooltip near the click
    const position = {
      x: e ? e.clientX : 0,
      y: e ? e.clientY : 0,
    };
    setTooltipPosition(position);
    setTooltipMessage(`Sign in to ${action} this image`);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  // Determine height based on image height property if not explicitly provided
  if (image.height) {
    if (image.height === "tall") heightClass = "aspect-[3/5]";
    if (image.height === "medium") heightClass = "aspect-[3/4]";
    if (image.height === "short") heightClass = "aspect-[4/3]";
  }

  // Double-tap to like (for mobile)
  const [lastTap, setLastTap] = useState(0);
  const handleCardTap = (e) => {
    const currentTime = new Date().getTime();
    const tapInterval = currentTime - lastTap;

    if (tapInterval < 300 && tapInterval > 0) {
      // Double tap detected
      if (!isLiked && user) {
        handleLikeToggle(e);
      }
    }

    setLastTap(currentTime);
  };

  const handleCardClick = (e) => {
    // Only navigate if the click is directly on the card, not on a button
    if (e.target === cardRef.current || cardRef.current.contains(e.target)) {
      const isButton = e.target.closest('button') || e.target.closest('a');
      if (!isButton) {
        router.push(`/image/${image._id}`);
      }
    }
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/image/${image._id}`);
    setTooltipMessage('Link copied!');
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    setShowImageDetails(true);
  };

  // Function to handle adding to collection
  const handleAddToCollection = (e) => {
    e.stopPropagation();
    
    if (!user) {
      showLoginTooltip('add this image to collections', e);
      return;
    }
    
    setShowCollectionPicker(true);
  };

  // Function to handle removing from collection
  const handleRemoveFromCollection = (e) => {
    e.stopPropagation();
    
    if (onCollectionOptions) {
      onCollectionOptions();
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`group relative rounded-xl overflow-hidden ${heightClass} bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/30
          transition-all duration-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          hover:shadow-2xl hover:shadow-violet-600/20 hover:border-violet-500/50 cursor-pointer
          hover:scale-[1.02] hover:z-10`}
        style={{
          transitionDelay: `${(columnIndex * 4 + index) * 50}ms`
        }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleCardTap}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image.imageUrl}
            alt={image.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 ease-out group-hover:scale-110 filter group-hover:brightness-110"
            priority={index < 6}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent opacity-70 group-hover:opacity-0 transition-opacity duration-500"></div>
        </div>

        {/* Like animation overlay */}
        <AnimatePresence>
          {likeAnimation && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 0.8 }}
            >
              <Heart className="w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top actions bar */}
        <div className="absolute top-0 left-0 right-0 px-2 sm:px-3 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2 opacity-80 group-hover:opacity-100 transition-opacity z-10">
          {image.user?.profilePicture && (
            <Link
              href={`/profile/${image.user.username}`}
              onClick={(e) => e.stopPropagation()}
              className="transform hover:scale-110 transition-transform flex-shrink-0"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-white/30 hover:ring-white/90 transition-all shadow-lg">
                <Image
                  src={image.user.profilePicture}
                  alt={image.user.username}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}
          <Link
            href={`/profile/${image.user?.username}`}
            className="text-xs sm:text-sm font-medium text-white/90 hover:text-white hover:underline transition-colors truncate min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            {image.user?.username}
          </Link>
        </div>

        {/* Image actions overlay */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <button
            className={`p-1.5 sm:p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${isLiked
              ? 'bg-rose-500/30 text-rose-300'
              : 'bg-white/10 hover:bg-white/20'
              }`}
            onClick={handleLikeToggle}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? 'fill-rose-300' : ''}`} />
          </button>
          <button
            className={`p-1.5 sm:p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${isFavorited
              ? 'bg-amber-500/30 text-amber-300'
              : 'bg-white/10 hover:bg-white/20'
              }`}
            onClick={handleFavoriteToggle}
          >
            <BookmarkIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-amber-300' : ''}`} />
          </button>
          <button
            className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
            onClick={handleAddToCollection}
          >
            <FolderPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          {onCollectionOptions && (
            <button
              className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
              onClick={handleRemoveFromCollection}
            >
              <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          <button
            className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // Share functionality
              navigator.clipboard.writeText(`${window.location.origin}/image/${image._id}`);
              setTooltipMessage('Link copied!');
              setShowTooltip(true);
              toast.success('Image link copied to clipboard!');
              setTimeout(() => setShowTooltip(false), 2000);
            }}
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-1.5 sm:p-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
            onClick={handleViewDetails}
          >
            <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <div className="flex flex-col gap-1.5 sm:gap-2 backdrop-blur-sm bg-black/30 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <h4 className="text-sm sm:text-lg font-medium leading-tight text-white/90 group-hover:text-white transition-colors line-clamp-2">
              {image.title}
            </h4>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 sm:gap-3">
                <motion.span
                  className="flex items-center text-xs text-rose-300 bg-black/40 backdrop-blur-md px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5 ${isLiked ? 'fill-rose-300' : ''}`} />
                  {likesCount.toString()}
                </motion.span>
                <motion.span
                  className="flex items-center text-xs text-blue-300 bg-black/40 backdrop-blur-md px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
                  {image.commentsCount?.toString() || '0'}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Image details modal with glass morphism */}
      <AnimatePresence>
        {showImageDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageDetails(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] m-2 sm:m-4 overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-2 sm:p-2.5 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/80 transition-colors"
                onClick={() => setShowImageDetails(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/3 h-[40vh] sm:h-[50vh] md:h-auto relative overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-1000"
                  />

                  {/* Image overlay with glass effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {image.user?.profilePicture && (
                        <Link href={`/profile/${image.user.username}`} className="block" onClick={(e) => e.stopPropagation()}>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-violet-500/40 hover:ring-violet-500/70 transition-all">
                            <Image
                              src={image.user.profilePicture}
                              alt={image.user.username}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                      )}
                      <Link href={`/profile/${image.user?.username}`} className="block" onClick={(e) => e.stopPropagation()}>
                        <h4 className="font-medium text-white hover:text-violet-300 transition-colors text-sm sm:text-base">{image.user?.username}</h4>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/3 p-4 sm:p-8 flex flex-col h-full bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-sm">
                  <h2 className="text-lg sm:text-2xl font-semibold text-white mb-3 sm:mb-4">{image.title}</h2>

                  {image.description && (
                    <p className="text-white/70 mb-4 sm:mb-6 text-xs sm:text-sm">{image.description}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <motion.button
                      className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl ${isLiked ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-white/90 hover:bg-zinc-700'} transition-colors shadow-lg text-sm`}
                      onClick={handleLikeToggle}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-white' : ''}`} />
                      <span>{likesCount}</span>
                    </motion.button>

                    <motion.button
                      className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl ${isFavorited ? 'bg-amber-500 text-white' : 'bg-zinc-800 text-white/90 hover:bg-zinc-700'} transition-colors shadow-lg text-sm`}
                      onClick={handleFavoriteToggle}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BookmarkIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorited ? 'fill-white' : ''}`} />
                      <span>Save</span>
                    </motion.button>

                    <motion.button
                      className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl bg-zinc-800 text-white/90 hover:bg-zinc-700 transition-colors shadow-lg text-sm"
                      onClick={handleAddToCollection}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FolderPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">Add to Collection</span>
                      <span className="sm:hidden">Add</span>
                    </motion.button>
                  </div>

                  {/* Tags section */}
                  {image.tags && image.tags.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-xs sm:text-sm font-medium text-white/70 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {image.tags.map((tag, i) => (
                          <Link
                            href={`/tags/${tag}`}
                            key={i}
                            className="bg-zinc-800/70 hover:bg-zinc-700 text-white/80 hover:text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/image/${image._id}`}
                    className="mt-auto text-center px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium transition-all shadow-lg hover:shadow-violet-500/30 text-sm sm:text-base"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed bg-black text-white text-sm px-3 py-2 rounded-lg z-50 pointer-events-none shadow-xl"
            style={{
              top: tooltipPosition.y - 10,
              left: tooltipPosition.x - 100,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {tooltipMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Collection Picker Modal */}
      <CollectionPickerModal
        isOpen={showCollectionPicker}
        onClose={() => setShowCollectionPicker(false)}
        imageId={image._id}
        onSuccess={() => {
          setTooltipMessage('Added to collections');
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 2000);
        }}
      />
    </>
  );
};

export default ImageCard;