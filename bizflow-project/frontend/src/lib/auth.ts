import { apiService, User } from "./api";

export const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await apiService.login({ username, password });
    const user = response.user;
    const token = response.token;

    // Store user data and JWT token in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", token);

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const register = async (
  username: string,
  password: string,
  name: string,
  role: string,
  business_id?: number
): Promise<boolean> => {
  try {
    await apiService.register({
      username,
      password,
      name,
      role,
      business_id,
    });
    return true;
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiService.logout();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

export const hasPermission = (
  userRole: string,
  requiredRoles: string[]
): boolean => {
  return requiredRoles.includes(userRole);
};
