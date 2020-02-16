import { Body, Controller, Get, Post, Query, Res, Session } from '@nestjs/common';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { CabeceraCarritoService } from '../cabeceraCarrito/cabeceraCarrito.service';
import { DetalleCarritoService } from './detalleCarrito.service';
import { CabeceraCarritoEntity } from '../cabeceraCarrito/cabeceraCarrito.entity';
import { DetalleCarritoEntity } from './detalleCarrito.entity';
import { RoomService } from '../room/room.service';

@Controller('carrito')
export class DetalleCarritoController {
  constructor(
    private  readonly usuarioService: UsuarioService,
    private readonly cabeceraCarritoService: CabeceraCarritoService,
    private readonly detalleCarritoService: DetalleCarritoService,
    private readonly roomService: RoomService,
  ) {
  }

  @Get()
  holaC() {
    return 'detalle Carrito it works';
  }

  @Post('addToCart')
  async addToCart(
    @Session() session,
    @Res() res,
    @Body('cantidad') cantidad: number,
    @Query('roomId') roomId?: string,
  ) {
    try {
      const actualUser = await this.usuarioService.getOne(+session.user.userId);
      const cabeceraCarr = await this.cabeceraCarritoService.search({ actualUser });
      const actualRoom = await this.roomService.findOne(+roomId);
      if (cabeceraCarr.length === 0) {
        const newCabecera = new CabeceraCarritoEntity()
        newCabecera.direccion = 'direccion ' + session.user.userId;
        newCabecera.estado = 'creado';
        newCabecera.total = 0;
        newCabecera.fecha = new Date().toDateString();
        newCabecera.usuario = actualUser;
        await this.cabeceraCarritoService.saveOne(newCabecera)
        cabeceraCarr.push(newCabecera);

      }
      const newDetalle = new DetalleCarritoEntity();
      newDetalle.room = actualRoom;
      newDetalle.subtotal = actualRoom.precio * cantidad;
      newDetalle.cabecera = cabeceraCarr[0];
      newDetalle.cantidad = cantidad;
      newDetalle.precio = actualRoom.precio;
      await this.detalleCarritoService.saveOne(newDetalle);
      cabeceraCarr[0].total = cabeceraCarr[0].total + newDetalle.subtotal;
      await this.detalleCarritoService.saveOne(cabeceraCarr[0]);

      res.redirect('/carrito/ruta/mostrar-carrito');
    } catch (e) {
      console.log(e);
      res.redirect('/motel/rutal/mostrar-moteles?error=room cannot be added to cart');

    }


  }

  @Get('/ruta/mostrar-carrito')
  async  carrito(
    @Session() session,
    @Res() res,
  ) {
    const actualUser = await this.usuarioService.getOne(+session.user.userId);
    const cabeceraCarr = await this.cabeceraCarritoService.search({actualUser});
    if (cabeceraCarr.length > 0 ) {
      const detalles = await this.detalleCarritoService.search({ cabecera: cabeceraCarr[0] });
      console.log(detalles);
      res.render('carrito/routes/buscar-mostrar-tabla', {
        datos: {
          cabecera: cabeceraCarr[0],
          detalles,
        },
      });
    } else {
      console.log('entre aqui?');
      res.render('carrito/routes/buscar-mostrar-tabla', {
        datos: {
          cabecera: undefined,
          detalles: [],
        },
      });

    }
    console.log('get this user', actualUser);



  }

}
