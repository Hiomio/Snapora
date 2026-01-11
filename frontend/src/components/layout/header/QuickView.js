"use client";

import { BarChart2, MessageSquare, Heart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data - Would typically come from a context or API call
const userStats = {
  views: 1243,
  viewsChange: "+18%",
  likes: 376,
  likesChange: "+24%",
  followers: 592,
  followersChange: "+3%",
  uploads: 28,
};

const recentActivity = [
  {
    id: 1,
    type: "comment",
    action: "New comment on 'Neon Dreams'",
    time: "2h ago",
  },
  {
    id: 2,
    type: "like",
    action: "15 new likes on your recent uploads",
    time: "5h ago",
  },
  {
    id: 3,
    type: "follow",
    action: "3 new followers",
    time: "1d ago",
  },
];

const QuickView = ({ quickViewOpen, toggleQuickView }) => {
  return (
    <div className="relative">
      <button
        onClick={toggleQuickView}
        className="quick-view-container p-2.5 text-gray-300 hover:text-white rounded-full transition-colors hover:bg-white/5 relative"
      >
        <BarChart2 className="w-5 h-5" />
        <span className="animate-ping absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 opacity-75"></span>
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-500"></span>
      </button>

      {/* Quick View Panel */}
      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 10, x: 20 }}
            transition={{ duration: 0.2 }}
            className="quick-view-container absolute right-0 top-14 w-96 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden z-50"
          >
            <div className="flex border-b border-white/10">
              <button className="flex-1 p-3 text-center text-sm font-medium border-b-2 border-violet-500 text-violet-400">
                Quick Stats
              </button>
              <button className="flex-1 p-3 text-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Activity
              </button>
              <button className="flex-1 p-3 text-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Messages
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center justify-between">
                <span>Your Performance</span>
                <select className="bg-white/5 border border-white/10 rounded-md text-xs p-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>All time</option>
                </select>
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">Profile Views</div>
                    <div
                      className={`text-xs ${
                        userStats.viewsChange.includes("+") ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {userStats.viewsChange}
                    </div>
                  </div>
                  <div className="text-xl font-bold mt-1">{userStats.views.toLocaleString()}</div>
                  <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">Image Likes</div>
                    <div
                      className={`text-xs ${
                        userStats.likesChange.includes("+") ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {userStats.likesChange}
                    </div>
                  </div>
                  <div className="text-xl font-bold mt-1">{userStats.likes.toLocaleString()}</div>
                  <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
              <div className="space-y-2 mb-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-2 rounded-lg hover:bg-white/5">
                    <div className="p-1.5 rounded-full bg-white/5 mr-3">
                      {activity.type === "comment" && <MessageSquare className="w-4 h-4 text-emerald-400" />}
                      {activity.type === "like" && <Heart className="w-4 h-4 text-rose-400" />}
                      {activity.type === "follow" && <User className="w-4 h-4 text-sky-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <button className="w-full rounded-lg p-2 text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors">
                  View Full Analytics
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickView; 