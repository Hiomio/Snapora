"use client"
import React from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';

const FollowTab = ({ type, users, loading }) => {
  return (
    <div className="mx-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{type === 'followers' ? 'Followers' : 'Following'}</h2>
      {loading ? (
        <div className="flex justify-center py-6 sm:py-8">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-t-violet-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {users.map((user) => {
            // Determine the user object based on the type
            const userData = type === 'followers' ? user.follower : user.following;
            
            return (
              <div key={user._id} className="flex items-center justify-between p-3 sm:p-4 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img
                      src={userData.profilePicture || "/images/default-profile.jpg"}
                      alt={userData.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm sm:text-base truncate">{userData.fullName}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">@{userData.username}</p>
                  </div>
                </div>
                <Link
                  href={`/profile/${userData.username}`}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-xs sm:text-sm font-medium flex-shrink-0 ml-2"
                >
                  <span className="hidden sm:inline">View Profile</span>
                  <span className="sm:hidden">View</span>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 sm:py-8 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-white/10">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
          <h3 className="text-base sm:text-lg font-medium mb-2">
            {type === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
          </h3>
          <p className="text-sm sm:text-base text-gray-400 px-4">
            {type === 'followers'
              ? 'When someone follows this profile, they\'ll appear here.'
              : 'When this profile follows someone, they\'ll appear here.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FollowTab; 