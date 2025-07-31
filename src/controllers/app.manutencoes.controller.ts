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
import { ManutencoesService } from 'src/services/app.manutencoes.service';
import { ManutencoesType } from 'src/types/ManutencoesType';

@Controller()
export class ManutenconsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: ManutencoesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('manutencoes/create')
  async create(@Request() @Body() Body: ManutencoesType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('manutencoes/update')
  async update(@Request() @Body() Body: ManutencoesType) {
    return this.service.update(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('manutencoes/delete/:mtcodigo')
  async delete(@Param('mtcodigo') mtcodigo: string) {
    return this.service.delete(mtcodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('manutencoes/find/:mtcodigo')
  async find(@Param('mtcodigo') mtcodigo: string) {
    return this.service.find(mtcodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('manutencoes/findAll/:uscodigo')
  async findAll(@Param('uscodigo') uscodigo: string) {
    return this.service.findAll(uscodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('manutencoes/findAll/veiculo/:vecodigo')
  async findAllVeiculo(@Param('vecodigo') vecodigo: string) {
    return this.service.findAllVeiculo(vecodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('manutencoes/find/total/gasto/:uscodigo')
  async findTotal(@Param('uscodigo') uscodigo: string) {
    return this.service.findTotalGasto(uscodigo);
  }
}
