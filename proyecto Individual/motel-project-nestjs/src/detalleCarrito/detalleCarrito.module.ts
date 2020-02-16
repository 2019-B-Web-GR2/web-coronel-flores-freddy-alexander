import { Module } from '@nestjs/common';
import { DetalleCarritoController } from './detalleCarrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCarritoEntity } from './detalleCarrito.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { CabeceraCarritoService } from '../cabeceraCarrito/cabeceraCarrito.service';
import { CabeceraCarritoEntity } from '../cabeceraCarrito/cabeceraCarrito.entity';
import { DetalleCarritoService } from './detalleCarrito.service';
import { RoomEntity } from '../room/room.entity';
import { RoomService } from '../room/room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleCarritoEntity], 'default'),
    TypeOrmModule.forFeature([UsuarioEntity], 'default'),
    TypeOrmModule.forFeature([CabeceraCarritoEntity], 'default'),
    TypeOrmModule.forFeature([RoomEntity], 'default'),

  ],
  exports: [],
  providers: [
      UsuarioService,
      CabeceraCarritoService,
      DetalleCarritoService,
      RoomService,
  ],
  controllers: [DetalleCarritoController],
})

export class DetalleCarritoModule {
}
