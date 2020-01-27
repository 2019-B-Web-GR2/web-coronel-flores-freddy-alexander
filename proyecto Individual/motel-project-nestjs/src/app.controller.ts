import { Body, Controller, Get, Post, Query, Res, Session } from '@nestjs/common';
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
     @Res() res,
  ) {
    console.log('seesion', session);
    if (username === 'admin' && password === '1234') {
      session.user = {
        name: 'Alex',
        userId: 1,
        roles: ['Admin'],
      };
      res.redirect('motel/ruta/mostrar-moteles');
    }
    res.redirect('/ruta/login?error=Credenciales Invalidas');
  }

  @Get('/ruta/login')
  loginView(
    @Res() res,
    @Query('error') error?: string,
  ) {
    res.render('login/login',{
      datos: {
        error,
      }
    });
  }

}
