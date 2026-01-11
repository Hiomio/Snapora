"use client"
import React, { useState } from 'react';
import { UserCheck, Award, Trash, LogOut, Users, Heart, Image as ImageIcon, TrendingUp, Activity, Shield, Calendar, Clock, Star, Zap } from 'lucide-react';

const AccountSection = ({ user, handleLogout }) => {

  // Generate badge display with enhanced styling
  const getBadgeDisplay = (badge) => {
    const badges = {
      newbie: { 
        label: 'Newbie', 
        color: 'bg-gradient-to-r from-blue-600 to-blue-400', 
        icon: '🌱',
        description: 'Just getting started on your creative journey',
        glow: 'shadow-blue-500/20'
      },
      rising: { 
        label: 'Rising', 
        color: 'bg-gradient-to-r from-green-600 to-emerald-400', 
        icon: '📈',
        description: 'You\'re making an impact with your content',
        glow: 'shadow-green-500/20'
      },
      pro: { 
        label: 'Pro', 
        color: 'bg-gradient-to-r from-purple-600 to-violet-400', 
        icon: '⭐',
        description: 'A recognized creator with a growing audience',
        glow: 'shadow-purple-500/20'
      },
      trendsetter: { 
        label: 'Trendsetter', 
        color: 'bg-gradient-to-r from-yellow-600 to-amber-400', 
        icon: '🔥',
        description: 'Your content is making waves across the platform',
        glow: 'shadow-yellow-500/20'
      }
    };

    return badges[badge] || badges.newbie;
  };

  // Get account status display
  const getAccountStatusDisplay = (status) => {
    const statuses = {
      active: { 
        label: 'Active', 
        color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        icon: <Shield className="w-4 h-4" />,
        description: 'Your account is active and in good standing'
      },
      suspended: { 
        label: 'Suspended', 
        color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        icon: <Clock className="w-4 h-4" />,
        description: 'Your account is temporarily suspended'
      },
      inactive: { 
        label: 'Inactive', 
        color: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        icon: <UserCheck className="w-4 h-4" />,
        description: 'Your account has been deactivated'
      }
    };

    return statuses[status] || statuses.active;
  };

  const accountStatus = getAccountStatusDisplay(user?.accountStatus || 'active');
  const badgeInfo = getBadgeDisplay(user?.badge || 'newbie');

  return (
    <div className="space-y-6">
      {/* Account Status Card */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-violet-500/20 rounded-lg">
            <Activity className="w-4 sm:w-5 h-4 sm:h-5 text-violet-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Account Status</h2>
        </div>

        <div className="p-4 sm:p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 rounded-full ${accountStatus.color} border`}>
                {accountStatus.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-0.5 sm:mb-1">Account Status</h3>
                <p className="text-xs sm:text-sm text-gray-400">{accountStatus.description}</p>
              </div>
            </div>
            <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${accountStatus.color}`}>
              {accountStatus.label}
            </div>
          </div>
        </div>

        {/* Account Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm text-gray-400">Followers</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-blue-400">{user?.followersCount || 0}</div>
          </div>
          
          <div className="p-3 sm:p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm text-gray-400">Following</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-green-400">{user?.followingCount || 0}</div>
          </div>
          
          <div className="p-3 sm:p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <ImageIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm text-gray-400">Posts</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-purple-400">{user?.postsCount || 0}</div>
          </div>
          
          <div className="p-3 sm:p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
              <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm text-gray-400">Likes</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-rose-400">{user?.likesCount || 0}</div>
          </div>
        </div>

        {/* Badge Section */}
        <div className="p-4 sm:p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Star className="w-4 sm:w-5 h-4 sm:h-5 text-amber-400" />
            <h3 className="font-semibold text-base sm:text-lg">Achievement Badge</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className={`p-3 sm:p-4 rounded-2xl ${badgeInfo.color} shadow-lg ${badgeInfo.glow} transform transition-all duration-300 hover:scale-105 w-full sm:w-auto`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">{badgeInfo.icon}</span>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">{badgeInfo.label}</div>
                  <div className="text-[10px] sm:text-xs text-white/80">Achievement</div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{badgeInfo.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-rose-500/20 rounded-lg">
            <LogOut className="w-4 sm:w-5 h-4 sm:h-5 text-rose-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Account Actions</h2>
        </div>

        <div className="p-4 sm:p-6 border border-rose-500/20 rounded-xl bg-rose-950/10 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-rose-300 mb-0.5 sm:mb-1">Sign Out</h3>
              <p className="text-xs sm:text-sm text-gray-400">Sign out of your account on this device</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 transition-all duration-300 hover:scale-105 border border-rose-500/30"
            >
              <LogOut className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection; 