/* eslint-disable no-case-declarations */

import { Order } from '../app/modules/order/order.model';
import { Product } from '../app/modules/product/product.model';
import { User } from '../app/modules/user/user.model';

export const generateNextId = async (modelName: string): Promise<string> => {
  let lastId: string | undefined;
  let prefix: string;

  switch (modelName) {
    case 'user':
      const lastUser = await User.findOne({}, { userId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
      lastId = lastUser?.userId;
      prefix = 'U-';
      break;
    case 'product':
      const lastProduct = await Product.findOne({}, { productId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
      lastId = lastProduct?.productId;
      prefix = 'P-';
      break;
    case 'order':
      const lastOrder = await Order.findOne({}, { orderId: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
      lastId = lastOrder?.orderId;
      prefix = 'O-';
      break;
    default:
      throw new Error('Invalid model name');
  }

  const parsedId = lastId ? parseInt(lastId.substring(2)) : 0;
  const nextId = `${prefix}${(parsedId + 1).toString().padStart(5, '0')}`;

  return nextId;
};
