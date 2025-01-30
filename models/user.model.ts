export interface Admin {
  id: number;
  name: string;
  email: string;
  role: Role;
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
  role_id: number;
  is_active: boolean;
}

export interface AdminRes {
  id: number;
  name: string;
  password: string;
  email: string;
  role_id: number;
  is_active: boolean;
}

export interface AdminUpdate {
  id: number;
  name: string;
  password: string;
  email: string;
  role_id: number;
  is_active: boolean;
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
