import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioService} from "./usuario/usuario.service";

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
      dropSchema: true,
      database: 'web',
      entities: [
          UsuarioEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {
    constructor( private _usuarioService: UsuarioService) {

        /* const usuarioPromesa = this._usuarioService.encontrarUno(1);
        console.log('empieza')
        console.log(usuarioPromesa)
        usuarioPromesa
            .then(
                (data) => {
                    console.log('data',data)
                }
            )
            .catch((error) => {
                console.log('error',error)
            });

        console.log('termina en orden')
        */
    }
}
