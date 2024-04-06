import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const ProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  measurement: String,
  quantity: Number,
});

const OrderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    orderedItems: [ProductSchema],
    shippingAddress: { type: String },
    total: { type: Number },
    contactNumber: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    orderDate: {
      type: String,
    },
    deliveryStatus: {
      type: String,
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
