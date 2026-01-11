"use client"
import React, { useState } from 'react';
import { Users, CreditCard, Bell, Lock, Globe, Shield, Smartphone } from 'lucide-react';
import ProfileSection from './ProfileSection';
import AccountSection from './AccountSection';
import SecuritySection from './SecuritySection';
import DevicesSection from './DevicesSection';
import SettingsSidebar from './SettingsSidebar';

const SettingsLayout = ({ user, loading, updateProfile, updatePassword, logout }) => {
  const [activeTab, setActiveTab] = useState('profile');

  // If still loading and no user data
  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-zinc-950 text-white">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
        <p className="text-sm sm:text-base text-gray-400">Manage your account, preferences, and security</p>
      </div>

      {/* Settings navigation */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-2 sm:flex gap-2 sm:space-x-2">
          {[
            { id: 'profile', name: 'Profile', icon: <Users className="w-4 h-4" /> },
            { id: 'account', name: 'Account', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
            { id: 'devices', name: 'Devices', icon: <Smartphone className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-1.5 sm:space-x-2 ${activeTab === tab.id
                ? 'bg-violet-600 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
                } transition-colors duration-200`}
            >
              {tab.icon}
              <span className="text-sm sm:text-base">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Settings content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main settings area */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {activeTab === 'profile' && <ProfileSection user={user} updateProfile={updateProfile} />}
          {activeTab === 'account' && <AccountSection handleLogout={logout} user={user} />}
          {activeTab === 'security' && <SecuritySection user={user} updatePassword={updatePassword} />}
          {activeTab === 'devices' && <DevicesSection user={user} handleLogout={logout} />}
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4">
          <SettingsSidebar user={user} handleLogout={logout} />
        </div>
      </div>
    </div>

  );
};

export default SettingsLayout; 