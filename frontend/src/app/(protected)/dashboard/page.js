"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfilePicVerify } from '@/components';
import {
  WelcomeCard,
  CategoryFilter,
  TrendingImages,
  RecentActivity,
  QuickUpload,
  AchievementCard,
  StorageUsage,
  UserAnalytics
} from './components';
import { FeaturedCreators } from '../users/components';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if(user && !user.isDpConfirm){
      setTimeout(() => setProfileOpen(true), 2000);
    } else {
      setProfileOpen(false)
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <ProfilePicVerify isOpen={profileOpen} onClose={()=> setProfileOpen(false)} />
      {/* Dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left column - Main content */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Welcome card */}
          <WelcomeCard user={user} />

          {/* User Analytics */}
          {/* <UserAnalytics user={user} /> */}

          {/* Category filter */}
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          {/* Trending images grid */}
          <TrendingImages category={selectedCategory} />

          {/* Recent activity */}
          <RecentActivity />
        </div>

        {/* Right column - Sidebar */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {/* Quick upload */}
          <QuickUpload />

          {/* Recommended creators */}
          <FeaturedCreators />

          {/* Achievement card */}
          <AchievementCard user={user} />

          {/* Usage stats */}
          <StorageUsage user={user} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;