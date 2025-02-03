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
  name: string;
  email: string;
  password: string;
  role_id: number;  // ใช้ role_id แทน role ใน AdminUpdate
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
}

export interface UserInfo {
  ID: number;
  FirstName: string;
  LastName: string;
  Username: string;
  Password: string;
  Email: string;
  Phone: number;
  created_at: number;
  updated_at: number;
}
