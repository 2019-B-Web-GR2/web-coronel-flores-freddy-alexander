import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { CabeceraCarritoEntity } from './cabeceraCarrito.entity';

@Injectable()
export  class CabeceraCarritoService {
  constructor(
    @InjectRepository(CabeceraCarritoEntity) private cabeceraCarritoEntityRepository: Repository<CabeceraCarritoEntity>,
  ) {
  }

  saveOne(cabeceraCarrito) {
    this.cabeceraCarritoEntityRepository.save(cabeceraCarrito);
  }

  search(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC',
    },
  ) {
    return this.cabeceraCarritoEntityRepository.find(
      {
        where: whereNormal,
        take: take1,
        skip: skip1,
        order: order1,
      },

    );
  }

}
