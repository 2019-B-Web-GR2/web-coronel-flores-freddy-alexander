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
    @Session() session,
  ) {
     console.log('motelId?', motelId);

     const motel = await this.motelService.getOne(+motelId);
     console.log('motel?', motel);
     const rooms = await  this.roomService.search({
       motel: motel,
     });
     const usuario = session.user;
     console.log('Get rooms?', rooms);
     res.render('cuarto/routes/buscar-mostrar-tabla.ejs',{
       datos: {
         rooms,
         motelId,
         usuario,
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
     @Query('roomId') roomId?: string,
  ) {

      if (roomId) {
        room.id = +roomId;
      }
      room.ocupada = !room.ocupada === undefined ;
      room.precio = +room.precio;
      console.log('aqui llegue',room)
      const roomCreateDto = new RoomCreateDto()
      roomCreateDto.tipoHabitacion = room.tipoHabitacion;
      roomCreateDto.precio = room.precio;
      roomCreateDto.ocupada = room.ocupada;
      const errores = await validate(roomCreateDto);

      if (errores.length > 0) {

        console.log('errores? ', errores);
        res.redirect('/room/ruta/add-cuarto?error=Error validando');

      } else {
        try {
          const motel = await this.motelService.getOne(+motelId);
          room.motel = motel;
          const cuartoGuardado = await  this.roomService.saveOne(room);
          console.log('cuarto guardado ', cuartoGuardado);
          res.redirect('/room/ruta/mostrar-cuartos/' + motelId + '?mensaje= que se yo');
        } catch (e) {
          console.log('error? ', e);
          res.redirect('/room/ruta/mostrar-cuartos/' + motelId + '?error= try catch');
        }
      }

      // return this.roomService.saveOne(room);



  }

  @Get('editar-cuarto/:id/:motelId')
  async editarCuarto(
    @Param('id') id: string,
    @Param('motelId') motelId: string,
    @Res() res,
  ){
    try {

      const cuarto = await this.roomService.findOne(+id);
      console.log('cuarto? ', cuarto);
      res.render('cuarto/routes/add-cuarto',{
        datos: {
          cuarto,
          motelId,
        },
      });

    } catch (e) {
      console.log(e);
     // res.redirect('')

    }

  }

  @Post('editar')
  editarForm(
    @Body() cuarto: RoomEntity,
  ) {

  }

  @Post('eliminar/:motelId')
  async postEliminar(
    @Query('roomId') roomId: string,
    @Param('motelId') motelId: string,
    @Res() res,
  ) {

    try {
      await this.roomService.deleteOne(+roomId);
      res.redirect('/room/ruta/mostrar-cuartos/' + motelId + '?mensaje= que se yo');
    } catch (e) {
      console.log('error', e);
      res.redirect('/room/ruta/mostrar-cuartos/' + motelId + '?mensaje= que se yo');
    }

  }
}
