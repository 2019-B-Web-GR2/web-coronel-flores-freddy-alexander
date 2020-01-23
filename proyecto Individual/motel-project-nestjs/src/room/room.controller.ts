import { Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { RoomCreateDto } from './room.create-dto';
import { writeHeapSnapshot } from 'v8';
import { MotelService } from '../motel/motel.service';

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

  @Post()
  saveOne(
    @Body() room: RoomEntity,
    @Session() session,
  ) {
    if (session.user) {

      const roomCreateDto = new RoomCreateDto()

      return this.roomService.saveOne(room);

    }

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
     res.render('cuarto/routes/buscar-mostrar-tabla.ejs',{
       datos: {
         rooms: motel.rooms ?  motel.rooms : [],
       }
     });
  }

}
