"use client";

import { useState } from "react";
import { LoginPage } from "../components/LoginPage";
import { EmployeeDashboard } from "../components/EmployeeDashboard";
import { OwnerDashboard } from "../components/OwnerDashboard";
import { AdminDashboard } from "../components/AdminDashboard";
import { User, UserRole } from "../types";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentUser.role === "admin") {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  if (currentUser.role === "owner") {
    return <OwnerDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <EmployeeDashboard user={currentUser} onLogout={handleLogout} />;
}
