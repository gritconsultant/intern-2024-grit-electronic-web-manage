export interface Order {
  order_id: number;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  payment_status: string;
  items: Item[];
}

export interface Item {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface StatusOrder {
  id: number;
  status: string;
}

export interface PaymentStatus {
  id: number;
  status: string;
}

export interface StatusRefund {
  id: number;
  status: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////

export interface Bank {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  description: string;
  image_system_bank: ImageSystemBank;
  is_active: boolean;
  created_at: number;
  updated_at: number;
}

export interface ImageSystemBank {
  id: number;
  ref_id: number;
  type: string;
  description: string;
}

export interface BankUpdate {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  description: string;
  image_system_bank: string;
  is_active: boolean;
}

export interface BankRes {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  description: string;
  image_system_bank: ImageSystemBank;
  is_active: boolean;
}
