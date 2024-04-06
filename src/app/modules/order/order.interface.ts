/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';

import { IUser } from '../user/user.interface';
import { IProduct } from '../product/product.interface';

export type IOrder = {
  _id: string;
  orderId: string;
  orderedItems: Array<IOrderedItem>;
  shippingAddress: string;
  total?: number;
  shippingCost?: number; 
  transactionId: string;
  transactionMethod: 'Bkash' | 'Nagad' | 'EBL Card' | 'VisaCard';
  contactNumber?: string;
  user: Types.ObjectId | IUser;
  orderDate: string;
  deliveryStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'processing' | 'paid' | 'refunded';
};

export type OrderModel = Model<IOrder>;

export type IOrderedItem = {
  _id: string;
  name: string;
  productId: Types.ObjectId | IProduct;
  category: string;
  price: number;
  url: string;
  id: number;
  quantity: number;
};
