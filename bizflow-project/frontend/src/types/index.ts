export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  alternativeUnits?: { unit: string; price: number; conversionRate: number }[];
  stock: number;
  image?: string;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalPurchases: number;
  outstandingDebt: number;
  lastPurchase: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod: "cash" | "transfer" | "debt";
  debtAmount?: number;
  status: "draft" | "confirmed" | "completed";
  createdBy: string;
  createdAt: string;
  source: "counter" | "ai" | "phone";
  aiTranscript?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role?: "employee" | "owner";
  active?: boolean;
  createdAt?: string;
  department?: string;
  position?: string;
  joinDate?: string;
  salary?: number;
  status?: "active" | "inactive";
  workHistory?: {
    position: string;
    department: string;
    startDate: string;
    endDate?: string;
  }[];
}

export interface StockTransaction {
  id: string;
  productId: string;
  productName: string;
  type: "import" | "export" | "adjustment";
  quantity: number;
  unit: string;
  notes: string;
  createdBy: string;
  createdAt: string;
}

export interface BusinessAccount {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  subscriptionPlan: "basic" | "pro" | "enterprise" | "trial";
  subscriptionStatus: "active" | "inactive" | "trial";
  registeredAt: string;
  lastActive: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: "monthly" | "yearly";
  features: string[];
  maxEmployees: number;
  maxProducts: number;
}

export type UserRole = "employee" | "owner" | "admin" | "hr" | "manager" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent" | "leave" | "holiday";
  hoursWorked?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  progress: number;
  startDate: string;
  endDate: string;
  managerId: string;
  teamMembers: string[];
  budget: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  hoursLogged: number;
  estimatedHours: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "vacation" | "sick" | "personal" | "maternity" | "other";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedOn: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewPeriod: string;
  reviewDate: string;
  reviewerId: string;
  reviewerName: string;
  kpis: {
    name: string;
    target: number;
    achieved: number;
    rating: number;
  }[];
  overallRating: number;
  feedback: string;
  status: "pending" | "completed";
}
