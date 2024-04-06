import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.services';

const sendOrderResponse = (res: Response, message: string, data: any) => {
  sendReponse<IOrder>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const OrderData = req.body;
  const result = await OrderService.createOrder(OrderData);
  sendOrderResponse(res, 'Order is Created Successfully!', result);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getAllOrders(id);
  sendOrderResponse(res, 'Orders  are retrieved successfully !', result);
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrder(id);
  sendOrderResponse(res, ' Order Deleted successfully !', result);
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id);
  sendOrderResponse(res, 'Single Order retrieved successfully !', result);
});
const updateOrder = catchAsync(async (req: Request, res: Response) => {
    const UpdateData = req.body;
  const { id } = req.params;
  const result = await OrderService.updateOrder(id, UpdateData);
  sendOrderResponse(res, 'Single Order is Updated successfully !', result);
});
export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateOrder,
};
