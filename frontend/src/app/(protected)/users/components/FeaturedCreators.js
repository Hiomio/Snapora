"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ImageIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useFollow } from '@/context/FollowContext';
import { useUsers } from '@/context/UsersContext';

const FeaturedCreators = () => {
  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useAuth();
  const {
    following,
    loading: followLoading,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
  } = useFollow();

  const {
    getFeaturedCreators,
    updateFollowerCount
  } = useUsers();

  // Load followers and following when component mounts
  useEffect(() => {
    if (user) {
      getFollowers(user._id);
      getFollowing(user._id);
    }
  }, [user, getFollowers, getFollowing]);

  // Load featured creators when component mounts
  useEffect(() => {
    const loadFeaturedCreators = () => {
      try {
        const creators = getFeaturedCreators();
        setFeaturedCreators(creators);
      } catch (error) {
        console.error("Error loading featured creators:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedCreators();
  }, [getFeaturedCreators]);

  // Check if current user is following a user
  const isFollowing = (userId) => {
    return following.some(followed => followed.following._id === userId);
  };

  // Handle follow/unfollow with optimistic UI updates
  const handleFollowToggle = async (userId) => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }

    try {
      if (isFollowing(userId)) {
        // Optimistically update UI
        updateFollowerCount(userId, -1);

        // Call API
        await unfollowUser(userId);
      } else {
        // Optimistically update UI
        updateFollowerCount(userId, 1);

        // Call API
        await followUser(userId);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);

      // Revert the optimistic update if there was an error
      if (isFollowing(userId)) {
        updateFollowerCount(userId, 1);
      } else {
        updateFollowerCount(userId, -1);
      }
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Featured Creators</h3>
        <Award className="w-5 h-5 text-amber-400" />
      </div>
      <div className="space-y-3">
        {loading ? (
          // Loading state
          Array(3).fill(0).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
                <div>
                  <div className="h-4 w-24 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-3 w-16 bg-zinc-800 rounded"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-800"></div>
                <div className="w-16 h-8 rounded-lg bg-zinc-800"></div>
              </div>
            </div>
          ))
        ) : featuredCreators.length > 0 ? (
          featuredCreators.slice(0,7).map(creator => (
            <div key={creator._id} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Link href={`/profile/${creator.username}`} className="block">
                    <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-violet-500/50 transition-all duration-200">
                      <img src={creator.profilePicture || "/images/default-profile.jpg"} alt={creator.fullName} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  {creator.isVerified && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-violet-500 rounded-full p-0.5">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <Link href={`/profile/${creator.username}`} className="block">
                    <p className="text-sm font-medium hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">{creator.fullName}</p>
                  </Link>
                  <p className="text-xs text-gray-400">{creator.followersCount || 0} followers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/profile/${creator.username}`} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <ImageIcon className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => handleFollowToggle(creator._id)}
                  disabled={followLoading}
                  className={`text-xs font-medium py-1 px-2 rounded-lg transition-colors ${isFollowing(creator._id)
                      ? 'bg-violet-500 hover:bg-violet-600'
                      : 'bg-white/5 hover:bg-white/10'
                    }`}
                >
                  {isFollowing(creator._id) ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm">No featured creators available</p>
          </div>
        )}
      </div>
      <Link href="/users" className="w-full mt-4 block text-center text-sm text-violet-400 hover:text-violet-300">
        Browse all featured creators
      </Link>
    </div>
  );
};

export default FeaturedCreators; 