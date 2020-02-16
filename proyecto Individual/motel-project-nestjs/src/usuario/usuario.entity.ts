import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CabeceraCarritoEntity } from '../cabeceraCarrito/cabeceraCarrito.entity';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id_usuario',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'rol',
  })
  rol: string;
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'password',
  })
  password: string;

@Column({
  type: 'varchar',
  nullable: false,
  name: 'username',
})
username: string;

@OneToMany(type => CabeceraCarritoEntity, cabeceraEntity => cabeceraEntity.usuario)
  cabeceras: CabeceraCarritoEntity[];
}
