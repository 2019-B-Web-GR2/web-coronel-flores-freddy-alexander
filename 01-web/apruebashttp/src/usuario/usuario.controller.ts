import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req, Res,
    Session
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import { DeleteResult } from 'typeorm';
import * as Joi from '@hapi/joi';
import { UsuarioCreateDto } from './usuario.create-dto';
import { validate } from 'class-validator';
import { UsuarioUpdateDto } from './usuario.update-dto';
import {tryCatch} from "rxjs/internal-compatibility";



@Controller('usuario')
export class UsuarioController {
    // tslint:disable-next-line:variable-name
    constructor(private readonly  _usuarioService: UsuarioService) {
    }

    suma(num1,num2) {
        return num1+num2;
    }


    @Get('ruta/mostrar-usuarios')
    async mostrarUsuarios(
         @Res() res,
         @Query('mensaje') mensaje: string
    ) {
        const users = await this._usuarioService.buscar();
        console.log(users)
        res.render('usuario/routes/buscar-mostrar-tabla',
            {
                datos: {
                    users,
                    mensaje,
                },
            });
    }

    @Get('ruta/crear-usuario')
     rutaCrearUsuario(
         @Query('error') error: string,
         @Res() res,
    ) {
        res.render('usuario/routes/crear-usuario',
            {datos: {
                error
                }});
    }


    @Get('ruta/editar-usuario/:idUsuario')
    async rutaEditarUsuario(
        @Query('error') error: string,
        @Param('idUsuario') idUsuario: string,
        @Res() res,
    ) {
        const consulta = {

                id: idUsuario

        }
        try{
            const usuario = await this._usuarioService.buscar(consulta)
            res.render('usuario/routes/crear-usuario',
                {datos: {
                        error,
                        usuario: usuario[0],
                    }});

        } catch (e) {
            console.log(e)
            res.redirect('/usuario/rutas/mostrar-usuarios?error= error Editando usuario')

        }

    }




    @Get('ejemploejs')
    ejemplosejs(
        @Res() res,
    ) {
        res.render('ejemplo',
            {
                datos: {
                    nombre: 'Alex',
                    suma: this.suma,
                },

            });
    }

    @Post('login')
    login(
      @Body('username') username: string,
      @Body('password') password: string,
      @Session() session,
    ) {
        console.log('seesion', session);
        if (username === 'alex' && password === '1234') {
            session.usuario = {
                nombre: 'Alex',
                userId: 1,
                roles: ['Administrador'],
            }
            return 'ok';

        }
        if (username === 'freddy' && password === '123') {
            session.usuario = {
                nombre: 'Freddy',
                userId: 2,
                roles: ['Supervisor'],
            }
            return 'ok';

        }
    }

    @Get('logout')
    logout(
        @Session() sesion,
        @Req() req,
    ) {
        sesion.usuario = undefined;
        req.session.destroy();
        return sesion;
    }

    @Get('sesion')
    sesion(
      @Session() session
) {
        return session;
    }


    @Get('hola')
    hola(
        @Session() session,
    ): string {
        let uls = ``;
        if (session.usuario) {
            uls = `<ul>`
            for (const rol of session.usuario.roles) {
                uls += ` <li> ${rol} </li>`;
            }
            uls += '</ul>';
        }
        return `
        <html>
        <head>
        <title>EPN</title>
</head>
        <body>
        <h1>Mi primera pagna ${
            session.usuario ? session.usuario.nombre : ''
        }</h1>
        
        ${uls}
</body>
</html>
`;

    }

    @Get(':id')
    obtenerUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined> {
       return this._usuarioService
           .encontrarUno(Number(identificador));
    }

    @Post()
    async guardarUno(
        @Body() usuario: UsuarioEntity,
        @Session() sesion,
        @Res() res,
    ): Promise<void> {
        if (sesion.usuario) {
            const rol = sesion.usuario.roles.find( r => r === 'Administrador' );
            if (rol) {
                const usuarioCreateDto = new UsuarioCreateDto();
                usuarioCreateDto.nombre = usuario.nombre;
                usuarioCreateDto.cedula = usuario.cedula;

                const errores = await validate(usuarioCreateDto);
                console.log('errores', errores);
                if (errores.length > 0) {
                   //  throw new BadRequestException('Error validando');
                     res.redirect('usuario/ruta/crear-usuario?error=Error Validando');
                } else {
                    console.log(usuario);
                    try {
                        await this._usuarioService.guardarUno(usuario);

                        res.redirect('/usuario/ruta/mostrar-usuarios?mensaje=Guardado con exito');

                    } catch (e) {
                        console.log(e)
                        res.redirect('/usuario/ruta/crear-usuario?error=Error del servidor')

                    }


                }


            } else {
                throw new BadRequestException('Debes ser administrador para guardar un nuevo usuario');
            }

        } else {
            throw new BadRequestException('Debes estar logueado');
        }

    }

    @Put(':id')
    async  actualizarUnUsuario(
      @Body() usuario: UsuarioEntity,
      @Param('id') id: string,
      @Session() sesion,
     ): Promise<UsuarioEntity> {
        if (sesion.usuario) {
            const rol = sesion.usuario.roles.find( r => r === 'Administrador' || r === 'Supervisor' );
            if (rol) {
                const usuarioUpdateDto = new UsuarioUpdateDto();
                usuarioUpdateDto.nombre = usuario.nombre;
                usuarioUpdateDto.cedula = usuario.cedula;
                usuarioUpdateDto.id = +id;
                const errores = await validate(usuarioUpdateDto);
                if (errores.length > 0) {
                    console.log(errores);
                    throw new BadRequestException('Error validando');
                } else {
                    return this._usuarioService.actualizarUno(+id, usuario);
                }


            } else {
                throw new BadRequestException('Debes ser administrador para editar un usuario');
            }

        } else {
            throw new BadRequestException('Debes estar logueado');
        }






    }

    @Delete(':id')
    eliminarUno(
      @Param('id') id: string,
      @Session() sesion,

    ): Promise<DeleteResult> {

        if (sesion.usuario) {
            const rol = sesion.usuario.roles.find( r => r === 'Administrador' );
            if (rol) {
                return this._usuarioService
                  .borrarUno(
                    +id,
                  );

            } else {
                throw new BadRequestException('Debes ser administrador para eliminar un usuario');
            }

        } else {
            throw new BadRequestException('Debes estar logueado');
        }




    }


    @Post(':id')
    async eliminarPost(
        @Param('id') id: string,
        @Session() sesion,
        @Res() res,

    ): Promise<void> {

        if (sesion.usuario) {
            const rol = sesion.usuario.roles.find( r => r === 'Administrador' );
            if (rol) {
                try {
                    await this._usuarioService
                        .borrarUno(
                            +id,
                        );
                    res.redirect(`/usuario/ruta/mostrar-usuarios?mensaje=Usuario ID ${id} eliminado`)
                }catch (e) {
                    console.log(e)
                    res.redirect('/usuario/ruta/mostrar-usuarios?mensaje=Error del servidor')

                }


            } else {
                throw new BadRequestException('Debes ser administrador para eliminar un usuario');
            }

        } else {
            throw new BadRequestException('Debes estar logueado');
        }




    }

    @Get()
      buscar(
      @Query('skip') skip?: string | number,
      @Query('take') take?: string | number,
      @Query('where') where?: string,
      @Query('order') order?: string,

    ): Promise<UsuarioEntity[]> {


        if (order) {
            try {
                order = JSON.parse(order);
            } catch (e) {
                order = undefined;
            }
        }
        if (where) {
            try {
                where = JSON.parse(where);
            } catch (e) {
                where = undefined;
            }
        }
        if (skip) {
            skip = +skip;

        }
        if (take) {
            take = +take;
        }
        console.log(order);
        console.log(where);
        return  this._usuarioService
          .buscar(
            where,
            skip as number,
           take as number,
            order,
            );
    }



}
