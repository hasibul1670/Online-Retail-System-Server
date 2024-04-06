import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { ApiError } from '../../../handlingError/ApiError';
import { productController } from './product.controller';

const createProductLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  handler: () => {
    throw new ApiError(
      429,
      'Too many requests for creating a product from this IP, please try again later'
    );
  },
});

const router = express.Router();
router.post('/create', productController.createProduct);
router.get('/:id', createProductLimiter, productController.getSingleProduct);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  productController.deleteProduct
);

router.patch(
  '/:id',

  // auth(ENUM_USER_ROLE.ADMIN),
  productController.updateProduct
);
router.get('/', productController.getAllProducts);

export const ProductRoutes = router;
