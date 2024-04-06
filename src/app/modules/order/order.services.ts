/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';
import { ApiError } from '../../../handlingError/ApiError';
import { customDateFormat } from '../../../helpers/customDateFormat';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';

const createOrder = async (order: IOrder) => {
  const session = await mongoose.startSession();
  const newOrderData = null;
  try {
    session.startTransaction();

    for (const item of order.orderedItems) {
      const productId = item.productId;
      const checkQuantity = await Product.findOne({
        _id: productId,
        quantity: { $gte: item.quantity },
      }).session(session);

      if (!checkQuantity) {
        throw new ApiError(404, 'Product Out Of Stock - Quantity Exceeded!');
      }
    }
    const date = new Date();
    const formattedDate = customDateFormat(date);
    const productRequestPayload = { ...order, orderDate: formattedDate };

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
  const allRequest = await Order.find({}).lean();
  const filteredNotes = allRequest.filter(
    pr => pr.user && pr.user.toString() === id
  );
  return filteredNotes;
};

const getSingleOrder = async (id: string) => {
  const result = await Order.findById(id).populate('user').populate({
    path: 'orderedItems.productId',
    model: 'Product',
  });

  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};
const updateOrder = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const result = await Order.findOneAndUpdate({ _id: id }, payload, {
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
