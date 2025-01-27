

// make test
export interface Product {
  id: number;
  name: string;
  detail: string;
  price: number;
  amount: number;
  img: string;
  categoryId: number;
  status:  boolean;
} 

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


// make test
export interface Product {
  id: number;
  name: string;
  detail: string;
  price: number;
  amount: number;
  img: string;
  categoryId: number;
  status:  boolean;
}

export interface Category {
  id: number;
  name: string;
}