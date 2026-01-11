"use client"
import React from 'react';
import { Award, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const CommunityInsights = ({ suggestedUsers }) => {
  return (
    <div className="bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-zinc-900/60 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Community Insights</h3>
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Most Active Users</span>
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {suggestedUsers.slice(0, 7).map(user => (
              <Link href={`/profile/${user.username}`} key={user._id} className="w-8 h-8 rounded-full overflow-hidden">
                <img src={user.profilePicture || "/images/default-profile.jpg"} alt={user.fullName} className="w-full h-full object-cover" />
              </Link>
            ))}
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">+{Math.floor(Math.random() * 20)}</div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Popular Topics</span>
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            {['Photography', 'Digital Art', 'Illustration', '3D', 'Animation'].map((tag, idx) => (
              <Link href={`/tags/${tag}`} key={idx} className="px-2 py-1 bg-white/5 rounded-md text-xs">{tag}</Link>
            ))}
          </div>
        </div>
      </div>
      <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg text-sm transition-colors">
        View Community Hub
      </button>
    </div>
  );
};

export default CommunityInsights; 