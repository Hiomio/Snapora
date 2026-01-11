"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, Grid, Settings, BookmarkIcon, LogOut, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const UserMenu = ({ activeDropdown, toggleDropdown, setActiveDropdown, user, userStatus, setUserStatus, handleLogout }) => {
  const { updateProfile } = useAuth();
  
  // User status options - matching ProfileSection
  const statusOptions = [
    { id: "online", label: "🟢 Online", color: "bg-emerald-500" },
    { id: "away", label: "🌙 Away", color: "bg-amber-500" },
    { id: "busy", label: "⛔ Busy", color: "bg-rose-500" },
    { id: "offline", label: "⚫ Offline", color: "bg-gray-500" },
  ];

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    if (!user || newStatus === userStatus) return;
    
    try {
      const result = await updateProfile(user._id, { userStatus: newStatus });
      
      if (result.success) {
        setUserStatus(newStatus);
        toast.custom((t) => (
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check className="w-4 h-4" />
            <p className="text-sm">Status updated to {statusOptions.find(s => s.id === newStatus)?.label}</p>
          </div>
        ));
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred while updating your status');
      console.error(error);
    }
  };

  return (
    <div className="relative dropdown-container">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown("userMenu");
        }}
        className="flex items-center"
      >
        <div className="relative flex-shrink-0">
          <img
            src={user?.profilePicture || "/images/default-profile.jpg"}
            alt="User"
            className="rounded-full h-9 w-9 border-2 border-white/10"
          />
          <div
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${
              user?.userStatus === "online"
                ? "bg-emerald-500"
                : user?.userStatus === "away"
                ? "bg-amber-500"
                : user?.userStatus === "busy"
                ? "bg-rose-500"
                : "bg-gray-500"
            }`}
          ></div>
        </div>
        <ChevronDown
          className={`ml-1 w-4 h-4 text-gray-400 transition-transform ${
            activeDropdown === "userMenu" ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* User Menu Dropdown */}
      <AnimatePresence>
        {activeDropdown === "userMenu" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 lg:w-64 sm:w-72 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center">
                <Image
                  src={user?.profilePicture || "/images/default-profile.jpg"}
                  alt="User"
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{user?.fullName || "User"}</p>
                  <p className="text-sm text-gray-400">@{user?.username || "username"}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-gray-400 mb-2">Status</div>
                <div className="flex gap-1">
                  {statusOptions.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusUpdate(status.id)}
                      className={`flex-1 p-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        user?.userStatus === status.id 
                          ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" 
                          : "hover:bg-white/5 text-gray-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                        <span className="text-[10px]">{status.label.split(' ')[1]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-1">
              <Link
                href={`/profile/${user?.username || ""}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <User className="w-5 h-5 text-gray-400" />
                <span>View Profile</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <Grid className="w-5 h-5 text-gray-400" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span>Settings</span>
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <BookmarkIcon className="w-5 h-5 text-gray-400" />
                <span>Saved Items</span>
              </Link>
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                onClick={() => {
                  setActiveDropdown(null);
                  handleLogout();
                }}
              >
                <LogOut className="w-5 h-5 text-gray-400" />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu; 