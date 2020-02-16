import { Body, Controller, Get, Param, Post, Query, Req, Res, Session } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {

  }

  @Get(':id')
  getUsuario(
    @Param('id') id: string,
  ){
    return this.usuarioService.getOne(+id);
  }

  @Get()
  usuarios() {
    return 'it works';
  }


  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Session() session,
    @Res() res,
  ) {
    console.log('seesion', session);
    const busqueda = {
      username,
    }
    try {
      const  usuario = await this.usuarioService.search(busqueda);
      if (usuario.length > 0) {
        session.user = {};
        session.user = {
          name: usuario[0].username,
          userId: usuario[0].id,
          roles: [usuario[0].rol]
        };
        console.log(session.user);
        res.redirect('/motel/ruta/mostrar-moteles');

      } else {
        res.redirect('/usuario/ruta/login?error=Credenciales Invalidas');
      }

    } catch (e) {
      res.redirect('/usuario/ruta/login?error=an error has occurred');
    }
  }
  @Post('logout')
  logout(
    @Session() sesion,
    @Req() req,
    @Res() res,
  ) {
    sesion.user = undefined;
    req.session.destroy();
    console.log('si llegue al logout');
    // return sesion;
    res.redirect('/usuario/ruta/login');
  }

  @Get('/ruta/login')
  loginView(
    @Res() res,
    @Session() session,
    @Query('error') error?: string,
    @Query('mensaje') mensaje?: string,
  ) {
    res.render('login/login',{
      datos: {
        error,
        mensaje,
      },
    });
  }

  @Get('/ruta/signup')
  signUpView(
    @Res() res,
    @Session() session,
    @Query('error') error?: string,
  ) {
    res.render('login/signup',{
      datos: {
        error,
      },
    });

  }
  @Post('signup')
  async signUp(
    @Res() res,
    @Body() usuario: UsuarioEntity,
  ) {
    try {
      console.log('usuario? ', usuario);
      await this.usuarioService.saveOne(usuario);
      res.redirect('/usuario/ruta/login?mensaje= cuenta creada!!');
    } catch (e) {
      res.redirect('/usuario/ruta/signup?error=error has ocurred');
    }

  }





}
