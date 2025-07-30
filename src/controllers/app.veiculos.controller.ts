/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  Post,
  Request,
  Put,
  UseGuards,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VeiculosService } from 'src/services/app.veiculos.service';
import { VeiculosType } from 'src/types/VeiculosType';

@Controller()
export class VeiculosController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: VeiculosService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('veiculos/create')
  async create(@Request() @Body() Body: VeiculosType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('veiculos/update')
  async update(@Request() @Body() Body: VeiculosType) {
    return this.service.update(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('veiculos/delete/:vecodigo')
  async delete(@Param('vecodigo') vecodigo: string) {
    return this.service.delete(vecodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('veiculos/find/:vecodigo')
  async find(@Param('vecodigo') vecodigo: string) {
    return this.service.find(vecodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('veiculos/findAll/:uscodigo')
  async findAll(@Param('uscodigo') uscodigo: string) {
    return this.service.findAll(uscodigo);
  }
}
