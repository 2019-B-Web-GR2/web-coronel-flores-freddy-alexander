import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export  class UsuarioService {
  constructor(@InjectRepository(UsuarioEntity) private userRepository: Repository<UsuarioEntity> ) {
  }


  getOne(id): Promise<UsuarioEntity> | undefined{
    return this.userRepository.findOne(id);
  }

  saveOne(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    return this.userRepository.save(usuario);
  }

  search(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC'
    },
  ) {
    return this.userRepository.find(
      {
        where: whereNormal,
        take: take1,
        skip: skip1,
        order: order1
      },

    );
  }
}
