"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Image,
  Heart,
  Award,
  Aperture,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Animation for background elements
    const interval = setInterval(() => {
      const shapes = document.querySelectorAll('.floating-shape');
      shapes.forEach(shape => {
        const newX = Math.random() * 10 - 5;
        const newY = Math.random() * 10 - 5;
        shape.style.transform = `translate(${newX}px, ${newY}px)`;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    let errors = {};
    if (!formData.identifier) {
      errors.identifier = "Email or username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setErrors({ ...errors, [name]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { success, error } = await login(formData);

      if (success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        setErrors({
          general: error || "Invalid credentials. Please try again.",
        });
        toast.error(error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setErrors({ general: "An error occurred. Please try again later." });
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 transition-all duration-300 bg-gray-950">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-shape absolute rounded-full transition-transform duration-3000 ease-in-out bg-indigo-800/10"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-black"
      >
        {/* Left side - Login form */}
        <div className="w-full lg:w-5/12 p-8 lg:p-12 bg-gray-900 flex flex-col justify-center relative">
          <div className="mb-8 flex justify-start">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-600">
              <Camera className="h-7 w-7 text-white" />
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Welcome back
          </h1>

          <p className="mb-8 text-base text-gray-400">
            Log in to your account to share your visual stories and explore stunning photography from creators worldwide.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-950 text-red-400 text-sm flex items-center"
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{errors.general}</span>
              </motion.div>
            )}

            <div className="space-y-1">
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-300">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 rounded-lg text-sm focus:ring-2 focus:ring-offset-1 bg-gray-800 border-gray-700 text-gray-100 focus:ring-purple-600 focus:border-purple-600"
                  placeholder="your.email@example.com or username"
                />
              </div>
              {errors.identifier && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.identifier}
                </motion.p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 rounded-lg text-sm focus:ring-2 focus:ring-offset-1 bg-gray-800 border-gray-700 text-gray-100 focus:ring-purple-600 focus:border-purple-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded focus:ring-purple-600 bg-gray-800 border-gray-700 text-purple-600"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Sign in
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="flex justify-center items-center py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors w-full text-white gap-2 cursor-pointer mt-6"
          >
            <FaGoogle className="size-4" />
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-purple-400 hover:text-purple-300">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right side - Photography showcase */}
        <div className="w-full lg:w-7/12 relative overflow-hidden bg-gray-900">
          <div className="absolute inset-0 z-0">
            {/* Dynamic grid pattern with glowing effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-indigo-900/40"></div>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="w-full max-w-md px-8 py-12 text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-extrabold mb-4">Share Your Vision</h2>
                <p className="text-lg text-gray-300">Capture moments, inspire others, and build your photography portfolio.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: <Image className="h-8 w-8" />,
                    title: "Gallery",
                    description: "Organize your work in beautiful collections"
                  },
                  {
                    icon: <Heart className="h-8 w-8" />,
                    title: "Community",
                    description: "Connect with fellow photographers worldwide"
                  },
                  {
                    icon: <Aperture className="h-8 w-8" />,
                    title: "Analytics",
                    description: "Track engagement and growth metrics"
                  },
                  {
                    icon: <Award className="h-8 w-8" />,
                    title: "Challenges",
                    description: "Join photo contests and win prizes"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                    className="p-5 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <div className="mb-3 text-purple-400">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-center"
              >
                <div className="flex justify-center space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-400">Trusted by 3M+ creators worldwide</p>
              </motion.div>
            </div>
          </div>

          {/* Floating photography elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {typeof window !== 'undefined' && [...Array(8)].map((_, i) => {
              const size = Math.random() * 140 + 80;
              const delay = Math.random() * 5;
              const duration = Math.random() * 20 + 10;
              const opacity = Math.random() * 0.5 + 0.2;

              return (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * window.innerWidth / 2,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                    rotate: Math.random() * 20 - 10
                  }}
                  animate={{
                    x: [
                      Math.random() * window.innerWidth / 2,
                      Math.random() * window.innerWidth / 2 + 50,
                      Math.random() * window.innerWidth / 2 - 50,
                      Math.random() * window.innerWidth / 2
                    ],
                    y: [
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight - 50,
                      Math.random() * window.innerHeight + 50,
                      Math.random() * window.innerHeight
                    ],
                    opacity: opacity,
                    rotate: [Math.random() * 10 - 5, Math.random() * 10, Math.random() * -10, Math.random() * 10 - 5]
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute rounded-lg overflow-hidden shadow-lg"
                  style={{
                    width: size,
                    height: size * 1.25,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-purple-800/30 via-indigo-900/30 to-violet-800/30 flex items-center justify-center">
                      {/* Display a placeholder image icon */}
                      <Image className="w-1/3 h-1/3 text-white/20" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} PixelShare. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="/terms" className="hover:underline hover:text-gray-400">Terms</Link>
          <Link href="/privacy" className="hover:underline hover:text-gray-400">Privacy</Link>
          <Link href="/help" className="hover:underline hover:text-gray-400">Help Center</Link>
        </div>
      </div>
    </div>
  );
}