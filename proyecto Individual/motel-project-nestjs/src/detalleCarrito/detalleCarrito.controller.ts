import { Controller, Get } from '@nestjs/common';

@Controller('detalleCarrito')
export class DetalleCarritoController {
  constructor() {
  }

  @Get()
  holaC() {
    return 'detalle Carrito it works';
  }
}
