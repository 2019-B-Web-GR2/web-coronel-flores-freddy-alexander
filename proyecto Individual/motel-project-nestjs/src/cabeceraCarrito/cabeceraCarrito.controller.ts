import { Controller, Get } from '@nestjs/common';

@Controller('cabeceraCarrito')
export class CabeceraCarritoController {
  constructor() {

  }

  @Get()
  casd() {
    return 'it works';
  }

}
