import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const ProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    orderedItems: [ProductSchema],
    total: { type: Number },
    shippingCost: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    orderDate: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    transactionMethod: {
      type: String,
      default: 'Bkash',
    },
    deliveryStatus: {
      type: String,
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      default: 'paid',
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
