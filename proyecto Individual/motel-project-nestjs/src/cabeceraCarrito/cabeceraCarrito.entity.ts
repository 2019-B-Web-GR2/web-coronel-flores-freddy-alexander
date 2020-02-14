import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'date',
    nullable: false,
    name: 'fecha',
  })
  fecha: string;

  @Column({
    type: 'float',
    nullable: false,
    name: 'total',
  })
  rol: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'direccion',
  })
  direccion: string;
}


