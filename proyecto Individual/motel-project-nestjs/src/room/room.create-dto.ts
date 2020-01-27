import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomCreateDto {

  @IsNotEmpty()
  @IsString()
  tipoHabitacion: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;


  @IsBoolean()
  ocupada: boolean;

}
