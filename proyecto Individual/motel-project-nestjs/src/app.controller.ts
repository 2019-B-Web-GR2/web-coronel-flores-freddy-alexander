import { Body, Controller, Get, Post, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Session() session,
  ) {
    console.log('seesion', session);
    if (username === 'admin' && password === '1234') {
      session.user = {
        name: 'Alex',
        userId: 1,
        roles: ['Admin'],
      };
      return  'ok'
    }
    return 'Bad credentials'
  }

  @Get('/ruta/login')
  loginView(
    @Res() res,
  ) {
    res.render('login/login');
  }

}
