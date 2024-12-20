import { Injectable } from '@nestjs/common';

@Injectable()
export class CusClass {
  constructor() {}

  getName() {
    return 'CusClass';
  }
}
