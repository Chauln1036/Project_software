import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Users,
  FolderKanban,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { User } from "../types";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import { useState } from "react";

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const employees: any[] = []; // TODO: Replace with API call
  const projects: any[] = []; // TODO: Replace with API call
  const leaveRequests: any[] = []; // TODO: Replace with API call
  const tasks: any[] = []; // TODO: Replace with API call

  const activeEmployees = employees.filter(
    (e: any) => e.status === "active"
  ).length;
  const activeProjects = projects.filter(
    (p: any) => p.status === "in-progress"
  ).length;
  const pendingLeaves = leaveRequests.filter(
    (l: any) => l.status === "pending"
  ).length;
  const myTasks = tasks.filter((t: any) => t.assignedTo === user.id);
  const inProgressTasks = myTasks.filter(
    (t: any) => t.status === "in-progress"
  ).length;

  const recentProjects = projects.slice(0, 3);
  const myRecentTasks = myTasks.slice(0, 4);

  const stats = [
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      change: "+12%",
      show: ["admin", "hr", "manager"],
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: FolderKanban,
      gradient: "from-green-500 to-emerald-500",
      change: "+8%",
      show: ["admin", "hr", "manager", "employee"],
    },
    {
      title: "Pending Leaves",
      value: pendingLeaves,
      icon: Calendar,
      gradient: "from-orange-500 to-amber-500",
      change: "-3%",
      show: ["admin", "hr", "manager"],
    },
    {
      title: "My Tasks",
      value: inProgressTasks,
      icon: CheckCircle2,
      gradient: "from-purple-500 to-pink-500",
      change: "+5%",
      show: ["manager", "employee"],
    },
  ];

  const filteredStats = stats.filter(
    (stat) => user.role && stat.show.includes(user.role)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "planning":
        return "bg-yellow-500";
      case "on-hold":
        return "bg-red-500";
      case "todo":
        return "bg-gray-500";
      case "review":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with 3D effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
        </div>
        <p className="text-gray-600">
          Your workspace summary and quick insights
        </p>
      </motion.div>

      {/* Stats Grid with 3D Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                rotateY: 5,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 group">
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />

                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <motion.p
                        className="text-4xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <ArrowUp className="w-3 h-3" />
                        <span>{stat.change}</span>
                      </div>
                    </div>

                    <motion.div
                      className={`relative bg-gradient-to-r ${stat.gradient} p-4 rounded-2xl shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-white" />

                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects with 3D hover */}
        {user.role &&
          ["admin", "hr", "manager", "employee"].includes(user.role) && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Animated background orb */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="w-5 h-5 text-blue-600" />
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {recentProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        className="border-b last:border-0 pb-4 last:pb-0 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.5 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="group-hover/item:text-blue-600 transition-colors">
                              {project.name}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {project.description}
                            </p>
                          </div>
                          <motion.span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${getStatusColor(
                              project.status
                            )} text-white shadow-lg`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {project.status}
                          </motion.span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.1 + 0.7 }}
                            >
                              {project.progress}%
                            </motion.span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={project.progress}
                              className="h-2"
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent h-2 rounded-full"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

        {/* My Tasks with 3D cards */}
        {user.role && ["manager", "employee"].includes(user.role) && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Animated background orb */}
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                  My Recent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  {myRecentTasks.length > 0 ? (
                    myRecentTasks.map((task, idx) => (
                      <motion.div
                        key={task.id}
                        className="flex items-start gap-3 p-3 border rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all group/task"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.5 }}
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(
                            task.status
                          )}`}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate group-hover/task:text-purple-600 transition-colors">
                              {task.title}
                            </p>
                            <motion.span
                              className={`px-2 py-0.5 rounded text-xs whitespace-nowrap ${getPriorityColor(
                                task.priority
                              )}`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {task.priority}
                            </motion.span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.hoursLogged}/{task.estimatedHours}h
                            </span>
                            <span>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-8">
                      No tasks assigned yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats for HR/Admin */}
        {user.role && ["admin", "hr"].includes(user.role) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30 overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Animated background orb */}
              <motion.div
                className="absolute top-1/2 right-0 w-32 h-32 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
                animate={{ x: [0, 20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Department Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {["Engineering", "HR", "Marketing", "Finance"].map(
                    (dept, idx) => {
                      const deptEmployees = employees.filter(
                        (e: any) => e.department === dept
                      );
                      return (
                        <motion.div
                          key={dept}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white transition-all group/dept"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.6 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <span className="text-gray-600 group-hover/dept:text-green-600 transition-colors">
                            {dept}
                          </span>
                          <div className="flex items-center gap-2">
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.1 + 0.8 }}
                            >
                              {deptEmployees.length} employees
                            </motion.span>
                            <motion.div whileHover={{ y: -2 }}>
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
