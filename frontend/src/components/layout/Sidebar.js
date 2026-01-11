"use client";

import React, { useState, useEffect } from "react";
import {
  Bolt,
  Clock,
  Compass,
  Drama,
  Grid,
  Heart,
  ImagePlus,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  User,
  Users,
  BookmarkIcon,
  Hash,
  Bell,
  FolderPlus,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Sidebar = ({ mobileSidebarOpen, setMobileSidebarOpen }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle mobile sidebar item click
  const handleMobileItemClick = () => {
    setMobileSidebarOpen(false);
  };

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };

    if (mobileSidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileSidebarOpen]);

  const menuItems = [
    { name: 'Dashboard', icon: <Compass className="transition-transform duration-300 group-hover:scale-110" />, href: '/dashboard' },
    { name: 'Feed', icon: <Grid className="transition-transform duration-300 group-hover:scale-110" />, href: '/feed' },
    { name: 'Profile', icon: <User className="transition-transform duration-300 group-hover:scale-110" />, href: `/profile/@${user?.username || 'username'}` },
    { name: 'Likes', icon: <Heart className="transition-transform duration-300 group-hover:scale-110" />, href: '/likes' },
    { name: 'Favorites', icon: <BookmarkIcon className="transition-transform duration-300 group-hover:scale-110" />, href: '/favorites' },
    { name: 'Collections', icon: <FolderPlus className="transition-transform duration-300 group-hover:scale-110" />, href: '/collections' },
    { name: 'Search', icon: <Search className="transition-transform duration-300 group-hover:scale-110" />, href: '/search' },
    { name: 'Tags', icon: <Hash className="transition-transform duration-300 group-hover:scale-110" />, href: '/tags' },
    { name: 'Notifications', icon: <Bell className="transition-transform duration-300 group-hover:scale-110" />, href: '/notifications' },
    { name: 'Users', icon: <Users className="transition-transform duration-300 group-hover:scale-110" />, href: '/users' },
    { name: 'Upload Image', icon: <ImagePlus className="transition-transform duration-300 group-hover:scale-110" />, href: '/upload-image' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-20 xl:w-64 border-r border-white/5 h-screen fixed flex-col bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-white/5 flex items-center justify-center xl:justify-start">
          <Link href={"/dashboard"} className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl p-2.5 flex items-center justify-center shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold hidden xl:block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Pixora</h1>
          </Link>
        </div>

        {/* Navigation */}
        <div className="py-8 flex flex-col flex-1 overflow-y-auto">
          <div className="space-y-2 px-3 overflow-y-auto custom-scrollbar">
            {menuItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setIsHovered(item.href)}
                onMouseLeave={() => setIsHovered(null)}
                className={`group flex items-center xl:space-x-3 px-4 py-3.5 rounded-xl text-sm 
                  ${pathname === item.href || (item.href.includes('/profile/') && pathname.includes('/profile/'))
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20'
                  : 'text-gray-300 hover:bg-white/5 hover:shadow-lg hover:shadow-violet-500/5'
                  } transition-all duration-300 w-full justify-center xl:justify-start relative overflow-hidden`}
              >
                <span className="flex-shrink-0 relative z-10 group">{item.icon}</span>
                <span className={`hidden xl:block font-medium relative z-10 transition-transform duration-300 ${isHovered === item.href ? 'translate-x-1' : ''}`}>
                  {item.name}
                </span>
                {isHovered === item.href && !pathname.includes(item.href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 blur-xl" />
                )}
              </Link>
            ))}
          </div>

          <div className="mt-8 px-3 mb-4">
            <div className="text-xs font-medium px-3 hidden xl:block text-violet-400">WIDGET</div>
            <div className="mt-3 space-y-2">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <p className="text-gray-300 mb-2 hidden xl:block">Explore your profile to see for followers, following and posts.</p>
                <Link href={`/profile/@${user?.username || 'username'}`} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20 px-3 py-1.5 rounded-md hover:bg-violet-700 transition-all duration-300 text-sm">
                  <span className="hidden xl:inline">See profile</span>
                  <span className="xl:hidden">Profile</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-auto px-3">
            <Link href={"/settings"}
              className={`group flex items-center xl:space-x-3 px-4 py-3.5 rounded-xl text-sm 
                ${pathname === '/settings'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20'
                  : 'text-gray-300 hover:bg-white/5'
                } transition-all duration-300 w-full justify-center xl:justify-start`}
            >
              <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden xl:block font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleMobileItemClick}
          />
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 w-full max-w-sm h-full bg-gradient-to-b from-zinc-900 via-zinc-900/95 to-zinc-900 backdrop-blur-xl border-r border-white/5 overflow-y-auto">
            {/* Mobile Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <Link href={"/dashboard"} className="flex items-center gap-3 group" onClick={handleMobileItemClick}>
                <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl p-2.5 flex items-center justify-center shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Pixora</h1>
              </Link>
              <button
                onClick={handleMobileItemClick}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="py-6 px-4">
              <div className="space-y-2">
                {menuItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleMobileItemClick}
                    className={`group flex items-center space-x-3 px-4 py-4 rounded-xl text-sm 
                      ${pathname === item.href || (item.href.includes('/profile/') && pathname.includes('/profile/'))
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20'
                      : 'text-gray-300 hover:bg-white/5'
                      } transition-all duration-300 w-full`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Widget */}
              <div className="mt-8">
                <div className="text-xs font-medium px-3 text-violet-400 mb-3">WIDGET</div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <p className="text-gray-300 mb-3">Explore your profile to see followers, following and posts.</p>
                  <Link 
                    href={`/profile/@${user?.username || 'username'}`} 
                    onClick={handleMobileItemClick}
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20 px-3 py-2 rounded-md hover:bg-violet-700 transition-all duration-300 text-sm inline-block"
                  >
                    See profile
                  </Link>
                </div>
              </div>

              {/* Mobile Settings */}
              <div className="mt-6">
                <Link 
                  href={"/settings"}
                  onClick={handleMobileItemClick}
                  className={`group flex items-center space-x-3 px-4 py-4 rounded-xl text-sm 
                    ${pathname === '/settings'
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20'
                      : 'text-gray-300 hover:bg-white/5'
                    } transition-all duration-300 w-full`}
                >
                  <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  <span className="font-medium">Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
