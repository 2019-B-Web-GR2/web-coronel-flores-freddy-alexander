import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('det_carrito')
export class DetalleCarritoEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id_detalle',
  })
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'cantidad',
  })
  cantidad: number;

  @Column({
    type: 'float',
    nullable: false,
    name: 'precio_unitario',
  })
  precio: number;

  @Column({
    type: 'float',
    nullable: false,
    name: 'subtotal',
  })
  subtotal: number;
}
