"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useFollow } from '@/context/FollowContext';
import { useApi } from '@/hooks/useApi';
import { ProfilePicVerify } from '@/components';
import RecentActivity from '@/app/(protected)/dashboard/components/RecentActivity';
import { useCollections } from '@/hooks/useCollections';
import CreateCollectionModal from '@/app/(protected)/collections/components/CreateCollectionModal.jsx';

// Import profile components
import {
  ProfileHeader,
  ProfileBio,
  ProfileTabs,
  WorksTab,
  CollectionsTab,
  FollowTab,
  ActivityTab,
  AboutTab
} from './components';
import LoadingScreen from '@/components/screens/LoadingScreen';
import { AlertTriangle, Lock, Trash2, UserPlus } from 'lucide-react';
import ProfileSuspended from './components/ProfileSuspended';
import ProfileDeleted from './components/ProfileDeleted';

const ProfilePage = () => {
  const { username } = useParams();
  const userName = decodeURIComponent(username).replace("@", "");
  const { user, loading: authLoading, isAuthenticated, updateProfile } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    followers,
    following,
    loading: followLoading,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
  } = useFollow();

  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    bio: "",
    profilePicture: "/images/default-profile.jpg",
    coverPicture: "/images/default-cover.jpg",
    badge: "newbie",
    profileVisibility: "public",
    accountStatus: "active",
    userStatus: "online",
    socialLinks: {},
    isDpConfirm: false,
    provider: "credentials",
    isVerified: false,
    isPremium: false,
    lastLogin: null,
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    likesCount: 0,
    interactionsCount: 0,
    createdAt: new Date()
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [profileCollections, setProfileCollections] = useState([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    visibility: 'private',
    tags: '',
  });

  const api = useApi();
  const {
    fetchCollections,
    collections,
    createCollection,
  } = useCollections();

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!profile._id) return;
      const response = await api.get(`/api/follow/status/${profile._id}`);
      setIsFollowing(response.data.data.isFollowing);
    }
    if (user && user._id !== profile?._id) {
      checkFollowStatus();
    }
  }, [api, user, profile._id]);

  useEffect(() => {
    setIsLoading(true);
    if (userName === user?.username) {
      setProfile(user);
      setIsOwnProfile(true);
      setIsLoading(false);
    } else {
      const fetchUser = async () => {
        try {
          setError(null);
          const response = await api.get(`/api/users/${userName}`);
          setProfile(response.data.data);
        } catch (err) {
          const errorMessage = err.response?.data?.message || "Error fetching user";
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [user, userName, api, isAuthenticated, following]);

  const [activeTab, setActiveTab] = useState('works');

  // Load profile collections: own -> private+public via hook; others -> public filtered by user
  useEffect(() => {
    const loadCollections = async () => {
      if (!profile?._id) return;
      setCollectionsLoading(true);
      try {
        if (isOwnProfile) {
          await fetchCollections({ page: 1, limit: 12, sortBy: 'updatedAt', sortOrder: 'desc' });
          setProfileCollections(collections);
        } else {
          // Fetch public collections and filter by profile user id
          const response = await api.get(`/api/collections/public?page=1&limit=50`);
          const publicCollections = response?.data?.data || [];
          const filtered = publicCollections.filter((c) => {
            const ownerId = typeof c.user === 'string' ? c.user : c.user?._id;
            return ownerId === profile._id;
          });
          setProfileCollections(filtered);
        }
      } catch (err) {
        console.error('Error loading collections:', err);
      } finally {
        setCollectionsLoading(false);
      }
    };
    loadCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile._id, isOwnProfile]);

  // Sync local list with hook when viewing own profile
  useEffect(() => {
    if (isOwnProfile) {
      setProfileCollections(collections);
    }
  }, [collections, isOwnProfile]);

  const handleCreateCollection = async () => {
    if (!newCollection.name.trim()) return;
    try {
      const tagsArray = newCollection.tags
        ? newCollection.tags.split(',').map(t => t.trim().toLowerCase())
        : [];
      const created = await createCollection({
        name: newCollection.name,
        description: newCollection.description,
        visibility: newCollection.visibility,
        tags: tagsArray,
      });
      if (created) {
        setNewCollection({ name: '', description: '', visibility: 'private', tags: '' });
        setShowCreateModal(false);
        if (isOwnProfile) {
          await fetchCollections({ page: 1, limit: 12, sortBy: 'updatedAt', sortOrder: 'desc' });
        }
      }
    } catch (e) {
      console.error('Failed to create collection:', e);
    }
  };

  // Load followers and following when those tabs are selected
  useEffect(() => {
    if (activeTab === 'followers' && profile._id) {
      getFollowers(profile._id);
    } else if (activeTab === 'following' && profile._id) {
      getFollowing(profile._id);
    }
  }, [activeTab, profile._id, getFollowers, getFollowing]);

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      return;
    }

    try {
      if (isFollowing) {
        const result = await unfollowUser(profile._id);
        if (result.success) {
          setIsFollowing(false);
          // Update profile followers count
          setProfile(prev => ({
            ...prev,
            followersCount: prev.followersCount - 1
          }));
          // Update following list
          await getFollowing(user._id);
        }
      } else {
        const result = await followUser(profile._id);
        if (result.success) {
          setIsFollowing(true);
          // Update profile followers count
          setProfile(prev => ({
            ...prev,
            followersCount: prev.followersCount + 1
          }));
          // Update following list
          await getFollowing(user._id);
        }
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  // Display loading state
  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-white/10 p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h2 className="text-xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors font-medium text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (profile.accountStatus === "suspended") {
    return <ProfileSuspended />
  }

  if (profile.accountStatus === "deleted") {
    return <ProfileDeleted />
  }

  return (
    <div className="min-h-screen">
      <ProfilePicVerify isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* Profile Header with cover photo, avatar, name and stats */}
      <ProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        followLoading={followLoading}
        handleFollowToggle={handleFollowToggle}
        setProfileOpen={setProfileOpen}
      />

      {/* Bio and stats section */}
      <div className="px-4 sm:px-6 md:px-10">
        <ProfileBio profile={profile} isOwnProfile={isOwnProfile} />

        {/* Tabs Navigation */}
        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profile={profile}
          isOwnProfile={isOwnProfile}
        />
      </div>

      {/* Conditional Profile Status Banners */}
      {(profile.profileVisibility === "private" && !isOwnProfile && !isFollowing) ? (
        <div className="bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 my-4 sm:my-6 text-center mx-4 sm:mx-6 md:mx-10">
          <div className="bg-violet-500/20 p-3 rounded-full w-fit mx-auto mb-3">
            <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-violet-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">This Profile is Private</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-4">Follow this user to view their photos and content</p>
          <button
            onClick={handleFollowToggle}
            disabled={followLoading}
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <UserPlus className="h-4 w-4" />
            Follow
          </button>
        </div>
      ) : (
        // Tab Content
        <div className="px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-8">
          {activeTab === 'works' && <WorksTab user={profile} />}

          {activeTab === 'collections' && (
            <CollectionsTab 
              collections={profileCollections} 
              loading={collectionsLoading}
              onCreate={() => setShowCreateModal(true)}
              canCreate={isOwnProfile}
            />
          )}

          {activeTab === 'followers' && (
            <FollowTab
              type="followers"
              users={followers}
              loading={followLoading}
            />
          )}

          {activeTab === 'following' && (
            <FollowTab
              type="following"
              users={following}
              loading={followLoading}
            />
          )}

          {activeTab === 'activity' && (
            isOwnProfile ? <RecentActivity /> : <ActivityTab />
          )}

          {activeTab === 'about' && <AboutTab profile={profile} isOwnProfile={isOwnProfile} />}
        </div>)}

      {/* Create Collection Modal */}
      <CreateCollectionModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        newCollection={newCollection}
        setNewCollection={setNewCollection}
        handleCreateCollection={handleCreateCollection}
      />
    </div>
  );
};

export default ProfilePage;