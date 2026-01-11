import { useState } from 'react';
import { useApi } from './useApi';
// import { useToast } from '@/components/ui/use-toast';

export const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const api = useApi();
  const toast = ({ variant, title, description }) => {
    console.log(`[${variant}] ${title}: ${description}`);
  };

  /**
   * Fetch user's collections
   * @param {Object} options - Options for fetching collections
   * @param {number} options.page - Page number
   * @param {number} options.limit - Number of items per page
   * @param {string} options.sortBy - Field to sort by
   * @param {string} options.sortOrder - Sort order ('asc' or 'desc')
   * @param {string} options.search - Search query
   */
  const fetchCollections = async (options = {}) => {
    const {
      page = 1,
      limit = 10,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      search = '',
    } = options;

    try {
      setLoading(true);
      
      let query = `page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      if (search) query += `&search=${search}`;
      
      const { data } = await api.get(`/api/collections?${query}`);
      
      if (data.success) {
        setCollections(data.data);
        setCurrentPage(data.metadata.page);
        setTotalPages(data.metadata.pages);
        setHasMore(data.metadata.page < data.metadata.pages);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch collections",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch collections",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load more collections (for pagination)
   */
  const loadMoreCollections = async (options = {}) => {
    if (!hasMore || loadingMore) return;
    
    try {
      setLoadingMore(true);
      
      const nextPage = currentPage + 1;
      const {
        limit = 10,
        sortBy = 'updatedAt',
        sortOrder = 'desc',
        search = '',
      } = options;
      
      let query = `page=${nextPage}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      if (search) query += `&search=${search}`;
      
      const { data } = await api.get(`/api/collections?${query}`);
      
      if (data.success) {
        setCollections([...collections, ...data.data]);
        setCurrentPage(data.metadata.page);
        setTotalPages(data.metadata.pages);
        setHasMore(data.metadata.page < data.metadata.pages);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load more collections",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load more collections",
      });
    } finally {
      setLoadingMore(false);
    }
  };

  /**
   * Fetch a collection by ID
   * @param {string} collectionId - Collection ID
   */
  const fetchCollectionById = async (collectionId) => {
    try {
      setLoading(true);
      
      const { data } = await api.get(`/api/collections/${collectionId}`);
      
      if (data.success) {
        setSelectedCollection(data.data);
        return data.data;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch collection",
        });
        return null;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch collection",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new collection
   * @param {Object} collectionData - Collection data
   */
  const createCollection = async (collectionData) => {
    try {
      setLoading(true);
      
      const { data } = await api.post('/api/collections', collectionData);
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Collection created successfully",
        });
        return data.data;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create collection",
        });
        return null;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create collection",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update a collection
   * @param {string} collectionId - Collection ID
   * @param {Object} collectionData - Updated collection data
   */
  const updateCollection = async (collectionId, collectionData) => {
    try {
      setLoading(true);
      
      const { data } = await api.put(`/api/collections/${collectionId}`, collectionData);
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Collection updated successfully",
        });
        return data.data;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update collection",
        });
        return null;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update collection",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a collection
   * @param {string} collectionId - Collection ID
   */
  const deleteCollection = async (collectionId) => {
    try {
      setLoading(true);
      
      const { data } = await api.delete(`/api/collections/${collectionId}`);
      
      if (data.success) {
        // Remove from local state
        setCollections(collections.filter(c => c._id !== collectionId));
        
        toast({
          title: "Success",
          description: "Collection deleted successfully",
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete collection",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete collection",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add an image to a collection
   * @param {string} collectionId - Collection ID
   * @param {string} imageId - Image ID
   */
  const addImageToCollection = async (collectionId, imageId) => {
    try {
      setLoading(true);
      
      const { data } = await api.post(`/api/collections/${collectionId}/images/${imageId}`);
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Image added to collection",
        });
        return data.data;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add image to collection",
        });
        return null;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add image to collection",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove an image from a collection
   * @param {string} collectionId - Collection ID
   * @param {string} imageId - Image ID
   */
  const removeImageFromCollection = async (collectionId, imageId) => {
    try {
      setLoading(true);
      
      const { data } = await api.delete(`/api/collections/${collectionId}/images/${imageId}`);
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Image removed from collection",
        });
        return data.data;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to remove image from collection",
        });
        return null;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to remove image from collection",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get collections containing a specific image
   * @param {string} imageId - Image ID
   */
  const getCollectionsByImage = async (imageId) => {
    try {
      setLoading(true);
      
      const { data } = await api.get(`/api/collections/image/${imageId}`);
      
      if (data.success) {
        return data.data;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch collections for image",
        });
        return [];
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch collections for image",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    collections,
    loading,
    loadingMore,
    hasMore,
    selectedCollection,
    setSelectedCollection,
    fetchCollections,
    loadMoreCollections,
    fetchCollectionById,
    createCollection,
    updateCollection,
    deleteCollection,
    addImageToCollection,
    removeImageFromCollection,
    getCollectionsByImage,
  };
}; 