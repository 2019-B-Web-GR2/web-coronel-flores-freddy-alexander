import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { MotelService } from '../motel/motel.service';
import { AppService } from '../app.service';
import { MotelEntity } from '../motel/motel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity], 'default'),
    TypeOrmModule.forFeature([MotelEntity], 'default'),
    // MotelService,
  ],
  controllers: [
    RoomController,

  ],
  providers: [ RoomService, MotelService],
  exports: [ RoomService ],
})

export class RoomModule { }
