"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { useFollow } from '@/context/FollowContext';

// Import all components
import {
  SearchBar,
  FilterMenu,
  ActiveFilters,
  ResultTabs,
  SearchResults,
  ImagesTab,
  UsersTab,
  CollectionsTab,
  TagsTab,
  TrendingSearches
} from './components';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const api = useApi();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { followUser, unfollowUser, checkFollowStatus } = useFollow();

  // Get search query from URL params
  const queryParam = searchParams.get('q') || '';

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [displayedQuery, setDisplayedQuery] = useState(queryParam); // For display only
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState(['recent']);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Results states
  const [imageResults, setImageResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [collectionResults, setCollectionResults] = useState([]);
  const [tagResults, setTagResults] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);

  // Pagination
  const [imagePage, setImagePage] = useState(1);
  const [imageTotal, setImageTotal] = useState(0);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotal, setUsersTotal] = useState(0);
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [collectionsTotal, setCollectionsTotal] = useState(0);

  // Following state
  const [followingStatus, setFollowingStatus] = useState({});

  // Check if user is following another user
  const isFollowing = (userId) => {
    return followingStatus[userId] || false;
  };

  // Toggle filter
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters(['recent']);
  };

  // Update URL when search query changes
  const updateSearchParams = (query) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setDisplayedQuery(query);
    updateSearchParams(query);
    performSearch(query);
  };

  // Effect to perform search on initial load if query parameter exists
  useEffect(() => {
    if (queryParam) {
      setSearchQuery(queryParam);
      setDisplayedQuery(queryParam);
      performSearch(queryParam);
    } else {
      // If no query, just fetch trending searches
      fetchTrendingSearches();
    }
  }, [queryParam]);

  // Effect to perform search when tab changes
  useEffect(() => {
    if (searchQuery.trim()) {
      // No need to reload all data, just focus on the active tab
      switch (activeTab) {
        case 'images':
          searchImages();
          break;
        case 'users':
          searchUsers();
          break;
        case 'collections':
          searchCollections();
          break;
        case 'tags':
          searchTags();
          break;
      }
    }
  }, [activeTab]);

  // Search function
  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      // Search images, users, collections, and tags in parallel
      await Promise.all([
        searchImages(query),
        searchUsers(query),
        searchCollections(query),
        searchTags(query)
      ]);

      // Only fetch trending searches if we haven't already
      if (trendingSearches.length === 0) {
        fetchTrendingSearches();
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search users
  const searchUsers = async (query = searchQuery) => {
    try {
      const response = await api.get(`/api/users/search?query=${query}&page=${usersPage}&limit=12`);
      setUserResults(response.data.data);
      setUsersTotal(response.data.metadata?.total || 0);

      // Check follow status for all users
      if (user) {
        const newFollowingStatus = { ...followingStatus };

        for (const fetchedUser of response.data.data) {
          if (newFollowingStatus[fetchedUser._id] === undefined) {
            const isFollowing = await checkFollowStatus(fetchedUser._id);
            newFollowingStatus[fetchedUser._id] = isFollowing;
          }
        }

        setFollowingStatus(newFollowingStatus);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Search images
  const searchImages = async (query = searchQuery) => {
    try {
      const response = await api.get(`/api/images/search?q=${query}&page=${imagePage}&limit=12`);
      setImageResults(response.data.data);
      setImageTotal(response.data.metadata?.total || 0);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Search collections
  const searchCollections = async (query = searchQuery) => {
    try {
      const response = await api.get(`/api/collections/search?query=${query}&page=${collectionsPage}&limit=8`);
      setCollectionResults(response.data.data);
      setCollectionsTotal(response.data.metadata?.total || 0);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  // Search tags
  const searchTags = async (query = searchQuery) => {
    try {
      const response = await api.get(`/api/images/tags/search?query=${query}&limit=10`);
      setTagResults(response.data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Fetch trending searches
  const fetchTrendingSearches = async () => {
    try {
      const response = await api.get(`/api/images/trending-search?limit=4`);
      setTrendingSearches(response.data.data);
    } catch (error) {
      console.error("Error fetching trending searches:", error);
    }
  };

  // Handle trending search click
  const handleTrendingClick = (query) => {
    handleSearch(query);
  };

  // Handle follow/unfollow
  const handleFollowToggle = async (userId) => {
    if (!user) return;

    setFollowLoading(true);

    try {
      // Optimistic update
      const currentStatus = followingStatus[userId];
      setFollowingStatus(prev => ({ ...prev, [userId]: !currentStatus }));

      if (currentStatus) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
      // Revert on error
      setFollowingStatus(prev => ({ ...prev, [userId]: followingStatus[userId] }));
    } finally {
      setFollowLoading(false);
    }
  };

  // Load more functions
  const loadMoreImages = () => {
    setImagePage(prev => prev + 1);
    searchImages();
  };

  const loadMoreUsers = () => {
    setUsersPage(prev => prev + 1);
    searchUsers();
  };

  const loadMoreCollections = () => {
    setCollectionsPage(prev => prev + 1);
    searchCollections();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative">
      {/* Search bar component */}
      <SearchBar
        initialQuery={searchQuery}
        onSearch={handleSearch}
        loading={loading}
        showFilterMenu={showFilterMenu}
        setShowFilterMenu={setShowFilterMenu}
      />

      {/* Filter menu component */}
      <FilterMenu
        showFilterMenu={showFilterMenu}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        clearFilters={clearFilters}
      />

      {/* Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {/* Active filters component */}
        <ActiveFilters
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
        />

        {/* When we have a search query */}
        {searchQuery && (
          <>
            {/* Results tabs component */}
            <ResultTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              counts={{
                images: imageTotal,
                users: usersTotal,
                collections: collectionResults.length,
                tags: tagResults.length
              }}
            />

            {/* All results section */}
            {activeTab === 'all' && (
              <SearchResults
                searchQuery={displayedQuery}
                loading={loading}
                imageResults={imageResults}
                userResults={userResults}
                collectionResults={collectionResults}
                tagResults={tagResults}
                setActiveTab={setActiveTab}
                isFollowing={isFollowing}
                handleFollowToggle={handleFollowToggle}
                followLoading={followLoading}
              />
            )}

            {/* Images tab content */}
            {activeTab === 'images' && (
              <ImagesTab
                loading={loading}
                imageResults={imageResults}
                loadMore={loadMoreImages}
                hasMore={imageTotal > imageResults.length}
              />
            )}

            {/* Users tab content */}
            {activeTab === 'users' && (
              <UsersTab
                loading={loading}
                userResults={userResults}
                loadMore={loadMoreUsers}
                hasMore={usersTotal > userResults.length}
                isFollowing={isFollowing}
                handleFollowToggle={handleFollowToggle}
                followLoading={followLoading}
              />
            )}

            {/* Collections tab content */}
            {activeTab === 'collections' && (
              <CollectionsTab
                loading={loading}
                collectionResults={collectionResults}
                loadMore={loadMoreCollections}
                hasMore={collectionsTotal > collectionResults.length}
              />
            )}

            {/* Tags tab content */}
            {activeTab === 'tags' && (
              <TagsTab
                loading={loading}
                tagResults={tagResults}
              />
            )}
          </>
        )}

        {!searchQuery && (
          <div className="text-center py-8 sm:py-12 bg-zinc-900/60 border border-white/10 rounded-xl">
            <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl font-medium mb-2">Search the world of images</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-4">Use the search bar above to find images, users, collections, and tags</p>
          </div>
        )}

        {/* If no search or on all tab, show trending */}
        {(!searchQuery || activeTab === 'all') && (
          <div className={searchQuery ? '' : 'mt-6 sm:mt-8'}>
            <TrendingSearches
              loading={loading}
              trendingSearches={trendingSearches}
              onTrendingClick={handleTrendingClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;