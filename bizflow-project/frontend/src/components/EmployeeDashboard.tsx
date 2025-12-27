import { useState } from "react";
import { User } from "../types";
import {
  Bell,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { CreateOrderPage } from "./employee/CreateOrderPage";
import { DraftOrdersPage } from "./employee/DraftOrdersPage";
import { NotificationBadge } from "./common/NotificationBadge";
import { mockOrders } from "../data/mockData";

interface EmployeeDashboardProps {
  user: User;
  onLogout: () => void;
}

type EmployeeView = "orders" | "draft-orders";

export function EmployeeDashboard({ user, onLogout }: EmployeeDashboardProps) {
  const [currentView, setCurrentView] = useState<EmployeeView>("orders");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const draftOrdersCount = mockOrders.filter(
    (o) => o.status === "draft"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <div>
                <h1 className="text-indigo-600">BizFlow</h1>
                <p className="text-sm text-gray-600">{user.businessName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {draftOrdersCount > 0 && (
                  <NotificationBadge count={draftOrdersCount} />
                )}
              </button>
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Nhân viên</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
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
            <button
              onClick={() => {
                setCurrentView("orders");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "orders"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Tạo đơn hàng</span>
            </button>
            <button
              onClick={() => {
                setCurrentView("draft-orders");
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                currentView === "draft-orders"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Đơn hàng AI</span>
              {draftOrdersCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {draftOrdersCount}
                </span>
              )}
            </button>
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
          {currentView === "orders" && <CreateOrderPage />}
          {currentView === "draft-orders" && <DraftOrdersPage />}
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
