import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Res, Session } from '@nestjs/common';
import { MotelEntity } from './motel.entity';
import { MotelService } from './motel.service';
import { log } from 'util';
import { MotelCreateDto } from './motel.create-dto';
import { validate } from 'class-validator';
import { tryCatch } from 'rxjs/internal-compatibility';

@Controller('motel')
export class MotelController {
  constructor(private readonly motelService: MotelService) {
  }

  @Get('test')
  test() {
    return 'this also works';
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
  ){

    const motel = this.motelService.getOne(+id);
    // motel.then(data => console.log(data.rooms));
    return motel;

  }

  @Post()
  async saveOne(
    @Body() motel: MotelEntity,
    @Session() session,
  ) {
    if (session.user) {
      const  motelCreateDto = new MotelCreateDto()
      motelCreateDto.nombre = motel.nombre;
      motelCreateDto.direccion = motel.direccion;
      motelCreateDto.zipcode = motel.zipcode;
      const errores = await validate(motelCreateDto)
      if (errores.length > 0){
        throw  new BadRequestException('Error validando');
      } else {
        return this.motelService.saveOne(motel);
      }
    }
    return 'should be ';

  }

  @Get('sesion')
  getSession(
    @Session() sesion
  ) {
    return sesion
  }


  @Delete(':id')
  deleteOne(
    @Param('id') id: string,
    @Session() session,
) {
    if (session.user) {
      return this.motelService.deleteOne(+id);
    } else {
      throw new BadRequestException('should be log in');
    }


  }

  @Get()
  buscar(
    @Query('skip') skip?: string | number,
    @Query('take') take?: string | number,
    @Query('where') where?: string,
    @Query('order') order?: string,
  ) {

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
    return this.motelService.search(
      where,
      skip as number,
      take as number,
      order,
    );
  }
  // views should be here, after the endpoints

  @Get('/ruta/mostrar-moteles')
  async mostrarTabla(
    @Res() res,
    @Session() session,
    @Query('error') error?: string,
    @Query('mensaje') mensaje?: string,

    ) {
    // console.log('error direccionando', error);
    const usuario = session.user;
    console.log('usuario', usuario);
    const moteles = await this.motelService.search();
    res.render('motel/routes/buscar-mostrar-tabla', {
      datos: {
        message: 'hello',
        moteles,
        error,
        mensaje,
        usuario,
      },
    });
  }

  @Get('/ruta/add-motel')
  newMotelRoute(
    @Res() res,
    @Query('error') error?: string,
  ) {
    res.render('motel/routes/add-motel',{
      datos: {
        error,
      }
    });
  }

  @Post('/guardar-uno')
  async guardarUno(
    @Res() res,
    @Body() motel: MotelEntity,
    @Session() session,
  ) {
    if (session.user) {
      const  motelCreateDto = new MotelCreateDto();
      motelCreateDto.nombre = motel.nombre;
      motelCreateDto.direccion = motel.direccion;
      motelCreateDto.zipcode = motel.zipcode;
      motel.rooms = [];
      const errores = await validate(motelCreateDto);
      if (errores.length > 0) {
        console.log('errros validar', errores);
        res.redirect('/motel/ruta/add-motel?error=error al validar datos');
      } else {
        // tslint:disable-next-line:no-shadowed-variable
        try {
          const motelGuardado = await this.motelService.saveOne(motel);
          console.log(motelGuardado);
          res.redirect('/motel/ruta/mostrar-moteles?mensaje=Nuevo Motel Guardado');

        } catch (e) {
          console.log('error try catch',e);
          res.redirect('motel/ruta/add-motel?error=No se pudo ingresar try error');
        }

      }
    }
    res.redirect('motel/ruta/mostrar-moteles?error=debes estar logueado');

  }
 @Post(':id')
  async eliinarPost(
    @Param('id') id: string,
    @Res() res,
 ) {
    try {


      console.log('motelid? ', id);
      const deleted = await this.motelService.deleteOne(+id);
      console.log(deleted);
      res.redirect('/motel/ruta/mostrar-moteles?mensaje=eliminado un motel');
    } catch (e) {
      console.log('eerror ? ',e);
      res.redirect('/motel/ruta/mostrar-moteles?mensaje=error eliminado un motel');
    }
 }

 @Get('ruta/editar-motel/:idMotel')
  async rutaEditarMotel(

    @Param('idMotel') idMotel: string,
    @Res() res,
    @Query('error') error?: string,

  ) {
    console.log(error)
    const consulta = {
      id: +idMotel,
    };
    try {
      const motel = await this.motelService.search(consulta);
      if (motel.length > 0) {
        res.render(
          'motel/routes/add-motel',
          {
            datos: {
              error,
              motel: motel[0],
            },
          });

      } else {
        res.redirect(
          '/motel/ruta/mostrar-moteles?error=No existe este motel',
      );
      }
    } catch (e) {
      res.redirect(
        '/motel/ruta/mostrar-moteles?error=Error editando motel',
      );
    }

 }
  @Post('/guardar-uno/:id')
  async actualizarMotel(
    @Body() motel: MotelEntity,
    @Param('id') id: string,
    @Res() res,
  ) {

    const  motelUpdateDto = new MotelCreateDto();
    motelUpdateDto.nombre = motel.nombre;
    motelUpdateDto.direccion = motel.direccion;
    motelUpdateDto.zipcode = motel.zipcode;
    motel.id = +id;

    const errores = await validate(motelUpdateDto);
    if (errores.length > 0) {
      console.log('entro aqui? errros validar', errores);
      // console.log(`/motel/ruta/editar-motel/${}?error=error al validar datos`)
      res.redirect(`/motel/ruta/editar-motel/${motel.id}?error=error al validar datos`);
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      try {
        const motelGuardado = await this.motelService.updateOne(+id, motel);
        // console.log(motelGuardado);
        res.redirect(`/motel/ruta/mostrar-moteles?mensaje=Motel ${motel.nombre} actualizado`);

      } catch (e) {
        console.log('error try catch',e);
        res.redirect(`/motel/ruta/editar-motel/${motel.id}?error=error try catch`);
      }

    }

  }


}




