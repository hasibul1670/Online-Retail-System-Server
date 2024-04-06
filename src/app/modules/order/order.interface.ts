/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';

import { IUser } from '../user/user.interface';
import { IProduct } from '../product/product.interface';

export type IOrder = {
  _id: string;
  orderedItems: Array<IOrderedItem>;
  shippingAddress: string;
  total?: number;
  contactNumber?: string;
  user: Types.ObjectId | IUser;
  orderDate: string;
  deliveryStatus: string;
  paymentStatus: string;
};

export type OrderModel = Model<IOrder>;

export type IOrderedItem = {
  _id: string;
  name: string;
  productId: Types.ObjectId | IProduct;
  measurement: string;
  company: string;
  generic: string;
  category: string;
  price: number;
  country: string;
  url: string;
  id: number;
  quantity: number;
};
