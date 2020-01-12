import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity) private roomRepository: Repository<RoomEntity>,
  ) {
  }
  findOne(id: number): Promise<RoomEntity> | undefined {
    return this.roomRepository.findOne(id);
  }

  saveOne(room): Promise<RoomEntity> | undefined {
    // @ts-ignore
    return this.roomRepository.save<RoomEntity[]>(room);
  }
}
