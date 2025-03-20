"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@react-email/components";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/app/DarkModeToggle";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center py-4">
        
        {/* Logo */}
        <Link href="/">
          <motion.div 
            className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            AI Message
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-300">
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Welcome, {user?.username || user.email}</span>
              <Link href="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
              <Link href="/user/profile" className="hover:text-blue-500 transition">Profile</Link>
              <Button 
                onClick={() => signOut()} 
                className="px-4 py-2 w-20 h-6 text-center bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/sign-in" className="hover:text-blue-500 transition">Sign In</Link>
              <Link 
                href="/sign-up" 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu & Dark Mode Toggle */}
       
          {/* Dark Mode Toggle (Always Visible) */}
          <DarkModeToggle />
          
          {/* Mobile Menu Button (Only Visible on Small Screens) */}
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden block text-gray-700 dark:text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="md:hidden bg-white dark:bg-gray-900 shadow-md"
          >
            <div className="flex flex-col items-center space-y-4 py-4 text-gray-800 dark:text-gray-300">
              {session ? (
                <>
                  <span className="text-sm font-medium">Welcome, {user?.username || user?.email}</span>
                  <Link href="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
                  <Link href="/user/profile" className="hover:text-blue-500 transition">Profile</Link>
                  <Button 
                    onClick={() => signOut()} 
                    className="px-4 py-2  bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="hover:text-blue-500 transition">Sign In</Link>
                  <Link 
                    href="/sign-up" 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
