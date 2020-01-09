import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";

@Controller('usuario')
export class UsuarioController {
    // tslint:disable-next-line:variable-name
    constructor(private readonly  _usuarioService: UsuarioService) {
    }

    @Get(':id')
    obtenerUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined> {
       return this._usuarioService
           .encontrarUno(Number(identificador));
    }

    @Post()
    guardarUno(
        @Body() usuario: UsuarioEntity,
    ): Promise<UsuarioEntity | undefined> {
       // console.log(usuario)
        return this._usuarioService.guardarUno(usuario);
    }

}