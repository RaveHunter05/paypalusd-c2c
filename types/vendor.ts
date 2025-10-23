export type OrderStatus = 'pending' | 'confirmed' | 'failed';

export interface Order {
  order_id: string;
  vendor_address: string;
  amount: string;
  status: OrderStatus;
  created_at: string;
  confirmed_at?: string;
  tx_hash?: string;
  buyer_name?: string;
  buyer_address?: string;
}

export interface DashboardStats {
  daily_income: string;
  monthly_income: string;
  total_transactions: number;
}

export interface CreateOrderRequest {
  vendor_address: string;
  amount: number;
}

export interface CreateOrderResponse extends Order {}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  minAmount?: string;
  maxAmount?: string;
  status?: OrderStatus | 'all';
  searchQuery?: string;
}

export interface PaymentSuccessParams {
  orderId: string;
  amount: string;
  txHash: string;
}

export interface WaitPaymentParams {
  orderId: string;
  amount: string;
}

export interface QRCodePayload {
  order_id: string;
  vendor_address: string;
  amount: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export type VendorRoute =
  | '/vendor/dashboard'
  | '/vendor/generate-order'
  | '/vendor/wait-payment'
  | '/vendor/payment-success'
  | '/vendor/history';
