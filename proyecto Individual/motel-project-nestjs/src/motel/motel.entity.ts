import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from '../room/room.entity';

@Entity('motel')
export class MotelEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id_motel',
  })
  id: number;

  @Index({
    unique: true,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'nombre'
  })
  nombre: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: true,
    name: 'direccion',
  })
  direccion: string;

  @Index({
    unique: false,
  })
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'zipcode',
  })
  zipcode: string;

  @OneToMany(type => RoomEntity, room => room.motel)
  rooms: RoomEntity[];

}
