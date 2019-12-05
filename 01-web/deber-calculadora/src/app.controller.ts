import {
  Body,
  Controller, Delete,
  Get,
  Head, Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put, Query
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @HttpCode(200)
  @Get('suma-headers')
  sumarHeaders(
      @Headers('number1') number1,
      @Headers('number2') number2,
  ): string {
    if (Number(number1) && Number(number2)) {
      return `${(Number(number2) + Number(number1))}` ;
    } else {
      throw  new InternalServerErrorException('Debes especificar dos numeros en los headers con nombre numero1 y numero2');
    }
    return `hello there`;
  }

  @HttpCode(201)
  @Post('restar')
  restarNumeros(
      @Body() numerosBody: Numbers,
  ): string {
    if (numerosBody.number1 && numerosBody.number2) {
      return `${numerosBody.number1 - numerosBody.number2}`;
    } else {
      throw  new InternalServerErrorException('enviar dos números en json con ');
    }

  }
  @HttpCode(202)
  @Put('multiplicar')
  multiplicar(
      @Query() numbersQuery: Numbers,
  ): string {
    // console.log(numbersQuery);
    if (numbersQuery.number1 && numbersQuery.number2) {
      return `${Number(numbersQuery.number1) * Number(numbersQuery.number2)}`;
    } else {
      throw  new InternalServerErrorException('enviar dos números en query params ');
    }
  }

  @HttpCode(203)
  @Delete('division')
  division(
      @Query() numerosQuery: Numbers,
      @Body() numerosBody: Numbers,
      @Headers('number1') number1,
      @Headers('number2') number2,

  ): string{
    if (numerosBody.number2 && numerosBody.number2 && numerosQuery.number2 && numerosQuery.number1
    && number1 && number2) {
      if (Number(numerosQuery.number2) === 0 || numerosBody.number2 === 0 && Number(number2) === 0 ) {
        throw  new InternalServerErrorException('error al dividir para cero');
      } else {
        return `division con query params: ${Number(numerosQuery.number1) / Number(numerosQuery.number2)}
        division con body params: ${numerosBody.number1 / numerosBody.number2} 
        divison con headers: ${Number(number1) / Number(number2) }`;
      }
    } else {
      throw  new InternalServerErrorException('enviar dos números en query params, headers y body params ');
    }

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

interface Numbers {
  number1: number;
  number2: number;

}