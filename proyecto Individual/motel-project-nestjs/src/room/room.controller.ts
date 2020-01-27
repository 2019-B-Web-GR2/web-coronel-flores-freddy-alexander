import { Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { RoomCreateDto } from './room.create-dto';
import { writeHeapSnapshot } from 'v8';
import { MotelService } from '../motel/motel.service';
import { validate } from 'class-validator';

@Controller('room')
export class RoomController {

  constructor(
    private readonly roomService: RoomService,
    private readonly motelService: MotelService,
  ) {
  }
  @Get('/test')
  test() {
    return 'this works';
  }



  // all views go here

  @Get('ruta/mostrar-cuartos/:motelId')
  async mostrarCuartos(
    @Res() res,
    @Param('motelId') motelId: string,
  ) {
     console.log('motelId?', motelId);

     const motel = await this.motelService.getOne(+motelId);
     console.log('motel?', motel);
     const rooms = await  this.roomService.search({
       motel: motel,
     });
     console.log('Get rooms?', rooms);
     res.render('cuarto/routes/buscar-mostrar-tabla.ejs',{
       datos: {
         rooms,
         motelId,
       }
     });
  }

  @Get('/ruta/add-cuarto')
  addCuartoRuta(
    @Res() res,
    @Query('error') error?: string,
    @Query('motelId') motelId?: string,
  ) {
    console.log('motel id in form? ' + motelId);
    res.render('cuarto/routes/add-cuarto', {
      datos: {
        motelId,
      },
    });
  }

  @Post()
  async saveOne(
    @Body() room: RoomEntity,
    @Session() session,
    @Res() res,
    @Query('motelId') motelId?: string,
  ) {
      console.log('motelId? ', motelId);

      room.ocupada = !room.ocupada === undefined ;
      room.precio = +room.precio;
      console.log('aqui llegue',room)
      const roomCreateDto = new RoomCreateDto()
      roomCreateDto.tipoHabitacion = room.tipoHabitacion;
      roomCreateDto.precio = room.precio;
      roomCreateDto.ocupada = room.ocupada;
      const errores = await validate(roomCreateDto);
      console.log(room);
      if (errores.length > 0) {

        console.log('errores? ', errores);
        res.redirect('/room/ruta/add-cuarto?error=Error validando');

      } else {
        try {
          const motel = await this.motelService.getOne(+motelId);
          room.motel = motel;
          await  this.roomService.saveOne(room);
          res.redirect('/room/ruta/mostrar-cuartos/' + motelId);
        } catch (e) {
          console.log('error? ',e);
          res.redirect('/room/ruta/mostrar-cuartos/' + motelId + 'error= try catch');
        }
      }

      // return this.roomService.saveOne(room);



  }



}
