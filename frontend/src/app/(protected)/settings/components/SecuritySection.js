"use client"
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

const SecuritySection = ({ user, updatePassword }) => {
  // Password change state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  // Update password handler
  const handlePasswordUpdate = async () => {
    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updatePassword(user._id, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });

      if (result.success) {
        toast.success('Password updated successfully');
        setChangingPassword(false);
        setPasswordData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        toast.error(result.error || 'Failed to update password');
      }
    } catch (error) {
      toast.error('An error occurred while updating your password');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Security Settings</h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Password</h3>
            <button
              onClick={() => setChangingPassword(!changingPassword)}
              className="text-violet-400 hover:text-violet-300 text-sm"
            >
              {changingPassword ? 'Cancel' : 'Change password'}
            </button>
          </div>

          {changingPassword ? (
            <div className="space-y-4 bg-zinc-800/50 border border-white/10 rounded-lg p-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handlePasswordUpdate}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Update Password
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-800/50 border border-white/10 rounded-lg py-2 px-3">
              <span className="text-gray-400">Set strong password to protect your account</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="font-medium mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between bg-zinc-800/50 border border-white/10 rounded-lg p-3">
              <span className="text-gray-400">Provider</span>
              <span className="capitalize">{user?.provider || 'credentials'}</span>
            </div>

            <div className="flex justify-between bg-zinc-800/50 border border-white/10 rounded-lg p-3">
              <span className="text-gray-400">Verified</span>
              <span>{user?.isVerified ? 'Yes' : 'No'}</span>
            </div>

            <div className="flex justify-between bg-zinc-800/50 border border-white/10 rounded-lg p-3">
              <span className="text-gray-400">Premium</span>
              <span>{user?.isPremium ? 'Yes' : 'No'}</span>
            </div>

            <div className="flex justify-between bg-zinc-800/50 border border-white/10 rounded-lg p-3">
              <span className="text-gray-400">Created Date</span>
              <span>{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
            </div>

            <div className="flex justify-between bg-zinc-800/50 border border-white/10 rounded-lg p-3">
              <span className="text-gray-400">Last Login</span>
              <span>{user?.lastLogin ? formatDate(user.lastLogin) : 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="font-medium mb-4">Login History</h3>
          <div className="space-y-3">
            {user?.loginHistory ? (
              user.loginHistory.slice(0, 3).map((login, index) => (
                <div key={index} className="bg-zinc-800/50 border border-white/10 rounded-lg p-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{login.device || 'Unknown Device'}</span>
                    <span className="text-xs text-gray-400">{login.timestamp ? formatDate(login.timestamp) : 'N/A'}</span>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center justify-between">
                    <span>{login.location || 'Unknown Location'}</span>
                    <span>IP: {login.ip ? login.ip.replace(/\d+\.\d+$/, 'XX.XX') : 'Unknown'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-zinc-800/50 border border-white/10 rounded-lg p-3">
                <p className="text-sm text-gray-400">No login history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection; 