import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Building2,
  LayoutDashboard,
  Users,
  FolderKanban,
  Calendar,
  ClipboardCheck,
  BarChart3,
  LogOut,
  Menu,
  X,
  Bell,
  Settings,
  Search,
} from "lucide-react";
import { User } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./ui/input";

interface DashboardLayoutProps {
  user: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  children: ReactNode;
}

export default function DashboardLayout({
  user,
  currentView,
  onViewChange,
  onLogout,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "hr", "manager", "employee"],
    },
    {
      id: "employees",
      name: "Employees",
      icon: Users,
      roles: ["admin", "hr", "manager"],
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderKanban,
      roles: ["admin", "manager", "employee"],
    },
    {
      id: "attendance",
      name: "Attendance",
      icon: Calendar,
      roles: ["admin", "hr", "manager", "employee"],
    },
    {
      id: "leave",
      name: "Leave Management",
      icon: ClipboardCheck,
      roles: ["admin", "hr", "manager", "employee"],
    },
    {
      id: "performance",
      name: "Performance",
      icon: BarChart3,
      roles: ["admin", "hr", "manager"],
    },
    {
      id: "reports",
      name: "Reports",
      icon: BarChart3,
      roles: ["admin", "hr", "manager"],
    },
  ];

  const filteredNavigation = navigation.filter(
    (item) => user.role && item.roles.includes(user.role)
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "-10%", left: "-10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "-10%", right: "-10%" }}
        />
      </div>

      {/* Modern Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl relative z-10"
          >
            {/* Logo Section */}
            <motion.div
              className="p-6 border-b border-gray-100"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur-md opacity-50" />
                  <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h2 className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    BizFlow
                  </h2>
                  <p className="text-xs text-gray-500">Enterprise Portal</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
              {filteredNavigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      x: 8,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group overflow-hidden ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {/* Active Background with 3D effect */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover effect */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <motion.div
                      className="relative z-10"
                      animate={
                        isActive
                          ? {
                              rotateY: [0, 360],
                            }
                          : {}
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span className="relative z-10">{item.name}</span>

                    {/* 3D shine effect */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* User Profile in Sidebar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <Avatar className="ring-2 ring-blue-400 ring-offset-2">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Modern Header */}
        <motion.header
          className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg relative z-20"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="relative overflow-hidden group"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {sidebarOpen ? (
                      <X className="w-5 h-5 relative z-10" />
                    ) : (
                      <Menu className="w-5 h-5 relative z-10" />
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-500 text-sm">Welcome back,</p>
                  <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {user.name}
                  </h1>
                </motion.div>
              </div>

              {/* Header Actions */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Search Bar */}
                <motion.div
                  className="relative hidden md:block"
                  whileHover={{ scale: 1.05 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-64 bg-white/50 border-gray-200 focus:border-blue-400 transition-all"
                  />
                </motion.div>

                {/* Notification Bell */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </Button>
                </motion.div>

                {/* Settings */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                </motion.div>

                {/* Logout */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onLogout}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content with Page Transition */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
