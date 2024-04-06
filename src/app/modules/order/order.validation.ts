import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    orderedItems: z.array(
      z.object({
        productId: z.string({
          required_error: 'productId is required ',
        }),
        quantity: z.number({
          required_error: 'product quantity is required ',
        }),
      })
    ),

    shippingCost: z.number({
      required_error: 'shippingCost is required ',
    }),
    user: z.string({
      required_error: 'user Id is required ',
    }),
  }),
});

export const OrderValidaion = {
  createOrderZodSchema,
};
