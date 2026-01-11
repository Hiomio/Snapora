"use client"
import React from 'react';
import { Users } from 'lucide-react';
import UserCard from './UserCard';

const UsersList = ({ 
  filteredUsers, 
  usersLoading, 
  isFollowing, 
  handleFollowToggle, 
  followLoading, 
  setSearchQuery, 
  setActiveTab,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {}
}) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (start > 2) pages.push('ellipsis-start');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('ellipsis-end');
    pages.push(totalPages);
    return pages;
  };
  return (
    <div className="col-span-12 lg:col-span-8">
      {/* Users grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usersLoading ? (
          // Loading state
          Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 animate-pulse">
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
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard
              key={user._id}
              user={user}
              isFollowing={isFollowing}
              handleFollowToggle={handleFollowToggle}
              followLoading={followLoading}
            />
          ))
        ) : (
          <div className="col-span-2 bg-zinc-900/60 border border-white/10 rounded-xl p-8 text-center">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filters</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveTab('all');}}
              className="text-violet-400 hover:text-violet-300 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={() => canGoPrev && goToPage(currentPage - 1)}
          disabled={!canGoPrev}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            canGoPrev ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5 opacity-50 cursor-not-allowed'
          }`}
        >
          Previous
        </button>
        <div className="flex items-center gap-2">
          {getVisiblePages().map((item, idx) => (
            item.toString().includes('ellipsis') ? (
              <span key={item + idx} className="text-gray-500">...</span>
            ) : (
              <button 
                key={item}
                onClick={() => goToPage(item)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  item === currentPage ? 'bg-violet-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {item}
              </button>
            )
          ))}
        </div>
        <button 
          onClick={() => canGoNext && goToPage(currentPage + 1)}
          disabled={!canGoNext}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            canGoNext ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5 opacity-50 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList; 