export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
  Review: Review[];
  is_active: boolean;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export interface Paginate {
  Page: number;
  Size: number;
  Total: number;
}

export interface Image {
  id: number;
  ref_id: number;
  type: string;
  description: string;
}

export interface Review {
  id: number;
  username: string;
  rating: number;
  description: string;
}

export interface ProductCreate {
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  is_active: boolean;
  Image: string;
}

export interface ProductRes {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  is_active: boolean;
  image: string;
}

export interface ProductUpdate {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category_id: number;
  //  category_id: category;
  is_active: boolean;
  Review: Review[];
  image: string;
}

export interface Status {
  code: number;
  message: string;
}

// export interface category {
//   id: number;
//   name: string;
// }

////////////////////////////////////////////////////////////////////////

export interface Category {
  id: number;
  name: string;
  is_active: boolean;
  image: string;
  TotalProduct:number;
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
  image: string;
}

export interface CategoryCreate {
  name: string;
  is_active: boolean;
  image: string;
}

export interface CategoryUpdate {
  id: number;
  name: string;
  is_active: boolean;
  image: string;
}
