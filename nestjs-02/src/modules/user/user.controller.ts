import { Controller } from '@nestjs/common';
import { CusClass } from 'src/core/cusClass';

@Controller('user')
export class UserController {
  constructor(customClass: CusClass) {
    customClass.getName();
  }
}
