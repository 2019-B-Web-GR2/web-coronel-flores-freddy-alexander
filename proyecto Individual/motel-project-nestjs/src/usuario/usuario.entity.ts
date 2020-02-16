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
}
