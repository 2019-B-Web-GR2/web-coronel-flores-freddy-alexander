import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity], 'default'),
  ],
  exports: [],
  providers: [],
  controllers: [UsuarioController],
})
export class UsuarioModule {

}
