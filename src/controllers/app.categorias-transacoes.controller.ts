/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoriasTransacoesService } from '../services/app.categorias-transacoes.service';
import { CategoriasTransacoesType } from 'src/types/CategoriasTransacoesType';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class CategoriasTransacoesController {
  constructor(private service: CategoriasTransacoesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('categorias-transacoes/create')
  async create(@Request() req, @Body() body: CategoriasTransacoesType) {
    const usuarioId = req.user.uscodigo;
    return this.service.create({ ...body, ctusuario: usuarioId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('categorias-transacoes/update')
  async update(@Request() req, @Body() body: CategoriasTransacoesType) {
    const usuarioId = req.user.uscodigo;
    return this.service.update({ ...body, ctusuario: usuarioId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('categorias-transacoes')
  async findAll(@Request() req) {
    const usuarioId = req.user.uscodigo;
    return this.service.findAll(usuarioId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('categorias-transacoes/:codigo')
  async findOne(@Param('codigo') codigo: string) {
    return this.service.findOne(codigo);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('categorias-transacoes/:codigo')
  async delete(@Param('codigo') codigo: string) {
    return this.service.delete(codigo);
  }
} 