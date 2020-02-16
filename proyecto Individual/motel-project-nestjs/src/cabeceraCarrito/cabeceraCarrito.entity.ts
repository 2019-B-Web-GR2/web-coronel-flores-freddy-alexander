import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { DetalleCarritoEntity } from '../detalleCarrito/detalleCarrito.entity';

@Entity('cab_carrito')
export class CabeceraCarritoEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id_cab_carrito',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'estado',
  })
  estado: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'fecha',
  })
  fecha: string;

  @Column({
    type: 'float',
    nullable: false,
    name: 'total',
    default: 0,
  })
  total: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'direccion',
  })
  direccion: string;

  @ManyToOne(type => UsuarioEntity, usuario => usuario.cabeceras)
  usuario: UsuarioEntity;

  @OneToMany(type => DetalleCarritoEntity, detalleCarrito => detalleCarrito.cabecera)
  detalles: DetalleCarritoEntity[];
}


