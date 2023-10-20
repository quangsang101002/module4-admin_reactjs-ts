export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: number;
  created_at: string;
  updated_at: string;
  avatar: File | string;
}
