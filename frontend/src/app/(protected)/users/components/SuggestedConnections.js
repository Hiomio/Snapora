"use client"
import React from 'react';
import Link from 'next/link';

const SuggestedConnections = ({ suggestedUsers, isFollowing, handleFollowToggle, followLoading }) => {
  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-3">You might like</h3>
      <div className="flex overflow-x-auto gap-3 py-2 custom-scrollbar">
        {suggestedUsers.map(user => (
          <div key={user._id} className="flex-shrink-0 w-36 bg-white/5 rounded-lg p-3 text-center">
            <Link href={`/profile/${user.username}`} className="block">
              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2 cursor-pointer hover:ring-2 hover:ring-violet-500/50 transition-all duration-200">
                <img src={user.profilePicture || "/images/default-profile.jpg"} alt={user.fullName} className="w-full h-full object-cover" />
              </div>
            </Link>
            <Link href={`/profile/${user.username}`} className="block">
              <p className="text-sm font-medium truncate hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">{user.fullName}</p>
            </Link>
            <Link href={`/profile/${user.username}`} className="block">
              <p className="text-xs text-gray-400 mb-2 hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">@{user.username}</p>
            </Link>
            <button 
              onClick={() => handleFollowToggle(user._id)}
              disabled={followLoading}
              className={`w-full py-1.5 ${
                isFollowing(user._id)
                  ? 'bg-violet-500 hover:bg-violet-600'
                  : 'bg-white/10 hover:bg-violet-600'
              } rounded text-xs font-medium transition-colors`}
            >
              {isFollowing(user._id) ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedConnections; 