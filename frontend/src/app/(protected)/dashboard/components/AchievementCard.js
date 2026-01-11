"use client"
import React from 'react';
import { Award, Zap, Star, Trophy, TrendingUp } from 'lucide-react';

const AchievementCard = ({user}) => {
  // Default values if user is not loaded yet
  const badge = user?.badge || "newbie";
  const postsCount = user?.postsCount || 0;
  const followersCount = user?.followersCount || 0;
  const likesCount = user?.likesCount || 0;
  
  // Achievement data based on user's current badge
  const achievementData = {
    newbie: {
      title: "Rising Star",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      nextBadge: "rising",
      nextBadgeTitle: "Rising",
      requirement: "posts",
      current: postsCount,
      target: 5,
      message: "more uploads to unlock"
    },
    rising: {
      title: "Pro Creator",
      icon: <Star className="w-5 h-5 text-amber-400" />,
      nextBadge: "pro",
      nextBadgeTitle: "Pro",
      requirement: "followers",
      current: followersCount,
      target: 50,
      message: "more followers to unlock"
    },
    pro: {
      title: "Trendsetter",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      nextBadge: "trendsetter",
      nextBadgeTitle: "Trendsetter",
      requirement: "likes",
      current: likesCount,
      target: 100,
      message: "more likes to unlock"
    },
    trendsetter: {
      title: "Trendsetter",
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      nextBadge: null,
      nextBadgeTitle: null,
      requirement: null,
      current: 100,
      target: 100,
      message: "You've reached the highest badge!"
    }
  };
  
  const currentAchievement = achievementData[badge];
  
  // Calculate progress percentage
  const progress = currentAchievement.nextBadge 
    ? Math.min(100, Math.round((currentAchievement.current / currentAchievement.target) * 100))
    : 100;
  
  // Calculate remaining to next level
  const remaining = currentAchievement.nextBadge 
    ? Math.max(0, currentAchievement.target - currentAchievement.current)
    : 0;

  return (
    <div className="rounded-xl bg-gradient-to-br from-amber-900/50 to-zinc-900/60 border border-white/10 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold">Achievements</h3>
        <Award className="text-amber-400 w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div className="bg-white/5 rounded-lg p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          <div className="p-1.5 sm:p-2 bg-amber-900/50 rounded-lg">
            <div className="scale-75 sm:scale-100">{currentAchievement.icon}</div>
          </div>
          <div>
            <p className="font-medium text-xs sm:text-sm">{currentAchievement.title}</p>
            {currentAchievement.nextBadge ? (
              <p className="text-xs text-gray-400">{remaining} {currentAchievement.message}</p>
            ) : (
              <p className="text-xs text-gray-400">{currentAchievement.message}</p>
            )}
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-1.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{currentAchievement.current}/{currentAchievement.target}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard; 