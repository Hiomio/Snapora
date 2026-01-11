"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  Rocket,
  Award,
  PenTool,
  Repeat,
  TrendingUp,
  ArrowRight,
  Play,
  Star
} from "lucide-react";
import { motion, useInView } from "framer-motion";

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Benefits data
  const benefits = [
    {
      icon: <PenTool className="w-8 h-8 text-violet-400" />,
      title: "10x Publishing Speed",
      description: "Share more photos and keep your gallery active in minutes, not hours.",
      color: "from-violet-500 to-fuchsia-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      title: "Faster Discovery",
      description: "Grow your audience with smart feeds, tags, and curated recommendations.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Award className="w-8 h-8 text-amber-400" />,
      title: "Showcase Quality",
      description: "Present your work beautifully with crisp displays and profile portfolios.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Repeat className="w-8 h-8 text-cyan-400" />,
      title: "Consistent Branding",
      description: "Organize albums, reuse tags, and keep your visual style consistent.",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Pixora made it effortless to publish my photo sets. Engagement went up and managing albums is a breeze.",
      author: "Alexandra Chen",
      role: "Photographer",
      avatar: "/images/upload/user1.png",
      stars: 5
    },
    {
      quote: "My work finally gets seen. The search and tags help the right people find my photos.",
      author: "Marcus Rivera",
      role: "Visual Artist",
      avatar: "/images/upload/user2.png",
      stars: 5
    },
    {
      quote: "I can keep my brand consistent across albums and collaborate easily with clients.",
      author: "Sarah Williams",
      role: "Content Creator",
      avatar: "/images/upload/user3.png",
      stars: 5
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
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-gradient-to-b from-zinc-950 to-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-800/20 via-fuchsia-600/10 to-rose-500/20 blur-3xl"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              top: "40%",
              left: "30%",
            }}
          />
          
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-800/20 via-cyan-600/10 to-emerald-500/20 blur-3xl"
            animate={{
              x: [0, -150, 150, 0],
              y: [0, 100, -100, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              top: "60%",
              left: "60%",
            }}
          />
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        ></div>
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
            <Rocket className="w-3.5 h-3.5 mr-1.5 text-fuchsia-300" />
            <span>Why photographers choose us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Elevate your <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">photo workflow</span></h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Join thousands of creators who showcase their best work, collaborate with peers, and get discovered on our fast image sharing platform.</p>
        </motion.div>

        {/* Benefits cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors duration-300"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.color}`}></div>
              
              <div className="mb-4">
                <div className="p-3 bg-white/10 rounded-lg w-fit mb-2">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">{benefit.description}</p>
              
              <div className={`mt-auto flex items-center text-sm font-medium bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                <span>Learn more</span>
                <ArrowRight className={`w-4 h-4 ml-1 text-${benefit.color.split(' ')[0].replace('from-', '')}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo video showcase */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-900/60 border border-white/10 group">
            <div className="absolute inset-0">
              <Image
                src="/images/bg-img2.jpg"
                alt="Platform demo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-3xl font-bold text-white mb-4">See how creators publish</h3>
              <p className="text-xl text-white/80 max-w-2xl mb-8">Watch how photographers organize albums, add tags, and share galleries with ease.</p>
              
              <motion.button 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-8 h-8 ml-1" fill="white" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">What creators are saying</h3>
            <p className="text-gray-400">Trusted by thousands of professionals and hobbyists alike</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * idx + 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic mb-6">&quot;{testimonial.quote}&quot;</p>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;