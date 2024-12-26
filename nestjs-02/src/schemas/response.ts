import { HttpStatus } from '@nestjs/common';

export type SuccessResponse = {
  data: any;
  statusCode?: HttpStatus;
  message?: string;
};

export type ErrorResponse = {
  errors?: any;
  statusCode?: HttpStatus;
  message?: string;
  stack?: string;
};
