export interface Order {
    order_id:       number;
    customer:       Customer;
    total_amount:   number;
    currency:       string;
    status:         string;
    created_at:     string;
    payment_status: string;
    items:          Item[];
}

export interface Customer {
    user_id:  number;
    username: string;
    email:    string;
}

export interface Item {
    product_id:   number;
    product_name: string;
    quantity:     number;
    price:        number;
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