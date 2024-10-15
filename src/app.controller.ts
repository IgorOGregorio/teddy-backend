import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/login')
  getHello(): string {
    return this.appService.getHello();
  }
}
