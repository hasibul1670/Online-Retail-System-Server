import { generateNextId } from '../../../helpers/generateId';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const id = await generateNextId('product');
  const result = await Product.create({ ...payload, productId: id });
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await Product.find({ productId: id });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findOneAndDelete({ productId: id });
  return result;
};
const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ productId: id }, payload, {
    new: true,
  });
  return result;
};

export const ProductService = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
