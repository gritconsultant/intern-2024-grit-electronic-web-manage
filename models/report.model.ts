export interface Dashboard {
  totalsale: number;
  totalorder: number;
  totaluser: number;
  totalcancelled: number;
}

export interface SaleReport {
  OrderID: number;
  UserName: string;
  ProductName: string;
  Amount: number;
  Price: number;
  TotalPrice: number;
  Created_at: number;
}


export interface ParamsReport {
    page: number;
    size: number;
    month: string;
    year: number;
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