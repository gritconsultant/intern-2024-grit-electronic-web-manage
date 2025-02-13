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