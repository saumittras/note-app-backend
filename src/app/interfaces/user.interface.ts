import { Model } from "mongoose";

export interface IAddress {
  city: string;
  street: string;
  zip: number;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  role: "user" | "admin";
  address: IAddress;
}

export interface UserInstanceMethods {
  hashPassword(password: string): Promise<string>;
}

export interface UserStaticsMethods extends Model<IUser> {
  hashPassword(password: string): string;
}
