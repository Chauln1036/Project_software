// API service for BizFlow frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9999";

export interface User {
  id: number;
  username: string;
  name?: string;
  role?: string;
  business_id?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: string;
  name?: string;
  business_id?: number;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Network error" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request("/api/auth/logout", {
      method: "POST",
    });
  }

  // Products - return mock data
  async getProducts() {
    return {
      data: [
        {
          id: 1,
          name: "Xi măng Portland PC30",
          price: 95000,
          unit: "bao",
          category: "Xi măng",
          stock: 150,
        },
        {
          id: 2,
          name: "Gạch đỏ 220x105x60mm",
          price: 1200,
          unit: "viên",
          category: "Gạch",
          stock: 2000,
        },
      ],
    };
  }

  async createProduct(product: any) {
    return { message: "Product created", id: Date.now() };
  }

  // Orders - return mock data
  async getOrders() {
    return {
      data: [
        {
          id: 1,
          orderNumber: "DH-20241226-001",
          customerName: "Khách hàng A",
          total: 2850000,
          status: "completed",
          createdAt: new Date().toISOString(),
        },
      ],
    };
  }

  async createOrder(order: any) {
    return { message: "Order created", orderId: Date.now() };
  }

  // Customers - return mock data
  async getCustomers() {
    return {
      data: [
        {
          id: 1,
          name: "Công ty TNHH Xây dựng ABC",
          phone: "02812345678",
          totalPurchases: 15000000,
        },
      ],
    };
  }

  async createCustomer(customer: any) {
    return { message: "Customer created", id: Date.now() };
  }

  // Inventory - return mock data
  async getInventory() {
    return {
      data: [
        {
          productId: 1,
          productName: "Xi măng Portland PC30",
          quantity: 150,
          minStock: 20,
        },
      ],
    };
  }

  // Reports - return mock data
  async getReports() {
    return {
      data: {
        totalRevenue: 50000000,
        totalOrders: 25,
        totalProducts: 15,
        totalCustomers: 8,
      },
    };
  }
}

export const apiService = new ApiService();
