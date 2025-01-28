export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string | null; // เผื่อ description อาจว่าง
  image: ProductImage; // เปลี่ยนให้เป็นเอกพจน์
  category: ProductCategory;
  reviews: ProductReview[]; // ใช้ชื่อพหูพจน์เพื่อสื่อว่าเป็น array
  is_active: boolean;
  created_at: number; // หรือ string หากใช้ ISO timestamp
  updated_at: number; // หรือ string หากใช้ ISO timestamp
}

export interface ProductReview {
  id: number;
  rating: number;
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface ProductImage {
  id: number;
  ref_id: number;
  type: string;
  description: string;
}

////////////////////////////////////////////////////////////////////////

export interface Category {
  id: number;
  name: string;
}

export interface Listproduct {
  status: Status;
  data: Datum[];
  paginate: Paginate;
}

export interface Datum {
  id: number;
  name: string;
  price: number;
  detail: string;
  stock: number;
  image: string;
  category: Category;
  created_at: number;
  updated_at: number;
}

export interface Paginate {
  Page: number;
  Size: number;
  Total: number;
}

export interface Status {
  code: number;
  message: string;
}
