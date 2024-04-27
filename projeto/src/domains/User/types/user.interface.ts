export interface User {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  role: string;
  password: string;
}