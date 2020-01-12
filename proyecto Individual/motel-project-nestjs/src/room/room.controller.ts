import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';

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
    @Body() room: RoomEntity
  ): Promise<RoomEntity> | undefined {
    return this.roomService.saveOne(room);
  }

}
