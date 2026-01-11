"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Wand2, 
  Users, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Palette, 
  Globe, 
  Lightbulb,
  MessagesSquare,
  ArrowRight,
  Check,
  ChevronRight,
  Layers
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Main features data
  const featuresData = [
    {
      id: 1,
      title: "Effortless Uploads",
      description: "Post high-quality photos in seconds with fast uploads, auto-optimizations, and clean galleries for your audience.",
      icon: <Sparkles className="w-6 h-6 text-violet-400" />,
      color: "from-violet-600 to-fuchsia-600",
      image: "/images/upload/img1.webp",
    },
    {
      id: 2,
      title: "Smart Organization",
      description: "Use albums, tags, and collections to keep work tidy. Perfect for portfolios, series, and client sets.",
      icon: <Wand2 className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-600 to-teal-600",
      image: "/images/upload/img2.jpg",
    },
    {
      id: 3,
      title: "Community & Collaboration",
      description: "Follow creators, get feedback, and collaborate. Build relationships and grow with meaningful engagement.",
      icon: <Users className="w-6 h-6 text-amber-400" />,
      color: "from-amber-600 to-orange-600",
      image: "/images/bg-img2.jpg",
    },
    {
      id: 4,
      title: "Insights & Growth",
      description: "Track likes, views, and shares. Understand what performs best and optimize your posting strategy.",
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      color: "from-cyan-600 to-blue-600",
      image: "/images/upload/img5.png",
    }
  ];

  // Secondary features for the grid
  const secondaryFeatures = [
    {
      title: "Brand Consistency",
      description: "Keep your visual identity cohesive across albums and posts.",
      icon: <Palette className="w-6 h-6 text-rose-400" />
    },
    {
      title: "Global Reach",
      description: "Distribute your work worldwide with smart discovery.",
      icon: <Globe className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Inspiration Feed",
      description: "Find ideas with tailored recommendations and trends.",
      icon: <Lightbulb className="w-6 h-6 text-amber-400" />
    },
    {
      title: "Private Sharing",
      description: "Create invite-only collections for clients and teams.",
      icon: <MessagesSquare className="w-6 h-6 text-green-400" />
    },
    {
      title: "Content Protection",
      description: "Protect your images with watermarking and tracking.",
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Multi-Layer Editing",
      description: "Fine-tune details with non-destructive adjustments.",
      icon: <Layers className="w-6 h-6 text-indigo-400" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-black to-zinc-950 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        ></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-violet-900/20 filter blur-[100px]"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-cyan-900/20 filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 backdrop-blur-lg border border-violet-500/20 text-sm font-medium text-fuchsia-200 mb-4">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-fuchsia-300" />
            <span>Powerful features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Everything you need to <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">share & grow</span></h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Our platform helps photographers and creators publish faster, present better, and reach the right audience everywhere.</p>
        </motion.div>

        {/* Main features showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Feature selector */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {featuresData.map((feature, index) => (
              <motion.div 
                key={feature.id}
                variants={itemVariants}
                onClick={() => setActiveFeature(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeFeature === index 
                    ? `bg-gradient-to-r ${feature.color} shadow-lg` 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items:start">
                  <div className={`p-3 rounded-lg ${
                    activeFeature === index 
                      ? 'bg:white/20' 
                      : 'bg-gradient-to-r ' + feature.color
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className={`${
                      activeFeature === index ? 'text-white/90' : 'text-gray-400'
                    }`}>
                      {feature.description}
                    </p>
                    
                    <div className={`mt-4 flex items-center text-sm font-medium ${
                      activeFeature === index ? 'text-white' : 'text-violet-400'
                    }`}>
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature visualization */}
          <motion.div 
            className="relative rounded-xl overflow-hidden bg-zinc-900/60 border border-white/10 aspect-[4/3]"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0">
              <Image
                src={featuresData[activeFeature].image}
                alt={featuresData[activeFeature].title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${featuresData[activeFeature].color} opacity:60 mix-blend-overlay transition-all duration-500`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items:center gap-3 mb-4">
                {featuresData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeature(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === activeFeature
                        ? `bg-${featuresData[idx].color.split(' ')[0].replace('from-', '')} w-8`
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {featuresData[activeFeature].title}
              </h3>
              <button className="mt-4 inline-flex items-center px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium transition-colors duration-300">
                See in action
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Secondary features grid */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-10 text-center">More ways to stand out</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors duration-300"
              >
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonial/CTA band */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50"></div>
          <div className="relative p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to share your best work?</h3>
              <p className="text-gray-200 mb-6 max-w-xl">Join thousands of photographers publishing beautiful images, organizing galleries, and growing their audience.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "Unlimited albums", 
                  "High-res delivery", 
                  "Engagement insights", 
                  "Community access"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center text-white/90 text-sm">
                    <Check className="w-4 h-4 text-emerald-400 mr-1.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-lg bg-white text-zinc-900 font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center shadow-lg shadow-white/10">
                <Sparkles className="w-5 h-5 mr-2 text-violet-600" />
                <span>Start sharing for free</span>
              </button>
              <button className="px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-colors duration-300 flex items-center justify-center">
                <span>View pricing</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;