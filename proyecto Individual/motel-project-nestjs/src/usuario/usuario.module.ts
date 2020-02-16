import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity], 'default'),
  ],
  exports: [],
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {

}
