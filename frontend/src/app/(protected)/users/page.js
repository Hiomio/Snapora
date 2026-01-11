"use client"
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFollow } from '@/context/FollowContext';
import { useUsers } from '@/context/UsersContext';

import {
  UsersHeader,
  UsersTabs,
  UsersList,
  UserNetwork,
  FeaturedCreators,
  CommunityInsights,
  SuggestedConnections
} from './components';

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  
  const { user, isAuthenticated } = useAuth();
  const { 
    followers, 
    following, 
    loading: followLoading, 
    getFollowers, 
    getFollowing, 
    followUser, 
    unfollowUser,
    checkFollowStatus
  } = useFollow();
  
  const { 
    allUsers, 
    loading: usersLoading, 
    getOtherUsers, 
    getRandomUsers, 
    getFeaturedCreators,
    updateFollowerCount
  } = useUsers();
  
  // Get other users (excluding current user)
  const otherUsers = getOtherUsers();
  
  // Get random users for suggestions
  const suggestedUsers = getRandomUsers(5);
  
  // Load followers and following when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      getFollowers(user._id);
      getFollowing(user._id);
    }
  }, [isAuthenticated, user, getFollowers, getFollowing]);
  
  // Filter users based on active tab
  const filteredUsers = () => {
    let users = [];
    
    if (activeTab === 'all') {
      users = otherUsers;
    } else if (activeTab === 'followers') {
      // Filter followers to only include users that exist in allUsers
      users = followers.filter(follower => 
        otherUsers.some(user => user._id === follower.follower._id)
      ).map(follower => {
        // Find the full user object from allUsers
        const fullUser = allUsers.find(u => u._id === follower.follower._id);
        return fullUser || follower.follower;
      });
    } else if (activeTab === 'following') {
      // Filter following to only include users that exist in allUsers
      users = following.filter(followed => 
        otherUsers.some(user => user._id === followed.following._id)
      ).map(followed => {
        // Find the full user object from allUsers
        const fullUser = allUsers.find(u => u._id === followed.following._id);
        return fullUser || followed.following;
      });
    }
    
    if (searchQuery) {
      return users.filter(user => 
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return users;
  };

  // Derived pagination values
  const filtered = filteredUsers();
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filtered.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);
  
  // Check if current user is following a user using the following array
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
    <div className="w-full flex-1 min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Top section */}
      <UsersHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
      />
      
      {/* Tabs */}
      <div className="sm:p-6 pb-0">
        <UsersTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          followersCount={followers.length}
          followingCount={following.length}
        />
      </div>
      
      <div className="p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main content - Users list */}
        <div className="lg:col-span-8">
          <UsersList 
            filteredUsers={paginatedUsers} 
            usersLoading={usersLoading} 
            isFollowing={isFollowing}
            handleFollowToggle={handleFollowToggle}
            followLoading={followLoading}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        
        {/* Right sidebar */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* User stats card */}
          <UserNetwork 
            followersCount={followers.length}
            followingCount={following.length}
          />
          
          {/* Featured creators - now independent */}
          <FeaturedCreators />
          
          {/* Community insights */}
          <CommunityInsights suggestedUsers={suggestedUsers} />
          
          {/* Suggested connections */}
          <SuggestedConnections 
            suggestedUsers={suggestedUsers}
            isFollowing={isFollowing}
            handleFollowToggle={handleFollowToggle}
            followLoading={followLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;