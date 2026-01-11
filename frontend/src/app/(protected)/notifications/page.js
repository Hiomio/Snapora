"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageSquare,
  UserPlus,
  Clock,
  ExternalLink,
  Bell,
  Loader2,
  Search,
  Filter,
  CheckCircle,
  X,
  Settings,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Archive,
  Star,
  MoreHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRead, setShowRead] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const api = useApi();
  const router = useRouter();

  useEffect(() => {
    fetchNotifications();
  }, [page, activeFilter, sortBy, showRead, user]);

  const fetchNotifications = async (isRefresh = false) => {
    if (!user) return;
    try {
      if (isRefresh) {
        setRefreshing(true);
        setPage(1);
      } else {
        setLoading(true);
      }

      const params = new URLSearchParams({
        page: isRefresh ? 1 : page,
        limit: 20
      });

      // Add filter parameters based on activeFilter
      if (activeFilter !== 'all') {
        if (activeFilter === 'unread') {
          params.append('read', 'false');
        } else {
          params.append('type', activeFilter);
        }
      }

      const response = await api.get(`/api/notifications?${params}`);
      const newNotifications = response.data.data;

      if (isRefresh || page === 1) {
        setNotifications(newNotifications);
      } else {
        setNotifications(prev => [...prev, ...newNotifications]);
      }

      setHasMore(newNotifications.length === 20);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchNotifications(true);
  };

  const markAsRead = async (notificationIds) => {
    try {
      if (Array.isArray(notificationIds)) {
        // Bulk mark as read
        await Promise.all(notificationIds.map(id =>
          api.patch(`/api/notifications/${id}/read`)
        ));
      } else {
        // Single notification
        await api.patch(`/api/notifications/${notificationIds}/read`);
      }

      setNotifications(prev =>
        prev.map(notification =>
          (Array.isArray(notificationIds) ? notificationIds.includes(notification._id) : notificationIds === notification._id)
            ? { ...notification, read: true }
            : notification
        )
      );

      toast.success('Marked as read');
    } catch (err) {
      console.error('Error marking as read:', err);
      toast.error('Failed to mark as read');
    }
  };

  const deleteNotifications = async (notificationIds) => {
    try {
      if (Array.isArray(notificationIds)) {
        // Bulk delete
        await Promise.all(notificationIds.map(id =>
          api.delete(`/api/notifications/${id}`)
        ));
      } else {
        // Single notification
        await api.delete(`/api/notifications/${notificationIds}`);
      }

      setNotifications(prev =>
        prev.filter(notification =>
          !(Array.isArray(notificationIds) ? notificationIds.includes(notification._id) : notificationIds === notification._id)
        )
      );

      setSelectedNotifications([]);
      setIsSelectMode(false);
      toast.success('Notifications deleted');
    } catch (err) {
      console.error('Error deleting notifications:', err);
      toast.error('Failed to delete notifications');
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/api/notifications/read-all');
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
      toast.success('All notifications marked as read');
    } catch (err) {
      console.error('Error marking all as read:', err);
      toast.error('Failed to mark all as read');
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedNotifications([]);
  };

  const toggleNotificationSelection = (notificationId) => {
    setSelectedNotifications(prev =>
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(notifications.map(n => n._id));
  };

  const deselectAll = () => {
    setSelectedNotifications([]);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Get activity icon based on notification type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5" fill="#ec4899" stroke="#ec4899" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5" fill="#3b82f6" stroke="#3b82f6" />;
      case 'reply':
        return <MessageSquare className="w-5 h-5" fill="#22c55e" stroke="#22c55e" />;
      case 'follow':
        return <UserPlus className="w-5 h-5" fill="#8b5cf6" stroke="#8b5cf6" />;
      case 'favorite':
        return <Star className="w-5 h-5" fill="#f59e0b" stroke="#f59e0b" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  // Format time as relative
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return 'just now';

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
      }

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
      }

      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
      }

      const diffInYears = Math.floor(diffInMonths / 12);
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    } catch (err) {
      return "recently";
    }
  };

  // Handle click on notification
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification._id);
    }

    if (notification.type === 'follow' && notification.relatedUser) {
      const username = notification.sender?.username;
      if (username) {
        router.push(`/profile/${username}`);
      }
    }
    else if (['like', 'favorite', 'comment'].includes(notification.type) && notification.relatedImage) {
      const imageId = notification.relatedImage._id || notification.relatedImage;
      let url = `/image/${imageId}`;

      if (notification.type === 'comment' && notification.relatedComment) {
        url += `?comment=${notification.relatedComment._id || notification.relatedComment}`;
      }

      router.push(url);
    }
    else if (notification.type === 'reply' && notification.relatedComment) {
      const imageId = notification.relatedImage._id || notification.relatedImage;
      const commentId = notification.relatedComment._id || notification.relatedComment;

      router.push(`/image/${imageId}?comment=${commentId}&isReply=true`);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'unread' && !notification.read) ||
      notification.type === activeFilter;
    const matchesSearch = searchQuery === '' ||
      notification.sender?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReadStatus = showRead || !notification.read;

    return matchesFilter && matchesSearch && matchesReadStatus;
  });

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'like', label: 'Likes', icon: <Heart className="w-4 h-4" />, count: notifications.filter(n => n.type === 'like').length },
    { id: 'comment', label: 'Comments', icon: <MessageSquare className="w-4 h-4" />, count: notifications.filter(n => n.type === 'comment').length },
    { id: 'follow', label: 'Follows', icon: <UserPlus className="w-4 h-4" />, count: notifications.filter(n => n.type === 'follow').length },
    { id: 'favorite', label: 'Favorites', icon: <Star className="w-4 h-4" />, count: notifications.filter(n => n.type === 'favorite').length }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto"
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-purple-600">
                <Bell className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Notifications
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 sm:p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSelectMode}
                className={`p-2 sm:p-3 rounded-xl transition-colors ${isSelectMode ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 sm:p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-sm sm:text-base"
              />
            </div>

            {isSelectMode && (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <button
                  onClick={selectAll}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                >
                  Select All
                </button>
                <button
                  onClick={deselectAll}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                >
                  Deselect All
                </button>
                {selectedNotifications.length > 0 && (
                  <>
                    <button
                      onClick={() => markAsRead(selectedNotifications)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-xs sm:text-sm"
                    >
                      Mark Read
                    </button>
                    <button
                      onClick={() => deleteNotifications(selectedNotifications)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}

            {!isSelectMode && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={markAllAsRead}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-xs sm:text-sm"
                >
                  Mark All Read
                </button>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all text-xs sm:text-sm ${activeFilter === filter.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {filter.icon}
                <span className="hidden sm:inline">{filter.label}</span>
                <span className="sm:hidden">{filter.label.charAt(0)}</span>
                <span className="text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-gray-800/50 border border-gray-700"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-700 border border-gray-600 text-white text-xs sm:text-sm"
                    >
                      <option value="latest">Latest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="unread">Unread First</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Show Read</label>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={showRead}
                          onChange={(e) => setShowRead(e.target.checked)}
                          className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-xs sm:text-sm">Include read notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Quick Actions</label>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button
                        onClick={() => deleteNotifications(notifications.filter(n => n.read).map(n => n._id))}
                        className="px-2 sm:px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-xs"
                      >
                        Delete Read
                      </button>
                      <button
                        onClick={() => deleteNotifications(notifications.map(n => n._id))}
                        className="px-2 sm:px-3 py-1 rounded-lg bg-red-700 hover:bg-red-600 transition-colors text-xs"
                      >
                        Delete All
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-2">
                {error}
              </div>
              <button
                onClick={() => fetchNotifications(true)}
                className="text-sm bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg transition-colors"
              >
                Try again
              </button>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">No notifications</h3>
              <p className="text-sm sm:text-base text-gray-500 px-4">
                {activeFilter === 'all'
                  ? "You're all caught up! Check back later for new notifications."
                  : `No ${activeFilter} notifications found.`}
              </p>
            </div>
          ) : (
            <>
              {filteredNotifications.map((notification, idx) => (
                <motion.div
                  key={notification._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all cursor-pointer group border ${notification.read
                      ? 'bg-gray-800/30 border-gray-700/50'
                      : 'bg-purple-900/20 border-purple-500/30'
                    } hover:bg-gray-800/50 hover:border-purple-500/50`}
                  onClick={() => !isSelectMode && handleNotificationClick(notification)}
                >
                  {/* Selection checkbox */}
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification._id)}
                      onChange={() => toggleNotificationSelection(notification._id)}
                      className="mt-1.5 sm:mt-2 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}

                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
                  )}

                  {/* Avatar */}
                  <Link href={`/profile/${notification.sender?.username}`} className="block">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-700/30 to-gray-800 flex items-center justify-center ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all flex-shrink-0 cursor-pointer hover:ring-violet-500/50">
                      {notification.sender?.profilePicture ? (
                        <img
                          src={notification.sender.profilePicture}
                          alt={notification.sender?.username || 'User'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-200 font-bold text-lg sm:text-xl">
                          {notification.sender?.username?.charAt(0).toUpperCase() || "?"}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm">
                          <Link href={`/profile/${notification.sender?.username}`} className="block">
                            <span className="font-semibold text-white hover:text-violet-300 cursor-pointer transition-colors duration-200 hover:underline">{notification.sender?.username || 'Someone'}</span>
                          </Link>
                          <span className="text-gray-300"> {notification.content}</span>
                        </p>

                        {/* Preview of related content if available */}
                        {notification.relatedImage && notification.relatedImage.title && (
                          <div className="mt-1.5 sm:mt-2 p-1.5 sm:p-2 rounded-lg bg-gray-800/70 border border-gray-700/50 text-xs text-gray-300 truncate group-hover:bg-gray-800 transition-colors">
                            &quot;{notification.relatedImage.title}&quot;
                          </div>
                        )}

                        <div className="flex items-center mt-1.5 sm:mt-2">
                          <Clock className="w-3 h-3 text-purple-300/50 mr-1" />
                          <p className="text-xs text-purple-300/70">{formatTime(notification.createdAt)}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4">
                        {getActivityIcon(notification.type)}

                        {!isSelectMode && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification._id);
                              }}
                              className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors mr-1 sm:mr-2 cursor-pointer"
                            >
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotifications(notification._id);
                              }}
                              className="p-1 rounded-lg bg-red-600 hover:bg-red-500 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Load More */}
              {hasMore && (
                <div className="text-center py-4 sm:py-6">
                  <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-sm sm:text-base"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationsPage;