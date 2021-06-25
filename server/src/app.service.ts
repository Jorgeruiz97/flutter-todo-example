import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPrivateHello(): string {
    return 'Private Hello World!'
  }
}
