/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransacoesService } from '../services/app.transacoes.service';
import { TransacoesType } from 'src/types/TransacoesType';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class TransacoesController {
  constructor(private service: TransacoesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('transacoes/create')
  async create(@Request() req, @Body() body: TransacoesType) {
    const usuarioId = req.user.uscodigo;
    return this.service.create({ ...body, tsusuario: usuarioId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('transacoes/update')
  async update(@Request() req, @Body() body: TransacoesType) {
    const usuarioId = req.user.uscodigo;
    return this.service.update({ ...body, tsusuario: usuarioId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('transacoes')
  async findAll(@Request() req, @Query() query: any) {
    const usuarioId = req.user.uscodigo;
    return this.service.findAll(usuarioId, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('transacoes/:codigo')
  async findOne(@Param('codigo') codigo: string) {
    return this.service.findOne(codigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('transacoes/:codigo')
  async delete(@Param('codigo') codigo: string) {
    return this.service.delete(codigo);
  }
} 