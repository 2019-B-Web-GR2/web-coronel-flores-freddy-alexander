import { Controller, Get } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {

  constructor() {

  }

  @Get()
  usuarios() {
    return 'it works';
  }


}
