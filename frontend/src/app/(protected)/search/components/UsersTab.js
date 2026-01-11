"use client"
import React from 'react';
import { Users, ChevronDown } from 'lucide-react';
import UserCard from '../../users/components/UserCard';

const UsersTab = ({ 
  loading, 
  userResults, 
  loadMore, 
  hasMore,
  isFollowing,
  handleFollowToggle,
  followLoading
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        Array(6).fill(0).map((_, index) => (
          <div key={index} className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800"></div>
                <div>
                  <div className="h-5 w-32 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-zinc-800 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-20 bg-zinc-800 rounded"></div>
            </div>
          </div>
        ))
      ) : userResults.length > 0 ? (
        userResults.map(userItem => (
          <UserCard
            key={userItem._id}
            user={userItem}
            isFollowing={() => isFollowing(userItem._id)}
            handleFollowToggle={() => handleFollowToggle(userItem._id)}
            followLoading={followLoading}
          />
        ))
      ) : (
        <div className="col-span-3 text-center py-16 bg-zinc-900/60 border border-white/10 rounded-xl">
          <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <h3 className="text-xl font-medium mb-2">No users found</h3>
          <p className="text-gray-400">Try different keywords or check the spelling</p>
        </div>
      )}
      
      {userResults.length > 0 && hasMore && (
        <div className="col-span-3 mt-10 flex justify-center">
          <button 
            onClick={loadMore}
            className="bg-white/5 hover:bg-white/10 py-3 px-6 rounded-full text-sm flex items-center gap-2 transition-colors"
          >
            Load more users
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersTab; 