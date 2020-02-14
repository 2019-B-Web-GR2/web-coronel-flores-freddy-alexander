import { Module } from '@nestjs/common';
import { DetalleCarritoController } from './detalleCarrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleCarritoEntity } from './detalleCarrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleCarritoEntity], 'default'),

  ],
  exports: [],
  providers: [],
  controllers: [DetalleCarritoController],
})

export class DetalleCarritoModule {
}
