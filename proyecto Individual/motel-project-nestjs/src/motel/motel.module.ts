import { Module } from '@nestjs/common';
import { MotelController } from './motel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotelEntity } from './motel.entity';
import { MotelService } from './motel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MotelEntity], 'default'),
  ],
  controllers: [ MotelController ],
  exports: [MotelService],
  providers: [MotelService],

})
export class MotelModule {
  
}
