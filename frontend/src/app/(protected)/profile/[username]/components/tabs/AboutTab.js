"use client"
import React, { useMemo, useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  LinkIcon, 
  Settings,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

const AboutTab = ({ profile, isOwnProfile = false }) => {
  const [copiedField, setCopiedField] = useState(null);
  const { updateProfile, user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    bio: profile.bio || '',
    socialLinks: {
      instagram: profile.socialLinks?.instagram || '',
      twitter: profile.socialLinks?.twitter || '',
      facebook: profile.socialLinks?.facebook || '',
    },
    profileVisibility: profile.profileVisibility || 'public',
    userStatus: profile.userStatus || 'online',
  });

  // Function to extract domain from full URL
  const extractDomain = (url) => {
    if (!url) return '';
    try {
      return new URL(url).hostname;
    } catch (e) {
      return url;
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Get social links as array with proper error handling
  const getSocialLinks = () => {
    if (!profile.socialLinks) return [];

    try {
      return Object.entries(profile.socialLinks)
        .filter(([_, value]) => value)
        .map(([platform, url]) => ({
          platform,
          url: extractDomain(url),
          fullUrl: url,
          icon: getSocialIcon(platform)
        }));
    } catch (error) {
      console.error("Error processing social links:", error);
      return [];
    }
  };

  // Get social media icons
  const getSocialIcon = (platform) => {
    const icons = {
      'instagram': <Instagram className="w-4 h-4" />,
      'twitter': <Twitter className="w-4 h-4" />,
      'facebook': <Facebook className="w-4 h-4" />,
      'linkedin': <Linkedin className="w-4 h-4" />,
      'website': <Globe className="w-4 h-4" />,
    };
    return icons[platform] || <Globe className="w-4 h-4" />;
  };

  const canEdit = isOwnProfile && user?._id === profile?._id;

  const handleSave = async () => {
    if (!canEdit) return;
    try {
      setSaving(true);
      const updates = {
        bio: form.bio,
        socialLinks: {
          instagram: form.socialLinks.instagram || undefined,
          twitter: form.socialLinks.twitter || undefined,
          facebook: form.socialLinks.facebook || undefined,
        },
        profileVisibility: form.profileVisibility,
        userStatus: form.userStatus,
      };
      await updateProfile(user._id, updates);
      setEditMode(false);
    } catch (e) {
      console.error('Failed to save profile:', e);
    } finally {
      setSaving(false);
    }
  };

  const visibilityOptions = useMemo(() => [
    { id: 'public', label: 'Public' },
    { id: 'private', label: 'Private' },
  ], []);

  const statusOptions = useMemo(() => [
    { id: 'online', label: 'Online' },
    { id: 'away', label: 'Away' },
    { id: 'busy', label: 'Busy' },
    { id: 'offline', label: 'Offline' },
  ], []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Bio section */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 hover:border-violet-500/20 transition-all duration-300 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-white/90">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
            About Me
          </h3>
          {!editMode ? (
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              {profile.bio || "No bio available"}
            </p>
          ) : (
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gray-200 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              maxLength={260}
            />
          )}
          {canEdit && (
            <div className="mt-3 sm:mt-4 flex gap-2">
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs sm:text-sm">Edit</button>
              ) : (
                <>
                  <button disabled={saving} onClick={handleSave} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs sm:text-sm">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button disabled={saving} onClick={() => setEditMode(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs sm:text-sm">Cancel</button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Stats section */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 hover:border-violet-500/20 transition-all duration-300 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-white/90">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
            Creator Stats
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {[
              { label: "Member Since", value: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "N/A", icon: "📅" },
              { label: "Total Posts", value: profile.postsCount || "0", icon: "📝" },
              { label: "Followers", value: profile.followersCount || "0", icon: "👥" },
              { label: "Following", value: profile.followingCount || "0", icon: "🤝" },
              { label: "Likes", value: profile.likesCount || "0", icon: "❤️" },
              { label: "Interactions", value: profile.interactionsCount || "0", icon: "✨" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-3 sm:p-4 hover:bg-white/10 transition-colors">
                <div className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-white/90">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Links */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 hover:border-violet-500/20 transition-all duration-300 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-white/90">
            <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
            Contact & Links
          </h3>
          {!editMode ? (
            <div className="space-y-3 sm:space-y-4">
              {getSocialLinks().map((link, idx) => (
                <a 
                  href={link.fullUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  key={idx} 
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="p-2 sm:p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs sm:text-sm text-gray-400">{link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}</p>
                    <p className="text-sm sm:text-base font-medium text-white/90 truncate">{link.url}</p>
                  </div>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                </a>
              ))}
              {getSocialLinks().length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-gray-400 text-sm sm:text-base md:text-lg">No social links available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['instagram','twitter','facebook'].map((platform) => (
                <div key={platform} className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">{platform.charAt(0).toUpperCase()+platform.slice(1)} URL</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-lg p-2 text-xs sm:text-sm"
                    placeholder={`https://${platform}.com/username`}
                    value={form.socialLinks[platform]}
                    onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [platform]: e.target.value } })}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 md:p-8 hover:border-violet-500/20 transition-all duration-300 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-white/90">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
            Account Info
          </h3>
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {[
              { label: "Username", value: `@${profile.username}`, copyable: true },
              { label: "Email", value: profile.email || "N/A", copyable: true },
              { label: "Account Type", value: profile.isPremium ? "Premium" : "Standard", badge: profile.isPremium ? "premium" : "standard" },
              { label: "Verified", value: profile.isVerified ? "Yes" : "No", badge: profile.isVerified ? "verified" : "unverified" },
              { label: "Profile Visibility", value: profile.profileVisibility, editable: true, field: 'profileVisibility' },
              { label: "Account Status", value: profile.accountStatus },
              { label: "User Status", value: profile.userStatus, editable: true, field: 'userStatus' },
              { label: "Provider", value: profile.provider },
              { label: "Profile Picture Confirmed", value: profile.isDpConfirm ? "Yes" : "No" },
              { label: "Last Login", value: profile.lastLogin ? new Date(profile.lastLogin).toLocaleDateString() : "N/A" },
            ].map((info, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-gray-400 text-xs sm:text-sm">{info.label}</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  {info.badge && (
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                      info.badge === "premium" ? "bg-violet-500/20 text-violet-400" :
                      info.badge === "verified" ? "bg-green-500/20 text-green-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {info.badge}
                    </span>
                  )}
                  {!editMode || !info.editable ? (
                    <span className="font-medium text-white/90 text-xs sm:text-sm">{info.value}</span>
                  ) : info.field === 'profileVisibility' ? (
                    <select 
                      className="bg-white/5 border border-white/10 rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm"
                      value={form.profileVisibility}
                      onChange={(e) => setForm({ ...form, profileVisibility: e.target.value })}
                    >
                      {visibilityOptions.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                    </select>
                  ) : info.field === 'userStatus' ? (
                    <select 
                      className="bg-white/5 border border-white/10 rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm"
                      value={form.userStatus}
                      onChange={(e) => setForm({ ...form, userStatus: e.target.value })}
                    >
                      {statusOptions.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                    </select>
                  ) : (
                    <span className="font-medium text-white/90 text-xs sm:text-sm">{info.value}</span>
                  )}
                  {info.copyable && (
                    <button
                      onClick={() => copyToClipboard(info.value, info.label)}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {copiedField === info.label ? 
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" /> :
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      }
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Social media icons
const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Twitter = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const Facebook = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Linkedin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Globe = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export default AboutTab;