import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './room/room.entity';
import { MotelModule } from './motel/motel.module';
import { MotelEntity } from './motel/motel.entity';

@Module({
  imports: [RoomModule,
    MotelModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'root',
      password: 'alex1995',
      dropSchema: true,
      database: 'moteldb',
      entities: [
        RoomEntity,
        MotelEntity
      ],
      synchronize: true

    })  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
