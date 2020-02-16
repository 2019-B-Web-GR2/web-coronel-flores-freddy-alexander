import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CabeceraCarritoEntity } from '../cabeceraCarrito/cabeceraCarrito.entity';
import { RoomEntity } from '../room/room.entity';

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

  @ManyToOne(type => CabeceraCarritoEntity, cabecera => cabecera.detalles)
  cabecera: CabeceraCarritoEntity;

  @ManyToOne(type => RoomEntity, room => room.detallesRoom)
  room: RoomEntity;



}
