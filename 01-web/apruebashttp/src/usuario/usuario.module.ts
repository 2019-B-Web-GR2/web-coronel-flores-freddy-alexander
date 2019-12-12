// modulo porque queremos hacer aplicaciones modulares
import {Module} from '@nestjs/common';
import {UsuarioController} from './usuario.controller';
import {UsuarioService} from './usuario.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsuarioEntity],  // entidades del mdodulo
            'default'),    // nombre cadena de conexion 
    ],
    controllers: [
        UsuarioController,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        UsuarioService,   // para exportar los servici
    ],

})
export class UsuarioModule {

}
