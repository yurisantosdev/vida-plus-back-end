/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Post,
  Request,
  Put,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ListaComprasService } from 'src/services/app.listaCompras.service';
import { ListaComprasType } from 'src/types/ListaComprasType';

@Controller()
export class ListaComprasController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: ListaComprasService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('lista/compras/create')
  async create(@Request() @Body() Body: ListaComprasType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('lista/compras/update')
  async update(@Request() @Body() Body: ListaComprasType) {
    return this.service.update(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('lista/compras/delete/:lccodigo')
  async delete(@Param('lccodigo') lccodigo: string) {
    return this.service.delete(lccodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('lista/compras/find/:lccodigo')
  async find(@Param('lccodigo') lccodigo: string) {
    return this.service.find(lccodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('lista/compras/findAll/:uscodigo')
  async findAll(@Param('uscodigo') uscodigo: string) {
    return this.service.findAll(uscodigo);
  }
}
