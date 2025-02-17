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
  tracking_number: string;
}

export interface StatusOrder {
  id: number;
  name: string;
  status: string;
}

export interface StatusRefund {
  id: number;
  status: string;
}

export interface UpdateStatusOrder {
  id: number;
  status: string;
  tracking_number: string;
}

export interface OrderRes {
  id: number;
  User: User;
  products: Product[];
  Payment: Payment;
  SystemBank: SystemBank;
  Shipment: Shipment;
  total_amount: number;
  total_price: number;
  tracking_number: string;
  status: string;
  created_at: number;
  updated_at: number;
 
}

export interface Product {
  product_id: number;
  product_name: string;
  price: number;
  total_product_amount: number;
  image: string;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
}

export interface Payment {
  id: number;
  price: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  status: string;
  date:string;
}

export interface SystemBank {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  description: string;
  image: string;
}

export interface Shipment {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  zip_code: string;
  sub_district: string;
  district: string;
  province: string;
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
  status: string;
  start: number | null; // รองรับ null;
  end: number | null; // รองรับ null;
}
