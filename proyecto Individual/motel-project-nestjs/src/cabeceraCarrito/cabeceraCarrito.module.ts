import { Module } from '@nestjs/common';
import { CabeceraCarritoController } from './cabeceraCarrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotelEntity } from '../motel/motel.entity';
import { CabeceraCarritoEntity } from './cabeceraCarrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CabeceraCarritoEntity], 'default'),

  ],
  exports: [],
  providers: [],
  controllers: [CabeceraCarritoController],

})
export class CabeceraCarritoModule {

}
