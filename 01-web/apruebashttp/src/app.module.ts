import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      UsuarioModule,
      TypeOrmModule.forRoot({
      name: 'default', // nombre de la cadena de conexion
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'root',
      password: 'alex1995',
      database: 'web',
      entities: [
          UsuarioEntity,
      ],
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
