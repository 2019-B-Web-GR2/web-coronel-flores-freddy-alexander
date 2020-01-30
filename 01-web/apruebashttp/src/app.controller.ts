import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Query, Res, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('pepito') // segemento url -> "/"
export class AppController {
  count: number = 100;
  constructor(private readonly appService: AppService) {}


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fieldSize: 20000
    },
    dest: './publico',
  }))
  subirArchivo( @UploadedFile('file') file ) {
    console.log(file);
    console.log(file.fileName);
    return 'weee  ';

  }
  @Get('ciudades/:idCiudad')
  ciudes(
      @Param('idCiudad') idCiudad: string,
  ) {
    const ciudadPichincha = [
      {id: 1, nombre: 'Quito'},
    ];
    const ciudadGuayas = [
      {id: 2, nombre: 'Guayaquil'},
    ];
    if (idCiudad === '1') {
      return ciudadPichincha;
    }else {
      return ciudadGuayas;
    }
  }

  @Get('hola-mundo') // -> url "/"
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  crearLogin(
      @Res() res,
  ) {
    res.render('login/login');
  }


  @HttpCode(200)
  @Post('esPar')
  adiosMundo(): string {
    const segundos = this.getSeconds();
    if (segundos % 2 === 0) {
      console.log("hello ");
      return 'adios mundo!';


    } else {
      throw  new InternalServerErrorException(
          'Es impar'
      );
    }



  }

  private getSeconds() {
    return new Date().getSeconds();
  }

  // query params

  @Get('bienvenida')
  bienvenida(
      @Query() parametrosDeConsulta: ObjetoBienvenida,
      @Query('nombre') nombre : string,
  ): string {
    console.log(parametrosDeConsulta);
    console.log(nombre);
    // template strings:
    return `Mensaje ${parametrosDeConsulta.nombre} Numero: ${parametrosDeConsulta.numero}`
  }

  @Get('inscripcion-curso/:idCurso/:cedula')
  inscripcionCurso(
      @Param() paramerosdeRuta: ObjetoInscripcion,
      @Param('idCurso') idCurso: string,
      @Param('cedula') cedula: string
  ): string{
    console.log(paramerosdeRuta);
    return  `te inscribiste: ${paramerosdeRuta.idCurso} con cedula: ${paramerosdeRuta.cedula}`;
  }

  @Post('almorzar')
  @HttpCode(200)
  almorzar(
      @Body() parametrosDeCuerpo,
      @Body('nombre') id: number
  ): string{
    console.log(parametrosDeCuerpo);
    return ` ${parametrosDeCuerpo}`;
  }

  @Get('obtener-cabeceras')
  obtenerCabeceras(
      @Headers() cabeceras,
      @Headers('numerouno') numeroUno
  ): string {
    console.log(cabeceras);
    return  ` ${cabeceras}`;
  }
}

interface ObjetoBienvenida {
  nombre?: string;
  numero?: string;
  casado?: string
}

interface  ObjetoInscripcion{
  idCurso: string;
  cedula: string
}

// var nombre: string = 'Alexander';
// let apellido: string = 'Coronel'; // mutable
// const cedula = '23432 ';  // inmutable

/*
* 0 -> falsy
* "" -> falsy
* negoativos y negativos -> verdadero
*  "werwer" verdadero
* null y undefined false
* [] -> truty
* {} -> truty
*
* */
/*
class Usuario {
  cedula: string="23";
  constructor(
       public  nombre: string ,// Crear una propiedad
                           // llamada y nombre
                           // recibir un parametro y asignarlo a la propuedad nombre
       public  apellido: string
  ) {
  }
  private holaMundo():void {
    console.log('Hola');
  }


}

const alexander = Usuario('Alexander');
class Usuario2 {

  constructor(
      public nombre: string,
      public apellido?: string
  ) {
  }
}

class  Empleado extends Usuario2 {
  constructor(
      nombre: string,
      public numeroContrato: string,
      apellido?: string,
      ) {
    super(nombre, apellido);
  }



}

interface  Pelota {
  diametro: number;
  color?: string

}

const balonFutbol: Pelota = {
  diametro: 1,
};

class Juego implements Pelota{
  diametro: number;
}

*/
