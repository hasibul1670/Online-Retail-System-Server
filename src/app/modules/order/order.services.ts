/* eslint-disable no-unused-vars */

import mongoose, { FlattenMaps } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../../../handlingError/ApiError';
import { customDateFormat } from '../../../helpers/customDateFormat';
import { generateNextId } from '../../../helpers/generateId';
import { Product } from '../product/product.model';
import { IUser } from '../user/user.interface';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (order: IOrder) => {
  const session = await mongoose.startSession();

  const id = await generateNextId('order');
  const transactionId = 'txn' + uuidv4().replace(/-/g, '').substring(0, 9);

  try {
    session.startTransaction();

    let total = 0;

    for (const item of order.orderedItems) {
      const productId = item.productId;
      const product = await Product.findOne({ _id: productId }).session(
        session
      );

      if (!product) {
        throw new ApiError(404, 'Product Not Found!');
      }

      // Calculate totl for order
      const subtotal = product.price * item.quantity;
      total += subtotal;
    }

    const date = new Date();
    const formattedDate = customDateFormat(date);
    const productRequestPayload = {
      ...order,
      orderDate: formattedDate,
      orderId: id,
      transactionId: transactionId,
      total: total,
    };

    // update produvt quantity here
    for (const item of order.orderedItems) {
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { quantity: -item.quantity } },
        { session }
      );
    }
    const newOrder = await Order.create([productRequestPayload], { session });

    await session.commitTransaction();
    await session.endSession();
    return newOrder;
  } catch (ApiError) {
    await session.abortTransaction();
    await session.endSession();
    throw ApiError;
  }
};

const getAllOrders = async (id: string) => {
  try {
    const allRequest = await Order.find({}).lean().populate('user').populate({
      path: 'orderedItems.productId',
      model: 'Product',
    });

    const filteredOrders = allRequest.filter(
      order => order.user && (order.user as FlattenMaps<IUser>).userId === id
    );

    return filteredOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findOne({ orderId: id })
    .populate('user')
    .populate({
      path: 'orderedItems.productId',
      model: 'Product',
    });

  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findOneAndDelete({ orderId: id });
  return result;
};
const updateOrder = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const result = await Order.findOneAndUpdate({ orderId: id }, payload, {
    new: true,
  });
  return result;
};

export const OrderService = {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
};
