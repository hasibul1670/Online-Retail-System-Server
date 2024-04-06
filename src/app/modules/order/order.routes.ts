import express from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.post('/create-order', OrderController.createOrder);
router.get('/userAll-order/:id', OrderController.getAllOrders);
router.get('/:id', OrderController.getSingleOrder);
router.patch('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export const OrderRoutes = router;
