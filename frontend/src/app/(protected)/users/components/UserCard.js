"use client"
import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const UserCard = ({ user, isFollowing, handleFollowToggle, followLoading }) => {
  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 hover:border-violet-500/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="relative">
            <Link href={`/profile/${user.username}`} className="block">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700 group-hover:border-violet-500 transition-colors cursor-pointer hover:ring-2 hover:ring-violet-500/50">
                <img src={user.profilePicture || "/images/default-profile.jpg"} alt={user.fullName} className="w-full h-full object-cover" />
              </div>
            </Link>
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-violet-500 rounded-full p-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                </svg>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <Link href={`/profile/${user.username}`} className="block">
                <h3 className="font-medium text-base hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">{user.fullName}</h3>
              </Link>
              {user.badge && (
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  user.badge === 'pro' ? 'bg-violet-900/60 text-violet-300' :
                  user.badge === 'artist' ? 'bg-rose-900/60 text-rose-300' :
                  user.badge === 'featured' ? 'bg-amber-900/60 text-amber-300' :
                  'bg-emerald-900/60 text-emerald-300'
                }`}>
                  {user.badge.charAt(0).toUpperCase() + user.badge.slice(1)}
                </span>
              )}
            </div>
            <Link href={`/profile/${user.username}`} className="block">
              <p className="text-sm text-gray-400 hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">@{user.username}</p>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleFollowToggle(user._id)}
            disabled={followLoading}
            className={`text-xs font-medium py-1.5 px-3 rounded-lg transition-colors ${
              isFollowing(user._id)
                ? 'bg-violet-500 hover:bg-violet-600 text-white'
                : 'bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            {isFollowing(user._id) ? 'Following' : 'Follow'}
          </button>
          <Link href={`/profile/${user.username}`} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-xs text-gray-400">Followers</p>
          <p className="text-sm font-medium">{user.followersCount || 0}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-xs text-gray-400">Following</p>
          <p className="text-sm font-medium">{user.followingCount || 0}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-xs text-gray-400">Images</p>
          <p className="text-sm font-medium">{user.posts || 0}</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end items-center">
        <Link href={`/profile/${user.username}`} className="text-xs text-violet-400 hover:text-violet-300">View Profile</Link>
      </div>
    </div>
  );
};

export default UserCard; 