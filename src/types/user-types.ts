export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: Roles
  address: IAddress
}

export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface IAddress {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string
}