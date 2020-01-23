/* tslint:disable:no-console */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioService} from "./usuario/usuario.service";
import {MascotasModule} from "./mascotas/mascotas.module";
import {MascotasEntity} from "./mascotas/mascotas.entity";

@Module({
  imports: [
      UsuarioModule,
      MascotasModule,
      TypeOrmModule.forRoot({
      name: 'default', // nombre de la cadena de conexion
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'root',
      password: 'alex1995',
      dropSchema: false,
      database: 'web',
      entities: [
          UsuarioEntity,
          MascotasEntity
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {
    // tslint:disable-next-line:variable-name
    constructor( private _usuarioService: UsuarioService) {

        const usuarioPromesa = this._usuarioService.encontrarUno(1);
        console.log('empieza')
        console.log(usuarioPromesa)

        usuarioPromesa
            .then(
                (data) => {
                    console.log('data', data)
                }
            )
            .catch((error) => {
                console.log('error', error)
            });

        console.log('termina en orden');
    }
}
