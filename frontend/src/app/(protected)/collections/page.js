"use client"
import React, { useState, useEffect } from 'react';
import { Loader2, FolderPlus } from 'lucide-react';
import { useCollections } from '@/hooks/useCollections';
import {
  CollectionHeader,
  SearchAndFilters,
  CollectionStats,
  CollectionQuickAccess,
  CollectionGrid,
  CollectionList,
  CreateCollectionModal,
  EditCollectionModal,
  DeleteConfirmationModal,
  CollectionDetailsModal
} from './components';
import { useAuth } from '@/context/AuthContext';

const CollectionsPage = () => {
  // State management
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [collectionToEdit, setCollectionToEdit] = useState(null);
  const [collectionToDelete, setCollectionToDelete] = useState(null);

  const { user } = useAuth();

  
  // New collection form state
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    visibility: 'private',
    tags: '',
  });
  
  // Hooks
  const { 
    collections, 
    loading, 
    loadingMore,
    hasMore,
    fetchCollections, 
    loadMoreCollections,
    createCollection, 
    updateCollection, 
    deleteCollection 
  } = useCollections();
  
  // Fetch collections on mount and when sort/filter changes
  useEffect(() => {
    if (!user) return;
    fetchCollections({
      sortBy: sortOption,
      sortOrder: sortOrder,
      search: searchQuery
    });
  }, [sortOption, sortOrder, filter, user]);
  
  // Handle search query changes with debounce
  useEffect(() => {
    if (!user) return;

    const timer = setTimeout(() => {
      fetchCollections({
        search: searchQuery,
        sortBy: sortOption,
        sortOrder: sortOrder
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, user]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setFilterOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Filter collections based on visibility
  const getFilteredCollections = () => {
    if (filter === 'all') return collections;
    return collections.filter(collection => collection.visibility === filter);
  };
  
  // Handle creating a new collection
  const handleCreateCollection = async () => {
    if (!newCollection.name.trim()) {
      return;
    }
    
    try {
      // Convert tags string to array
      const tagsArray = newCollection.tags 
        ? newCollection.tags.split(',').map(tag => tag.trim().toLowerCase())
        : [];
      
      const createdCollection = await createCollection({
        name: newCollection.name,
        description: newCollection.description,
        visibility: newCollection.visibility,
        tags: tagsArray,
      });
      
      if (createdCollection) {
        // Reset form and close modal
        setNewCollection({
          name: '',
          description: '',
          visibility: 'private',
          tags: '',
        });
        setShowCreateModal(false);
        
        // Refresh collections list
        fetchCollections();
      }
    } catch (error) {
      console.error("Failed to create collection:", error);
    }
  };
  
  // Handle updating a collection
  const handleUpdateCollection = async () => {
    if (!collectionToEdit || !collectionToEdit.name.trim()) {
      return;
    }
    
    try {
      // Convert tags string to array if it's a string
      const tagsArray = typeof collectionToEdit.tags === 'string'
        ? collectionToEdit.tags.split(',').map(tag => tag.trim().toLowerCase())
        : collectionToEdit.tags;
      
      const updatedCollection = await updateCollection(collectionToEdit._id, {
        name: collectionToEdit.name,
        description: collectionToEdit.description,
        visibility: collectionToEdit.visibility,
        tags: tagsArray,
        isStarred: collectionToEdit.isStarred,
      });
      
      if (updatedCollection) {
        setShowEditModal(false);
        
        // Refresh collections list
        fetchCollections();
      }
    } catch (error) {
      console.error("Failed to update collection:", error);
    }
  };
  
  // Handle deleting a collection
  const handleConfirmDelete = async () => {
    if (!collectionToDelete) return;
    
    try {
      const success = await deleteCollection(collectionToDelete._id);
      
      if (success) {
        setShowDeleteConfirm(false);
        setCollectionToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  };
  
  // Handle collection edit button
  const handleEditCollection = (collection) => {
    // Convert tags array to string for the form
    const collectionWithStringTags = {
      ...collection,
      tags: Array.isArray(collection.tags) ? collection.tags.join(', ') : ''
    };
    
    setCollectionToEdit(collectionWithStringTags);
    setShowEditModal(true);
  };
  
  // Handle collection delete button
  const handleDeleteCollection = (collection) => {
    setCollectionToDelete(collection);
    setShowDeleteConfirm(true);
  };
  
  // Handle starring/unstarring a collection
  const handleToggleStar = async (collection) => {
    try {
      await updateCollection(collection._id, {
        isStarred: !collection.isStarred
      });
      // Refresh collections to show updated state
      fetchCollections();
    } catch (error) {
      console.error("Failed to toggle star:", error);
    }
  };

  // Handle toggling collection visibility
  const handleToggleVisibility = async (collection) => {
    try {
      const newVisibility = collection.visibility === 'private' ? 'public' : 'private';
      await updateCollection(collection._id, {
        visibility: newVisibility
      });
      // Refresh collections to show updated state
      fetchCollections();
    } catch (error) {
      console.error("Failed to toggle visibility:", error);
    }
  };
  
  // Handle load more collections
  const handleLoadMore = () => {
    loadMoreCollections({
      sortBy: sortOption,
      sortOrder: sortOrder,
      search: searchQuery
    });
  };
  
  // Handle collection selection/view
  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };
  
  // Loading state
  if ((loading && collections.length === 0) || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading collections...</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 bg-zinc-950 text-white">
      <div className="p-6">
        {/* Header */}
        <CollectionHeader onCreateClick={() => setShowCreateModal(true)} />
        
        {/* Search and filters */}
        <SearchAndFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortOption={sortOption}
          sortOrder={sortOrder}
          setSortOption={setSortOption}
          setSortOrder={setSortOrder}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        
        {/* Collection Stats */}
        <CollectionStats collections={collections} />
        
        {/* Quick access */}
        {/* <CollectionQuickAccess /> */}
        
        {/* Collections grid/list view */}
        {getFilteredCollections().length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/50 border border-white/10 rounded-xl">
            <div className="flex justify-center mb-4">
              <FolderPlus className="w-16 h-16 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Collections Found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No collections matching "${searchQuery}"`
                : "Start organizing your images by creating a new collection"}
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 py-2 px-4 transition-all duration-300"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create New Collection</span>
            </button>
          </div>
        ) : (
          <>
            {/* Grid view */}
            {viewMode === 'grid' && (
              <CollectionGrid 
                collections={getFilteredCollections()}
                onEdit={handleEditCollection}
                onDelete={handleDeleteCollection}
                onToggleStar={handleToggleStar}
                onToggleVisibility={handleToggleVisibility}
                loadMoreCollections={handleLoadMore}
                loadingMore={loadingMore}
                hasMore={hasMore}
              />
            )}
            
            {/* List view */}
            {viewMode === 'list' && (
              <CollectionList 
                collections={getFilteredCollections()}
                onEdit={handleEditCollection}
                onDelete={handleDeleteCollection}
                onToggleStar={handleToggleStar}
                onToggleVisibility={handleToggleVisibility}
                onCollectionClick={handleCollectionClick}
                loadMoreCollections={handleLoadMore}
                loadingMore={loadingMore}
                hasMore={hasMore}
              />
            )}
          </>
        )}
        
        {/* Modals */}
        <CreateCollectionModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          newCollection={newCollection}
          setNewCollection={setNewCollection}
          handleCreateCollection={handleCreateCollection}
        />
        
        <EditCollectionModal 
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          collectionToEdit={collectionToEdit}
          setCollectionToEdit={setCollectionToEdit}
          handleUpdateCollection={handleUpdateCollection}
        />
        
        <DeleteConfirmationModal 
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          collectionToDelete={collectionToDelete}
          handleConfirmDelete={handleConfirmDelete}
        />
        
        <CollectionDetailsModal 
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
          onEdit={handleEditCollection}
        />
      </div>
    </div>
  );
};

export default CollectionsPage; 