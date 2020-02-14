import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room/room.entity';
import { MotelModule } from './motel/motel.module';
import { MotelEntity } from './motel/motel.entity';
import { MotelService } from './motel/motel.service';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { CabeceraCarritoModule } from './cabeceraCarrito/cabeceraCarrito.module';
import { CabeceraCarritoEntity } from './cabeceraCarrito/cabeceraCarrito.entity';
import { DetalleCarritoModule } from './detalleCarrito/detalleCarrito.module';
import { DetalleCarritoEntity } from './detalleCarrito/detalleCarrito.entity';

@Module({
  imports: [RoomModule,
    MotelModule,
    UsuarioModule,
    CabeceraCarritoModule,
    DetalleCarritoModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'root',
      password: 'alex1995',
      dropSchema: false,
      database: 'moteldb',
      entities: [
        RoomEntity,
        MotelEntity,
        UsuarioEntity,
        CabeceraCarritoEntity,
        DetalleCarritoEntity,

      ],
      synchronize: true

    })  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
