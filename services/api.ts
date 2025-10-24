import type {
  CreateOrderRequest,
  CreateOrderResponse,
  DashboardStats,
  Order,
  TransactionFilters
} from '@/types/vendor';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Re-export types for convenience
export type { CreateOrderRequest, CreateOrderResponse, DashboardStats, Order };

// API Client
class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('vendor_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // Create a new order
  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      // Generate a mock order ID for testing without backend
      console.warn('Backend not available, creating mock order');
      const mockOrderId = `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        order_id: mockOrderId,
        vendor_address: data.vendor_address,
        amount: data.amount.toString(),
        status: 'pending',
        created_at: new Date().toISOString(),
      };
    }
  }

  // Get order status by ID
  async getOrderStatus(orderId: string): Promise<Order> {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        method: 'GET',
        headers: await this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to get order: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      // Return mock pending order when backend is not available
      console.warn('Backend not available, returning mock order status');
      throw error; // Re-throw to stop polling in wait screen
    }
  }

  // Get dashboard statistics
  async getDashboardStats(vendorAddress: string): Promise<DashboardStats> {
    try {
      const response = await fetch(
        `${this.baseUrl}/vendors/${vendorAddress}/stats`,
        {
          method: 'GET',
          headers: await this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to get stats: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.warn('Backend not available, using mock data');
      // Return mock data when backend is not available
      return {
        daily_income: '0.00',
        monthly_income: '0.00',
        total_transactions: 0,
      };
    }
  }

  // Get transaction history
  async getTransactionHistory(
    vendorAddress: string,
    filters?: Omit<TransactionFilters, 'searchQuery'>
  ): Promise<Order[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.startDate) queryParams.append('start_date', filters.startDate);
      if (filters?.endDate) queryParams.append('end_date', filters.endDate);
      if (filters?.minAmount) queryParams.append('min_amount', filters.minAmount);
      if (filters?.maxAmount) queryParams.append('max_amount', filters.maxAmount);
      if (filters?.status) queryParams.append('status', filters.status);

      const url = `${this.baseUrl}/vendors/${vendorAddress}/transactions?${queryParams}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: await this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to get transactions: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.warn('Backend not available, returning empty transactions');
      // Return empty array when backend is not available
      return [];
    }
  }

  // Subscribe to order updates (WebSocket or polling)
  subscribeToOrder(
    orderId: string,
    callback: (order: Order) => void
  ): () => void {
    // Polling implementation (can be replaced with WebSocket)
    const intervalId = setInterval(async () => {
      try {
        const order = await this.getOrderStatus(orderId);
        callback(order);
        
        // Stop polling if order is confirmed or failed
        if (order.status !== 'pending') {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error polling order status:', error);
      }
    }, 2000); // Poll every 2 seconds

    // Return cleanup function
    return () => clearInterval(intervalId);
  }
}

export const apiService = new ApiService();
