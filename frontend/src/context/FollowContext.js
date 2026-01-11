"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "./AuthContext";

// Create follow context
const FollowContext = createContext();

// Follow provider component
export const FollowProvider = ({ children }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const api = useApi();

  // Get all followers of a user
  const getFollowers = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/follow/followers/${userId}`);
      setFollowers(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error fetching followers";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Get all users the current user is following
  const getFollowing = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/api/follow/following/${userId}`);
      setFollowing(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error fetching following";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Follow a user with optimistic UI updates
  const followUser = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimistically update UI before API call completes
      const targetUser = {
        _id: userId
      };
      
      // Add to following list optimistically
      if (user) {
        const newFollowingItem = {
          _id: Date.now().toString(), // Temporary ID
          follower: { _id: user._id },
          following: targetUser
        };
        
        setFollowing(prevFollowing => [...prevFollowing, newFollowingItem]);
      }
      
      // Make the actual API call
      await api.post(`/api/follow/${userId}`);
      
      // If we're viewing our own profile or the target user's profile, update the data
      if (user) {
        // Refresh following list with real data
        await getFollowing(user._id);
      }
      
      return { success: true };
    } catch (err) {
      // Revert optimistic update on error
      if (user) {
        setFollowing(prevFollowing => prevFollowing.filter(item => item.following._id !== userId));
      }
      
      const errorMessage = err.response?.data?.message || "Error following user";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [api, user, getFollowing]);

  // Unfollow a user with optimistic UI updates
  const unfollowUser = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store current state for potential rollback
      const previousFollowing = [...following];
      
      // Optimistically update UI
      if (user) {
        // Remove from following list
        setFollowing(prevFollowing => prevFollowing.filter(item => item.following._id !== userId));
      }
      
      // Make the actual API call
      await api.delete(`/api/follow/${userId}`);
      
      // Refresh with real data after successful API call
      if (user) {
        await getFollowing(user._id);
      }
      
      return { success: true };
    } catch (err) {
      // Rollback optimistic update on error
      setFollowing(prevFollowing => {
        // Find if there was a relationship before the optimistic update
        const hadRelationship = prevFollowing.some(item => item.following._id === userId);
        
        if (hadRelationship) {
          return following; // Restore from the stored state 
        }
        return prevFollowing;
      });
      
      const errorMessage = err.response?.data?.message || "Error unfollowing user";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [api, user, following, getFollowing]);

  // Check if the current user is following another user
  const checkFollowStatus = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check local state
      const isFollowingLocally = following.some(f => f.following._id === userId);
      if (isFollowingLocally) return true;
      
      // If not found in local state, check with API
      const response = await api.get(`/api/follow/status/${userId}`);
      return response.data.data.isFollowing;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error checking follow status";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [api, following]);

  const value = {
    followers,
    following,
    loading,
    error,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
    checkFollowStatus,
    setFollowers,
    setFollowing
  };

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
};

// Custom hook to use follow context
export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow must be used within a FollowProvider");
  }
  return context;
}; 