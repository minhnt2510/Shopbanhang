export interface User {
  _id: string;
  roles: string[];
  email: string;
  name: string;
  date_of_birth?: Date;
  address: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
