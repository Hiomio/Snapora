"use client"
import React from 'react';
import { Camera, Award, Heart, Zap, TrendingUp, MoreHorizontal } from 'lucide-react';

const ActivityTab = ({ activities = [] }) => {
  // Sample data if activities is not provided
  const sampleActivities = [
    { type: 'upload', title: "Uploaded 'Digital Eden'", time: "2 days ago" },
    { type: 'award', title: "Received the 'Trendsetter' badge", time: "1 week ago" },
    { type: 'like', title: "Liked 15 artworks from Elena Bright", time: "1 week ago" },
    { type: 'feature', title: "'Cosmic Journey' was featured in Explore", time: "2 weeks ago" },
  ];

  const displayActivities = activities.length > 0 ? activities : sampleActivities;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative pl-6 pb-12 border-l border-dashed border-white/10">
        {displayActivities.map((activity, index) => {
          let icon;
          switch (activity.type) {
            case 'upload':
              icon = <Camera className="w-4 h-4" />;
              break;
            case 'award':
              icon = <Award className="w-4 h-4" />;
              break;
            case 'like':
              icon = <Heart className="w-4 h-4" />;
              break;
            case 'feature':
              icon = <Zap className="w-4 h-4" />;
              break;
            default:
              icon = <TrendingUp className="w-4 h-4" />;
          }

          return (
            <div key={index} className="mb-8 relative">
              <div className="absolute -left-10 p-2 rounded-full bg-zinc-800 border border-white/10">
                {icon}
              </div>
              <div className="bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h4 className="text-sm font-medium mb-1">{activity.title}</h4>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-0 left-0 transform -translate-x-1/2 p-2 rounded-full bg-zinc-800 border border-white/10">
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </div>

      <button className="w-full py-2.5 mt-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium">
        View Full Activity
      </button>
    </div>
  );
};

export default ActivityTab; 