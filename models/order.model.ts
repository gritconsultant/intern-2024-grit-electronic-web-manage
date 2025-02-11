export interface Order {
  id: number;
  user_id: number;
  username: string;
  status: string;
  total_amount: number;
  total_price: number;
  firstname: string;
  lastname: string;
  created_at: number;
  updated_at: number;
  shipment_id: number;
  shipment_firstname: string;
  shipment_lastname: string;
  shipment_address: string;
  shipment_sub_district: string;
  shipment_district: string;
  shipment_province: string;
  shipment_zip_code: string;
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

export interface UpdateStatusOrder {
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
  image: string;
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
  image: string;
  is_active: boolean;
}

export interface BankRes {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  description: string;
  image: string;
  is_active: boolean;
}



//////////////////////////////////////////////

export interface Params {
  page: number;
  size: number;
  search: string;
}
