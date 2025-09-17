'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Github, Mail, MapPin, Calendar, Download } from 'lucide-react';
import Image from 'next/image';
import { PersonalInfo } from '@/data/personalInfo';

type SidebarProps = PersonalInfo;

export function Sidebar({ 
  name, 
  title, 
  email, 
  location, 
  avatar,
  yearOfBirth,
  socialLinks 
}: SidebarProps) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - parseInt(yearOfBirth);

  return (
    <motion.aside 
      className="sticky top-8 bg-background-secondary border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Avatar with hover effect */}
        <motion.div
          className="relative mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image 
            fetchPriority='high'
            loading='eager'
            priority={true}
            src={avatar} 
            alt={name} 
            width={128}
            height={128}
            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Name and Title */}
        <motion.h1 
          className="text-2xl font-bold text-text-primary mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.h1>
        
        <motion.p 
          className="mb-4 text-lg inline-flex items-center px-3 py-1 rounded-full font-medium bg-primary/10 text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.p>

        {/* Contact Information */}
        <motion.div 
          className="space-y-3 text-sm text-text-muted mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
            <Calendar className="w-4 h-4" />
            <a href={"/about"} className="hover:underline">
              {age} years old
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 hover:text-primary transition-colors">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </motion.div>

        {/* Download CV Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Download CV
          </motion.button>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {socialLinks.facebook && (
            <motion.a 
              href={socialLinks.facebook} 
              className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Facebook className="w-5 h-5" />
            </motion.a>
          )}
          {socialLinks.twitter && (
            <motion.a 
              href={socialLinks.twitter} 
              className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
          )}
          {socialLinks.instagram && (
            <motion.a 
              href={socialLinks.instagram} 
              className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
          )}
          {socialLinks.github && (
            <motion.a 
              href={socialLinks.github} 
              className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
        </motion.div>

        {/* Sidebar Footer */}
        <div className="mt-6 pt-6 border-t border-border/60 text-xs text-text-muted">
          <p className="mb-3">© {currentYear} {name}. All rights reserved.</p>
          
        </div>
      </div>
    </motion.aside>
  );
}
