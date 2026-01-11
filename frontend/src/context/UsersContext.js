"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "./AuthContext";
import { useFollow } from "./FollowContext";

// Create users context
const UsersContext = createContext();

// Users provider component
export const UsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { following } = useFollow();
  const api = useApi();

  // Get all users
  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/api/users");
      setAllUsers(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error fetching users";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Get users excluding the current user
  const getOtherUsers = useCallback(() => {
    if (!user) return allUsers;
    return allUsers.filter(u => u._id !== user._id);
  }, [allUsers, user]);

  // Get random users for featured creators and suggestions
  const getRandomUsers = useCallback((count = 5) => {
    const otherUsers = getOtherUsers();
    if (otherUsers.length <= count) return otherUsers;
    
    // Shuffle array and get random subset
    const shuffled = [...otherUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, [getOtherUsers]);

  // Get featured creators that the user is not following
  const getFeaturedCreators = useCallback(() => {
    const featuredUsers = getOtherUsers();
    
    // Filter out users that the current user is following
    if (following && following.length > 0) {
      return featuredUsers.filter(user => 
        !following.some(followed => followed.following._id === user._id)
      );
    }
    
    return featuredUsers;
  }, [getOtherUsers, following]);
  
  // Update follower count for a user - for UI updates
  const updateFollowerCount = useCallback((userId, increment) => {
    setAllUsers(prevUsers => 
      prevUsers.map(user => {
        if (user._id === userId) {
          const currentCount = user.followersCount || 0;
          return {
            ...user,
            followersCount: Math.max(0, currentCount + increment)
          };
        }
        return user;
      })
    );
  }, []);

  // Initialize users data
  useEffect(() => {
    getAllUsers();
    
    // Set up polling for fresh data
    const intervalId = setInterval(() => {
      getAllUsers();
    }, 5 * 60 * 1000); // Refresh every 5 minutes
    
    return () => clearInterval(intervalId);
  }, [getAllUsers]);

  const value = {
    allUsers,
    loading,
    error,
    getAllUsers,
    getOtherUsers,
    getRandomUsers,
    getFeaturedCreators,
    updateFollowerCount,
    setAllUsers
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

// Custom hook to use users context
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}; 