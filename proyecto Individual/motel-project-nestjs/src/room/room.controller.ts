import { Body, Controller, Get, Post, Query, Res, Session } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';
import { RoomCreateDto } from './room.create-dto';

@Controller('room')
export class RoomController {

  constructor(
    private readonly roomService: RoomService
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

  @Get('ruta/mostrar-cuartos')
  mostrarCuartos(
    @Res() res,
    @Query('motelId') motelId: string,
  ) {
     res.render('cuarto/routes/buscar-mostrar-tabla.ejs');
  }

}
