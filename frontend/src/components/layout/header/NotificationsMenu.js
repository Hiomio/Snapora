"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Check, 
  ChevronRight, 
  Trash2, 
  X,
  CheckCheck, 
  Heart, 
  MessageSquare, 
  UserPlus, 
  Bookmark,
  Clock,
  Filter,
  Settings,
  MoreHorizontal,
  Search,
  Archive,
  Star,
  Eye,
  EyeOff
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from "@/context/AuthContext";

const NotificationsMenu = ({ activeDropdown, toggleDropdown }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // list or compact
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const notificationRef = useRef(null);
  const router = useRouter();
  const api = useApi();
  const { user } = useAuth();

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "like", label: "Likes", icon: <Heart className="w-3 h-3" />, count: notifications.filter(n => n.type === 'like').length },
    { id: "comment", label: "Comments", icon: <MessageSquare className="w-3 h-3" />, count: notifications.filter(n => n.type === 'comment').length },
    { id: "follow", label: "Follows", icon: <UserPlus className="w-3 h-3" />, count: notifications.filter(n => n.type === 'follow').length },
    { id: "favorite", label: "Favorites", icon: <Bookmark className="w-3 h-3" />, count: notifications.filter(n => n.type === 'favorite').length }
  ];

  // Filter notifications based on search and active filter
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchQuery === "" || 
      notification.sender?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.relatedImage?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "all" || 
      (activeFilter === "unread" && !notification.read) ||
      notification.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const filter = activeFilter !== "all" && activeFilter !== "unread" ? `&type=${activeFilter}` : "";
      const readFilter = activeFilter === "unread" ? "&read=false" : "";
      const response = await api.get(`/api/notifications?limit=20${filter}${readFilter}`);
      setNotifications(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
      setLoading(false);
    }
  }, [api, user, activeFilter]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await api.get('/api/notifications/unread/count');
      setUnreadCount(response.data.data.count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [api, user]);

  // Mark notification as read
  const markAsRead = async (notificationId, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    try {
      await api.patch(`/api/notifications/${notificationId}/read`);
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification._id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.patch('/api/notifications/read-all');
      
      // Update local state
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
      
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    try {
      await api.delete(`/api/notifications/${notificationId}`);
      
      // Add deletion animation
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => 
          notification._id === notificationId 
            ? { ...notification, isDeleting: true } 
            : notification
        )
      );
      
      // Remove after animation completes
      setTimeout(() => {
        setNotifications(prevNotifications => 
          prevNotifications.filter(notification => notification._id !== notificationId)
        );
        
        // Update unread count if needed
        const deletedNotification = notifications.find(n => n._id === notificationId);
        if (deletedNotification && !deletedNotification.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }, 300);
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // Bulk actions
  const handleBulkAction = async (action) => {
    if (selectedNotifications.length === 0) return;
    
    try {
      if (action === 'mark-read') {
        await Promise.all(selectedNotifications.map(id => 
          api.patch(`/api/notifications/${id}/read`)
        ));
        
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            selectedNotifications.includes(notification._id)
              ? { ...notification, read: true }
              : notification
          )
        );
        
        setUnreadCount(prev => Math.max(0, prev - selectedNotifications.length));
      } else if (action === 'delete') {
        await Promise.all(selectedNotifications.map(id => 
          api.delete(`/api/notifications/${id}`)
        ));
        
        setNotifications(prevNotifications => 
          prevNotifications.filter(notification => !selectedNotifications.includes(notification._id))
        );
      }
      
      setSelectedNotifications([]);
      setIsSelectMode(false);
    } catch (err) {
      console.error('Error performing bulk action:', err);
    }
  };

  // Handle notification click based on type and related entities
  const handleNotificationClick = (notification) => {
    // Mark as read first
    if (!notification.read) {
      markAsRead(notification._id);
    }
    
    // Close the dropdown
    toggleDropdown(null);
    
    // Navigate based on notification type and related entities
    if (notification.type === 'follow' && notification.relatedUser) {
      // Get username from sender (since that's who followed)
      const username = notification.sender?.username;
      if (username) {
        router.push(`/profile/${username}`);
      }
    } 
    else if (['like', 'favorite', 'comment'].includes(notification.type) && notification.relatedImage) {
      // For likes, favorites, comments on images
      const imageId = notification.relatedImage._id || notification.relatedImage;
      let url = `/image/${imageId}`;
      
      // If it's a comment and we have the comment ID, add it to highlight the comment
      if (notification.type === 'comment' && notification.relatedComment) {
        url += `?comment=${notification.relatedComment._id || notification.relatedComment}`;
      }
      
      router.push(url);
    }
    else if (notification.type === 'reply' && notification.relatedComment) {
      // For replies to comments
      const imageId = notification.relatedImage._id || notification.relatedImage;
      const commentId = notification.relatedComment._id || notification.relatedComment;
      
      router.push(`/image/${imageId}?comment=${commentId}&isReply=true`);
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500" fill="#f43f5e" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-500" fill="#3b82f6" />;
      case 'reply':
        return <MessageSquare className="w-4 h-4 text-green-500" fill="#22c55e" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-violet-500" />;
      case 'favorite':
        return <Bookmark className="w-4 h-4 text-amber-500" fill="#f59e0b" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  // Format time as relative
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (err) {
      return "recently";
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setActiveMenu(null);
        setIsSelectMode(false);
        setSelectedNotifications([]);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications when dropdown opens or filter changes
  useEffect(() => {
    if (activeDropdown === "notifications") {
      fetchNotifications();
    }
  }, [activeDropdown, fetchNotifications, activeFilter]);

  // Fetch unread count on mount and periodically
  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      
      // Set up polling for unread count every minute
      const interval = setInterval(fetchUnreadCount, 60000);
      return () => clearInterval(interval);
    }
  }, [fetchUnreadCount, user]);

  // Notification item component
  const NotificationItem = ({ notification }) => {
    const isSelected = selectedNotifications.includes(notification._id);
    const scaleAnimation = notification.isDeleting 
      ? { scale: 0, opacity: 0, height: 0, marginTop: 0, marginBottom: 0 } 
      : { scale: 1, opacity: 1 };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ ...scaleAnimation, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative p-4 hover:bg-black/20 rounded-xl transition-all mb-2 cursor-pointer group ${
          !notification.read ? "bg-indigo-950/20 backdrop-blur-sm border-l-4 border-indigo-500" : "bg-zinc-900/60 backdrop-blur-sm border-l-4 border-transparent"
        } ${isSelected ? "ring-2 ring-indigo-500 bg-indigo-950/30" : ""}`}
        onClick={() => {
          if (isSelectMode) {
            setSelectedNotifications(prev => 
              isSelected 
                ? prev.filter(id => id !== notification._id)
                : [...prev, notification._id]
            );
          } else {
            handleNotificationClick(notification);
          }
        }}
      >
        {/* Selection checkbox */}
        {isSelectMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 left-3 z-10"
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected 
                ? "bg-indigo-500 border-indigo-500" 
                : "bg-transparent border-gray-400"
            }`}>
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
          </motion.div>
        )}

        <div className="flex items-start">
          {/* User avatar with notification type indicator */}
          <div className={`relative flex-shrink-0 mr-3 ${isSelectMode ? "ml-6" : ""}`}>
            {notification.sender?.profilePicture ? (
              <Image
                src={notification.sender.profilePicture}
                alt={notification.sender.username || "User"}
                width={48}
                height={48}
                className="rounded-full ring-2 ring-zinc-700/50 group-hover:ring-indigo-500/50 transition-all object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center ring-2 ring-zinc-700/50 group-hover:ring-indigo-500/50 transition-all">
                <span className="text-zinc-300 font-medium text-lg">
                  {notification.sender?.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
            )}
            
            {/* Notification type indicator */}
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-zinc-800 border-2 border-zinc-900 group-hover:border-zinc-800 transition-colors">
              {getNotificationIcon(notification.type)}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-white">
                {notification.sender?.username || "Someone"}
              </span>{" "}
              <span className="text-gray-300">
                {notification.content}
              </span>
            </p>
            
            {/* Preview of related content if available */}
            {notification.relatedImage && notification.relatedImage.title && (
              <div className="mt-2 p-2.5 rounded-lg bg-black/20 text-sm text-gray-300 truncate">
                &quot;{notification.relatedImage.title}&quot;
              </div>
            )}
            
            {notification.relatedComment && notification.relatedComment.text && (
              <div className="mt-2 p-2.5 rounded-lg bg-black/20 text-sm text-gray-300 truncate">
                &quot;{notification.relatedComment.text}&quot;
              </div>
            )}
            
            <div className="flex items-center mt-2">
              <Clock className="w-3 h-3 text-gray-500 mr-1.5" />
              <p className="text-xs text-gray-400">
                {formatTime(notification.createdAt)}
              </p>
            </div>
          </div>
          
          {/* Quick action buttons */}
          <div className="flex-shrink-0 flex ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notification.read && (
              <button
                onClick={(e) => markAsRead(notification._id, e)}
                className="p-2 rounded-full bg-indigo-900/20 hover:bg-indigo-900/40 text-indigo-400 hover:text-indigo-300 mr-1.5 transition-colors"
                title="Mark as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => deleteNotification(notification._id, e)}
              className="p-2 rounded-full bg-rose-900/20 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 transition-colors"
              title="Delete notification"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="md:relative dropdown-container" ref={notificationRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown("notifications");
        }}
        className={`relative p-2.5 text-gray-300 hover:text-white rounded-full transition-all ${
          activeDropdown === "notifications" 
            ? "bg-indigo-600 text-white" 
            : "hover:bg-black/20 backdrop-blur-sm"
        }`}
      >
        <Bell className={`w-5 h-5 ${unreadCount > 0 ? "animate-pulse" : ""}`} />
        {/* Notification badge with subtle animation */}
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] text-xs font-bold rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {activeDropdown === "notifications" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute md:right-0 right-4 mt-3 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/50 shadow-2xl shadow-black/40 overflow-hidden z-50 backdrop-blur-xl w-[calc(100vw-2rem)] sm:w-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
          >
            {/* Header with expanded toggle */}
            <div className="p-4 border-b border-zinc-800/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Bell className="w-4 h-4 mr-2 text-indigo-400" />
                    Notifications
                    {unreadCount > 0 && (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-2 text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full"
                      >
                        {unreadCount} new
                      </motion.span>
                    )}
                  </h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isSelectMode ? (
                    <>
                      <button 
                        onClick={() => handleBulkAction('mark-read')}
                        disabled={selectedNotifications.length === 0}
                        className="text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 py-1.5 px-3 rounded-full flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
                        Mark read ({selectedNotifications.length})
                      </button>
                      <button 
                        onClick={() => handleBulkAction('delete')}
                        disabled={selectedNotifications.length === 0}
                        className="text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 py-1.5 px-3 rounded-full flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                        Delete ({selectedNotifications.length})
                      </button>
                      <button
                        onClick={() => {
                          setIsSelectMode(false);
                          setSelectedNotifications([]);
                        }}
                        className="text-xs font-medium bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 hover:text-gray-300 py-1.5 px-3 rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 py-1.5 px-3 rounded-full flex items-center transition-colors"
                      >
                        <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
                        Mark all read
                      </button>
                      
                      <button
                        onClick={() => setIsSelectMode(true)}
                        className="p-1.5 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300 transition-colors"
                        title="Select multiple"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-300 transition-colors"
                        title={isExpanded ? "Collapse panel" : "Expand panel"}
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Filter tabs */}
            <div className="px-4 pt-3 pb-2 overflow-x-auto flex space-x-2 custom-scrollbar">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center whitespace-nowrap transition-all ${
                    activeFilter === filter.id 
                      ? "bg-indigo-500 text-white font-medium" 
                      : "bg-zinc-800/50 text-gray-300 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {filter.icon && <span className="mr-1.5">{filter.icon}</span>}
                  {filter.label}
                  {filter.count > 0 && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                      activeFilter === filter.id 
                        ? "bg-white/20 text-white" 
                        : "bg-zinc-700 text-gray-400"
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="max-h-[50vh] sm:max-h-[55vh] overflow-y-auto p-3 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-indigo-500 opacity-20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">Loading notifications...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="p-4 rounded-full bg-rose-500/10 mb-4">
                    <X className="w-8 h-8 text-rose-500" />
                  </div>
                  <p className="text-gray-300 text-center">{error}</p>
                  <button 
                    onClick={fetchNotifications}
                    className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium bg-indigo-500/10 hover:bg-indigo-500/20 py-2 px-4 rounded-lg transition-colors"
                  >
                    Try again
                  </button>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="p-6 rounded-full bg-zinc-800/40 mb-4">
                    <Bell className="w-10 h-10 text-gray-500" />
                  </div>
                  <p className="text-gray-300 font-medium mb-2 text-lg">
                    {searchQuery ? "No matching notifications" : "No notifications yet"}
                  </p>
                  <p className="text-gray-500 text-center">
                    {searchQuery ? "Try adjusting your search terms" : "We'll notify you when something happens"}
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredNotifications.map((notification) => (
                    <NotificationItem 
                      key={notification._id} 
                      notification={notification} 
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            <div className="p-4 border-t border-zinc-800/50">
              <Link
                href="/notifications" 
                className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-center rounded-xl py-3 text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-900/30"
                onClick={() => toggleDropdown(null)}
              >
                View All Notifications
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsMenu;