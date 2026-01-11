"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "./AuthContext";

// Create context
const LikesFavoritesContext = createContext();

// Provider component
export const LikesFavoritesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const api = useApi();

  // Store liked and favorited images
  const [likedImages, setLikedImages] = useState({});
  const [favoritedImages, setFavoritedImages] = useState({});

  // Check if image is liked by user
  const checkLikeStatus = useCallback(async (imageId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we already have this information in state
      if (likedImages[imageId] !== undefined) {
        return likedImages[imageId];
      }
      
      // Otherwise fetch from API
      const response = await api.get(`/api/likes/${imageId}/check`);
      const isLiked = response.data.data.isLiked;
      
      // Update state
      setLikedImages(prev => ({ ...prev, [imageId]: isLiked }));
      
      return isLiked;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error checking like status";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [api, likedImages]);

  // Check if image is favorited by user
  const checkFavoriteStatus = useCallback(async (imageId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we already have this information in state
      if (favoritedImages[imageId] !== undefined) {
        return favoritedImages[imageId];
      }
      
      // Otherwise fetch from API
      const response = await api.get(`/api/favorites/${imageId}/check`);
      const isFavorited = response.data.data.isFavorited;
      
      // Update state
      setFavoritedImages(prev => ({ ...prev, [imageId]: isFavorited }));
      
      return isFavorited;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error checking favorite status";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [api, favoritedImages]);

  // Toggle like status with optimistic UI updates
  const toggleLike = useCallback(async (imageId, image) => {
    if (!user) return { success: false, message: "You must be logged in" };
    
    try {
      setLoading(true);
      setError(null);
      
      // Get current status
      const currentStatus = likedImages[imageId] || false;
      const newStatus = !currentStatus;
      
      // Optimistically update UI
      setLikedImages(prev => ({ ...prev, [imageId]: newStatus }));
      
      // Make the actual API call
      const response = await api.post(`/api/likes/${imageId}/toggle`);
      
      return { success: true, data: response.data.data };
    } catch (err) {
      // Revert optimistic update on error
      const currentStatus = likedImages[imageId] || false;
      setLikedImages(prev => ({ ...prev, [imageId]: !currentStatus }));
      
      const errorMessage = err.response?.data?.message || "Error toggling like";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [api, user, likedImages]);

  // Toggle favorite status with optimistic UI updates
  const toggleFavorite = useCallback(async (imageId) => {
    if (!user) return { success: false, message: "You must be logged in" };
    
    try {
      setLoading(true);
      setError(null);
      
      // Get current status
      const currentStatus = favoritedImages[imageId] || false;
      const newStatus = !currentStatus;
      
      // Optimistically update UI
      setFavoritedImages(prev => ({ ...prev, [imageId]: newStatus }));
      
      // Make the actual API call
      const response = await api.post(`/api/favorites/${imageId}/toggle`);
      
      return { success: true, data: response.data.data };
    } catch (err) {
      // Revert optimistic update on error
      const currentStatus = favoritedImages[imageId] || false;
      setFavoritedImages(prev => ({ ...prev, [imageId]: !currentStatus }));
      
      const errorMessage = err.response?.data?.message || "Error toggling favorite";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [api, user, favoritedImages]);

  // Load user's likes
  const loadUserLikes = useCallback(async (page = 1, limit = 20) => {
    if (!user) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/api/likes?page=${page}&limit=${limit}`);
      const likes = response.data.data;
      
      // Update liked images state
      const newLikedImages = { ...likedImages };
      likes.forEach(like => {
        newLikedImages[like.image._id] = true;
      });
      
      setLikedImages(newLikedImages);
      
      return likes;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error loading likes";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [api, user, likedImages]);

  // Load user's favorites
  const loadUserFavorites = useCallback(async (page = 1, limit = 20) => {
    if (!user) return [];
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/api/favorites?page=${page}&limit=${limit}`);
      const favorites = response.data.data;
      
      // Update favorited images state
      const newFavoritedImages = { ...favoritedImages };
      favorites.forEach(favorite => {
        newFavoritedImages[favorite.image._id] = true;
      });
      
      setFavoritedImages(newFavoritedImages);
      
      return favorites;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error loading favorites";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [api, user, favoritedImages]);

  const value = {
    loading,
    error,
    likedImages,
    favoritedImages,
    checkLikeStatus,
    checkFavoriteStatus,
    toggleLike,
    toggleFavorite,
    loadUserLikes,
    loadUserFavorites
  };

  return <LikesFavoritesContext.Provider value={value}>{children}</LikesFavoritesContext.Provider>;
};

// Custom hook to use the context
export const useLikesFavorites = () => {
  const context = useContext(LikesFavoritesContext);
  if (!context) {
    throw new Error("useLikesFavorites must be used within a LikesFavoritesProvider");
  }
  return context;
}; 