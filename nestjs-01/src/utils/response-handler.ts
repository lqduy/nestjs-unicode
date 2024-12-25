import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export type SuccessResponse = {
  res?: Response;
  data: any;
  statusCode?: HttpStatus;
  message?: string;
};

export type ErrorResponse = {
  res?: Response;
  errors?: any;
  statusCode?: HttpStatus;
  message?: string;
};

export class ResponseHandler {
  static success({
    res,
    data,
    statusCode = HttpStatus.OK,
    message = 'success',
  }: SuccessResponse) {
    const response = {
      statusCode,
      message,
      data,
    };
    if (res) {
      return res.status(statusCode).json(response);
    }
    return response;
  }

  static error({
    res,
    errors,
    statusCode = HttpStatus.BAD_REQUEST,
    message = 'error',
  }: ErrorResponse) {
    const response = {
      errors,
      statusCode,
      message,
    };
    if (res) {
      return res.status(statusCode).json(response);
    }
    return response;
  }
}
