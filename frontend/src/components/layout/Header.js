"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Wand2,
  Users,
  BarChart3,
  Zap,
  LogIn,
  Compass,
  Command,
  Settings,
  User,
  Moon,
  Sun,
  Globe,
  Mic,
  Camera,
  Palette,
  Layers,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const router = useRouter();

  const navigateTo = (href) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setCommandPaletteOpen(false);
    setActiveDropdown(null);
    setMobileActiveDropdown(null);
    setUserMenuOpen(false);
    router.push(href);
  }

  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Handle scroll effect with more sophisticated detection
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const isScrolled = window.scrollY > 20;
        setScrolled(isScrolled);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setSearchOpen(false);
        setActiveDropdown(null);
        setUserMenuOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const navigationItems = [
    {
      name: "Create",
      href: "#create",
      hasDropdown: true,
      badge: "New",
      dropdownItems: [
        {
          name: "AI Image Generator",
          description: "Create stunning visuals with advanced AI",
          href: "/create/ai-image",
          icon: <Sparkles className="w-5 h-5 text-violet-400" />,
          badge: "Popular",
          shortcut: "⌘N"
        },
        {
          name: "Style Transfer",
          description: "Transform photos with artistic styles",
          href: "/create/style-transfer",
          icon: <Palette className="w-5 h-5 text-pink-400" />,
          shortcut: "⌘S"
        },
        {
          name: "3D Models",
          description: "Generate and manipulate 3D objects",
          href: "/create/3d-models",
          icon: <Layers className="w-5 h-5 text-emerald-400" />,
          badge: "Beta"
        },
        {
          name: "Video Magic",
          description: "AI-powered video creation tools",
          href: "/create/video",
          icon: <Camera className="w-5 h-5 text-cyan-400" />,
          shortcut: "⌘V"
        },
      ],
    },
    {
      name: "Explore",
      href: "/explore",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Trending Now",
          description: "See what's hot in the community",
          href: "/explore/trending",
          icon: <Star className="w-5 h-5 text-yellow-400" />,
        },
        {
          name: "Gallery",
          description: "Browse curated collections",
          href: "/explore/gallery",
          icon: <Compass className="w-5 h-5 text-blue-400" />,
        },
        {
          name: "Artists",
          description: "Discover talented creators",
          href: "/explore/artists",
          icon: <Users className="w-5 h-5 text-green-400" />,
        },
      ],
    },
    {
      name: "Tools",
      href: "/tools",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Creative Suite",
          description: "Professional editing with precision controls",
          href: "/tools/creative-suite",
          icon: <Wand2 className="w-5 h-5 text-emerald-400" />,
          shortcut: "⌘T"
        },
        {
          name: "Analytics",
          description: "Track engagement and optimize content",
          href: "/tools/analytics",
          icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
        },
        {
          name: "Voice Commands",
          description: "Control with natural language",
          href: "/tools/voice",
          icon: <Mic className="w-5 h-5 text-purple-400" />,
          badge: "New"
        },
      ],
    },
    {
      name: "Pricing",
      href: "/pricing",
      hasDropdown: false,
    },
    {
      name: "Community",
      href: "/community",
      hasDropdown: false,
    },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileDropdown = (index) => {
    setMobileActiveDropdown(mobileActiveDropdown === index ? null : index);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMobileActiveDropdown(null);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-zinc-900/80 backdrop-blur-2xl border-b border-white/5 py-2 shadow-2xl shadow-black/20"
          : "bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 py-4 border-b border-transparent"
          }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-fuchsia-500/5 animate-pulse" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced animation */}
            <Link href={"/"}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center cursor-pointer"
              >
                <div className="relative flex items-center space-x-3">
                  <motion.div
                    className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm border border-white/10 shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(139, 92, 246, 0.3)",
                      borderColor: "rgba(255, 255, 255, 0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                      Snapora
                    </span>
                    <span className="text-xs text-violet-400 font-medium">
                      AI Creative Studio
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
            {/* Desktop Navigation with enhanced dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.hasDropdown) toggleDropdown(index);
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 flex items-center relative overflow-hidden ${activeDropdown === index
                      ? "text-white bg-white/15 shadow-lg shadow-violet-500/10 border border-white/10"
                      : "text-gray-300 hover:text-white hover:bg:white/10"
                      }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="relative z-10">{item.name}</span>
                    {item.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`ml-2 w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </motion.button>

                  {/* Enhanced Dropdown */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 0.8
                          }}
                          className="absolute left-0 mt-2 w-80 rounded-2xl bg-zinc-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden"
                        >
                          <div className="p-2">
                            {item.dropdownItems.map((dropdownItem, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="group"
                              >
                                <div className="flex items-start p-4 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer relative overflow-hidden"
                                  onClick={() => navigateTo('/login')}
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100"
                                    transition={{ duration: 0.2 }}
                                  />

                                  <motion.div
                                    className="p-2.5 rounded-xl bg:white/5 group-hover:bg:white/10 transition-colors duration-200"
                                    whileHover={{ rotate: 5 }}
                                  >
                                    {dropdownItem.icon}
                                  </motion.div>

                                  <div className="ml-4 flex-1 relative z-10">
                                    <div className="flex items-center justify-between">
                                      <p className="text-white font-semibold group-hover:text-violet-200 transition-colors">
                                        {dropdownItem.name}
                                      </p>
                                      <div className="flex items-center space-x-2">
                                        {dropdownItem.badge && (
                                          <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full">
                                            {dropdownItem.badge}
                                          </span>
                                        )}
                                        {dropdownItem.shortcut && (
                                          <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded">
                                            {dropdownItem.shortcut}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mt-1">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Enhanced Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Command Palette Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200"
              >
                <Command className="w-4 h-4" />
                <span>Quick actions</span>
                <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono">⌘K</span>
              </motion.button>

              {/* Enhanced Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-300 hover:text:white hover:bg:white/10 rounded-xl transition-all duration-200 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
                <Search className="w-5 h-5 relative z-10" />
              </motion.button>

              {/* Enhanced Notifications - route to login */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 text-gray-300 hover:text:white hover:bg:white/10 rounded-xl transition-all duration-200 group overflow-hidden"
                onClick={() => navigateTo('/login')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.2 }}
                />
                <Bell className="w-5 h-5 relative z-10" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu - route to login */}
              <div className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo('/login')}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg:white/10 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </motion.button>
              </div>

              {/* Authentication Buttons */}
              <div className="hidden lg:flex items-center space-x-3 ml-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 text-sm font-medium text-white hover:bg:white/10 rounded-xl transition-all duration-200 border border:white/10"
                  onClick={() => navigateTo("/login")}
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl transition-all duration-300 flex items-center shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                  onClick={() => navigateTo("/register")}
                >
                  <span>Get Started</span>
                  <Sparkles className="w-4 h-4 ml-2" />
                </motion.button>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 text-gray-300 hover:text:white rounded-xl transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <motion.div
                  animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center p-4 border-b border-white/10">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search for images, artists, styles..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded font-mono">ESC</span>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">Try searching for &quot;digital art&quot;, &quot;3D renders&quot;, or &quot;AI portraits&quot;</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center p-4 border-b border-white/10">
                  <Command className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                </div>
                <div className="p-2 max-h-96 overflow-y-auto">
                  {[
                    { name: "Create new image", shortcut: "⌘N", icon: Sparkles },
                    { name: "Open gallery", shortcut: "⌘G", icon: Compass },
                    { name: "Start voice command", shortcut: "⌘M", icon: Mic },
                    { name: "Toggle theme", shortcut: "⌘T", icon: darkMode ? Sun : Moon },
                    { name: "View analytics", shortcut: "⌘A", icon: BarChart3 },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 cursor-pointer text-gray-300 hover:text-white transition-colors"
                      onClick={() => navigateTo('/login')}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono bg-white/10 px-2 py-1 rounded">
                        {item.shortcut}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-zinc-950/98 backdrop-blur-2xl border-l border-white/10 lg:hidden overflow-y-auto"
          >
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">Pixora</h2>
                    <p className="text-violet-400 text-sm">AI Creative Studio</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2 mb-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileDropdown(index)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${mobileActiveDropdown === index ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileActiveDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 ml-4 space-y-2"
                            >
                              {item.dropdownItems.map((dropdownItem, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                  onClick={() => navigateTo('/login')}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="p-1.5 rounded-lg bg-white/10">
                                      {dropdownItem.icon}
                                    </div>
                                    <div>
                                      <p className="font-medium">{dropdownItem.name}</p>
                                      <p className="text-xs text-gray-500">{dropdownItem.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end space-y-1">
                                    {dropdownItem.badge && (
                                      <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full">
                                        {dropdownItem.badge}
                                      </span>
                                    )}
                                    {dropdownItem.shortcut && (
                                      <span className="text-xs text-gray-500 font-mono">
                                        {dropdownItem.shortcut}
                                      </span>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <button className="w-full text-left p-4 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        onClick={() => navigateTo('/login')}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions Grid */}
              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Create AI Art", icon: Sparkles, color: "from-violet-500 to-purple-500" },
                    { name: "Browse Gallery", icon: Compass, color: "from-blue-500 to-cyan-500" },
                    { name: "Voice Command", icon: Mic, color: "from-emerald-500 to-green-500" },
                    { name: "3D Models", icon: Layers, color: "from-pink-500 to-rose-500" },
                  ].map((action, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} cursor-pointer shadow-lg`}
                      onClick={() => navigateTo('/login')}
                    >
                      <action.icon className="w-6 h-6 text-white mb-2" />
                      <p className="text-white font-medium text-sm">{action.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-white/10 pt-6">

                {/* Mobile Auth Buttons */}
                <div className="space-y-3">

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-xl text-white bg-white/10 hover:bg-white/20 text:white font-medium flex items-center justify-center transition-colors"
                    onClick={() => navigateTo("/login")}
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold flex items-center justify-center transition-colors shadow-lg"
                    onClick={() => navigateTo("/register")}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Register
                  </motion.button>
                </div>

                {/* Mobile Settings */}
                <div className="mt-6 space-y-2">
                  {[
                    { name: "Settings", icon: Settings },
                    { name: "Help & Support", icon: Users },
                    { name: "Language", icon: Globe },
                  ].map((item, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      onClick={() => navigateTo('/login')}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Global styles for enhanced animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .8; }
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .bg-pos-0 {
          background-position: 0% 50%;
        }
        
        .bg-pos-100 {
          background-position: 100% 50%;
        }
        
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Header;