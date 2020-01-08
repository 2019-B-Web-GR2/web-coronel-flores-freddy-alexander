import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import { DeleteResult, Like, MoreThan, Repository } from 'typeorm';

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

    borrarUno(id: number): Promise<DeleteResult> {
        return this._repositorioUsuario.delete(id);
    }

    actualizarUno(id: number, usuario) {
        usuario.id = id;
        return this._repositorioUsuario.save(usuario); // upsert
    }

    buscar(
        whereNormal: any = {},
        skip1: number= 0,
        take1: number= 10,
        order1: any = {
            id: 'DESC',
            nombre: 'ASC',
        },
    ): Promise<UsuarioEntity[]> {
        // exactamente el nombre o exactamente la cedula
        const consultaWhere = [
            {
                nombre: '',
            },
            {
                cedula: '',
            },
        ];
        // exactamente le nombre o LIKE la cedula
        const consultaWhereLike = [
            {
                nombre: Like('%a%'),
            },
            {
              cedula: Like('%a%'),
            },
        ];
        // id sea mayor a 20
        const consultaWhereMayorA = {
            id: MoreThan(20),
        };
        // id sea igual a x
        const consultaWhereIgualA = {
            id: 30,
        };

        return this._repositorioUsuario.find(
            {

                where: whereNormal,
                skip: skip1,
                take: take1,
                order: order1,
            },
        );
    }





}
