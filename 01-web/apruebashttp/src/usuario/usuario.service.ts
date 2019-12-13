import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export  class UsuarioService {
    constructor(
        // inyectar las dependencias
        // cualquier clase se puede inyectar
        @InjectRepository(UsuarioEntity) private _repositorioUsuario: Repository<UsuarioEntity>,
    ){}

    encontrarUno(id: number): Promise<UsuarioEntity> | undefined{
        const usuario = this._repositorioUsuario.findOne(id);
        // transformar la programación asincrona en sincrona con async y await
        return usuario;
    }

    guardarUno(usuario): Promise<UsuarioEntity | undefined> {
        // @ts-ignore
        const usuarioGuardado = this._repositorioUsuario.save<UsuarioEntity[]>(usuario);
        return usuarioGuardado;
    }

    borrarUno(id: number): Promise<DeleteResult>{
        return this._repositorioUsuario.delete(id);
    }

    actualizarUno(id: number, usuario) {
        usuario.id = id;
        return this._repositorioUsuario.save(usuario); // upsert
    }

    buscar(
        whereNormal = {},
        skip: number= 0,
        take: number= 10,
    ){
        this._repositorioUsuario.find(
            {
                // where: {
                 //    cedula: '48248',
                //},
                where: [
                    {
                        nombre: 'alex'                    },
                    {
                        cedula: '4548',
                    }
                ],
                skip: 0,
                take: 10,
            },
        )
    }





}