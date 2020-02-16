import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../room/room.entity';
import { Repository } from 'typeorm';
import { MotelEntity } from './motel.entity';
import { take } from 'rxjs/operators';

@Injectable()
export class MotelService {
  constructor(@InjectRepository(MotelEntity) private motelRepository: Repository<MotelEntity> ) {
  }


  getOne(id): Promise<MotelEntity> | undefined {
    return  this.motelRepository.findOne(id);
  }

  saveOne(motel): Promise<MotelEntity> | undefined {
    return this.motelRepository.save(motel);
  }

  deleteOne(id: number) {
    return this.motelRepository.delete(id);
  }

  updateOne(id: number,  motel) {
    motel.id = id;
    return this.motelRepository.save(motel); // upsert
  }

  search(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC'
    },
  ) {
    return this.motelRepository.find(
      {
        where: whereNormal,
        take: take1,
        skip: skip1,
        order: order1
      },

    );
  }

}
