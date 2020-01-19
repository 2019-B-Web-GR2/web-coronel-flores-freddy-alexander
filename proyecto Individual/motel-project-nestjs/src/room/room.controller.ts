import { Body, Controller, Get, Post, Session } from '@nestjs/common';
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

}
