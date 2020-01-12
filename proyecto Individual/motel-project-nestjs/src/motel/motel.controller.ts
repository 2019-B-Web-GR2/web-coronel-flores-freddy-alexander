import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MotelEntity } from './motel.entity';
import { MotelService } from './motel.service';
import { log } from 'util';

@Controller('motel')
export class MotelController {
  constructor(private readonly motelService: MotelService) {
  }

  @Get('test')
  test() {
    return 'this also works';
  }

  @Get(':id')
  getOne(
    @Param('id') id: string
  ){

    const motel = this.motelService.getOne(+id);
    motel.then(data => console.log(data.rooms));
    return motel

  }

  @Post()
  saveOne(
    @Body() motel: MotelEntity,
  ): Promise<MotelEntity> | undefined {
    return this.motelService.saveOne(motel);

  }
}
