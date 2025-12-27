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
  token: string;
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
  private getAuthHeaders(): { [key: string]: string } {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private getCurrentBusinessId(): number | null {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      return userData.business_id || null;
    }
    return null;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
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

  // Products
  async getProducts() {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const products = await this.request(
      `/api/products/?business_id=${businessId}`
    );
    return { data: products };
  }

  async createProduct(product: any) {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const productData = { ...product, business_id: businessId };
    return this.request("/api/products/", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  // Orders
  async getOrders() {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const orders = await this.request(`/api/orders/?business_id=${businessId}`);
    return { data: orders };
  }

  async createOrder(order: any) {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const orderData = {
      ...order,
      business_id: businessId,
      employee_id: user.id,
    };
    return this.request("/api/orders/", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  // Customers
  async getCustomers() {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const customers = await this.request(
      `/api/customers/?business_id=${businessId}`
    );
    return { data: customers };
  }

  async createCustomer(customer: any) {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const customerData = { ...customer, business_id: businessId };
    return this.request("/api/customers/", {
      method: "POST",
      body: JSON.stringify(customerData),
    });
  }

  // Inventory
  async getInventory() {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const inventory = await this.request(
      `/api/inventory/?business_id=${businessId}`
    );
    return { data: inventory };
  }

  // Reports
  async getReports() {
    const businessId = this.getCurrentBusinessId();
    if (!businessId) {
      throw new Error("No business ID found");
    }
    const reports = await this.request(
      `/api/reports/summary?business_id=${businessId}`
    );
    return { data: reports };
  }
}

export const apiService = new ApiService();
