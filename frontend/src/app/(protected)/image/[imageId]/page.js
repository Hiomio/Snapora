"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useLikesFavorites } from '@/context/LikesFavoritesContext';
import { useFollow } from '@/context/FollowContext';
import { useAuth } from '@/context/AuthContext';
import { ChevronLeft, MessageSquareOff } from 'lucide-react';
import LoadingScreen from '@/components/screens/LoadingScreen';

// Import components
import {
  ImageHeader,
  ImageMetadata,
  CommentsSection,
  Sidebar
} from './components';

const ImageDetail = () => {
  const { imageId } = useParams();
  const router = useRouter();
  const api = useApi();
  const { user } = useAuth();
  const { followUser, unfollowUser, checkFollowStatus } = useFollow();
  const {
    toggleLike,
    toggleFavorite,
    checkLikeStatus,
    checkFavoriteStatus,
  } = useLikesFavorites();

  // State
  const [image, setImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [likers, setLikers] = useState([]);
  const [likersLoading, setLikersLoading] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [likersLoaded, setLikersLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '', visibility: 'public', commentsAllowed: true });
  const [editSaving, setEditSaving] = useState(false);

  // Fetch image data (only when imageId changes)
  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get(`/api/images/${imageId}`);
        setImage(response.data.data);
        setLikesCount(response.data.data.likesCount);
        
        // Fetch creator's other images
        if (response.data.data.user?._id) {
          const creatorImagesResponse = await api.get(`/api/images/user/${response.data.data.user._id}?limit=4`);
          setRelatedImages(creatorImagesResponse.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load image");
        console.error("Error fetching image:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (imageId) {
      fetchImageData();
    }
  }, [imageId, user]);

  // Fetch user-specific statuses (like/bookmark/follow) when user or image changes
  useEffect(() => {
    const fetchStatuses = async () => {
      if (!user || !imageId || !image?.user?._id) return;
      
      try {
        // Follow status
        if (user._id !== image.user._id) {
          const followStatus = await checkFollowStatus(image.user._id);
          setIsFollowing(followStatus);
        }

        // Like status
        const likeStatus = await checkLikeStatus(imageId);
        setIsLiked(likeStatus);

        // Bookmark status
        const bookmarkStatus = await checkFavoriteStatus(imageId);
        setIsBookmarked(bookmarkStatus);
      } catch (err) {
        console.error('Error fetching statuses:', err);
      }
    };

    fetchStatuses();
  }, [user, imageId, image?.user?._id]);

  // Prepare edit form when image loads
  useEffect(() => {
    if (image && user && image.user?._id === user._id) {
      setEditForm({
        title: image.title || '',
        description: image.description || '',
        visibility: image.visibility || 'public',
        commentsAllowed: typeof image.commentsAllowed === 'boolean' ? image.commentsAllowed : true,
      });
    }
  }, [image, user]);

  const handleToggleLikers = async () => {
    const next = !showLikers;
    setShowLikers(next);
    if (next && !likersLoaded) {
      try {
        setLikersLoading(true);
        const res = await api.get(`/api/images/${imageId}/likes?limit=50`);
        setLikers(res.data.data || []);
        setLikersLoaded(true);
      } catch (e) {
        console.error('Failed to load likers', e);
      } finally {
        setLikersLoading(false);
      }
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!user || !imageId) return;
    setEditSaving(true);
    try {
      const payload = {
        title: editForm.title,
        description: editForm.description,
        visibility: editForm.visibility,
        commentsAllowed: editForm.commentsAllowed,
      };
      const res = await api.patch(`/api/images/${imageId}`, payload);
      setImage(res.data.data);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to save changes', err);
    } finally {
      setEditSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !imageId) return;
    try {
      await api.delete(`/api/images/${imageId}`);
      window.history.back();
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  // Handle like toggle
  const handleLikeToggle = async () => {
    if (!user) return;
    
    // Optimistic update
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikesCount(prev => newLikeStatus ? prev + 1 : prev - 1);
    
    // API call
    const result = await toggleLike(imageId);
    
    // Revert if failed
    if (!result.success) {
      setIsLiked(!newLikeStatus);
      setLikesCount(prev => newLikeStatus ? prev - 1 : prev + 1);
    }
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = async () => {
    if (!user) return;
    
    // Optimistic update
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    
    // API call
    const result = await toggleFavorite(imageId);
    
    // Revert if failed
    if (!result.success) {
      setIsBookmarked(!newBookmarkStatus);
    }
  };

  // Handle follow toggle
  const handleFollowToggle = async () => {
    if (!user || !image?.user || followLoading) return;
    
    const nextStatus = !isFollowing;
    setIsFollowing(nextStatus);
    setFollowLoading(true);
    
    try {
      if (nextStatus) {
        await followUser(image.user._id);
      } else {
        await unfollowUser(image.user._id);
      }
    } catch (err) {
      console.error("Error toggling follow status:", err);
      // Revert optimistic update on failure
      setIsFollowing(!nextStatus);
    } finally {
      setFollowLoading(false);
    }
  };

  // Loading state
  if (loading || !user) {
    return <LoadingScreen />;
  }

  // Error state
  if (error || !image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-white/10 p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-xl font-bold mb-2">Image Not Found</h2>
          <p className="text-gray-400 mb-6">{error || "The requested image could not be loaded"}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors font-medium text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="px-3 sm:px-6 pt-3 sm:pt-5">
      {/* Back navigation */}
      <div className="mb-4 sm:mb-6">
        <button 
          className="flex items-center text-gray-400 hover:text-white transition-colors gap-1"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to explore</span>
        </button>
      </div>

      {/* Image detail layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main image and info */}
        <div className="col-span-1 lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Image Header Component */}
          <ImageHeader
            image={image}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            likesCount={likesCount}
            handleLikeToggle={handleLikeToggle}
            handleBookmarkToggle={handleBookmarkToggle}
            isOwner={user && image?.user?._id === user._id}
            onEditClick={() => setEditMode(true)}
            onDeleteClick={handleDelete}
          />

          {/* Image Metadata Component */}
          <ImageMetadata
            image={image}
            formatDate={formatDate}
            user={user}
            isFollowing={isFollowing}
            followLoading={followLoading}
            handleFollowToggle={handleFollowToggle}
          />

          {/* Owner edit modal */}
          {user && image?.user?._id === user._id && editMode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/70" onClick={() => setEditMode(false)} />
              <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-zinc-900/90 backdrop-blur-md p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-3 sm:mb-4">Edit post</h3>
                <form onSubmit={handleEditSave} className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input
                      className="w-full bg-zinc-900/60 border border-zinc-700/50 rounded-md px-3 py-2 text-sm outline-none focus:border-violet-500"
                      value={editForm.title}
                      onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      className="w-full bg-zinc-900/60 border border-zinc-700/50 rounded-md px-3 py-2 text-sm outline-none focus:border-violet-500"
                      rows={4}
                      value={editForm.description}
                      onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Visibility</label>
                      <select
                        className="w-full bg-zinc-900/60 border border-zinc-700/50 rounded-md px-3 py-2 text-sm outline-none focus:border-violet-500"
                        value={editForm.visibility}
                        onChange={(e) => setEditForm((f) => ({ ...f, visibility: e.target.value }))}
                      >
                        <option value="public">Public</option>
                        <option value="followers">Followers</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-5">
                      <input
                        id="commentsAllowed"
                        type="checkbox"
                        checked={editForm.commentsAllowed}
                        onChange={(e) => setEditForm((f) => ({ ...f, commentsAllowed: e.target.checked }))}
                        className="h-4 w-4"
                      />
                      <label htmlFor="commentsAllowed" className="text-sm text-gray-300">Allow comments</label>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/15"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={editSaving}
                      className="px-4 py-2 text-sm rounded-md bg-violet-600 hover:bg-violet-500 disabled:opacity-60"
                    >
                      {editSaving ? 'Saving...' : 'Save changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Comments Section Component */}
            {image.commentsAllowed ? <CommentsSection
            imageId={imageId}
            user={user}
          /> : (
            <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 sm:px-6 py-8 sm:py-10 text-center my-4">
              <MessageSquareOff className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-300 font-medium">Comments are disabled for this image</p>
              <p className="text-gray-400 text-sm mt-1">The creator has turned off commenting for this content</p>
            </div>
          )}          {/* Likers section (lazy-loaded) */}
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
              <h3 className="text-sm font-semibold text-gray-200">Liked by</h3>
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-xs text-gray-400">{likesCount} likes</span>
                <button
                  onClick={handleToggleLikers}
                  className="px-3 py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/15"
                >
                  {showLikers ? 'Hide list' : 'Show list'}
                </button>
              </div>
            </div>
            {showLikers && (
              <>
                {likersLoading ? (
                  <div className="text-sm text-gray-400">Loading...</div>
                ) : likers.length === 0 ? (
                  <div className="text-sm text-gray-400">No likes yet</div>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {likers.map((u) => (
                      <li key={u._id}>
                        <button
                          onClick={() => router.push(`/profile/@${u.username}`)}
                          className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors text-left"
                        >
                          <img
                            src={u.profilePicture || '/images/default-profile.jpg'}
                            alt={u.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm text-white">{u.fullName || u.username}</p>
                            <p className="text-xs text-gray-400">@{u.username}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar Component */}
        <Sidebar 
          image={image} 
          relatedImages={relatedImages} 
        />
      </div>
    </div>
  );
};

export default ImageDetail; 