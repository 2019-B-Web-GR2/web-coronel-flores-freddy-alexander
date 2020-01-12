import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MotelEntity } from '../motel/motel.entity';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id_room',
    })
  id: number;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'tipoHabitacion'
  })
  tipoHabitacion: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'float',
    nullable: false,
    name: 'precio',
  })
  precio: number;

  @Index({
    unique: false,
  })
  @Column({
    type: 'boolean',
    nullable: false,
    name: 'ocupada'
  })
  ocupada: boolean;

  @ManyToMany(type => MotelEntity, motel => motel.rooms)
  motel: MotelEntity;

}












