import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const user = {
      name: 'anh em',
      age: 20,
      gender: 'male',
    };
    return user;
  }

  getAbout() {
    const info = {
      title: 'nestjs',
      author: 'anh em',
      version: '1.0.0',
    };
    return info;
  }
}
