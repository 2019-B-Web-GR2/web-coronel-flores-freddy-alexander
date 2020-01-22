import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Res, Session } from '@nestjs/common';
import { MotelEntity } from './motel.entity';
import { MotelService } from './motel.service';
import { log } from 'util';
import { MotelCreateDto } from './motel.create-dto';
import { validate } from 'class-validator';

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
  ) {
    const moteles = await this.motelService.search();
    res.render('motel/routes/buscar-mostrar-tabla', {
      datos: {
        message: 'hello',
        moteles,
      }
    });
  }



}
