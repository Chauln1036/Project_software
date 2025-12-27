import { useState } from "react";
import { User } from "../types";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  MessageSquare,
} from "lucide-react";
import { AdminOverviewPage } from "./admin/AdminOverviewPage";
import { BusinessAccountsPage } from "./admin/BusinessAccountsPage";
import { SubscriptionPlansPage } from "./admin/SubscriptionPlansPage";
import { SystemSettingsPage } from "./admin/SystemSettingsPage";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = "overview" | "accounts" | "subscriptions" | "settings";

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "overview" as AdminView, label: "Tổng quan", icon: LayoutDashboard },
    { id: "accounts" as AdminView, label: "Tài khoản DN", icon: Users },
    {
      id: "subscriptions" as AdminView,
      label: "Gói dịch vụ",
      icon: DollarSign,
    },
    { id: "settings" as AdminView, label: "Cấu hình", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-purple-700 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-purple-700 rounded-lg text-white"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <div>
                <h1 className="text-white">BizFlow Admin</h1>
                <p className="text-sm text-purple-100">Quản trị hệ thống</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-white">{user.name}</p>
                  <p className="text-xs text-purple-200">Administrator</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-purple-700 rounded-lg text-white"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white border-r border-gray-200 z-30
          transform transition-transform lg:transform-none
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="lg:hidden pt-4 border-t border-gray-200 mt-4">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)]">
          {currentView === "overview" && <AdminOverviewPage />}
          {currentView === "accounts" && <BusinessAccountsPage />}
          {currentView === "subscriptions" && <SubscriptionPlansPage />}
          {currentView === "settings" && <SystemSettingsPage />}
        </main>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
