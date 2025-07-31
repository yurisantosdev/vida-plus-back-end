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
import { DespesasService } from 'src/services/app.despesas.service';
import { DespesasType } from 'src/types/DespesasType';

@Controller()
export class DespesasController {
  // eslint-disable-next-line prettier/prettier
  constructor(private service: DespesasService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('despesas/create')
  async create(@Request() @Body() Body: DespesasType) {
    return this.service.create(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('despesas/update')
  async update(@Request() @Body() Body: DespesasType) {
    return this.service.update(Body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('despesas/delete/:dpcodigo')
  async delete(@Param('dpcodigo') dpcodigo: string) {
    return this.service.delete(dpcodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('despesas/find/:dpcodigo')
  async find(@Param('dpcodigo') dpcodigo: string) {
    return this.service.find(dpcodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('despesas/findAll/:uscodigo')
  async findAll(@Param('uscodigo') uscodigo: string) {
    return this.service.findAll(uscodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('despesas/findAll/veiculo/:vecodigo')
  async findAllVeiculo(@Param('vecodigo') vecodigo: string) {
    return this.service.findAllVeiculo(vecodigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('despesas/find/total/gasto/:uscodigo')
  async findTotal(@Param('uscodigo') uscodigo: string) {
    return this.service.findTotalGasto(uscodigo);
  }
}
