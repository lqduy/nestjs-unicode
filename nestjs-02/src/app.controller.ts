import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //decorator
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/about')
  getAbout() {
    return this.appService.getAbout();
  }
}
