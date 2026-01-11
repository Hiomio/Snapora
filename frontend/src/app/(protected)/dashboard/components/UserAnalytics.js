"use client"
import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Download,
  Share2,
  Calendar,
  Clock,
  Target,
  Award,
  Zap,
  Users,
  Heart,
  MessageSquare,
  Bookmark,
  Star,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApi } from '@/hooks/useApi';

const UserAnalytics = ({ user }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const api = useApi();

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch user analytics data
      const response = await api.get(`/api/users/analytics?timeRange=${timeRange}`);
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Use fallback data if API fails
      setAnalytics(getFallbackAnalytics());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackAnalytics = () => ({
    views: { total: user?.viewsCount || 0, change: 12.5 },
    downloads: { total: user?.downloadsCount || 0, change: 8.3 },
    shares: { total: user?.sharesCount || 0, change: 15.7 },
    engagement: { total: user?.engagementRate || 0, change: 5.2 },
    topImages: [],
    recentActivity: [],
    achievements: []
  });

  const timeRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const analyticsCards = [
    {
      title: "Total Views",
      value: analytics?.views?.total || 0,
      change: analytics?.views?.change || 0,
      icon: <Eye className="w-5 h-5 text-blue-400" />,
      color: "from-blue-500/20 to-blue-700/20",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Downloads",
      value: analytics?.downloads?.total || 0,
      change: analytics?.downloads?.change || 0,
      icon: <Download className="w-5 h-5 text-green-400" />,
      color: "from-green-500/20 to-green-700/20",
      textColor: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Shares",
      value: analytics?.shares?.total || 0,
      change: analytics?.shares?.change || 0,
      icon: <Share2 className="w-5 h-5 text-purple-400" />,
      color: "from-purple-500/20 to-purple-700/20",
      textColor: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Engagement Rate",
      value: `${analytics?.engagement?.total || 0}%`,
      change: analytics?.engagement?.change || 0,
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
      color: "from-amber-500/20 to-amber-700/20",
      textColor: "text-amber-400",
      bgColor: "bg-amber-500/10"
    }
  ];

  const performanceMetrics = [
    {
      label: "Avg. Time on Page",
      value: "2m 34s",
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
      trend: "+12%"
    },
    {
      label: "Bounce Rate",
      value: "23.4%",
      icon: <Target className="w-4 h-4 text-red-400" />,
      trend: "-5%"
    },
    {
      label: "Return Visitors",
      value: "67%",
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      trend: "+8%"
    },
    {
      label: "Social Reach",
      value: "12.5K",
      icon: <Share2 className="w-4 h-4 text-violet-400" />,
      trend: "+15%"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Performance Analytics</h2>
            <p className="text-gray-400 text-sm">Track your content performance and growth</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-zinc-800/50 rounded-lg p-1 border border-white/10">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                timeRange === range.value
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * idx }}
            className={`bg-gradient-to-br ${card.color} rounded-xl p-4 border border-white/10 backdrop-blur-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 text-sm font-medium">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold ${card.textColor}`}>
                {card.value.toLocaleString()}
              </span>
              <div className={`flex items-center gap-1 text-sm ${
                card.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-3 h-3 ${card.change < 0 ? 'rotate-180' : ''}`} />
                <span>{Math.abs(card.change)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="bg-zinc-900/80 backdrop-blur-lg border border-violet-500/20 rounded-xl p-6 shadow-lg shadow-violet-500/5">
        <h3 className="text-lg font-semibold text-violet-300 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * idx }}
              className="bg-zinc-800/50 rounded-lg p-3 border border-white/5"
            >
              <div className="flex items-center gap-2 mb-2">
                {metric.icon}
                <span className="text-gray-300 text-sm">{metric.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">{metric.value}</span>
                <span className={`text-xs font-medium ${
                  metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Images */}
        <div className="bg-zinc-900/80 backdrop-blur-lg border border-violet-500/20 rounded-xl p-6 shadow-lg shadow-violet-500/5">
          <h3 className="text-lg font-semibold text-violet-300 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Top Performing Images
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
                className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg border border-white/5 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-violet-400 font-bold">#{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {idx === 0 ? "Mountain Landscape" : idx === 1 ? "Urban Photography" : "Nature Close-up"}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {Math.floor(Math.random() * 1000) + 500}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {Math.floor(Math.random() * 100) + 20}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-400 text-sm font-medium">+{Math.floor(Math.random() * 20) + 10}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-zinc-900/80 backdrop-blur-lg border border-violet-500/20 rounded-xl p-6 shadow-lg shadow-violet-500/5">
          <h3 className="text-lg font-semibold text-violet-300 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {[
              { title: "First 100 Views", icon: <Eye className="w-4 h-4" />, color: "text-blue-400" },
              { title: "10 Images Uploaded", icon: <Zap className="w-4 h-4" />, color: "text-amber-400" },
              { title: "50 Followers", icon: <Users className="w-4 h-4" />, color: "text-emerald-400" },
              { title: "Top Commenter", icon: <MessageSquare className="w-4 h-4" />, color: "text-purple-400" }
            ].map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
                className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg border border-white/5"
              >
                <div className={`p-2 rounded-lg bg-zinc-700/50 ${achievement.color}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{achievement.title}</p>
                  <p className="text-gray-400 text-xs">Unlocked 2 days ago</p>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
        </div>
      )}
    </motion.div>
  );
};

export default UserAnalytics;
