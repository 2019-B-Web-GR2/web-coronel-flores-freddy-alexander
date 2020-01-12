import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../room/room.entity';
import { Repository } from 'typeorm';
import { MotelEntity } from './motel.entity';

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

}
