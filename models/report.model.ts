export interface Dashboard {
  totalsale: number;
  totalorder: number;
  totaluser: number;
  totalcancelled: number;
}

export interface SaleReport {
  order_id: number;
  username: string;
  firstname: string;
  lastname: string;
  total_amount: number;
  total_price: number;
  products: Product[];
  created_at: number;
}

interface Product {
  product_name: string;
  price: number;
  total_product_amount: number;
}


export interface ParamsReport {
  page: number;
  size: number;
  month: string;
  year: number;
}

export interface DashBoardCategory {
  category: string;
  total_category_sales: number;
}

export interface ParamsCategory {
  month: string;
}

//////////////////////////////////////////////////////

export interface LogsAdmin {
  id: number;
  Admin: Admin;
  action: string;
  description: string;
  created_at: number;
}

export interface Admin {
  id: number;
  name: string;
}

export interface ParamsLogs {
  page: number;
  size: number;
  search: string;
  start: number | null; // รองรับ null;
  end: number | null; // รองรับ null;
}

//////////////////////////////////////////////////////

export interface Banner {
  id: number;
  type: string;
  banner: string;
  created_at: number;
}

export interface AddBanner {
  banner: string;
}

export interface ParamsBanner {
  page: number;
  size: number;
}
