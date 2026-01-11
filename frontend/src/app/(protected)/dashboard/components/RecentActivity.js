"use client"
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageSquare, 
  UserPlus, 
  Clock, 
  ExternalLink,
  Bell,
  Loader2
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const api = useApi();
  const router = useRouter();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        // Fetch recent notifications from the API
        const response = await api.get('/api/notifications?limit=5');
        setActivities(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load recent activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, [api]);

  // Get activity icon based on notification type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4" fill="#ec4899" stroke="#ec4899" />;
      case 'comment':
      case 'reply':
        return <MessageSquare className="w-4 h-4" fill="#3b82f6" stroke="#3b82f6" />;
      case 'follow':
        return <UserPlus className="w-4 h-4" fill="#8b5cf6" stroke="#8b5cf6" />;
      default:
        return <UserPlus className="w-4 h-4 text-gray-400" />;
    }
  };

  // Format time as relative
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      // Less than a minute
      if (diffInSeconds < 60) {
        return 'just now';
      }
      
      // Minutes
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }
      
      // Hours
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
      }
      
      // Days
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
      }
      
      // Months
      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
      }
      
      // Years
      const diffInYears = Math.floor(diffInMonths / 12);
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    } catch (err) {
      return "recently";
    }
  };

  // Handle click on activity
  const handleActivityClick = (activity) => {
    if (activity.type === 'follow' && activity.relatedUser) {
      const username = activity.sender?.username;
      if (username) {
        router.push(`/profile/${username}`);
      }
    } 
    else if (['like', 'favorite', 'comment'].includes(activity.type) && activity.relatedImage) {
      const imageId = activity.relatedImage._id || activity.relatedImage;
      let url = `/image/${imageId}`;
      
      if (activity.type === 'comment' && activity.relatedComment) {
        url += `?comment=${activity.relatedComment._id || activity.relatedComment}`;
      }
      
      router.push(url);
    }
    else if (activity.type === 'reply' && activity.relatedComment) {
      const imageId = activity.relatedImage._id || activity.relatedImage;
      const commentId = activity.relatedComment._id || activity.relatedComment;
      
      router.push(`/image/${imageId}?comment=${commentId}&isReply=true`);
    }
  };

  // Filter activities
  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === activeFilter);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'like', label: 'Likes', icon: <Heart className="w-3 h-3" /> },
    { id: 'comment', label: 'Comments', icon: <MessageSquare className="w-3 h-3" /> },
    { id: 'follow', label: 'Follows', icon: <UserPlus className="w-3 h-3" /> }
  ];

  return (
    <div className="rounded-xl bg-zinc-900/80 backdrop-blur-lg border border-violet-500/20 shadow-lg shadow-violet-500/5 overflow-hidden">
      <div className="bg-gradient-to-r from-violet-950/50 to-zinc-900/50 p-3 sm:p-4 flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            Recent Activity
          </span>
        </h3>
        {!loading && activities.length > 0 && (
          <button 
            onClick={() => router.push('/notifications')}
            className="text-xs bg-violet-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-violet-300 hover:bg-violet-500/20 transition-all flex items-center gap-1 hover:gap-2 group"
          >
            <span className="hidden sm:inline">View all</span>
            <span className="sm:hidden">All</span>
            <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {!loading && activities.length > 0 && (
        <div className="flex p-2 gap-1 bg-zinc-800/50 overflow-x-auto">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 transition-all whitespace-nowrap ${
                activeFilter === filter.id 
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' 
                  : 'bg-zinc-700/30 text-zinc-300 hover:bg-zinc-700/70'
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 sm:p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8 sm:py-12">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-400">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-2">
              <p className="text-xs sm:text-sm">{error}</p>
            </div>
            <button 
              onClick={() => fetchActivities()}
              className="text-xs sm:text-sm bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors"
            >
              Try again
            </button>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-gray-400">
            <p className="text-xs sm:text-sm">
              {activeFilter === 'all' 
                ? "No recent activity" 
                : `No ${activeFilter} notifications`}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredActivities.map((activity, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-zinc-800/20 hover:bg-zinc-800/50 rounded-xl transition-all cursor-pointer group border border-transparent hover:border-violet-500/20"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-violet-700/30 to-zinc-800 flex items-center justify-center ring-2 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all flex-shrink-0">
                  {activity.sender?.profilePicture ? (
                    <img 
                      src={activity.sender.profilePicture} 
                      alt={activity.sender?.username || 'User'} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-zinc-200 font-bold text-sm sm:text-xl">
                      {activity.sender?.username?.charAt(0).toUpperCase() || "?"}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm">
                    <span className="font-semibold text-white">{activity.sender?.username || 'Someone'}</span>
                    <span className="text-gray-300"> {activity.content}</span>
                  </p>
                  
                  {/* Preview of related content if available */}
                  {activity.relatedImage && activity.relatedImage.title && (
                    <div className="mt-1 sm:mt-2 p-1.5 sm:p-2 rounded-lg bg-zinc-800/70 border border-zinc-700/50 text-xs text-gray-300 truncate group-hover:bg-zinc-800 transition-colors">
                      &quot;{activity.relatedImage.title}&quot;
                    </div>
                  )}
                  
                  <div className="flex items-center mt-1 sm:mt-2">
                    <Clock className="w-3 h-3 text-violet-300/50 mr-1" />
                    <p className="text-xs text-violet-300/70">{formatTime(activity.createdAt)}</p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                  <div className="scale-75 sm:scale-100">{getActivityIcon(activity.type)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && activities.length > 0 && (
        <div className="p-3 sm:p-4 pt-0">
          <button 
            onClick={() => router.push('/notifications')}
            className="w-full py-2.5 sm:py-3 text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            View all activity
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;