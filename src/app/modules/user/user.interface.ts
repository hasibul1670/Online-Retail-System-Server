/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { IGenericErrorMessage } from '../../../interfaces/error';

export type IUser = {
  userId?: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  address: string;
  isBanned: boolean;
  isAdmin: boolean;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'email' | 'firstName' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
};

export type IForgetPasswordType = {
  token: string;
  newPassword: string;
};
