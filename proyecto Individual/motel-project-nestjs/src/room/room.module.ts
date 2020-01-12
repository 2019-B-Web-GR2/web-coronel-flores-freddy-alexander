import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity], 'default'),
  ],
  controllers: [
    RoomController,

  ],
  providers: [ RoomService ],
  exports: [ RoomService ],
})

export class RoomModule { }