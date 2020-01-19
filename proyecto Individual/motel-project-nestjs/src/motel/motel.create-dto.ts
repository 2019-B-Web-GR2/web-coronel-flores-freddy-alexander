import { IsNotEmpty, IsNumberString, IsString, Max, MaxLength, MinLength } from 'class-validator';

export  class MotelCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  nombre: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  direccion: string;

  @IsNumberString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  zipcode: string;


}
