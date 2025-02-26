export interface Admin {
  id: number;
  name: string;
  email: string;
  role: Role;  // ยังคงใช้เป็น Role object ใน Admin
  is_active: boolean;
  created_at: number;
  updated_at: number;
}

interface Role {
  id: number;
  name: string;
}

export interface AdminCreate {
  name: string;
  password: string;
  email: string;
  role_id: number;  // ใช้ role_id แทน role ใน AdminCreate
  is_active: boolean;
}

export interface AdminRes {
  id: number;
  name: string;
  password: string;
  email: string;
  role_id: number;  // ใช้ role_id แทน role ใน AdminRes
  is_active: boolean;
}


export interface AdminUpdate {
  id: number;
  name: string ; // ใช้ string | null
  email: string   ; // ใช้ string | null
}

export interface AdminUpdatePassword {
  id: number;
  password: string ; // ใช้ string | null
}


export interface AdminInfo {
    id: number;
    name: string;
    email: string;
    role: Role;
    is_active: boolean;
    created_at: number;
    updated_at: number;
}

////////////////////////////////////////////////////////////////

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  created_at: number;
  updated_at: number;
}


export interface CustomerRes{
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  shipment: shipment;
}


export interface UpdatePassword {
  id: number;
  password: string;
}

export interface shipment {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  zip_code: number;
  sub_district: string;
  district: string;
  province: string;
}

