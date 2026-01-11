"use client"
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import SettingsLayout from './components/SettingsLayout';

const SettingsPage = () => {
  // Get user data and functions from AuthContext
  const { user, loading, updateProfile, updatePassword, logout } = useAuth();

  return (
    <SettingsLayout 
      user={user}
      loading={loading}
      updateProfile={updateProfile}
      updatePassword={updatePassword}
      logout={logout}
    />
  );
};

export default SettingsPage; 