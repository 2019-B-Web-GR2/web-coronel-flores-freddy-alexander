import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
