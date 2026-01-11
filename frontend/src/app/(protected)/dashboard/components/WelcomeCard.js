"use client"
import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  MessageSquare,
  Users,
  Upload,
  User,
  ChevronRight,
  Award,
  Sparkles,
  Rocket,
  Crown,
  Star,
  TrendingUp,
  Bell,
  Calendar,
  Flame,
  Zap,
  AnvilIcon
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const WelcomeCard = ({ user }) => {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  // Get badge color based on user badge
  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'newbie': return 'from-violet-600 to-fuchsia-600';
      case 'rising': return 'from-indigo-500 to-purple-500';
      case 'pro': return 'from-amber-500 to-orange-500';
      case 'trendsetter': return 'from-pink-500 to-rose-500';
      default: return 'from-cyan-500 to-blue-500';
    }
  };

  // Get badge icon based on user badge
  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'newbie': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'rising': return <Rocket className="w-4 h-4 text-indigo-400" />;
      case 'pro': return <Crown className="w-4 h-4 text-amber-400" />;
      case 'trendsetter': return <Flame className="w-4 h-4 text-pink-400" />;
      default: return <Star className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Analytics data based on user properties
  const analyticsData = [
    {
      label: "Interactions",
      value: user?.interactionsCount || 0,
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      color: "from-cyan-500/20 to-cyan-700/20",
      textColor: "text-cyan-400"
    },
    {
      label: "Likes",
      value: user?.likesCount || 0,
      icon: <Heart className="w-5 h-5 text-pink-400" />,
      color: "from-pink-500/20 to-pink-700/20",
      textColor: "text-pink-400"
    },
    {
      label: "Posts",
      value: user?.postsCount || 0,
      icon: <MessageSquare className="w-5 h-5 text-indigo-400" />,
      color: "from-indigo-500/20 to-indigo-700/20",
      textColor: "text-indigo-400"
    },
    {
      label: "Followers",
      value: user?.followersCount || 0,
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-700/20",
      textColor: "text-emerald-400"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-gradient-to-br from-violet-900/50 via-fuchsia-900/30 to-zinc-900/50 border border-slate-700/50 p-6 overflow-hidden relative shadow-xl"
    >
      {/* <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/10 backdrop-blur-sm"></div> */}

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center">
            {/* <img src={user.profilePicture} className='h-16 w-16 rounded-full mr-3' alt="user Profile Picture" /> */}
            <div className="group relative mr-3">
              <div
                className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-85 blur-sm group-hover:opacity-100 transition duration-300"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></div>
              <img
                src={user.profilePicture} 
                alt="Selected avatar"
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-2 border-indigo-500 shadow-lg object-cover relative z-10"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {timeOfDay === 'morning' ?
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> :
                  timeOfDay === 'afternoon' ?
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> :
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                }
                <h2 className="text-lg sm:text-2xl font-bold text-white">Good {timeOfDay}, {user?.fullName?.split(' ')[0] || "User"}!</h2>
              </div>
              <p className="text-gray-300 flex flex-wrap items-center gap-1 sm:gap-2">
                {getBadgeIcon(user?.badge)}
                <span className={`font-medium capitalize text-sm sm:text-base ${user?.badge === 'trendsetter' ? 'text-pink-400' :
                  user?.badge === 'pro' ? 'text-amber-400' :
                    user?.badge === 'rising' ? 'text-indigo-400' :
                      'text-cyan-400'}`}
                >
                  {user?.badge || "newbie"}
                </span>
                {user?.isVerified ? (
                  <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Bell className="w-3 h-3" /> Unverified
                  </span>
                )}
                {user?.isPremium ? (
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AnvilIcon className="w-3 h-3" /> Standard
                  </span>
                )}
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`hidden sm:flex items-center gap-2 bg-gradient-to-r ${getBadgeColor(user?.badge)} px-3 py-1.5 rounded-full text-white text-sm mt-2 sm:mt-0 shadow-lg shadow-indigo-900/20`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden md:inline">{user?.badge === 'newbie' ? 'Make 5 posts to level up!' : user?.badge === 'rising' ? 'Get 50 followers to level up!' : user?.badge === 'pro' ? 'Get 100 likes to level up!' : 'You reached the highest level!'}</span>
            <span className="md:hidden">Level up!</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {analyticsData.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-white/5 rounded-lg p-3 sm:p-4 backdrop-blur-lg border border-white/5 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-xs sm:text-sm">{stat.label}</span>
                <div className="scale-75 sm:scale-100">{stat.icon}</div>
              </div>
              <div className="flex items-end gap-1 sm:gap-2">
                <span className={`text-lg sm:text-2xl font-bold`}>{stat.value.toLocaleString()}</span>
                <TrendingUp className={`w-3 h-3 sm:w-4 sm:h-4 ${stat.textColor} mb-1`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg blur opacity-50 group-hover:opacity-90 transition duration-300"></div>
            <Link href="/upload-image" className="relative bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 flex items-center justify-center gap-2 py-2.5 px-4 sm:px-5 rounded-lg transition-all duration-300 shadow-lg">
              <Upload className="w-4 h-4" />
              <span className="text-sm sm:text-base">Upload New</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href={`/profile/@${user?.username}`} className="bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 py-2.5 px-4 sm:px-5 rounded-lg transition-all duration-300 border border-white/10">
              <User className="w-4 h-4" />
              <span className="text-sm sm:text-base">View Profile</span>
              <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;