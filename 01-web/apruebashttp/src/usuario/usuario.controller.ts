import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Session } from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import { DeleteResult } from 'typeorm';
import * as Joi from '@hapi/joi';
import { UsuarioCreateDto } from './usuario.create-dto';
import { validate } from 'class-validator';
import { UsuarioUpdateDto } from './usuario.update-dto';


@Controller('usuario')
export class UsuarioController {
    // aqui validamos las cosas
    constructor(private readonly  _usuarioService: UsuarioService) {
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

    @Get('sesion')
    sesion(
      @Session() session
) {
        return session;
    }


    @Get('hola')
    hola(): string {
        return `
        <html>
        <head>
        <title>EPN</title>
</head>
        <body>
        <h1>Mi primera pagina</h1>
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
    ): Promise<UsuarioEntity | undefined> {
        const usuarioCreateDto = new UsuarioCreateDto();
        usuarioCreateDto.nombre = usuario.nombre;
        usuarioCreateDto.cedula = usuario.cedula;

        const errores = await validate(usuarioCreateDto);
        console.log(errores);
        if (errores.length > 0) {
               throw new BadRequestException('Error validando');
        } else {
            console.log(usuario);
            return this._usuarioService.guardarUno(usuario);
        }

    }

    @Put(':id')
    async  actualizarUnUsuario(
      @Body() usuario: UsuarioEntity,
      @Param('id') id: string,
     ): Promise<UsuarioEntity> {
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

    }

    @Delete(':id')
    eliminarUno(
      @Param('id') id: string,

    ): Promise<DeleteResult> {
        return this._usuarioService
          .borrarUno(
            +id,
          );

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
            /* const nuevoEsquema = Joi.object({
                skip: Joi.number(),
            });

            try {
              const objetoValido = await nuevoEsquema
                .validateAsync({
                    skip: skip,
                });
                console.log('objecto valido', objetoValido);
            } catch (e) {
                console.log('error',e);
            }

             */
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
