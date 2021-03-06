import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('usuario_web')
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'id_web',
        comment: 'identificador de la tabla usuario'
    })
    id: number;
    @Index({
        unique: false
    })
    @Column({
        type: 'varchar',
        nullable: true,
        name: 'nombre',
        comment: 'nombre de la tabla usuario'
    })
    nombre?: string;

    @Index({
        unique: true
    })
    @Column({
        type: 'varchar',
        nullable: false,
        name: 'cedula',
        comment: 'cedula del usuario'
    })
    cedula: string

}