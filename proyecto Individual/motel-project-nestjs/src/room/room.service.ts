import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './room.entity';
import { DeleteResult, Repository } from 'typeorm';

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

  deleteOne(id: number): Promise<DeleteResult> {
    return this.roomRepository.delete(id);
  }

  updateOne(id: number, room) {
    room.id = id;
    return this.roomRepository.save(room);
  }

  search(
    where: any = {},
    skip: number= 0,
    take: number= 10,
    order: any = {
      id: 'DESC',
      nombre: 'ASC',
    },
  ): Promise<RoomEntity[]> {

    return  this.roomRepository.find(
      {
        where,
        skip,
        take,
        order
      },
    );
  }
}
