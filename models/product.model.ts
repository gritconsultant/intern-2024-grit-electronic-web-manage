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
  username: string;
  rating: number;
  description: string;
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

export interface Paginate {
  Page: number;
  Size: number;
  Total: number;
}

export interface ProductCreate {
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  is_active: boolean;
  image_product: string;
}

export interface ProductRes {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  is_active: boolean;
  image_product: string;
}

export interface ProductUpdate {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  is_active: boolean;
  image_product: string;
}

////////////////////////////////////////////////////////////////////////

export interface Category {
  id: number;
  name: string;
  is_active: boolean;
  imageCategory: ImageCategories[];
}

export interface ImageCategories {
  id: number;
  ref_id: number;
  description: string;
}

export interface CategoryRes {
  id: number;
  name: string;
  is_active: boolean;
  imageCategory: string;
}

export interface CategoryCreate {
  name: string;
  is_active: boolean;
  imageCategory: string;
}

export interface CategoryUpdate {
  id: number;
  name: string;
  is_active: boolean;
  imageCategory: string;
}

export interface Status {
  code: number;
  message: string;
}
