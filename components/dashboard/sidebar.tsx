"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  BarChart2, 
  Menu as MenuIcon, 
  Users, 
  Settings,
  LogOut,
  Sun,
  Moon,
  Table
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface SidebarProps {
  activeView: 'tables' | 'analytics' | 'menu' | 'employees';
  onViewChange: (view: 'tables' | 'analytics' | 'menu' | 'employees') => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Always expanded
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const menuItems = [
    { id: 'tables', label: 'Tables', icon: Table },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    router.push('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast({
      title: `${theme === 'dark' ? 'Light' : 'Dark'} mode activated`,
      description: `Switched to ${theme === 'dark' ? 'light' : 'dark'} mode`,
    });
  };

  return (
    <motion.div 
      initial={{ width: '4rem' }}
      animate={{ width: isExpanded ? '16rem' : '4rem' }}
      className="bg-white shadow-lg h-screen relative"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)} // Keep it expanded
    >
      <div className="p-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          className="text-xl font-bold text-gray-800 overflow-hidden whitespace-nowrap"
        >
          Dashboard
        </motion.h2>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onViewChange(item.id as any); // Call onViewChange for state management
            }}
            className={cn(
              "w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors",
              activeView === item.id && "bg-orange-50 text-orange-600"
            )}
          >
            <item.icon className="w-5 h-5 min-w-[1.25rem]" />
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-3 overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </nav>

      <div className="space-y-2 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.span>
          )}
        </Button>

        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="absolute bottom-4 w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 min-w-[1.25rem]" />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 overflow-hidden whitespace-nowrap"
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}