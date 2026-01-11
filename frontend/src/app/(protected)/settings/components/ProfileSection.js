"use client"
import React, { useState, useEffect } from 'react';
import { Check, X, Edit, Camera, Save, Instagram, Twitter, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileSection = ({ user, updateProfile }) => {
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '', 
    bio: '',
    profileVisibility: 'public',
    userStatus: 'online',
    socialLinks: {
      instagram: '',
      twitter: '',
      facebook: ''
    }
  });

  // UI states
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [editingSocials, setEditingSocials] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  // Initialize form data with user data when it loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        profileVisibility: user.profileVisibility || 'public',
        userStatus: user.userStatus || 'online',
        socialLinks: {
          instagram: user.socialLinks?.instagram || '',
          twitter: user.socialLinks?.twitter || '',
          facebook: user.socialLinks?.facebook || ''
        }
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Update profile handler
  const handleProfileUpdate = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const result = await updateProfile(user._id, formData);

      if (result.success) {
        toast.custom((t) => (
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <Check className="w-5 h-5" />
            <p>Profile updated successfully!</p>
          </div>
        ));
        setEditingName(false);
        setEditingBio(false);
        setEditingSocials(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating your profile');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate badge display with animations
  const getBadgeDisplay = (badge) => {
    const badges = {
      newbie: { label: 'Newbie', color: 'bg-gradient-to-r from-blue-600 to-blue-400', icon: '🌱' },
      rising: { label: 'Rising', color: 'bg-gradient-to-r from-green-600 to-emerald-400', icon: '📈' },
      pro: { label: 'Pro', color: 'bg-gradient-to-r from-purple-600 to-violet-400', icon: '⭐' },
      trendsetter: { label: 'Trendsetter', color: 'bg-gradient-to-r from-yellow-600 to-amber-400', icon: '🔥' }
    };

    return badges[badge] || badges.newbie;
  };

  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/20">
      <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Public Profile</h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex flex-col items-center">
          <div 
            className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden mb-3 ring-4 ring-violet-500/20">
              <img
                src={user?.profilePicture || "/images/default-profile.jpg"}
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center bg-black/60 rounded-full transition-opacity duration-300 ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
              <button className="p-3 bg-white/20 rounded-full backdrop-blur-sm transform transition-transform duration-300 hover:scale-110">
                <Camera className="w-6 h-6" />
              </button>
            </div>
          </div>
          <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-200 font-medium">
            Change photo
          </button>

          {/* Animated Badge */}
          {user?.badge && (
            <div className="mt-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105">
              <div className={`px-4 py-2 rounded-full text-sm ${getBadgeDisplay(user.badge).color} shadow-lg`}>
                <div className="flex items-center gap-2">
                  <span>{getBadgeDisplay(user.badge).icon}</span>
                  <span className="font-medium">{getBadgeDisplay(user.badge).label}</span>
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2 text-center">
                {user.badge === 'newbie' && 'Just getting started'}
                {user.badge === 'rising' && `${user.postsCount || 0} amazing posts`}
                {user.badge === 'pro' && `${user.followersCount || 0} loyal followers`}
                {user.badge === 'trendsetter' && `${user.likesCount || 0} hearts received`}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Display Name</label>
            {editingName ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                  maxLength={33}
                  placeholder="Enter your display name"
                />
                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    onClick={() => {
                      handleProfileUpdate();
                      setEditingName(false);
                    }}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none p-2 sm:p-3 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all duration-300"
                  >
                    <Check className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setFormData({ ...formData, fullName: user?.fullName || '' });
                      setEditingName(false);
                    }}
                    className="flex-1 sm:flex-none p-2 sm:p-3 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-all duration-300"
                  >
                    <X className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between group">
                <h3 className="text-lg sm:text-xl font-medium">{formData.fullName}</h3>
                <button
                  onClick={() => setEditingName(true)}
                  className="p-2 bg-white/5 rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10"
                >
                  <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Bio</label>
            {editingBio ? (
              <div className="flex flex-col gap-2 sm:gap-3">
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={260}
                  className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                  placeholder="Tell us about yourself..."
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <span className="text-xs sm:text-sm text-gray-400">{formData.bio.length}/260</span>
                  <div className="flex w-full sm:w-auto gap-2">
                    <button
                      onClick={() => {
                        handleProfileUpdate();
                        setEditingBio(false);
                      }}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300"
                    >
                      <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, bio: user?.bio || '' });
                        setEditingBio(false);
                      }}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 text-xs sm:text-sm font-medium transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between group">
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{formData.bio || 'No bio added yet'}</p>
                <button
                  onClick={() => setEditingBio(true)}
                  className="p-1.5 sm:p-2 bg-white/5 rounded-lg sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 flex-shrink-0 ml-2"
                >
                  <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Username</label>
          <div className="flex items-center">
            <div className="text-white/30 bg-zinc-800/50 border border-white/10 rounded-l-lg py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-mono">
              profile/
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              // onChange={handleInputChange}
              className="bg-zinc-800/50 border border-white/10 border-l-0 rounded-r-lg py-2 sm:py-3 px-3 sm:px-4 flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono text-sm sm:text-base transition-all duration-300"
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            // onChange={handleInputChange}
            className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 sm:py-3 px-3 sm:px-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm sm:text-base transition-all duration-300"
            disabled
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Social Links</label>
          {editingSocials ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <div className="text-white/30 bg-zinc-800/50 border border-white/10 rounded-l-lg py-2 sm:py-3 px-3 sm:px-4">
                  <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder="instagram.com/yourusername"
                  className="bg-zinc-800/50 border border-white/10 border-l-0 rounded-r-lg py-2 sm:py-3 px-3 sm:px-4 flex-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                />
              </div>

              <div className="flex items-center">
                <div className="text-white/30 bg-zinc-800/50 border border-white/10 rounded-l-lg py-2 sm:py-3 px-3 sm:px-4">
                  <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <input
                  type="text"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="twitter.com/yourusername"
                  className="bg-zinc-800/50 border border-white/10 border-l-0 rounded-r-lg py-2 sm:py-3 px-3 sm:px-4 flex-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                />
              </div>

              <div className="flex items-center">
                <div className="text-white/30 bg-zinc-800/50 border border-white/10 rounded-l-lg py-2 sm:py-3 px-3 sm:px-4">
                  <Facebook className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <input
                  type="text"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleInputChange}
                  placeholder="facebook.com/yourusername"
                  className="bg-zinc-800/50 border border-white/10 border-l-0 rounded-r-lg py-2 sm:py-3 px-3 sm:px-4 flex-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
                />
              </div>

              <div className="flex justify-end gap-2 mt-3 sm:mt-4">
                <button
                  onClick={() => {
                    handleProfileUpdate();
                    setEditingSocials(false);
                  }}
                  disabled={isSubmitting}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 transition-all duration-300"
                >
                  <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      socialLinks: user?.socialLinks || { instagram: '', twitter: '', facebook: '' }
                    });
                    setEditingSocials(false);
                  }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 text-xs sm:text-sm font-medium transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {user?.socialLinks && Object.values(user.socialLinks).some(link => link) ? (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {user.socialLinks.instagram && (
                    <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg hover:from-purple-600/30 hover:to-pink-600/30 text-xs sm:text-sm font-medium transition-all duration-300 group"
                    >
                      <Instagram className="w-4 sm:w-5 h-4 sm:h-5 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {user.socialLinks.twitter && (
                    <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg hover:from-blue-600/30 hover:to-cyan-600/30 text-xs sm:text-sm font-medium transition-all duration-300 group"
                    >
                      <Twitter className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      <span>Twitter</span>
                    </a>
                  )}
                  {user.socialLinks.facebook && (
                    <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-800/20 to-blue-600/20 rounded-lg hover:from-blue-800/30 hover:to-blue-600/30 text-xs sm:text-sm font-medium transition-all duration-300 group"
                    >
                      <Facebook className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-400">No social links added</p>
              )}
              <button
                onClick={() => setEditingSocials(true)}
                className="self-start text-violet-400 hover:text-violet-300 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 group transition-colors duration-300"
              >
                <Edit className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                Edit social links
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">User Status</label>
          <select
            name="userStatus"
            value={formData.userStatus}
            onChange={handleInputChange}
            className="bg-zinc-800/50 border border-white/10 rounded-lg py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300"
          >
            <option value="online">🟢 Online</option>
            <option value="away">🌙 Away</option>
            <option value="busy">⛔ Busy</option>
            <option value="offline">⚫ Offline</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-4 px-6 bg-white/5 rounded-xl backdrop-blur-sm">
          <div>
            <p className="font-medium text-lg mb-3">Account Stats</p>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <span className="block text-2xl font-bold text-violet-400 mb-1">{user?.followersCount || 0}</span>
                <span className="text-sm text-gray-400">Followers</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-violet-400 mb-1">{user?.followingCount || 0}</span>
                <span className="text-sm text-gray-400">Following</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-violet-400 mb-1">{user?.postsCount || 0}</span>
                <span className="text-sm text-gray-400">Posts</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-violet-400 mb-1">{user?.likesCount || 0}</span>
                <span className="text-sm text-gray-400">Likes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleProfileUpdate}
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;