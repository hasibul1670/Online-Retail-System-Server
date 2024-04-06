import express from 'express';
import isLoggedIn from '../../middlewares/loggedIn/isLoggedIn';
import isLoggedOut from '../../middlewares/loggedIn/isLoggedOut';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validate';

const router = express.Router();

router.post(
  '/login',
  isLoggedOut,
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginStudent
);
router.post('/logout', isLoggedIn, AuthController.logoutUser);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);



export const AuthRoutes = router;
