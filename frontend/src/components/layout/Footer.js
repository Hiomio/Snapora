"use client";

import Image from "next/image";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Github,
  ChevronRight,
  Heart,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const FooterSection = () => {
  // Footer links data
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Showcase", href: "#" },
        { label: "AI Models", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Creators", href: "#" },
        { label: "Forums", href: "#" },
        { label: "Events", href: "#" },
        { label: "Challenges", href: "#" },
        { label: "Education", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Plugins", href: "#" },
        { label: "API", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative bg-zinc-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "-1px -1px",
          }}
        ></div>

        {/* Background gradient orbs */}
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-900/10 filter blur-[100px]"></div>
        <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-fuchsia-900/10 filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main footer area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 py-10 border-t border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 rounded-md shadow-lg shadow-gray-500/20 bg-white/10 backdrop-blur-sm">
                  <Image
                    src="/images/logo.png"
                    alt="Pixora Logo"
                    className="w-10 h-10"
                    height={20}
                    width={20}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">Snapora</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering creativity through AI. Our platform helps creators
                bring their imagination to life with cutting-edge technology.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Facebook className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Youtube className="w-4 h-4 text-white" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Github className="w-4 h-4 text-white" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 * idx }}
            >
              <h4 className="text-white font-medium mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ChevronRight className="w-3 h-3 mr-1 hidden group-hover:block transition-all" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="mt-16 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Snapora. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              Accessibility
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Globe className="w-3.5 h-3.5" />
            <span>English (US)</span>
          </div>
        </div>

        {/* Final touch - made with love */}
        <div className="py-4 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 mx-1 text-rose-500 fill-rose-500" />
            <span>by the Kaluri Himabindhu</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
