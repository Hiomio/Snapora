"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

// Mock data - Would typically come from a context or API call
const recentMessages = [
  {
    id: 1,
    user: { name: "Noah Parker", avatar: "/images/upload/user4.png", status: "online" },
    lastMessage: "That's a brilliant concept! I'd love to collaborate...",
    time: "3:45 PM",
    unread: 2,
  },
  {
    id: 2,
    user: { name: "Maya Johnson", avatar: "/images/upload/user5.png", status: "offline" },
    lastMessage: "Thanks for the feedback on my latest design.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    user: { name: "Design Community", avatar: "/images/upload/group1.png", status: "online" },
    lastMessage: "Liam: Has anyone tried the new filter pack?",
    time: "2 days ago",
    unread: 12,
  },
];

const MessagesMenu = ({ activeDropdown, toggleDropdown }) => {
  return (
    <div className="relative dropdown-container">
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown("messagesMenu");
        }}
        className={`relative p-2.5 text-gray-300 hover:text-white rounded-full transition-colors ${
          activeDropdown === "messagesMenu" ? "bg-white/10" : "hover:bg-white/5"
        }`}
      >
        <MessageCircle className="w-5 h-5" />
        {/* Message badge */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full"></span>
      </button>

      {/* Messages Dropdown */}
      <AnimatePresence>
        {activeDropdown === "messagesMenu" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Messages</h3>
                <Link href="/messages" className="text-xs text-violet-400 hover:text-violet-300">
                  View all
                </Link>
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="relative">
                        <Image
                          src={message.user.avatar}
                          alt={message.user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${
                            message.user.status === "online" ? "bg-emerald-500" : "bg-gray-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{message.user.name}</p>
                        <p className="text-xs text-gray-400">{message.time}</p>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-1 mt-0.5">{message.lastMessage}</p>
                    </div>
                    {message.unread > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {message.unread}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3">
              <button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg py-2 text-sm font-medium transition-colors">
                New Message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesMenu; 