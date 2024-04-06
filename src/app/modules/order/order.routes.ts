import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidaion } from './order.validation';

const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidaion.createOrderZodSchema),
  OrderController.createOrder
);
router.get('/userAll-order/:id', OrderController.getAllOrders);
router.get('/:id', OrderController.getSingleOrder);
router.patch('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export const OrderRoutes = router;
