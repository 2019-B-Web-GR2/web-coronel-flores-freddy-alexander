import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CabeceraCarritoEntity } from '../cabeceraCarrito/cabeceraCarrito.entity';
import { Repository } from 'typeorm';
import { DetalleCarritoEntity } from './detalleCarrito.entity';

@Injectable()
export class DetalleCarritoService {
  constructor(
    @InjectRepository(DetalleCarritoEntity) private detalleCarritoEntityRepository: Repository<DetalleCarritoEntity>,
  ) {
  }

  saveOne(detalle) {
    this.detalleCarritoEntityRepository.save(detalle);
  }

  search(
    whereNormal: any = {},
    skip1: number = 0,
    take1: number = 10,
    order1: any = {
      id: 'ASC',
    },
  ) {
    return this.detalleCarritoEntityRepository.find(
      {
        where: whereNormal,
        take: take1,
        skip: skip1,
        order: order1,
      },

    );
  }
}
