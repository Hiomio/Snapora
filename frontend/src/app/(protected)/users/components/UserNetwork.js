"use client"
import React from 'react';
import { UserPlus, UserCheck, TrendingUp } from 'lucide-react';

const UserNetwork = ({ followersCount, followingCount }) => {
  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Your Network</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-violet-900/20 to-violet-900/5 border border-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-400">Followers</span>
            <UserPlus className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-2xl font-bold">{followersCount}</p>
          <div className="flex items-center text-xs text-emerald-400 mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+{Math.floor(Math.random() * 10)} this week</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-fuchsia-900/20 to-fuchsia-900/5 border border-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-400">Following</span>
            <UserCheck className="w-4 h-4 text-fuchsia-400" />
          </div>
          <p className="text-2xl font-bold">{followingCount}</p>
          <div className="flex items-center text-xs text-emerald-400 mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+{Math.floor(Math.random() * 5)} this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNetwork; 