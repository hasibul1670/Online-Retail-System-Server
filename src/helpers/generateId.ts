
import { Product } from '../app/modules/product/product.model';
import { User } from '../app/modules/user/user.model';

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({}, { userId: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.userId ? lastUser.userId.substring(2) : undefined;
};
export const generateUserId = async (): Promise<string> => {
  const currentId = await findLastUserId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const userId = `U-${incrementedId}`;
  return userId;
};

export const findLastProductId = async (): Promise<string | undefined> => {
  const lastProduct = await Product.findOne({}, { productId: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastProduct?.productId
    ? lastProduct.productId.substring(2)
    : undefined;
};

export const generateProductId = async (): Promise<string> => {
  const currentId = await findLastProductId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const productId = `P-${incrementedId}`;

  return productId;
};
