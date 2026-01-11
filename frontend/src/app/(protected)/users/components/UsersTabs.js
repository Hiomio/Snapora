"use client"
import React from 'react';
import { Users, UserPlus, UserCheck } from 'lucide-react';

const UsersTabs = ({ activeTab, setActiveTab, followersCount, followingCount }) => {
  return (
    <div className="flex items-center gap-2 border-b border-white/10">
      {[
        { id: 'all', label: 'All Users', icon: <Users className="w-4 h-4" /> },
        { id: 'followers', label: 'Your Followers', icon: <UserPlus className="w-4 h-4" /> },
        { id: 'following', label: 'Following', icon: <UserCheck className="w-4 h-4" /> },
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-violet-500 text-violet-400'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          {tab.icon}
          {tab.label}
          {tab.id === 'followers' && <span className="bg-violet-900/60 text-violet-300 text-xs px-2 py-0.5 rounded-full">{followersCount}</span>}
          {tab.id === 'following' && <span className="bg-violet-900/60 text-violet-300 text-xs px-2 py-0.5 rounded-full">{followingCount}</span>}
        </button>
      ))}
    </div>
  );
};

export default UsersTabs; 